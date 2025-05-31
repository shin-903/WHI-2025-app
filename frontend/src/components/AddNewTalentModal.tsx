import { Modal, Box, TextField } from "@mui/material";

interface AddNewTalentModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AddNewTalentModal({ isOpen, onClose, children }: AddNewTalentModalProps) {
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

        <p>名前</p>
        <TextField
          placeholder="Ex: Jane Doe"
          fullWidth
        />

        <p>年齢</p>
        <TextField
          placeholder="Ex: 22"
          fullWidth
        />

        <button className="submit">登録</button>
        {children}
      </Box>
    </Modal>
  );
}