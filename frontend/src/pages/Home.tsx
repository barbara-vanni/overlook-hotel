import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Grid 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HotelPresentationPicture from "../assets/image/hotel_pre.jpg";
import PalaisImg from "../assets/image/palais.jpg";
import SaharaOasisImg from "../assets/image/sahara_oasis.jpg";
import SaharaImg from "../assets/image/sahara.jpg";
import { ImageSlider } from "../components/Slider/Slider";
import { Link } from "../components/Link/Link";

const StyledContainer = styled(Box)(({ theme }) => ({
    background: '#f8f6f3',
    minHeight: '100vh',
    width: '100%'
}));

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const HeroImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1
});

const HeroOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2
});

const HeroContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    color: '#ffffff',
    padding: theme.spacing(4)
}));

const MainTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#ffffff',
    fontSize: '3.5rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(2),
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
    [theme.breakpoints.down('md')]: {
        fontSize: '2.5rem',
        letterSpacing: '1px'
    }
}));

const ReservationWidget = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    zIndex: 10,
    minWidth: '800px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        minWidth: '300px',
        gap: theme.spacing(2)
    }
}));

const ReservationField = styled(Box)(({ theme }) => ({
    flex: 1,
    borderRight: '1px solid #e0e0e0',
    paddingRight: theme.spacing(2),
    '&:last-child': {
        borderRight: 'none',
        paddingRight: 0
    },
    [theme.breakpoints.down('md')]: {
        borderRight: 'none',
        paddingRight: 0,
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            borderBottom: 'none'
        }
    }
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
    display: 'block',
    color: '#666666',
    fontSize: '14px',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    marginBottom: theme.spacing(1),
    letterSpacing: '0.5px'
}));

const FieldValue = styled(Typography)(({ theme }) => ({
    color: '#a67c52',
    fontSize: '18px',
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    letterSpacing: '1px'
}));

const ReserveButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#a67c52',
    color: '#ffffff',
    padding: theme.spacing(2, 4),
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: '4px',
    border: 'none',
    minWidth: '180px',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#8b5a3c',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(166, 124, 82, 0.3)'
    }
}));

const ContentSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '2.5rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '2rem'
    }
}));

const Description = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
}));

const ServiceSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0ede8',
    padding: theme.spacing(10, 6),
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(6, 3)
    }
}));

const ServiceCard = styled(Box)(({ theme }) => ({
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    textAlign: 'center',
    border: '1px solid #d4c4a8',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '60px',
    backgroundColor: '#a67c52',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    fontSize: '24px',
    color: '#ffffff'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '1.5rem',
    letterSpacing: '1px',
    marginBottom: theme.spacing(2)
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    color: '#2c2c2c',
    fontSize: '0.95rem',
    lineHeight: '1.6'
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'inline-block',
    marginTop: theme.spacing(4),
    color: '#a67c52',
    textDecoration: 'none',
    fontFamily: '"Inter", sans-serif',
    fontSize: '1rem',
    letterSpacing: '1px',
    borderBottom: '2px solid #a67c52',
    paddingBottom: theme.spacing(0.5),
    '&:hover': {
        color: '#8b5a3c',
        borderBottomColor: '#8b5a3c'
    }
}));

const Home = () => {
    const services = [
        {
            icon: '🏨',
            title: 'Hébergement Royal',
            description: 'Chambres et suites luxueuses avec vue sur le désert et les jardins, décorées dans le style oriental authentique.'
        },
        {
            icon: '🍽️',
            title: 'Gastronomie Raffinée',
            description: 'Restaurants gastronomiques proposant une cuisine orientale revisitée et des spécialités internationales.'
        },
        {
            icon: '🧘',
            title: 'Spa & Bien-être',
            description: 'Spa inspiré des traditions orientales avec soins authentiques, hammam et piscines privées.'
        },
        {
            icon: '🎭',
            title: 'Expériences Uniques',
            description: 'Excursions dans le désert, spectacles de danse orientale et ateliers artisanaux traditionnels.'
        }
    ];

    return (
        <StyledContainer>
            <HeroSection>
                <HeroImage 
                    src={HotelPresentationPicture} 
                    alt="Hotel Presentation" 
                />
                <HeroOverlay />
                <HeroContent>
                    <MainTitle>
                        Welcome to Aladdin's Hotel
                    </MainTitle>
                </HeroContent>
                
                <ReservationWidget>
                    <ReservationField>
                        <FieldLabel>
                            Date d'arrivée
                        </FieldLabel>
                        <FieldValue>
                            {new Date().toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                            })}
                        </FieldValue>
                    </ReservationField>
                    
                    <ReservationField>
                        <FieldLabel>
                            Date de départ
                        </FieldLabel>
                        <FieldValue>
                            {(() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                return tomorrow.toLocaleDateString('fr-FR', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                });
                            })()}
                        </FieldValue>
                    </ReservationField>
                    
                    <ReservationField>
                        <FieldLabel>
                            Chambres & Pers.
                        </FieldLabel>
                        <FieldValue>
                            1 Chambre / 2 Pers.
                        </FieldValue>
                    </ReservationField>
                    
                    <ReserveButton onClick={() => window.location.href = '/reservations'}>
                        RÉSERVEZ<br />MAINTENANT
                    </ReserveButton>
                </ReservationWidget>
            </HeroSection>

            <ContentSection>
                <Container maxWidth="lg">
                    <Ornament />
                    <SectionTitle>
                        L'Excellence Orientale
                    </SectionTitle>
                    <Description>
                        Niché entre les dunes dorées et les palmiers ondoyants du légendaire royaume d'Alabasta, 
                        Aladdin's Hotel vous accueille dans un écrin de raffinement et de magie orientale. 
                        Inspiré des contes des Mille et Une Nuits, cet hôtel 5 étoiles offre une expérience unique 
                        mêlant confort royal, hospitalité chaleureuse et décor féérique.
                    </Description>
                    
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <ImageSlider
                                images={[PalaisImg, SaharaOasisImg, SaharaImg]}
                                autoPlay={true}
                                autoPlayInterval={3000}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <StyledLink 
                                    href="/reservations" 
                                    ariaLabel="Réserver une chambre"
                                >
                                    Réserver une chambre
                                </StyledLink>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ContentSection>

            <ServiceSection>
                <Container maxWidth="lg">
                    <Ornament />
                    <SectionTitle>
                        Services & Expériences
                    </SectionTitle>
                    <Description>
                        Plongez dans un univers où le luxe du désert rencontre l'hospitalité orientale. 
                        Chaque expérience est conçue pour éveiller vos sens et vous transporter dans 
                        les fastueux palais des mille et une nuits.
                    </Description>
                    
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <ServiceCard>
                                    <ServiceIcon>
                                        {service.icon}
                                    </ServiceIcon>
                                    <ServiceTitle>
                                        {service.title}
                                    </ServiceTitle>
                                    <ServiceDescription>
                                        {service.description}
                                    </ServiceDescription>
                                </ServiceCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ServiceSection>
        </StyledContainer>
    );
};

export default Home;