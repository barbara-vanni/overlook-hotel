import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItemText,
    ListItemButton,
    Container,
    Button,
    Tabs,
    Tab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const Employee: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Profile[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            axios.get(`${API_BASE}/api/profiles/${userId}`, {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((res) => {
                const data = res.data;
                const fullName = `${data.first_name || data.firstName} ${data.last_name || data.lastName}`;
                setUserName(fullName);
            });
        }

        axios.get(`${API_BASE}/api/profiles`)
            .then((res) => {
                const nonAdmins = res.data
                    .filter((p: any) => p.role !== "admin")
                    .map((p: any) => ({
                        id: p.id,
                        firstName: p.firstName,
                        lastName: p.lastName,
                        email: p.email,
                        role: p.role,
                    }));
                setEmployees(nonAdmins);
            });

        axios.get(`${SUPABASE_URL}/rest/v1/client`, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((res) => {
            const normalizedClients: Client[] = res.data.map((client: any) => ({
                id: client.id,
                firstName: client.first_name,
                lastName: client.last_name,
                email: client.email,
            }));
            setClients(normalizedClients);
        });
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleClick = (id: string, type: "profile" | "client") => {
        navigate(`/${type}/${id}`);
    };

    const renderList = () => {
        if (tabIndex === 0) {
            return employees.map((emp) => (
                <ListItemButton key={emp.id} onClick={() => handleClick(emp.id, "profile")}>
                    <ListItemText
                        primary={`${emp.firstName} ${emp.lastName}`}
                        secondary={`${emp.email} (${emp.role})`}
                    />
                </ListItemButton>
            ));
        } else {
            return clients.map((client) => (
                <ListItemButton key={client.id} onClick={() => handleClick(client.id, "client")}>
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
            {/* En-tête sticky */}
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
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Bienvenue <strong>{userName}</strong>
                    </Typography>
                )}

                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Employés" />
                    <Tab label="Clients" />
                </Tabs>

                {tabIndex === 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/create/client")}
                        >
                            Créer un client
                        </Button>
                    </Box>
                )}

                <Typography variant="h5" sx={{ mt: 2 }}>
                    {tabIndex === 0 ? "Liste des employés" : "Liste des clients"}
                </Typography>
            </Box>

            {/* Liste scrollable */}
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <List>{renderList()}</List>
            </Box>
        </Container>
    );
};

export default Employee;