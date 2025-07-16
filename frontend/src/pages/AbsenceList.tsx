import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    Alert,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import axios from "axios";
// @ts-ignore
import DeleteIcon from "@mui/icons-material/Delete";

interface Absence {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    cancel: boolean;
}

interface Props {
    profileId: string;
}

const absenceTypes = ["conge", "formation", "maladie"];

const AbsenceList: React.FC<Props> = ({ profileId }) => {
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("conge");
    const [error, setError] = useState<string | null>(null);
    const [creationError, setCreationError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const fetchAbsences = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/absences/by-profile/${profileId}`);
            setAbsences(res.data);
        } catch (err) {
            console.error("Erreur lors du chargement des absences :", err);
        }
    };

    useEffect(() => {
        fetchAbsences();
    }, [profileId, success]);

    const handleOpen = () => {
        setStartDate("");
        setEndDate("");
        setType("conge");
        setError(null);
        setCreationError(null);
        setSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(false);

        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        if (newEnd < newStart) {
            setError("La date de fin doit être après la date de début.");
            return;
        }

        const overlap = absences.some(abs => {
            const existingStart = new Date(abs.startDate);
            const existingEnd = new Date(abs.endDate);
            return newStart <= existingEnd && newEnd >= existingStart;
        });

        if (type === "conge" && overlap) {
            setError("Un congé existe déjà sur ces dates.");
            return;
        }

        try {
            await axios.post(`${API_BASE}/api/absences`, {
                type,
                startDate,
                endDate,
                cancel: false,
                idProfil: profileId,
            });

            setSuccess(true);
            setOpen(false);
        } catch (error: any) {
            console.error("Erreur lors de la création :", error.response?.data || error.message);
            setCreationError("Échec de la création : " + (error.response?.data?.message || "Erreur inconnue"));
        }
    };

    const handleDelete = async () => {
        if (!confirmDeleteId) return;

        try {
            await axios.delete(`${API_BASE}/api/absences/${confirmDeleteId}`);
            setConfirmDeleteId(null);
            fetchAbsences();
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    const lastFiveAbsences = [...absences]
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 5);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Mes absences
            </Typography>

            <Button variant="contained" onClick={handleOpen}>
                Demander une absence
            </Button>

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Absence enregistrée avec succès.
                </Alert>
            )}

            <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
                5 dernières absences
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date de début</TableCell>
                            <TableCell>Date de fin</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lastFiveAbsences.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell>{a.startDate}</TableCell>
                                <TableCell>{a.endDate}</TableCell>
                                <TableCell>{a.type}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => setConfirmDeleteId(a.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <List>
                {absences.map((absence) => (
                    <ListItem key={absence.id}>
                        <ListItemText
                            primary={`${absence.startDate} → ${absence.endDate}`}
                            secondary={absence.type}
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouvelle demande d'absence</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Type d'absence"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                    >
                        {absenceTypes.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Date de début"
                        type="date"
                        fullWidth
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Date de fin"
                        type="date"
                        fullWidth
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

            {creationError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {creationError}
                </Alert>
            )}

            <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <Typography>Voulez-vous vraiment supprimer cette absence ?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteId(null)}>Annuler</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AbsenceList;