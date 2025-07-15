import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Button,
    Alert,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    border: '1px solid #d4c4a8',
    borderRadius: '8px',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }
}));

const ReservationTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1)
}));

const ReservationDetail = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '0.9rem',
    marginBottom: theme.spacing(0.5)
}));

interface Reservation {
    id: string;
    room: {
        id: string;
        type: string;
        capacity: number;
    };
    enterDate: string;
    endDate: string;
    cancel: boolean;
    stat: string;
}

interface ClientReservationsProps {
    clientId: string;
}

const ClientReservations: React.FC<ClientReservationsProps> = ({ clientId }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:8080/overlook_hotel/api/reservations/client/${clientId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservations(data);
                } else {
                    setError('Erreur lors du chargement des réservations');
                }
            } catch (err) {
                console.error('Error fetching reservations:', err);
                setError('Impossible de charger les réservations');
            } finally {
                setLoading(false);
            }
        };

        if (clientId) {
            fetchReservations();
        }
    }, [clientId]);

    const getStatusChip = (reservation: Reservation) => {
        if (reservation.cancel) {
            return <Chip label="Annulée" color="error" size="small" />;
        }
        
        const today = new Date();
        const enterDate = new Date(reservation.enterDate);
        const endDate = new Date(reservation.endDate);

        if (today < enterDate) {
            return <Chip label="À venir" color="info" size="small" />;
        } else if (today >= enterDate && today <= endDate) {
            return <Chip label="En cours" color="success" size="small" />;
        } else {
            return <Chip label="Terminée" color="default" size="small" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateNights = (enterDate: string, endDate: string) => {
        const enter = new Date(enterDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - enter.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    if (reservations.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Aucune réservation trouvée
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: '"Inter", sans-serif' }}>
                    Vous n'avez pas encore effectué de réservation.
                </Typography>
                <Button 
                    variant="contained" 
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#a67c52', 
                        '&:hover': { backgroundColor: '#8b6342' } 
                    }}
                    href="/reservations"
                >
                    Faire une réservation
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Typography 
                variant="h5" 
                sx={{ 
                    fontFamily: '"Playfair Display", serif', 
                    color: '#a67c52', 
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                Mes Réservations
            </Typography>
            
            {reservations.map((reservation) => (
                <StyledCard key={reservation.id}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <ReservationTitle>
                                {reservation.room.type}
                            </ReservationTitle>
                            {getStatusChip(reservation)}
                        </Box>
                        
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ReservationDetail>
                                    <strong>Dates:</strong> {formatDate(reservation.enterDate)} - {formatDate(reservation.endDate)}
                                </ReservationDetail>
                                <ReservationDetail>
                                    <strong>Durée:</strong> {calculateNights(reservation.enterDate, reservation.endDate)} nuit{calculateNights(reservation.enterDate, reservation.endDate) > 1 ? 's' : ''}
                                </ReservationDetail>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ReservationDetail>
                                    <strong>Capacité de la chambre:</strong> {reservation.room.capacity} personne{reservation.room.capacity > 1 ? 's' : ''}
                                </ReservationDetail>
                                <ReservationDetail>
                                    <strong>Statut:</strong> {reservation.stat}
                                </ReservationDetail>
                            </Grid>
                        </Grid>
                    </CardContent>
                </StyledCard>
            ))}
        </Box>
    );
};

export default ClientReservations;
