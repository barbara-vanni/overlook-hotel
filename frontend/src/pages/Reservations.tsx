import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Alert,
    Snackbar
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    background: '#f8f6f3',
    minHeight: '100vh',
    width: '100%'
}));

const HeroSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    padding: theme.spacing(8, 2),
    maxWidth: '900px',
    margin: '0 auto 80px auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}));

const MainTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#2c2c2c',
    fontSize: '2.5rem',
    letterSpacing: '8px',
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        letterSpacing: '4px'
    }
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 300,
    color: '#a67c52',
    fontSize: '1.2rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
    }
}));

const Ornament = styled(Box)(({ theme }) => ({
    width: '2px',
    height: '80px',
    background: 'linear-gradient(to bottom, transparent, #a67c52, transparent)',
    margin: theme.spacing(4, 'auto'),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '35px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '12px',
        height: '12px',
        background: '#a67c52',
        borderRadius: '50%'
    }
}));

const ReservationForm = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0ede8',
    padding: theme.spacing(12, 10),
    margin: theme.spacing(4, 'auto'),
    maxWidth: '1200px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(6, 2),
        maxWidth: '98vw'
    }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '2.5rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(4),
    lineHeight: 1.2,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '2rem'
    }
}));

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 0,
        backgroundColor: '#ffffff',
        fontFamily: '"Inter", sans-serif',
        '& fieldset': {
            borderColor: '#d4c4a8',
            borderWidth: '1px'
        },
        '&:hover fieldset': {
            borderColor: '#a67c52'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#a67c52',
            borderWidth: '2px'
        }
    },
    '& .MuiInputLabel-root': {
        fontFamily: '"Inter", sans-serif',
        color: '#2c2c2c',
        '&.Mui-focused': {
            color: '#a67c52'
        }
    }
}));

const StyledSelect = styled(Select)(() => ({
    borderRadius: 0,
    backgroundColor: '#ffffff',
    fontFamily: '"Inter", sans-serif',
    minHeight: '80px', // Make the box taller
    height: '80px',    // Make the box taller
    '& .MuiSelect-select': {
        minHeight: '80px', // Make the inner area taller
        display: 'flex',
        alignItems: 'center'
    },
    '& fieldset': {
        borderColor: '#d4c4a8',
        borderWidth: '1px'
    },
    '&:hover fieldset': {
        borderColor: '#a67c52'
    },
    '&.Mui-focused fieldset': {
        borderColor: '#a67c52',
        borderWidth: '2px'
    }
}));

const ReserveButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#a67c52',
    color: '#ffffff',
    padding: theme.spacing(2, 4),
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '2px',   
    textTransform: 'uppercase',
    fontWeight: 400,
    borderRadius: 0,
    border: '2px solid #a67c52',
    minWidth: '200px',
    marginTop: theme.spacing(4),
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#a67c52',
        borderColor: '#a67c52'
    }
}));

const ReservationSummary = styled(Box)(({ theme }) => ({
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    border: '1px solid #d4c4a8',
    textAlign: 'left'
}));

const SummaryTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#2c2c2c',
    fontSize: '1.5rem',
    letterSpacing: '1px',
    marginBottom: theme.spacing(2),
    textAlign: 'center'
}));

const SummaryText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: theme.spacing(1),
    textAlign: 'center'
}));

const FormDescription = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
}));

const Reservations = () => {
    const [availableRooms, setAvailableRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomId: '', 
        guests: 1,
        specialRequests: ''
    });

    // Fetch rooms based on guest count
    useEffect(() => {
        const fetchAvailableRooms = () => {
            setLoading(true);
            setError(null);
            
            const url = formData.guests > 1 
                ? `http://localhost:8080/overlook_hotel/api/rooms/available?minCapacity=${formData.guests}`
                : 'http://localhost:8080/overlook_hotel/api/rooms/available';
                
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur du serveur: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setAvailableRooms(data);
                    setLoading(false);
                    // Reset room selection if current selection is no longer available
                    if (formData.roomId && !data.find((room: any) => room.id === formData.roomId)) {
                        setFormData(prev => ({ ...prev, roomId: '' }));
                    }
                })
                .catch(error => {
                    console.error('Error fetching rooms:', error);
                    setError('Impossible de charger les chambres disponibles');
                    setLoading(false);
                });
        };

        fetchAvailableRooms();
    }, [formData.guests]);

    const checkRoomAvailability = async (roomId: string): Promise<boolean> => {
        try {
            const response = await fetch(`http://localhost:8080/overlook_hotel/api/rooms/${roomId}/availability`);
            if (response.ok) {
                const data = await response.json();
                return data.available;
            }
        } catch (error) {
            console.error('Error checking room availability:', error);
        }
        return false;
    };

    const handleReservation = async () => {
        if (!formData.roomId) {
            showAlert('Veuillez sélectionner une chambre', 'warning');
            return;
        }

        // Check if required fields are filled
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.checkIn || !formData.checkOut) {
            showAlert('Veuillez remplir tous les champs obligatoires', 'warning');
            return;
        }

        // Check room availability before attempting reservation
        const isAvailable = await checkRoomAvailability(formData.roomId);
        if (!isAvailable) {
            showAlert('Cette chambre n\'est plus disponible. Elle a été réservée par un autre client.', 'error');
            // Refresh the available rooms list
            const fetchAvailableRooms = async () => {
                setLoading(true);
                const url = formData.guests > 1 
                    ? `http://localhost:8080/overlook_hotel/api/rooms/available?minCapacity=${formData.guests}`
                    : 'http://localhost:8080/overlook_hotel/api/rooms/available';
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setAvailableRooms(data);
                    setFormData(prev => ({ ...prev, roomId: '' }));
                } catch (error) {
                    console.error('Error refreshing rooms:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAvailableRooms();
            return;
        }

        // Create reservation directly with the backend structure
        try {
            // Get client ID from localStorage (from authentication)
            const userId = localStorage.getItem("userId");
            if (!userId) {
                showAlert('Vous devez être connecté pour réserver', 'error');
                return;
            }

            // Minimal reservation data - just the essentials
            const reservationData = {
                client: { id: userId },
                room: { id: formData.roomId },
                enterDate: formData.checkIn,
                endDate: formData.checkOut,
                cancel: false,
                stat: "oui"
            };

            const response = await fetch(`http://localhost:8080/overlook_hotel/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                const createdReservation = await response.json();
                showAlert('Réservation confirmée avec succès!', 'success');
                
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    checkIn: '',
                    checkOut: '',
                    roomId: '', 
                    guests: 1,
                    specialRequests: ''
                });
                
                // Refresh available rooms
                const url = formData.guests > 1 
                    ? `http://localhost:8080/overlook_hotel/api/rooms/available?minCapacity=${formData.guests}`
                    : 'http://localhost:8080/overlook_hotel/api/rooms/available';
                fetch(url).then(res => res.json()).then(setAvailableRooms);
            } else {
                const errorData = await response.json();
                showAlert(errorData.message || 'Erreur lors de la réservation', 'error');
            }
        } catch (error) {
            console.error('Error making reservation:', error);
            showAlert('Erreur de connexion lors de la réservation', 'error');
        }
    };

    const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleInputChange = (field: string) => (event: any) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    return (
        <StyledContainer>
            <Container maxWidth="lg">
                <HeroSection>
                    <Ornament />
                    <MainTitle>
                        Réservations
                    </MainTitle>
                    <SubTitle>
                        Réservez votre séjour d'exception
                    </SubTitle>
                </HeroSection>
            </Container>

            <Container maxWidth="lg">
                <ReservationForm>
                    <SectionTitle>
                        Informations de Réservation
                    </SectionTitle>
                    <FormDescription>
                        Complétez ce formulaire pour réserver votre séjour au Aladdin's Hotel. 
                        Sélectionnez d'abord le nombre d'invités pour voir automatiquement les chambres disponibles qui peuvent vous accueillir.
                    </FormDescription>
                    
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, marginTop: 4 }}>
                        {/* Left Column - Guest Selection and Room Search */}
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ 
                                backgroundColor: '#ffffff', 
                                padding: 4, 
                                border: '1px solid #d4c4a8',
                                marginBottom: 4
                            }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: '"Playfair Display", serif',
                                        color: '#a67c52',
                                        marginBottom: 3,
                                        textAlign: 'center',
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    Recherche de Chambre
                                </Typography>
                                
                                <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                    <InputLabel sx={{ fontFamily: '"Inter", sans-serif', color: '#2c2c2c' }}>
                                        Nombre d'invités
                                    </InputLabel>
                                    <StyledSelect
                                        value={formData.guests}
                                        onChange={handleInputChange('guests')}
                                        label="Nombre d'invités"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <MenuItem key={num} value={num} sx={{ fontFamily: '"Inter", sans-serif' }}>
                                                {num} {num === 1 ? 'personne' : 'personnes'}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </FormControl>

                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontFamily: '"Inter", sans-serif',
                                        color: '#666',
                                        marginBottom: 2,
                                        textAlign: 'center',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {availableRooms.length > 0 
                                        ? `${availableRooms.length} chambre${availableRooms.length > 1 ? 's' : ''} disponible${availableRooms.length > 1 ? 's' : ''} pour ${formData.guests} invité${formData.guests > 1 ? 's' : ''} ou plus`
                                        : `Aucune chambre disponible pour ${formData.guests} invité${formData.guests > 1 ? 's' : ''}`
                                    }
                                </Typography>
                                
                                <FormControl fullWidth>
                                    <InputLabel
                                        sx={{
                                            fontFamily: '"Inter", sans-serif',
                                            color: '#2c2c2c',
                                        }}
                                    >
                                        Chambre sélectionnée
                                    </InputLabel>
                                    <StyledSelect
                                        value={formData.roomId}
                                        onChange={handleInputChange('roomId')}
                                        label="Chambre sélectionnée"
                                        disabled={loading || availableRooms.length === 0}
                                    >
                                        {loading ? (
                                            <MenuItem value="" sx={{ fontFamily: '"Inter", sans-serif' }}>
                                                Recherche en cours...
                                            </MenuItem>
                                        ) : availableRooms.length === 0 ? (
                                            <MenuItem value="" sx={{ fontFamily: '"Inter", sans-serif' }}>
                                                Aucune chambre disponible
                                            </MenuItem>
                                        ) : (
                                            availableRooms.map((room) => (
                                                <MenuItem key={room.id} value={room.id} sx={{ fontFamily: '"Inter", sans-serif' }}>
                                                    {room.type} - Capacité: {room.capacity} personne{room.capacity > 1 ? 's' : ''}
                                                    {room.status === 'available' && ' ✓ Disponible'}
                                                </MenuItem>
                                            ))
                                        )}
                                    </StyledSelect>
                                    {error && (
                                        <Typography 
                                            variant="caption" 
                                            color="error" 
                                            sx={{ mt: 1, fontFamily: '"Inter", sans-serif' }}
                                        >
                                            {error}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Right Column - Personal Information */}
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ 
                                backgroundColor: '#ffffff', 
                                padding: 4, 
                                border: '1px solid #d4c4a8',
                                marginBottom: 4
                            }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: '"Playfair Display", serif',
                                        color: '#a67c52',
                                        marginBottom: 3,
                                        textAlign: 'center',
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    Informations Personnelles
                                </Typography>
                                
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Prénom"
                                            value={formData.firstName}
                                            onChange={handleInputChange('firstName')}
                                            variant="outlined"
                                        />
                                        <StyledTextField
                                            fullWidth
                                            label="Nom"
                                            value={formData.lastName}
                                            onChange={handleInputChange('lastName')}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <StyledTextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange('email')}
                                        variant="outlined"
                                    />
                                    <StyledTextField
                                        fullWidth
                                        label="Téléphone"
                                        value={formData.phone}
                                        onChange={handleInputChange('phone')}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Full Width - Dates and Special Requests */}
                    <Box sx={{ 
                        backgroundColor: '#ffffff', 
                        padding: 4, 
                        border: '1px solid #d4c4a8',
                        marginBottom: 4
                    }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontFamily: '"Playfair Display", serif',
                                color: '#a67c52',
                                marginBottom: 3,
                                textAlign: 'center',
                                fontSize: '1.5rem'
                            }}
                        >
                            Dates de Séjour
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                <StyledTextField
                                    fullWidth
                                    label="Date d'arrivée"
                                    type="date"
                                    value={formData.checkIn}
                                    onChange={handleInputChange('checkIn')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: new Date().toISOString().split('T')[0]
                                    }}
                                />
                                <StyledTextField
                                    fullWidth
                                    label="Date de départ"
                                    type="date"
                                    value={formData.checkOut}
                                    onChange={handleInputChange('checkOut')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: formData.checkIn || new Date().toISOString().split('T')[0]
                                    }}
                                />
                            </Box>
                            <StyledTextField
                                fullWidth
                                label="Demandes spéciales (optionnel)"
                                multiline
                                rows={3}
                                value={formData.specialRequests}
                                onChange={handleInputChange('specialRequests')}
                                variant="outlined"
                                placeholder="Veuillez nous faire part de vos demandes spéciales..."
                            />
                        </Box>
                    </Box>

                    {formData.roomId && formData.checkIn && formData.checkOut && (() => {
                        const selectedRoom = availableRooms.find(room => room.id === formData.roomId);
                        return selectedRoom ? (
                            <ReservationSummary>
                                <SummaryTitle>Résumé de votre réservation</SummaryTitle>
                                <SummaryText><strong>Chambre:</strong> {selectedRoom.type}</SummaryText>
                                <SummaryText><strong>Capacité:</strong> {selectedRoom.capacity} personne{selectedRoom.capacity > 1 ? 's' : ''}</SummaryText>
                                <SummaryText><strong>Dates:</strong> {formData.checkIn} - {formData.checkOut}</SummaryText>
                                <SummaryText><strong>Invités:</strong> {formData.guests} {formData.guests === 1 ? 'personne' : 'personnes'}</SummaryText>
                                {formData.specialRequests && (
                                    <SummaryText><strong>Demandes spéciales:</strong> {formData.specialRequests}</SummaryText>
                                )}
                            </ReservationSummary>
                        ) : null;
                    })()}

                    <Box sx={{ textAlign: 'center' }}>
                        <ReserveButton onClick={handleReservation}>
                            Confirmer la Réservation
                        </ReserveButton>
                    </Box>
                </ReservationForm>
            </Container>

            {/* Alert Snackbar */}
            <Snackbar 
                open={alertOpen} 
                autoHideDuration={6000} 
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleAlertClose} 
                    severity={alertSeverity} 
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
}

export default Reservations;