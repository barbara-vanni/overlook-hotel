import RoomCard from "../components/RoomCard/RoomCard.tsx";
import JasminSuitePicture from "../assets/image/JasminSuitePicture.jpg";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
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

const RoomSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(12),
    borderRadius: '0',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(8),
    }
}));

const RoomImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    height: '600px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        height: '400px',
    }
}));

const RoomImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
}));

const RoomContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 6),
    backgroundColor: '#f0ede8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4, 3),
    }
}));

const RoomTitle = styled(Typography)(({ theme }) => ({
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

const RoomDescription = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    maxWidth: '400px'
}));

const DiscoverButton = styled(Button)(({ theme }) => ({
    color: '#a67c52',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 400,
    marginBottom: theme.spacing(3),
    '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline'
    },
    '&::after': {
        content: '" →"',
        marginLeft: theme.spacing(1)
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
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#a67c52',
        borderColor: '#a67c52'
    }
}));

const NavigationArrow = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#a67c52',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    zIndex: 10,
    '&:hover': {
        backgroundColor: '#ffffff',
        color: '#8b6342'
    },
    '&.left': {
        left: theme.spacing(3)
    },
    '&.right': {
        right: theme.spacing(3)
    }
}));

const FullWidthContainer = styled(Box)({
    width: '100vw',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    // marginLeft: 'calc(-50vw + 50%)',
    // position: 'relative'
});

const Rooms = () => {
    const rooms = [
        {
            title: "Chambres Classiques",
            image: JasminSuitePicture,
            description: "Dans un décor oriental à la fois sobre, élégant et contemporain, les chambres Classiques incarnent le raffinement, le service et le confort emblématiques du Aladdin's Hotel.",
            details: "Discover the perfect balance of traditional Moroccan elegance and modern comfort in our Classic Rooms."
        },
        {
            title: "Suites Garden View",
            image: JasminSuitePicture,
            description: "Offrant une vue panoramique sur les jardins luxuriants, ces suites spacieuses combinent l'art de vivre marocain avec un design contemporain raffiné.",
            details: "Experience luxury redefined with panoramic garden views and exceptional amenities."
        },
        {
            title: "Presidential Loft",
            image: JasminSuitePicture,
            description: "Le summum du luxe avec une terrasse privée, un salon spacieux et une décoration somptueuse inspirée des palais royaux marocains.",
            details: "The ultimate in luxury accommodation with private terrace and royal Moroccan palace-inspired décor."
        },
        {
            title: "Desert Pavilion",
            image: JasminSuitePicture,
            description: "Pavillon privé au cœur des jardins, offrant une intimité absolue avec piscine privée et service de majordome personnalisé.",
            details: "Private pavilion sanctuary with exclusive pool and personalized butler service."
        }
    ];
    
    return (
        <StyledContainer>
            <Container maxWidth="lg">
                <HeroSection>
                    <Ornament />
                    <MainTitle>
                        Chambres
                    </MainTitle>
                    <SubTitle>
                        Vivez l'élégance au Aladdin's Hotel
                    </SubTitle>
                </HeroSection>
            </Container>

            <Box sx={{ width: '100%' }}>
                {rooms.map((room, index) => (
                    <FullWidthContainer key={index}>
                        <RoomSection>
                            <Grid container spacing={0} sx={{ width: '100%', margin: 0,  justifyContent: 'center' }}>
                                {/* Alternate layout */}
                                {index % 2 === 0 ? (
                                    <>
                                        <Grid item xs={12} md={5}>
                                            <RoomContent>
                                                <RoomTitle>
                                                    {room.title}
                                                </RoomTitle>
                                                <RoomDescription>
                                                    {room.description}
                                                </RoomDescription>
                                                <DiscoverButton>
                                                    Découvrez
                                                </DiscoverButton>
                                                <ReserveButton>
                                                    Réservez Maintenant
                                                </ReserveButton>
                                            </RoomContent>
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <RoomImageContainer>
                                                <NavigationArrow className="left">
                                                    ‹
                                                </NavigationArrow>
                                                <RoomImage 
                                                    src={room.image} 
                                                    alt={room.title}
                                                />
                                                <NavigationArrow className="right">
                                                    ›
                                                </NavigationArrow>
                                            </RoomImageContainer>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={7}>
                                            <RoomImageContainer>
                                                <NavigationArrow className="left">
                                                    ‹
                                                </NavigationArrow>
                                                <RoomImage 
                                                    src={room.image} 
                                                    alt={room.title}
                                                />
                                                <NavigationArrow className="right">
                                                    ›
                                                </NavigationArrow>
                                            </RoomImageContainer>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <RoomContent>
                                                <RoomTitle>
                                                    {room.title}
                                                </RoomTitle>
                                                <RoomDescription>
                                                    {room.description}
                                                </RoomDescription>
                                                <DiscoverButton>
                                                    Découvrez
                                                </DiscoverButton>
                                                <ReserveButton>
                                                    Réservez Maintenant
                                                </ReserveButton>
                                            </RoomContent>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </RoomSection>
                    </FullWidthContainer>
                ))}
            </Box>
        </StyledContainer>
    );
}

export default Rooms;