import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface Client {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
}

const Admin: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        // Appel des profils depuis ton backend Java
        axios.get(`${API_BASE}/api/profiles`)
            .then((res) => {
                console.log("Profiles response:", res.data);
                setProfiles(res.data);
            })
            .catch((err) => console.error("Erreur profils :", err));

        // Chargement des clients depuis Supabase
        axios
            .get(`${SUPABASE_URL}/rest/v1/client`, {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log("Clients response:", res.data);
                const normalizedClients: Client[] = res.data.map((client: any) => ({
                    id: client.id,
                    firstName: client.first_name,
                    lastName: client.last_name,
                    email: client.email,
                }));
                setClients(normalizedClients);
            })
            .catch((err) => console.error("Erreur clients :", err));
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Annuaire des employés
            </Typography>
            <List>
                {profiles.map((profile) => (
                    <ListItem key={profile.id}>
                        <ListItemText
                            primary={`${profile.firstName} ${profile.lastName}`}
                            secondary={`${profile.email} (${profile.role})`}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ margin: "2rem 0" }} />

            <Typography variant="h4" gutterBottom>
                Annuaire des clients
            </Typography>
            <List>
                {clients.map((client) => (
                    <ListItem key={client.id}>
                        <ListItemText
                            primary={`${client.firstName} ${client.lastName}`}
                            secondary={client.email}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Admin;