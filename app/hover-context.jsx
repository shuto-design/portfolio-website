"use client";

import { createContext, useContext, useMemo, useState } from "react";

/* ============================================================================
   WHAT THE WORK GRID IS POINTING AT

   The bottom bar on /work says "Hover over work to see" — so hovering a tile
   has to change words that live in layout.jsx, several components away from the
   tile doing the hovering. Passing that through props would mean threading it
   through the layout and every page in between; this is the case React context
   exists for.

   It holds { label, copy } — the two lines of the bar — rather than a project,
   so the bar doesn't have to know what a project is.
   ============================================================================ */

const HoverContext = createContext({ hovered: null, setHovered: () => {} });

export function HoverProvider({ children }) {
  const [hovered, setHovered] = useState(null);

  // `children` arrives from the server component as an already-built element,
  // so it doesn't re-render when this state changes — only the bar and the
  // tiles, which are the two things that actually read the context.
  const value = useMemo(() => ({ hovered, setHovered }), [hovered]);

  return (
    <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
  );
}

export function useHover() {
  return useContext(HoverContext);
}
