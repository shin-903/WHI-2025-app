"use client";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { AddNewTalentModal } from "./AddNewTalentModal";

import "./searchEmployees.css"; // Assuming you have a CSS file for styles


export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
      />
    </Paper>
  );
}
