"use client";

import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";

import { VerticalSpacer } from "../components/VerticalSpacer";
import { GlobalHeader } from "../components/GlobalHeader";
import { GlobalFooter } from "../components/GlobalFooter";

export function GlobalContainer({ children }: { children?: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "light" : "dark",
        },
      }),
    [isDarkMode]
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <header>
          <GlobalHeader 
            title={"EzMatcher"}
            isDarkMode={isDarkMode}
            onDarkModeToggle={setIsDarkMode}
          />
        </header>

        <VerticalSpacer height={32} />

        <main>{children}</main>

        <footer>
          <GlobalFooter />
        </footer>
      </Container>
    </ThemeProvider>
  );
}
