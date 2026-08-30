"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Class-based light/dark theme switching backed by next-themes.
 * The `.dark` class variant is defined in src/app/globals.css.
 */
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
