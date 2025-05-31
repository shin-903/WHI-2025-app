"use client";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { EmployeeListContainer } from "./EmployeeListContainer";

import "./searchEmployees.css"; // Assuming you have a CSS file for styles

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
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
      <TextField
        placeholder="検索キーワードを入力してください"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button id="js-add-talent" className="button__addTalent">新規追加</button>
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
      />
    </Paper>
  );
}
