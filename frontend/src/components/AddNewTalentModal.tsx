import { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";
import "./addNewTalentModal.css";

interface AddNewTalentModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function AddNewTalentModal({ isOpen, onClose, children }: AddNewTalentModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submitForm = () => {

    console.log(`登録: 名前=${name}, 年齢=${age}`);
    setName("");
    setAge("");

    
    onClose();
  }
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>新規追加</h2>

        <div className="input__container">
          <p>名前</p>
          <TextField
            placeholder="Ex: Jane Doe"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input__container">
          <p>年齢</p>
          <TextField
            placeholder="Ex: 22"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button 
          className="submit"
          onClick={submitForm}
        >登録</button>
        {children}
      </Box>
    </Modal>
  );
}