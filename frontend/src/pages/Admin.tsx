import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    contract : string;
    phone : string;
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

    const handleReserveForClient = (client: Client, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row click
        navigate(`/reservations?clientId=${client.id}&clientName=${encodeURIComponent(client.firstName + ' ' + client.lastName)}`);
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

    // const renderList = () => {
    //     if (tabIndex === 0) {
    //         return admins.map((profile) => (
    //             <ListItemButton key={profile.id} onClick={() => handleClickUser(profile.id, "profile")}>
    //                 <ListItemText
    //                     primary={`${profile.firstName} ${profile.lastName}`}
    //                     secondary={`${profile.email} (${profile.role})`}
    //                 />
    //             </ListItemButton>
    //         ));
    //     } else if (tabIndex === 1) {
    //         return employees.map((profile) => (
    //             <ListItemButton key={profile.id} onClick={() => handleClickUser(profile.id, "profile")}>
    //                 <ListItemText
    //                     primary={`${profile.firstName} ${profile.lastName}`}
    //                     secondary={`${profile.email} (${profile.role})`}
    //                 />
    //             </ListItemButton>
    //         ));
    //     } else {
    //         return sortedClients.map((client) => (
    //             <ListItemButton key={client.id} onClick={() => handleClickUser(client.id, "client")}>
    //                 <ListItemText
    //                     primary={`${client.firstName} ${client.lastName}`}
    //                     secondary={client.email}
    //                 />
    //             </ListItemButton>
    //         ));
    //     }
    // };

    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 22,
                // height: 'calc(100vh - 128px)',
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
                    alignItems : 'center'
                }}
            >
                {userName && (
                    <Typography variant="h5" color="text.secondary" sx={{}}>
                        Bienvenue <strong>{userName}</strong>
                    </Typography>
                )}

                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Administrateurs" />
                    <Tab label="Employés" />
                    <Tab label="Clients" />
                </Tabs>
            </Box>
            <Box>

                <Divider sx={{m:3}}>
                </Divider>

                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        {tabIndex === 0 && "Liste des administrateurs"}
                        {tabIndex === 1 && "Liste des employés"}
                        {tabIndex === 2 && "Liste des clients"}
                    </Typography>
                    {tabIndex !== 0 && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                                navigate(`/create/${tabIndex === 1 ? 'profile' : 'client'}`)
                            }
                        >
                            Créer un {tabIndex === 1 ? "employé" : "client"}
                        </Button>
                    )}
                </Box>
            </Box>

            <Box>
                <TableContainer component={Paper} sx={{ boxShadow: 3, maxHeight : 530 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: "#9c9696"}}>
                                <TableCell>Nom</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Téléphone</TableCell>
                                {tabIndex !== 2 && <TableCell>Contrat</TableCell>}
                                {tabIndex === 2 && <TableCell>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(tabIndex === 0 ? admins : tabIndex === 1 ? employees : sortedClients).map((item, idx) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{
                                        backgroundColor: idx % 2 === 0 ? "#fff" : "#f0ede8",
                                        cursor: tabIndex === 0 && userRole === "admin" && item.id !== userId ? "not-allowed" : "pointer"
                                    }}
                                    onClick={() => {
                                        if (tabIndex === 0 && userRole === "admin" && item.id !== userId) return;
                                        if (tabIndex === 2) {
                                            // If it's the clients tab, navigate to reservations for this client
                                            const client = item as Client;
                                            navigate(`/reservations?clientId=${client.id}&clientName=${encodeURIComponent(client.firstName + ' ' + client.lastName)}`);
                                        } else {
                                            // For other tabs, navigate to profile
                                            handleClickUser(item.id, "profile");
                                        }
                                    }}

                                >
                                    <TableCell>{item.firstName} {item.lastName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{(item as Profile).phone}</TableCell>
                                    {tabIndex !== 2 && <TableCell>{(item as Profile).contract}</TableCell>}
                                    {tabIndex === 2 && (
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                onClick={(e) => handleReserveForClient(item as Client, e)}
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    padding: '4px 8px',
                                                    minWidth: 'auto'
                                                }}
                                            >
                                                Réserver
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Admin;