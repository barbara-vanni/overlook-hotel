import { useState, useEffect } from "react";
import {Box, Typography, Rating, Button, Paper, Grid, Divider} from "@mui/material";
import AvisModal from "../components/Review/ReviewModal";
import axios from "axios";

const Avis = () => {
    type AvisType = {
        id: string;
        client: {
            firstName: string;
            lastName: string;
        };
        profile: {
            firstName: string;
            lastName: string;
        };
        evaluation: number;
        message: string;
        answer: string | null;
    };

    const [avis, setAvis] = useState<AvisType[]>([]);

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
        <Box sx={{ width: "100%", maxWidth:1500 , mx: "auto", mt: 20 }}>
            <AvisModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddAvis} />

           <Box sx={{ display: "flex", justifyContent: "space-between",alignItems: "center", gap: 2, mb: 2 }}>
               <Typography variant="h4" sx={{ my: 2 }}>Avis des clients</Typography>

                <Button variant="outlined" onClick={() => setOpen(true)}>
                    Laisser un avis
                </Button>

            </Box>
            <Divider sx={{mb:4}}/>

            {avis.length === 0 && <Typography>Aucun avis pour le moment.</Typography>}
            <Grid container spacing={7}>
                {avis.map((msg) => (
                    <Grid item xs={12} sm={6} md={4} key={msg.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                mb: 2,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                {msg.client.firstName} {msg.client.lastName}
                            </Typography>
                            <Rating value={msg.evaluation} readOnly size="small" sx={{ mt: 1 }} />
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {msg.message}
                            </Typography>
                            {msg.answer && (
                                <Box sx={{ mt: 2, p: 1.5, bgcolor: "#f1f1f1", borderLeft: "4px solid #1976d2" }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Réponse : {msg.answer}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Avis;
