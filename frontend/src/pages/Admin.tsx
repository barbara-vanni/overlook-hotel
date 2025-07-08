import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItemText, Tab, Tabs, ListItemButton, Container } from "@mui/material";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [tabIndex, setTabIndex] = useState(0); // 0 = Admin, 1 = Employés, 2 = Clients

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        axios.get(`${API_BASE}/api/profiles`)
            .then((res) => setProfiles(res.data))
            .catch((err) => console.error("Erreur profils :", err));

        axios.get(`${SUPABASE_URL}/rest/v1/client`, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
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

    const handleClickUser = (id: string, type: "profile" | "client") => {
        navigate(`/${type}/${id}`);
    };

    const admins = profiles.filter(p => p.role === "admin");
    const employees = profiles.filter(p => p.role !== "admin");

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const renderList = () => {
        if (tabIndex === 0) {
            return admins.map((profile) => (
                <ListItemButton key={profile.id} onClick={() => handleClickUser(profile.id, "profile")}>
                    <ListItemText
                        primary={`${profile.firstName} ${profile.lastName}`}
                        secondary={`${profile.email} (${profile.role})`}
                    />
                </ListItemButton>
            ));
        } else if (tabIndex === 1) {
            return employees.map((profile) => (
                <ListItemButton key={profile.id} onClick={() => handleClickUser(profile.id, "profile")}>
                    <ListItemText
                        primary={`${profile.firstName} ${profile.lastName}`}
                        secondary={`${profile.email} (${profile.role})`}
                    />
                </ListItemButton>
            ));
        } else {
            return clients.map((client) => (
                <ListItemButton key={client.id} onClick={() => handleClickUser(client.id, "client")}>
                    <ListItemText
                        primary={`${client.firstName} ${client.lastName}`}
                        secondary={client.email}
                    />
                </ListItemButton>
            ));
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 16 }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Administrateurs" />
                <Tab label="Employés" />
                <Tab label="Clients" />
            </Tabs>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {tabIndex === 0 && "Liste des administrateurs"}
                    {tabIndex === 1 && "Liste des employés"}
                    {tabIndex === 2 && "Liste des clients"}
                </Typography>
                <List>
                    {renderList()}
                </List>
            </Box>
        </Container>
    );
};

export default Admin;