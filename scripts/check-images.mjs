/* ============================================================================
   npm run images — the preflight check for everything in public/work/

   Run this after dropping exports into a project folder and before you push.
   It reads app/work/projects.js, looks at every file on disk, and tells you in
   plain language what's wrong — or prints the projects.js lines to paste when
   it finds images no project is using yet.

   IT NEVER WRITES TO YOUR FILES. Everything here is read-only. When it says an
   export is too big, you re-export from Figma; the script won't touch the
   original you made.

   THE CHECK THAT JUSTIFIES THE WHOLE SCRIPT is the uppercase one. macOS treats
   Cover.jpg and cover.jpg as the same file; the Linux machine Vercel builds on
   does not. So a capital letter in a filename works perfectly on your laptop
   and 404s in production — the one class of bug you cannot catch by looking.

   The full spec these rules come from is in IMAGES.md.
   ============================================================================ */

import { readFile, readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = path.join(ROOT, "app/work/projects.js");
const WORK_DIR = path.join(ROOT, "public/work");

/* ----------------------------------------------------------------------------
   THE SLOTS, AND WHAT EACH ONE NEEDS

   `ideal` is the widest pixel width that slot will ever put on screen, worked
   out from the `sizes` prop on its <Image>. Next never serves more than this
   and never upscales past your file, so anything wider is weight in the repo
   that nobody ever downloads.

   `min` is where the slot starts looking soft on a 2x display.

   `bytes` is a budget, not a limit. It exists because git keeps every version
   of every image forever — a 6MB export is 6MB in the clone for good, even
   after you replace it.
   --------------------------------------------------------------------------- */
const SLOTS = {
  cover: { label: "cover", ideal: 2560, min: 1600, bytes: 1_500_000 },
  full: {
    label: 'image, width: "full"',
    ideal: 2560,
    min: 1600,
    bytes: 1_500_000,
  },
  contained: {
    label: "image, contained",
    ideal: 1800,
    min: 1200,
    bytes: 800_000,
  },
  duo: { label: "duo item", ideal: 1200, min: 900, bytes: 400_000 },
};

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const FILENAME = /^[a-z0-9]+(?:[-.a-z0-9]*)\.(?:jpe?g|png|webp|avif)$/;

const errors = [];
const warnings = [];

const error = (where, message) => errors.push({ where, message });
const warn = (where, message) => warnings.push({ where, message });

/* ----------------------------------------------------------------------------
   READING projects.js FROM PLAIN NODE

   projects.js is an ES module, but package.json has no "type": "module", so
   Node would read it as CommonJS and fail on the word `export`. Rather than
   change how the whole project is interpreted for the sake of one script, the
   file is read as text and handed to Node as a data: URL, which is always
   treated as a module.

   This works only because projects.js is pure data with no imports of its own.
   That's worth keeping true — it's what lets anything read your content without
   booting Next.
   --------------------------------------------------------------------------- */
async function loadProjects() {
  let source;
  try {
    source = await readFile(PROJECTS, "utf8");
  } catch {
    fail(`Can't find app/work/projects.js. Run this from the project folder.`);
  }

  const url =
    "data:text/javascript;base64," + Buffer.from(source).toString("base64");

  try {
    const { projects } = await import(url);
    if (!Array.isArray(projects)) {
      fail(`app/work/projects.js doesn't export a list called "projects".`);
    }
    return projects;
  } catch (e) {
    fail(
      `app/work/projects.js couldn't be read.\n\n  ${e.message}\n\n` +
        `  Usually a missing comma or bracket. Try "npm run format" — malformed\n` +
        `  code stops indenting correctly, which makes it easy to spot.\n\n` +
        `  If you added an import to the top of that file, remove it: this check\n` +
        `  reads the file on its own, without Next, so it can't follow imports.`,
    );
  }
}

/* ----------------------------------------------------------------------------
   EVERY IMAGE A PROJECT ASKS FOR

   Walks one project and yields each image reference with the slot it lands in,
   so the size rules above can be applied to the right one. A block type this
   doesn't recognise still gets checked — it's just measured against the
   contained budget, which is the safe middle.
   --------------------------------------------------------------------------- */
function* references(project) {
  const at = (what) => `${project.slug} — ${what}`;

  if (project.cover?.src) {
    yield { ...project.cover, slot: "cover", where: at("cover") };
  }

  for (const [i, block] of (project.blocks ?? []).entries()) {
    const n = `block ${i + 1}`;

    if (block.type === "duo") {
      for (const [j, item] of (block.items ?? []).entries()) {
        yield { ...item, slot: "duo", where: at(`${n}, duo image ${j + 1}`) };
      }
    } else if (block.src) {
      const slot =
        block.type === "image" && block.width === "full" ? "full" : "contained";
      yield { ...block, slot, where: at(`${n} (${block.type})`) };
    }
  }
}

/* ----------------------------------------------------------------------------
   THE ASPECT COMPARISON

   CSS aspect-ratio accepts "16/9" and a bare "1.778" alike, so both are parsed.
   The 1% tolerance is what lets "3/2" stand for a 2560x1707 export — a real
   ratio almost never lands on a tidy fraction exactly, and rejecting it would
   train you to ignore the check.
   --------------------------------------------------------------------------- */
function parseAspect(value) {
  if (typeof value !== "string") return null;
  const [w, h = "1"] = value.split("/");
  const ratio = Number(w.trim()) / Number(h.trim());
  return Number.isFinite(ratio) && ratio > 0 ? ratio : null;
}

const bytes = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)} MB`
    : `${Math.round(n / 1000)} KB`;

/* ----------------------------------------------------------------------------
   Every image file actually sitting in public/work/, as web paths.
   --------------------------------------------------------------------------- */
async function filesOnDisk(dir = WORK_DIR, prefix = "/work") {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const found = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const webPath = `${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      found.push(...(await filesOnDisk(path.join(dir, entry.name), webPath)));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      found.push(webPath);
    }
  }
  return found;
}

function fail(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

/* ========================================================================== */

const projects = await loadProjects();
const slugs = new Set(projects.map((p) => p.slug));
const onDisk = await filesOnDisk();
const referenced = new Set();
const rows = [];

for (const project of projects) {
  for (const ref of references(project)) {
    const { src, where, slot, aspect } = ref;
    const budget = SLOTS[slot];

    if (typeof src !== "string" || !src.startsWith("/")) {
      error(
        where,
        `src must be a path starting with "/", not ${JSON.stringify(src)}`,
      );
      continue;
    }

    referenced.add(src);

    const file = path.join(ROOT, "public", src);

    /* Compared against the real directory listing rather than trusted to
       fs — macOS would happily open public/work/x/Cover.png for a src of
       "cover.png", which is precisely the bug that survives to production. */
    const exact = onDisk.find((p) => p.toLowerCase() === src.toLowerCase());
    if (exact && exact !== src) {
      error(
        where,
        `src says "${src}" but the file is called "${path.basename(exact)}". ` +
          `Your Mac ignores the difference; Vercel's Linux doesn't, so this ` +
          `page works locally and shows a hole in production.`,
      );
    }

    const folder = src.startsWith("/work/") ? src.split("/")[2] : null;
    if (folder && !slugs.has(folder)) {
      error(
        where,
        `lives in public/work/${folder}/, which isn't any project's slug. ` +
          `The folder name and the slug have to match.`,
      );
    }

    let size;
    try {
      size = imageSize(await readFile(file));
    } catch {
      error(where, `no file at public${src}`);
      continue;
    }

    const { width, height } = size;
    const fileBytes = statSync(file).size;
    rows.push({ src, width, height, fileBytes, slot });

    /* aspect */
    const declared = parseAspect(aspect);
    if (aspect === undefined) {
      warn(
        where,
        `no aspect. Add aspect: "${width}/${height}" or the page will jump as it loads.`,
      );
    } else if (declared === null) {
      error(
        where,
        `aspect: ${JSON.stringify(aspect)} isn't a ratio. Use "${width}/${height}".`,
      );
    } else if (Math.abs(declared - width / height) / (width / height) > 0.01) {
      error(
        where,
        `aspect is "${aspect}" but the file is ${width}×${height}. ` +
          `Use "${width}/${height}" — the page crops and jumps otherwise.`,
      );
    }

    /* size */
    if (width > budget.ideal * 1.1) {
      warn(
        where,
        `${width}px wide. This slot (${budget.label}) never shows more than ` +
          `${budget.ideal}px — the extra is weight in the repo nobody downloads.`,
      );
    } else if (width < budget.min) {
      warn(
        where,
        `only ${width}px wide. This slot (${budget.label}) wants ${budget.ideal}px; under ${budget.min} looks soft on a retina screen.`,
      );
    }

    if (fileBytes > budget.bytes) {
      warn(
        where,
        `${bytes(fileBytes)}, over the ${bytes(budget.bytes)} budget for a ${budget.label}. ` +
          `Re-export as JPG, or run it through squoosh.app.`,
      );
    }
  }
}

/* ----------------------------------------------------------------------------
   NAME RULES, APPLIED TO THE DISK RATHER THAN TO projects.js

   Checked here — over every file in public/work/, referenced or not — because a
   capital letter is invisible on macOS. Leave it until the file gets used and
   the first thing that reads it is a paste-ready block above handing you a path
   that 404s the moment it deploys.
   --------------------------------------------------------------------------- */
for (const src of onDisk) {
  const name = path.basename(src);
  if (FILENAME.test(name)) continue;

  const why = /[A-Z]/.test(name)
    ? `has a capital letter — this works on your Mac and 404s on Vercel`
    : /\s/.test(name)
      ? `has a space in it`
      : `should be lowercase letters, numbers and hyphens only`;

  error(`public${src}`, `"${name}" ${why}. Rename the file.`);
}

/* Folders on disk that don't belong to a project at all. */
const diskFolders = new Set(
  onDisk.filter((p) => p.startsWith("/work/")).map((p) => p.split("/")[2]),
);
for (const folder of diskFolders) {
  if (!slugs.has(folder)) {
    warn(
      `public/work/${folder}/`,
      `isn't any project's slug. Rename the folder to match, or add the project to projects.js.`,
    );
  }
}

/* ----------------------------------------------------------------------------
   THE REPORT
   --------------------------------------------------------------------------- */
const tty = process.stdout.isTTY && !process.env.NO_COLOR;
const dim = (s) => (tty ? `\x1b[2m${s}\x1b[0m` : s);
const bold = (s) => (tty ? `\x1b[1m${s}\x1b[0m` : s);
const red = (s) => (tty ? `\x1b[31m${s}\x1b[0m` : s);
const yellow = (s) => (tty ? `\x1b[33m${s}\x1b[0m` : s);
const green = (s) => (tty ? `\x1b[32m${s}\x1b[0m` : s);

console.log();

if (rows.length) {
  console.log(
    bold(`${rows.length} image${rows.length === 1 ? "" : "s"} in use`),
  );
  console.log();
  const pad = Math.max(...rows.map((r) => r.src.length));
  for (const r of rows) {
    const dims = `${r.width}×${r.height}`.padEnd(12);
    console.log(
      `  ${r.src.padEnd(pad)}  ${dim(dims)}${dim(`${r.width}/${r.height}`.padEnd(12))}${dim(bytes(r.fileBytes))}`,
    );
  }
  console.log();
}

/* Case-insensitive, so a file whose only problem is a capital letter is
   reported once as the naming error above rather than a second time here as an
   image nothing uses. */
const used = new Set([...referenced].map((s) => s.toLowerCase()));
const orphans = onDisk.filter((src) => !used.has(src.toLowerCase()));
if (orphans.length) {
  const byFolder = new Map();
  for (const src of orphans) {
    const folder = src.split("/").slice(0, -1).join("/");
    byFolder.set(folder, [...(byFolder.get(folder) ?? []), src]);
  }

  for (const [folder, files] of byFolder) {
    console.log(
      yellow(`public${folder}/`) +
        ` — ${files.length} file${files.length === 1 ? "" : "s"} no project uses yet`,
    );
    console.log(
      dim(`  Paste into that project's blocks, then set alt and swap`),
    );
    console.log(dim(`  "contained" for "full" on anything edge to edge.`));
    console.log();

    for (const src of files) {
      let size;
      try {
        size = imageSize(await readFile(path.join(ROOT, "public", src)));
      } catch {
        console.log(`  ${red("unreadable")}  public${src}`);
        continue;
      }
      if (path.basename(src).startsWith("cover.")) {
        console.log(
          `  cover: { src: "${src}", alt: "", aspect: "${size.width}/${size.height}" },`,
        );
      } else {
        console.log(
          `  { type: "image", src: "${src}", alt: "", aspect: "${size.width}/${size.height}", width: "contained" },`,
        );
      }
    }
    console.log();
  }
}

for (const { where, message } of errors) {
  console.log(`${red("error")}  ${bold(where)}`);
  console.log(`       ${message}`);
  console.log();
}

for (const { where, message } of warnings) {
  console.log(`${yellow("warn")}   ${bold(where)}`);
  console.log(`       ${message}`);
  console.log();
}

if (!errors.length && !warnings.length) {
  console.log(green("Everything checks out."));
  console.log();
} else {
  const parts = [];
  if (errors.length)
    parts.push(red(`${errors.length} error${errors.length === 1 ? "" : "s"}`));
  if (warnings.length)
    parts.push(
      yellow(`${warnings.length} warning${warnings.length === 1 ? "" : "s"}`),
    );
  console.log(
    `${parts.join(", ")}${errors.length ? " — errors will look wrong or break in production." : " — warnings are safe to publish, worth fixing."}`,
  );
  console.log(dim("The full spec is in IMAGES.md."));
  console.log();
}

process.exit(errors.length ? 1 : 0);
