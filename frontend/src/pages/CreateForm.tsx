import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    MenuItem
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FormulaireCreation: React.FC = () => {
    const { type } = useParams(); // "client" ou "profile"
    const navigate = useNavigate();

    const [step, setStep] = useState<"credentials" | "form">("credentials");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
        address: "",
        contract: "",
        start_contract: "",
        end_contract: "",
    });

    const contractOptions = ["CDI", "CDD", "Stage", "Alternance", "Intérim"];

    const checkIfEmailExists = async () => {
        try {
            await axios.post(
                `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
                { email, password: "fakePassword" },
                {
                    headers: {
                        apikey: SUPABASE_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("Cet email est déjà utilisé.");
        } catch (err: any) {
            if (err.response?.status === 400) {
                setStep("form");
            } else {
                alert("Erreur lors de la vérification de l'email.");
                console.error(err);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            // 1. Création du compte Supabase
            const signupRes = await axios.post(
                `${SUPABASE_URL}/auth/v1/signup`,
                { email, password },
                {
                    headers: {
                        apikey: SUPABASE_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            const id = signupRes.data.user?.id;
            const accessToken = signupRes.data.access_token;

            const commonHeaders = {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            };

            if (type === "client") {
                await axios.post(
                    `${SUPABASE_URL}/rest/v1/client`,
                    {
                        id,
                        email,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        age: formData.age,
                        phone: formData.phone,
                        address: formData.address
                    },
                    { headers: commonHeaders }
                );
            } else {
                await axios.post(
                    `${SUPABASE_URL}/rest/v1/profil`,
                    {
                        id,
                        email,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        age: formData.age,
                        phone: formData.phone,
                        address: formData.address,
                        role: "employee",
                        contract: formData.contract,
                        start_contract: formData.start_contract,
                        end_contract: formData.end_contract || null
                    },
                    { headers: commonHeaders }
                );
            }

            alert(`${type === "client" ? "Client" : "Employé"} créé avec succès !`);
            navigate("/admin");

        } catch (error) {
            console.error("Erreur lors de la création :", error);
            alert("Une erreur est survenue lors de la création.");
        }
    };

    const isFormValid = () => {
        const baseValid = formData.firstName && formData.lastName && formData.age && formData.phone;
        if (type === "profile") {
            return (
                baseValid &&
                formData.contract &&
                formData.start_contract &&
                formData.address
            );
        }
        return baseValid;
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 20 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Création d’un {type === "client" ? "client" : "employé"}
                </Typography>

                {step === "credentials" ? (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Mot de passe"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!email || !password}
                            onClick={checkIfEmailExists}
                        >
                            Vérifier l’email
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Prénom"
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Nom"
                            fullWidth
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Âge"
                            fullWidth
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Téléphone"
                            fullWidth
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Adresse"
                            fullWidth
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            sx={{ mb: 2 }}
                        />

                        {type === "profile" && (
                            <>
                                <TextField
                                    label="Type de contrat"
                                    select
                                    fullWidth
                                    value={formData.contract}
                                    onChange={(e) =>
                                        setFormData({ ...formData, contract: e.target.value })
                                    }
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
                                    onChange={(e) =>
                                        setFormData({ ...formData, start_contract: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    label="Fin du contrat (optionnel)"
                                    type="date"
                                    fullWidth
                                    value={formData.end_contract}
                                    onChange={(e) =>
                                        setFormData({ ...formData, end_contract: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </>
                        )}

                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!isFormValid()}
                            onClick={handleSubmit}
                        >
                            Créer {type === "client" ? "le client" : "l’employé"}
                        </Button>
                    </Box>
                )}
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" onClick={() => navigate("/admin")}>
                    Retour
                </Button>
            </Box>
        </Container>
    );
};

export default FormulaireCreation;
