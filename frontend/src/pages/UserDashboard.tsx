import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Box,
    Tabs,
    Tab
} from "@mui/material";
import axios from "axios";
import UserProfileForm from "./UserProfileForm";
import AbsenceList from "./AbsenceList.tsx";

interface UserData {
    firstName: string;
    lastName: string;
    role: string;
}

const UserDashboard: React.FC = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [tabIndex, setTabIndex] = useState(0);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (type === "profile") {
            axios.get(`${API_BASE}/api/profiles/${id}`)
                .then((res) => {
                    const { firstName, lastName, role } = res.data;
                    setUser({ firstName, lastName, role });
                })
                .catch(() => setUser(null));
        } else if (type === "client") {
            axios.get(`${SUPABASE_URL}/rest/v1/client?id=eq.${id}`, {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => {
                    const client = res.data[0];
                    if (client) {
                        setUser({
                            firstName: client.first_name,
                            lastName: client.last_name,
                            role: "client",
                        });
                    } else {
                        setUser(null);
                    }
                })
                .catch(() => setUser(null));
        }
    }, [id, type]);

    const handleBack = () => {
        const role = localStorage.getItem("userRole");
        navigate(role === "admin" ? "/admin" : "/employee");
    };

    if (!user) {
        return (
            <Container sx={{ mt: 16, position: 'relative' }}>
                <Typography variant="h6">Utilisateur introuvable.</Typography>
                <Box sx={{ position: 'absolute', top: 16, right: 0 }}>
                    <Button onClick={handleBack} variant="outlined">
                        Retour
                    </Button>
                </Box>
            </Container>
        );
    }

    // Détermination du type d'onglets selon le rôle
    const isClient = user.role === "client";
    const isProfile = user.role === "employee" || user.role === "admin";

    return (
        <Container sx={{ mt: 16, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 0 }}>
                <Button onClick={handleBack} variant="contained" color="primary">
                    Retour
                </Button>
            </Box>

            <Typography variant="h4" gutterBottom>
                Dashboard Formulaire
            </Typography>
            <Typography variant="h6">
                {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Rôle : {user.role}
            </Typography>

            {/* Onglets pour tous */}
            {(isClient || isProfile) && (
                <>
                    <Tabs
                        value={tabIndex}
                        onChange={(_, newValue) => setTabIndex(newValue)}
                        sx={{ mt: 4, mb: 2 }}
                    >
                        <Tab label="Formulaires" />
                        <Tab label={isClient ? "Mes réservations" : "Mes congés"} />
                    </Tabs>

                    {/* Formulaire universel */}
                    {tabIndex === 0 && (
                        <UserProfileForm userId={id!} type={type as "client" | "profile"} />
                    )}

                    {/* Réservations ou congés */}
                    {tabIndex === 1 && isClient && (
                        <Typography>Contenu des réservations (à définir)</Typography>
                    )}
                    {tabIndex === 1 && isProfile && (
                        <AbsenceList profileId={id!} />
                    )}
                </>
            )}
        </Container>
    );
};

export default UserDashboard;