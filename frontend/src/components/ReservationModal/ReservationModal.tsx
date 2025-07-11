import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Divider,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from '../../context/CartContext';

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
    padding: theme.spacing(4),
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    border: '1px solid #d4c4a8',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3),
        maxWidth: '95%'
    }
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '1.8rem',
    letterSpacing: '1px',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
}));

const PriceText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    color: '#a67c52',
    fontSize: '1.2rem',
    textAlign: 'center',
    marginTop: theme.spacing(2)
}));

const ReserveButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#a67c52',
    color: '#ffffff',
    padding: theme.spacing(1.5, 4),
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 400,
    borderRadius: 4,
    border: '2px solid #a67c52',
    width: '100%',
    marginTop: theme.spacing(3),
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#a67c52',
        borderColor: '#a67c52'
    }
}));

interface Room {
    id: string;
    type: string;
    capacity: number;
    status: string;
}

interface ReservationModalProps {
    open: boolean;
    onClose: () => void;
    room: Room | null;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ open, onClose, room }) => {
    const { addToCart } = useCart();
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState('');

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("accessToken");

    // Base price per night (you can adjust this or get it from backend)
    const pricePerNight = 150;

    const calculateNights = () => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const diffTime = checkOut.getTime() - checkIn.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        }
        return 0;
    };

    const calculateTotalPrice = () => {
        const nights = calculateNights();
        return nights * pricePerNight;
    };

    const handleAddToCart = () => {
        // Validate form
        if (!checkInDate || !checkOutDate) {
            setError('Veuillez sélectionner les dates de séjour');
            return;
        }

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            setError('La date de départ doit être après la date d\'arrivée');
            return;
        }

        if (guests < 1 || guests > (room?.capacity || 1)) {
            setError(`Le nombre d'invités doit être entre 1 et ${room?.capacity || 1}`);
            return;
        }

        // Check if user is logged in
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError('Vous devez être connecté pour réserver');
            return;
        }

        if (room) {
            const cartItem = {
                room,
                checkInDate,
                checkOutDate,
                guests,
                pricePerNight,
                totalPrice: calculateTotalPrice()
            };

            addToCart(cartItem);
            setError('');
            alert('Chambre ajoutée au panier !');
            onClose();
            
            // Reset form
            setCheckInDate('');
            setCheckOutDate('');
            setGuests(1);
        }
    };

    if (!room) return null;

    // Don't show modal if user is not authenticated
    if (!isAuthenticated) return null;

    const nights = calculateNights();
    const totalPrice = calculateTotalPrice();

    return (
        <StyledModal open={open} onClose={onClose}>
            <ModalContent>
                <ModalTitle>
                    Réserver {room.type}
                </ModalTitle>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                            fullWidth
                            label="Date d'arrivée"
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: new Date().toISOString().split('T')[0] }}
                        />
                        <TextField
                            fullWidth
                            label="Date de départ"
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: checkInDate || new Date().toISOString().split('T')[0] }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label="Nombre d'invités"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        inputProps={{ min: 1, max: room.capacity }}
                        helperText={`Maximum ${room.capacity} invités`}
                    />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Détails de la réservation:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Prix par nuit: {pricePerNight}€
                    </Typography>
                    {nights > 0 && (
                        <>
                            <Typography variant="body2">
                                Nombre de nuits: {nights}
                            </Typography>
                            <PriceText>
                                Total: {totalPrice}€
                            </PriceText>
                        </>
                    )}
                </Box>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{ flex: 1 }}
                    >
                        Annuler
                    </Button>
                    <ReserveButton
                        onClick={handleAddToCart}
                        sx={{ flex: 2 }}
                    >
                        Ajouter au panier
                    </ReserveButton>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};

export default ReservationModal;
