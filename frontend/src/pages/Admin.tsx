// import React from "react";
// import { Box, Typography, Paper } from "@mui/material";
//
// const Admin: React.FC = () => {
//     return (
//         <Box sx={{ padding: 4 }}>
//             <Paper elevation={3} sx={{ padding: 4 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Admin Dashboard
//                 </Typography>
//                 <Typography variant="body1">
//                     Welcome, admin! You now have access to administrative features of the Overlook Hotel platform.
//                 </Typography>
//
//                  Tu pourras ajouter ici des composants admin comme :
//                  - Liste des utilisateurs/profils
//                  - Tableau des réservations
//                  - Gestion des absences/messages
//             </Paper>
//         </Box>
//     );
// };
//
// export default Admin;

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
    useEffect(() => {
        axios.get(`${API_BASE}/api/profiles`).then((res) => {
            console.log("Profiles response:", res.data);
            setProfiles(res.data);
        });

        axios.get(`${API_BASE}/api/clients`).then((res) => {
            console.log("Clients response:", res.data);
            setClients(res.data._embedded?.clientList || []);
        });
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
