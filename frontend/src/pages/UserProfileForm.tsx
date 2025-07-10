import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    MenuItem,
    Paper
} from "@mui/material";
import axios from "axios";

interface Props {
    userId: string;
    type: "client" | "profile";
}

const contractOptions = ["CDI", "CDD", "Stage", "Alternance", "Intérim"];

const UserProfileForm: React.FC<Props> = ({ userId, type }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
        contract: "",
        start_contract: "",
        end_contract: "",
        role: ""
    });

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (type === "client") {
                    const res = await axios.get(
                        `${SUPABASE_URL}/rest/v1/client?id=eq.${userId}`,
                        {
                            headers: {
                                apikey: SUPABASE_KEY,
                                Authorization: `Bearer ${accessToken}`
                            }
                        }
                    );
                    data = res.data[0];
                } else {
                    const res = await axios.get(`${API_BASE}/api/profiles/${userId}`);
                    data = res.data;
                }

                if (data) {
                    setFormData({
                        first_name: data.first_name || data.firstName || "",
                        last_name: data.last_name || data.lastName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        age: data.age?.toString() || "",
                        address: data.address || "",
                        contract: data.contract || "",
                        start_contract: data.start_contract || "",
                        end_contract: data.end_contract || "",
                        role: data.role || ""
                    });
                }
            } catch (err) {
                console.error("Erreur lors du chargement :", err);
            }
        };

        fetchData();
    }, [userId, type]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                // firstName: formData.first_name,
                // lastName: formData.last_name,
                phone: formData.phone,
                age: Number(formData.age),
                address: formData.address,
                ...(type === "profile" && {
                    contract: formData.contract,
                    start_contract: formData.start_contract,
                    end_contract: formData.end_contract || null
                    // startContract: formData.start_contract || null,
                    // endContract: formData.end_contract || null
                })
            };

            if (type === "client" || type === "profile") {
                await axios.patch(
                    `${SUPABASE_URL}/rest/v1/${type === "client" ? "client" : "profil"}?id=eq.${userId}`,
                    payload,
                    {
                        headers: {
                            apikey: SUPABASE_KEY,
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                            Prefer: "return=representation"
                        }
                    }
                );
            }

            alert("Mise à jour réussie !");
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
            alert("Échec de la mise à jour.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Modifier mes informations
            </Typography>

            <TextField
                label="Email"
                fullWidth
                value={formData.email}
                disabled
                sx={{ mb: 2 }}
            />

            <TextField
                label="Prénom"
                fullWidth
                value={formData.first_name}
                onChange={handleChange("first_name")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Nom"
                fullWidth
                value={formData.last_name}
                onChange={handleChange("last_name")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Âge"
                fullWidth
                value={formData.age}
                onChange={handleChange("age")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Téléphone"
                fullWidth
                value={formData.phone}
                onChange={handleChange("phone")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Adresse"
                fullWidth
                value={formData.address}
                onChange={handleChange("address")}
                sx={{ mb: 2 }}
            />

            {type === "profile" && (
                <>
                    <TextField
                        label="Contrat"
                        select
                        fullWidth
                        value={formData.contract}
                        onChange={handleChange("contract")}
                        sx={{ mb: 2 }}
                    >
                        {contractOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Début du contrat"
                        type="date"
                        fullWidth
                        value={formData.start_contract}
                        onChange={handleChange("start_contract")}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Fin du contrat (optionnel)"
                        type="date"
                        fullWidth
                        value={formData.end_contract}
                        onChange={handleChange("end_contract")}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                </>
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Mise à jour..." : "Mettre à jour"}
            </Button>
        </Paper>
    );
};

export default UserProfileForm;