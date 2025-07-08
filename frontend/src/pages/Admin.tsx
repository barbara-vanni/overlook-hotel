import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    List,
    ListItemText,
    Tab,
    Tabs,
    ListItemButton,
    Container,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    const [tabIndex, setTabIndex] = useState(0);
    const [userName, setUserName] = useState<string | null>(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (userId && userRole) {
            const profileUrl = userRole === "client"
                ? `${SUPABASE_URL}/rest/v1/client?id=eq.${userId}`
                : `${API_BASE}/api/profiles/${userId}`;

            axios.get(profileUrl, {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((res) => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                const fullName = `${data.first_name || data.firstName} ${data.last_name || data.lastName}`;
                setUserName(fullName);
            });
        }

        axios.get(`${API_BASE}/api/profiles`)
            .then((res) => setProfiles(res.data));

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
            });
    }, []);

    const handleClickUser = (id: string, type: "profile" | "client") => {
        navigate(`/${type}/${id}`);
    };

    const admins = profiles
        .filter(p => p.role === "admin")
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

    const employees = profiles
        .filter(p => p.role !== "admin")
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

    const sortedClients = clients
        .slice()
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

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
            return sortedClients.map((client) => (
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
        <Container
            maxWidth="md"
            sx={{
                mt: 16,
                height: 'calc(100vh - 128px)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 124,
                    backgroundColor: 'rgba(255, 248, 220, 0.95)',
                    zIndex: 2,
                    pb: 2
                }}
            >
                {userName && (
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                        Bienvenue <strong>{userName}</strong>
                    </Typography>
                )}

                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Administrateurs" />
                    <Tab label="Employés" />
                    <Tab label="Clients" />
                </Tabs>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    {tabIndex !== 0 && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                navigate(`/create/${tabIndex === 1 ? 'profile' : 'client'}`)
                            }
                        >
                            Créer un {tabIndex === 1 ? "employé" : "client"}
                        </Button>
                    )}
                </Box>

                <Typography variant="h5" sx={{ mt: 2 }}>
                    {tabIndex === 0 && "Liste des administrateurs"}
                    {tabIndex === 1 && "Liste des employés"}
                    {tabIndex === 2 && "Liste des clients"}
                </Typography>
            </Box>

            {/* Liste scrollable */}
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <List>{renderList()}</List>
            </Box>
        </Container>
    );
};

export default Admin;