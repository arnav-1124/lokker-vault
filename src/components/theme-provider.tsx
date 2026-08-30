"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Class-based light/dark theme switching backed by next-themes.
 * The `.dark` class variant is defined in src/app/globals.css.
 */
export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & { children: ReactNode }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
