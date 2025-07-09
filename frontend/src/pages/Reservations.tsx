import React, { useState } from 'react';
import { 
    Grid, 
    Container, 
    Typography, 
    Box, 
    Button, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Card,
    CardContent
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

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const StyledSelect = styled(Select)(({ theme }) => ({
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
    const roomTypes = [
        'Chambres Classiques',
        'Suites Garden View',
        'Presidential Loft',
        'Desert Pavilion'
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomType: roomTypes[0], 
        guests: 1,
        specialRequests: ''
    });

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
                        Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.
                    </FormDescription>
                    
                    <Grid container spacing={6} sx={{ marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                fullWidth
                                label="Prénom"
                                value={formData.firstName}
                                onChange={handleInputChange('firstName')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                fullWidth
                                label="Nom"
                                value={formData.lastName}
                                onChange={handleInputChange('lastName')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                fullWidth
                                label="Téléphone"
                                value={formData.phone}
                                onChange={handleInputChange('phone')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                onFocus={(e) => e.target.showPicker()}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                    min: new Date().toISOString().split('T')[0]
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    sx={{
                                        fontFamily: '"Inter", sans-serif',
                                        color: '#2c2c2c',
                                        minWidth: '120px',
                                    }}
                                >
                                    Type de chambre
                                </InputLabel>
                                <StyledSelect
                                    value={formData.roomType}
                                    onChange={handleInputChange('roomType')}
                                    label="Type de chambre"
                                >
                                    {roomTypes.map((room) => (
                                        <MenuItem key={room} value={room} sx={{ fontFamily: '"Inter", sans-serif' }}>
                                            {room}
                                        </MenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
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
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                fullWidth
                                label="Demandes spéciales"
                                multiline
                                rows={4}
                                value={formData.specialRequests}
                                onChange={handleInputChange('specialRequests')}
                                variant="outlined"
                                placeholder="Veuillez nous faire part de vos demandes spéciales..."
                            />
                        </Grid>
                    </Grid>

                    {formData.roomType && formData.checkIn && formData.checkOut && (
                        <ReservationSummary>
                            <SummaryTitle>Résumé de votre réservation</SummaryTitle>
                            <SummaryText><strong>Chambre:</strong> {formData.roomType}</SummaryText>
                            <SummaryText><strong>Dates:</strong> {formData.checkIn} - {formData.checkOut}</SummaryText>
                            <SummaryText><strong>Invités:</strong> {formData.guests} {formData.guests === 1 ? 'personne' : 'personnes'}</SummaryText>
                            {formData.specialRequests && (
                                <SummaryText><strong>Demandes spéciales:</strong> {formData.specialRequests}</SummaryText>
                            )}
                        </ReservationSummary>
                    )}

                    <Box sx={{ textAlign: 'center' }}>
                        <ReserveButton>
                            Confirmer la Réservation
                        </ReserveButton>
                    </Box>
                </ReservationForm>
            </Container>
        </StyledContainer>
    );
}

export default Reservations;