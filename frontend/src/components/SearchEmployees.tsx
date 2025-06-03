"use client";
import { Paper, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { AddNewTalentModal } from "./AddNewTalentModal";

import "./searchEmployees.css"; // Assuming you have a CSS file for styles



export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameKeyword, setNameKeyword] = useState("");
  const [positionKeyword, setPositionKeyword] = useState("");
  const [skillsKeyword, setSkillsKeyword] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
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
      <button 
        id="js-add-talent"
        className="button__addTalent"
        onClick={handleOpenModal}>
          新規追加
      </button>
      <AddNewTalentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
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
