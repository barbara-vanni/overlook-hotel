import { useState } from "react";
import { Modal, Box, Button, TextField, Rating } from "@mui/material";

const ReviewModal = ({ open, onClose, onSubmit }) => {
    const [note, setNote] = useState<number | null>(0);
    const [commentaire, setCommentaire] = useState("");

    const handleSubmit = () => {
        if (note && commentaire) {
            onSubmit({ note, commentaire });
            setNote(0);
            setCommentaire("");
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: "white", mx: "auto", my: "20vh", width: 400, borderRadius: 2 }}>
                <h2>Donner votre avis</h2>
                <Rating
                    value={note}
                    onChange={(_, newValue) => setNote(newValue)}
                />
                <TextField
                    label="Votre avis"
                    multiline
                    rows={4}
                    fullWidth
                    value={commentaire}
                    onChange={e => setCommentaire(e.target.value)}
                    sx={{ my: 2 }}
                />
                <Button variant="contained" onClick={handleSubmit}>Envoyer</Button>
            </Box>
        </Modal>
    );
};

export default ReviewModal;