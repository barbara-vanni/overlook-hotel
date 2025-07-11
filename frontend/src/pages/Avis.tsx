import { useState, useEffect } from "react";
import { Box, Typography, Rating, Button, Paper } from "@mui/material";
import AvisModal from "../components/Review/ReviewModal";
import axios from "axios";

const Avis = () => {
    const [avis, setAvis] = useState<{ id: string, note: number, commentaire: string }[]>([]);
    const [open, setOpen] = useState(false);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    // const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        axios.get(`${API_BASE}/api/messages`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                setAvis(res.data);
            })
            .catch((err) => console.error("Erreur de récupération des avis :", err));
    }, []);

    const handleAddAvis = (newAvis: { note: number; commentaire: string }) => {
        if (!userId || !userRole) return;


        const defaultProfileId = "193e4e90-1213-4753-820a-02bc324df8fb";

        axios.post(`${API_BASE}/api/messages`, {
            client: { id: userId },
            profile: { id: defaultProfileId },
            evaluation: newAvis.note,
            message: newAvis.commentaire,
            answer: null
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                setAvis([res.data, ...avis]);
            })
            .catch((err) => console.error("Erreur lors de l'ajout d'un avis :", err));
    };



    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 40 }}>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Laisser un avis
            </Button>
            <AvisModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddAvis} />
            <Typography variant="h4" sx={{ my: 2 }}>Avis des clients</Typography>
            {avis.length === 0 && <Typography>Aucun avis pour le moment.</Typography>}
            {avis.map((a) => (
                <Paper key={a.id} sx={{ p: 2, my: 1 }}>
                    <Rating value={a.note} readOnly />
                    <Typography>{a.commentaire}</Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default Avis;
