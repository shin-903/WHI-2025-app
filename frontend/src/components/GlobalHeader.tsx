"use client";

import { AppBar, Box, Toolbar, Typography, Switch } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";

export interface GlobalHeaderProps {
  title: string;
  isDarkMode: boolean;
  onDarkModeToggle: (checked: boolean) => void;
}

export function GlobalHeader({ title, isDarkMode, onDarkModeToggle }: GlobalHeaderProps) {
  const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDarkModeToggle(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            background:
              "linear-gradient(45deg, rgb(0, 91, 172), rgb(94, 194, 198))",
          }}
        >
          <Box sx={{ display: "flex", flexGrow: 1}}>
            <Link href="/">
              <PeopleIcon fontSize={"large"} sx={{ mr: 2 }} />
            </Link>
            <Link href="/">
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
            </Link>
          </Box>

          <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              ダークモード
            </Typography>
            <Switch
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
              color="default"
            />            
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
