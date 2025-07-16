import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    Snackbar,
    Card,
    CardContent,
    CircularProgress,
    Divider
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
    const location = useLocation();
    const [availableRooms, setAvailableRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [clientInfo, setClientInfo] = useState<any>(null);
    const [clientLoading, setClientLoading] = useState(false);


    const urlParams = new URLSearchParams(location.search);
    const adminClientId = urlParams.get('clientId');
    const adminClientName = urlParams.get('clientName');
    const isAdminReservation = !!adminClientId;

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


    useEffect(() => {
        if (isAdminReservation && adminClientId) {
            setClientLoading(true);
            fetch(`http://localhost:8080/overlook_hotel/api/clients/${adminClientId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur du serveur: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setClientInfo(data);
                    setClientLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching client info:', error);
                    setClientLoading(false);
                });
        }
    }, [isAdminReservation, adminClientId]);

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

        const personalFieldsRequired = !isAdminReservation;
        const personalFieldsValid = !personalFieldsRequired || (formData.firstName && formData.lastName && formData.email);
        
        if (!personalFieldsValid || !formData.checkIn || !formData.checkOut) {
            showAlert('Veuillez remplir tous les champs obligatoires', 'warning');
            return;
        }

        const isAvailable = await checkRoomAvailability(formData.roomId);
        if (!isAvailable) {
            showAlert('Cette chambre n\'est plus disponible. Elle a été réservée par un autre client.', 'error');

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


        try {
            let clientIdToUse = adminClientId;
            
            if (!clientIdToUse) {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    showAlert('Vous devez être connecté pour réserver', 'error');
                    return;
                }
                clientIdToUse = userId;
            }


            const reservationData = {
                client: { id: clientIdToUse },
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
                await response.json();
                const successMessage = isAdminReservation 
                    ? `Réservation confirmée avec succès pour ${decodeURIComponent(adminClientName || '')}!`
                    : 'Réservation confirmée avec succès!';
                showAlert(successMessage, 'success');
                
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
                    {isAdminReservation && (
                        <Card 
                            sx={{ 
                                mb: 4,
                                border: '2px solid #a67c52',
                                borderRadius: 2,
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: '"Playfair Display", serif',
                                        color: '#a67c52',
                                        mb: 3,
                                        textAlign: 'center',
                                        fontSize: '1.8rem'
                                    }}
                                >
                                    Informations du Client
                                </Typography>
                                
                                {clientLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                                        <CircularProgress sx={{ color: '#a67c52' }} />
                                        <Typography sx={{ ml: 2, fontFamily: '"Inter", sans-serif' }}>
                                            Chargement des informations client...
                                        </Typography>
                                    </Box>
                                ) : clientInfo ? (
                                    <Box>
                                        <Alert 
                                            severity="info" 
                                            sx={{ 
                                                mb: 3,
                                                backgroundColor: '#e3f2fd',
                                                color: '#1565c0',
                                                fontFamily: '"Inter", sans-serif'
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                Vous réservez pour le client suivant:
                                            </Typography>
                                        </Alert>
                                        
                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                            <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #d4c4a8' }}>
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontFamily: '"Playfair Display", serif',
                                                        color: '#a67c52',
                                                        fontWeight: 'bold',
                                                        mb: 1
                                                    }}
                                                >
                                                    Nom complet
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        fontFamily: '"Inter", sans-serif',
                                                        color: '#2c2c2c',
                                                        fontWeight: 'medium'
                                                    }}
                                                >
                                                    {clientInfo.firstName} {clientInfo.lastName}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #d4c4a8' }}>
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontFamily: '"Playfair Display", serif',
                                                        color: '#a67c52',
                                                        fontWeight: 'bold',
                                                        mb: 1
                                                    }}
                                                >
                                                    Email
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        fontFamily: '"Inter", sans-serif',
                                                        color: '#2c2c2c'
                                                    }}
                                                >
                                                    {clientInfo.email}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #d4c4a8' }}>
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontFamily: '"Playfair Display", serif',
                                                        color: '#a67c52',
                                                        fontWeight: 'bold',
                                                        mb: 1
                                                    }}
                                                >
                                                    Téléphone
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        fontFamily: '"Inter", sans-serif',
                                                        color: '#2c2c2c'
                                                    }}
                                                >
                                                    {clientInfo.phone || 'Non renseigné'}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #d4c4a8' }}>
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontFamily: '"Playfair Display", serif',
                                                        color: '#a67c52',
                                                        fontWeight: 'bold',
                                                        mb: 1
                                                    }}
                                                >
                                                    Date de naissance
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        fontFamily: '"Inter", sans-serif',
                                                        color: '#2c2c2c'
                                                    }}
                                                >
                                                    {clientInfo.birth ? new Date(clientInfo.birth).toLocaleDateString('fr-FR') : 'Non renseigné'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Divider sx={{ my: 3, backgroundColor: '#d4c4a8' }} />
                                        
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: '#a67c52',
                                                    borderColor: '#a67c52',
                                                    fontFamily: '"Inter", sans-serif',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#a67c52',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => window.open(`/user-profile-form?clientId=${adminClientId}`, '_blank')}
                                            >
                                                Voir le profil complet du client
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Alert 
                                        severity="warning" 
                                        sx={{ 
                                            backgroundColor: '#fff3cd',
                                            color: '#856404',
                                            fontFamily: '"Inter", sans-serif'
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Impossible de charger les informations du client: <strong>{decodeURIComponent(adminClientName || '')}</strong>
                                        </Typography>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    )}
                    
                    <SectionTitle>
                        Informations de Réservation
                    </SectionTitle>
                    <FormDescription>
                        Complétez ce formulaire pour réserver votre séjour au Aladdin's Hotel. 
                        Sélectionnez d'abord le nombre d'invités pour voir automatiquement les chambres disponibles qui peuvent vous accueillir.
                    </FormDescription>
                    
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, marginTop: 4 }}>
                        <Box sx={{ flex: isAdminReservation ? 1 : 1 }}>
                            <Box sx={{ 
                                backgroundColor: '#ffffff', 
                                padding: 4, 
                                border: '1px solid #d4c4a8',
                                marginBottom: 4,
                                ...(isAdminReservation && { maxWidth: '800px', margin: '0 auto 16px auto' })
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

                        {!isAdminReservation && (
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
                        )}
                    </Box>

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