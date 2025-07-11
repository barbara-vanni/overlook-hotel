import React, { useState, useEffect } from 'react';
// import RoomCard from "../components/RoomCard/RoomCard.tsx";
import JasminSuitePicture from "../assets/image/JasminSuitePicture.jpg";
import { Grid, Container, Typography, Box, Button, Modal, Fade, Backdrop } from "@mui/material";
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
    position: 'relative',
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
});

// Modal Styles
const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
    padding: theme.spacing(6),
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative',
    border: '1px solid #d4c4a8',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4),
        maxWidth: '90%'
    }
}));

const ModalCloseButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    minWidth: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: '#a67c52',
    fontSize: '1.5rem',
    '&:hover': {
        backgroundColor: '#f0ede8',
        color: '#8b6342'
    }
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '2rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem'
    }
}));

const ModalDescription = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: theme.spacing(3),
    textAlign: 'center'
}));

const ModalFeaturesList = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4)
}));

const ModalFeature = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    position: 'relative',
    '&::before': {
        content: '"•"',
        position: 'absolute',
        left: 0,
        color: '#a67c52',
        fontWeight: 'bold'
    }
}));

const ModalOrnament = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '2px',
    background: '#a67c52',
    margin: theme.spacing(3, 'auto'),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8px',
        height: '8px',
        background: '#a67c52',
        borderRadius: '50%'
    }
}));

const Rooms = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/overlook_hotel/api/rooms')
            .then(response => response.json())
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            });
    }, []);

    const handleOpenModal = (room) => {
        setSelectedRoom(room);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedRoom(null);
    };

    if (loading) {
        return (
            <StyledContainer>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                        <Typography>Chargement des chambres...</Typography>
                    </Box>
                </Container>
            </StyledContainer>
        );
    }

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
                    <FullWidthContainer key={room.id || index}>
                        <RoomSection>
                            <Grid container spacing={0} sx={{ width: '100%', margin: 0, justifyContent: 'center' }}>
                                {index % 2 === 0 ? (
                                    <>
                                        <Grid item xs={12} md={5}>
                                            <RoomContent>
                                                <RoomTitle>
                                                    {room.type || room.title}
                                                </RoomTitle>
                                                <RoomDescription>
                                                    Capacité: {room.capacity}<br />
                                                    Statut: {room.status}
                                                </RoomDescription>
                                                <DiscoverButton onClick={() => handleOpenModal(room)}>
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
                                                    src={JasminSuitePicture}
                                                    alt={room.type || room.title}
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
                                                    src={JasminSuitePicture}
                                                    alt={room.type || room.title}
                                                />
                                                <NavigationArrow className="right">
                                                    ›
                                                </NavigationArrow>
                                            </RoomImageContainer>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <RoomContent>
                                                <RoomTitle>
                                                    {room.type || room.title}
                                                </RoomTitle>
                                                <RoomDescription>
                                                    Capacité: {room.capacity}<br />
                                                    Statut: {room.status}
                                                </RoomDescription>
                                                <DiscoverButton onClick={() => handleOpenModal(room)}>
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

            {/* Modal */}
            <StyledModal
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                }}
            >
                <Fade in={modalOpen}>
                    <ModalContent>
                        <ModalCloseButton onClick={handleCloseModal}>
                            ×
                        </ModalCloseButton>
                        
                        {selectedRoom && (
                            <>
                                <ModalTitle>
                                    {selectedRoom.type || selectedRoom.title}
                                </ModalTitle>
                                
                                <ModalDescription>
                                    Capacité: {selectedRoom.capacity}<br />
                                    Statut: {selectedRoom.status}
                                </ModalDescription>
                                
                                <ModalOrnament />
                                
                                {/* You can add more details here if your backend returns them */}
                                
                                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                                    <ReserveButton>
                                        Réservez cette chambre
                                    </ReserveButton>
                                </Box>
                            </>
                        )}
                    </ModalContent>
                </Fade>
            </StyledModal>
        </StyledContainer>
    );
}

export default Rooms;