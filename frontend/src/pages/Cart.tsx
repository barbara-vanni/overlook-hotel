import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    IconButton,
    Container,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    background: 'linear-gradient(135deg, #f8f6f3 0%, #ede8e0 100%)',
    minHeight: '100vh',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4c4a8" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3
    }
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#2c2c2c',
    fontSize: '3rem',
    letterSpacing: '8px',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
        fontSize: '2.2rem',
        letterSpacing: '4px'
    }
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 300,
    color: '#a67c52',
    fontSize: '1.2rem',
    letterSpacing: '3px',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(6),
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
    }
}));

const Ornament = styled(Box)(({ theme }) => ({
    width: '2px',
    height: '80px',
    background: 'linear-gradient(to bottom, transparent, #a67c52, transparent)',
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    position: 'relative',
    zIndex: 1,
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

const ReservationCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    borderRadius: '0',
    boxShadow: '0 8px 32px rgba(166, 124, 82, 0.15)',
    border: '1px solid #d4c4a8',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        background: 'linear-gradient(to bottom, #a67c52, #8b6342)',
    }
}));

const ReservationHeader = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0ede8',
    padding: theme.spacing(3, 4),
    borderBottom: '1px solid #d4c4a8',
}));

const SuiteName = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '1.8rem',
    letterSpacing: '1px',
    marginBottom: theme.spacing(1),
}));

const SuiteDetails = styled(Typography)(() => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.6',
}));

const ReservationDetails = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(3),
}));

const DetailItem = styled(Box)(() => ({
    textAlign: 'center',
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    color: '#a67c52',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: theme.spacing(1),
}));

const DetailValue = styled(Typography)(() => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 300,
    color: '#2c2c2c',
    fontSize: '1.1rem',
}));

const PriceSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#f9f7f4',
    padding: theme.spacing(3, 4),
    borderTop: '1px solid #d4c4a8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const PriceBreakdown = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

const PriceText = styled(Typography)(() => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#666',
    fontSize: '0.9rem',
}));

const TotalPrice = styled(Typography)(() => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '1.5rem',
}));

const RemoveButton = styled(IconButton)(() => ({
    backgroundColor: '#ffffff',
    color: '#d32f2f',
    border: '1px solid #f5f5f5',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#ffebee',
        borderColor: '#d32f2f'
    }
}));

const SummarySection = styled(Paper)(({ theme }) => ({
    backgroundColor: '#ffffff',
    padding: theme.spacing(6),
    borderRadius: '0',
    boxShadow: '0 12px 48px rgba(166, 124, 82, 0.2)',
    border: '1px solid #d4c4a8',
    textAlign: 'center',
    marginTop: theme.spacing(6),
    position: 'relative',
    zIndex: 1,
}));

const SummaryTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '2rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(3),
    textTransform: 'uppercase',
}));

const GrandTotal = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 600,
    color: '#2c2c2c',
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
}));

const ReservationSummary = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#666',
    fontSize: '1rem',
    marginBottom: theme.spacing(4),
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#a67c52',
    color: '#ffffff',
    padding: theme.spacing(2, 6),
    fontFamily: '"Inter", sans-serif',
    fontSize: '1rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: 0,
    border: '2px solid #a67c52',
    minWidth: '280px',
    margin: theme.spacing(0, 1, 2, 1),
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#a67c52',
        borderColor: '#a67c52'
    }
}));

const ClearButton = styled(Button)(({ theme }) => ({
    color: '#d32f2f',
    backgroundColor: 'transparent',
    border: '1px solid #d32f2f',
    padding: theme.spacing(1.5, 4),
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 400,
    borderRadius: 0,
    '&:hover': {
        backgroundColor: '#ffebee',
        borderColor: '#d32f2f'
    }
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(12),
    position: 'relative',
    zIndex: 1,
}));

const EmptyStateIcon = styled(Typography)(({ theme }) => ({
    fontSize: '4rem',
    marginBottom: theme.spacing(3),
    opacity: 0.5,
}));

const EmptyStateTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontWeight: 400,
    color: '#a67c52',
    fontSize: '2rem',
    letterSpacing: '2px',
    marginBottom: theme.spacing(2),
}));

const EmptyStateText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    color: '#666',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: theme.spacing(4),
    maxWidth: '400px',
    margin: '0 auto',
}));

const ExploreButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#a67c52',
    color: '#ffffff',
    padding: theme.spacing(2, 4),
    fontFamily: '"Inter", sans-serif',
    fontSize: '1rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: 0,
    border: '2px solid #a67c52',
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#a67c52',
        borderColor: '#a67c52'
    }
}));

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert('Vous devez être connecté pour finaliser votre réservation');
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            alert('Votre panier est vide');
            return;
        }

        alert(`Réservation confirmée ! Total: ${getTotalPrice()}€`);
        clearCart();
        navigate('/reservations');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateNights = (checkIn: string, checkOut: string) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = checkOutDate.getTime() - checkInDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    if (cartItems.length === 0) {
        return (
            <StyledContainer>
                <Container maxWidth="md">
                    <Ornament />
                    <PageTitle>Réservations</PageTitle>
                    <PageSubtitle>Votre séjour de rêve vous attend</PageSubtitle>
                    
                    <EmptyStateContainer>
                        <EmptyStateIcon>🏨</EmptyStateIcon>
                        <EmptyStateTitle>Aucune réservation</EmptyStateTitle>
                        <EmptyStateText>
                            Votre panier de réservations est actuellement vide. 
                            Découvrez nos suites exceptionnelles et créez votre séjour parfait 
                            au cœur du luxe et de l'élégance.
                        </EmptyStateText>
                        <ExploreButton onClick={() => navigate('/rooms')}>
                            Découvrir nos suites
                        </ExploreButton>
                    </EmptyStateContainer>
                </Container>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Container maxWidth="lg">
                <Ornament />
                <PageTitle>Réservations</PageTitle>
                <PageSubtitle>Récapitulatif de votre séjour</PageSubtitle>
                
                {cartItems.map((item: any, index: number) => {
                    const nights = calculateNights(item.checkInDate, item.checkOutDate);
                    
                    return (
                        <ReservationCard key={index}>
                            <ReservationHeader>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <SuiteName>{item.room.type}</SuiteName>
                                        <SuiteDetails>
                                            Capacité maximale: {item.room.capacity} invités • Statut: {item.room.status}
                                        </SuiteDetails>
                                    </Box>
                                    <RemoveButton onClick={() => removeFromCart(item.room.id)}>
                                        ×
                                    </RemoveButton>
                                </Box>
                            </ReservationHeader>

                            <ReservationDetails>
                                <DetailItem>
                                    <DetailLabel>Arrivée</DetailLabel>
                                    <DetailValue>{formatDate(item.checkInDate)}</DetailValue>
                                </DetailItem>
                                <DetailItem>
                                    <DetailLabel>Départ</DetailLabel>
                                    <DetailValue>{formatDate(item.checkOutDate)}</DetailValue>
                                </DetailItem>
                                <DetailItem>
                                    <DetailLabel>Durée</DetailLabel>
                                    <DetailValue>{nights} nuit{nights > 1 ? 's' : ''}</DetailValue>
                                </DetailItem>
                                <DetailItem>
                                    <DetailLabel>Invités</DetailLabel>
                                    <DetailValue>{item.guests} personne{item.guests > 1 ? 's' : ''}</DetailValue>
                                </DetailItem>
                            </ReservationDetails>

                            <PriceSection>
                                <PriceBreakdown>
                                    <PriceText>{item.pricePerNight}€ par nuit</PriceText>
                                    <PriceText>{nights} nuit{nights > 1 ? 's' : ''}</PriceText>
                                </PriceBreakdown>
                                <TotalPrice>{item.totalPrice}€</TotalPrice>
                            </PriceSection>
                        </ReservationCard>
                    );
                })}

                <SummarySection>
                    <SummaryTitle>Total de votre séjour</SummaryTitle>
                    <GrandTotal>{getTotalPrice()}€</GrandTotal>
                    <ReservationSummary>
                        {cartItems.length} réservation{cartItems.length > 1 ? 's' : ''} • 
                        Tous nos tarifs incluent le service et les taxes
                    </ReservationSummary>
                    
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <ConfirmButton onClick={handleCheckout}>
                            Confirmer la réservation
                        </ConfirmButton>
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                        <ClearButton onClick={clearCart}>
                            Vider le panier
                        </ClearButton>
                    </Box>
                </SummarySection>
            </Container>
        </StyledContainer>
    );
};

export default Cart;
