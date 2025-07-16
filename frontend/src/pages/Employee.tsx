import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableContainer,
    TableRow,
    Paper,
    Tab,
    Tabs,
    Container,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
}

interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const Employee: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Profile[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [tabIndex, setTabIndex] = useState(0);

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
                        phone: p.phone || "",
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

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleClickUser = (id: string, type: "profile" | "client") => {
        navigate(`/${type}/${id}`);
    };

    const handleReserveForClient = (client: Client, event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/reservations?clientId=${client.id}&clientName=${encodeURIComponent(client.firstName + ' ' + client.lastName)}`);
    };

    const sortedEmployees = employees
        .slice()
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

    const sortedClients = clients
        .slice()
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 22,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 124,
                    backgroundColor: '#f0ede8',
                    zIndex: 2,
                    pb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {userName && (
                    <Typography variant="h5" color="text.secondary">
                        Bienvenue <strong>{userName}</strong>
                    </Typography>
                )}

                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Employés" />
                    <Tab label="Clients" />
                </Tabs>
            </Box>

            <Box>
                <Divider sx={{ m: 3 }} />
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        {tabIndex === 0 ? "Liste des employés" : "Liste des clients"}
                    </Typography>
                    {tabIndex === 1 && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate("/create/client")}
                        >
                            Créer un client
                        </Button>
                    )}
                </Box>
            </Box>

            <Box>
                <TableContainer component={Paper} sx={{ boxShadow: 3, maxHeight: 530 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#9c9696" }}>
                                <TableCell>Nom</TableCell>
                                <TableCell>Email</TableCell>
                                {tabIndex === 0 && <TableCell>Téléphone</TableCell>}
                                {tabIndex === 1 && <TableCell>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(tabIndex === 0 ? sortedEmployees : sortedClients).map((item, idx) => {
                                const isOtherEmployee = tabIndex === 0 && item.id !== userId;
                                return (
                                    <TableRow
                                        key={item.id}
                                        hover
                                        sx={{
                                            backgroundColor: idx % 2 === 0 ? "#fff" : "#f0ede8",
                                            cursor: isOtherEmployee ? "not-allowed" : "pointer",
                                            opacity: isOtherEmployee ? 0.6 : 1,
                                        }}
                                        onClick={() => {
                                            if (isOtherEmployee) return;
                                            // Ne pas déclencher le clic sur la ligne si on clique sur un bouton
                                            if (tabIndex === 1) return;
                                            handleClickUser(item.id, tabIndex === 0 ? "profile" : "client");
                                        }}
                                    >
                                        <TableCell 
                                            onClick={() => {
                                                if (isOtherEmployee) return;
                                                if (tabIndex === 1) {
                                                    handleClickUser(item.id, "client");
                                                }
                                            }}
                                            sx={{ cursor: tabIndex === 1 ? 'pointer' : 'inherit' }}
                                        >
                                            {item.firstName} {item.lastName}
                                        </TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        {tabIndex === 0 && <TableCell>{(item as Profile).phone}</TableCell>}
                                        {tabIndex === 1 && (
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#a67c52',
                                                        '&:hover': {
                                                            backgroundColor: '#8b6342'
                                                        }
                                                    }}
                                                    onClick={(event) => handleReserveForClient(item as Client, event)}
                                                >
                                                    Réserver
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Employee;