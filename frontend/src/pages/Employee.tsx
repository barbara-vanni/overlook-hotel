import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Employee: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Dashboard
                </Typography>
                <Typography variant="body1">
                    Welcome, employee! You now have access to employee administrative features of the Overlook Hotel platform.
                </Typography>

                Tu pourras ajouter ici des composants employee comme :
                - Liste des utilisateurs/profils
                - Tableau des réservations
                - Gestion des absences/messages
            </Paper>
        </Box>
    );
};

export default Employee;