"use client";

import { createContext, useContext, useMemo, useState } from "react";

/* ============================================================================
   WHAT THE BOTTOM BAR IS POINTING AT

   The bar on /work names whichever piece of work you're looking at — so a tile
   has to change words that live in layout.jsx, several components away. Passing
   that through props would mean threading it through the layout and every page
   in between; this is the case React context exists for.

   It holds { label, copy } — the two lines of the bar — rather than a project,
   so the bar doesn't have to know what a project is.

   TWO THINGS CAN POINT AT A TILE, and they are not the same gesture:

     setHovered   a pointer is over a tile, or a tile has keyboard focus
     setVisible   a tile is the one filling the screen in the scrolled row

   HOVER WINS when both have an opinion. Pointing at something is deliberate
   and specific; being scrolled to is ambient. If someone reaches across a row
   to point at the third tile, the bar should say the third tile no matter what
   the scroll position happens to be.

   Between them they cover both ways of using the page. A mouse hovers and
   never scrolls the row far; a thumb scrolls and cannot hover at all. Neither
   is "the mobile one" — nothing here asks what kind of device this is, which
   is deliberate. A laptop with a touchscreen does whichever its owner is
   actually doing, and gets it right without being detected.
   ============================================================================ */

const ShowingContext = createContext({
  showing: null,
  setHovered: () => {},
  setVisible: () => {},
});

export function ShowingProvider({ children }) {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(null);

  // `children` arrives from the server component as an already-built element,
  // so it doesn't re-render when this state changes — only the bar and the
  // tiles, which are the two things that actually read the context.
  const value = useMemo(
    () => ({ showing: hovered ?? visible, setHovered, setVisible }),
    [hovered, visible],
  );

  return (
    <ShowingContext.Provider value={value}>{children}</ShowingContext.Provider>
  );
}

export function useShowing() {
  return useContext(ShowingContext);
}
