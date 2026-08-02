"use client";

import { useMemo, type ReactNode } from "react";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { createJiraTheme, getJiraGlobalStyles } from "./jiraTheme";

export function JiraThemeProvider({ children }: { children: ReactNode }) {
  const baseTheme = useTheme();
  const jiraTheme = useMemo(() => createJiraTheme(baseTheme), [baseTheme]);

  return (
    <ThemeProvider theme={jiraTheme}>
      <GlobalStyles styles={getJiraGlobalStyles} />
      {children}
    </ThemeProvider>
  );
}
