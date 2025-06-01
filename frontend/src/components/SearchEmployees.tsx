"use client";
import { Paper, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";

export function SearchEmployees() {
  const [nameKeyword, setNameKeyword] = useState("");
  const [positionKeyword, setPositionKeyword] = useState("");
  const [skillsKeyword, setSkillsKeyword] = useState("");

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        p: 2,
      }}
    >
      <Typography variant="h6">従業員検索</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="名前"
          placeholder="名前で検索"
          value={nameKeyword}
          onChange={(e) => setNameKeyword(e.target.value)}
        />
        <TextField
          label="役職"
          placeholder="役職で検索"
          value={positionKeyword}
          onChange={(e) => setPositionKeyword(e.target.value)}
        />
        <TextField
          label="スキル"
          placeholder="スキルで検索"
          value={skillsKeyword}
          onChange={(e) => setSkillsKeyword(e.target.value)}
        />
      </Box>
      <EmployeeListContainer
        key="employeesContainer"
        filters={{
          name: nameKeyword,
          position: positionKeyword,
          skills: skillsKeyword,
        }}
      />
    </Paper>
  );
}
