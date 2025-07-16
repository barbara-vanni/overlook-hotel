import "./Header.css";
import {AppBar, Badge, Box, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ListIcon from '@mui/icons-material/List';


const LuxuryKeyIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color: '#d4af37' }}
    >
        <path d="M7 14c-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V2h2v6.17c1.16.42 2 1.52 2 2.83 0 1.66-1.34 3-3 3zm13-9v2h-4v2h2v2h-2v2h2v2h-2v4h-2V7h8M7 12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
    </svg>
);




const Header = () => {
    const navigate = useNavigate();
    const { getItemCount } = useCart();
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    const handleListClick = () => {
        navigate(`/${userRole}`);
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    return (
        <header className="header">
            <AppBar sx={{ flexDirection: "row", padding: "0 50px", alignItems: "center", gap: 4 }} className="app-bar">
                <h1>Overlook Hotel</h1>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/reservations">Réservation</a></li>
                        <li><a href="/rooms">Chambres</a></li>
                        <li><a href="/avis">Avis</a></li>
                        {!isAuthenticated && (
                            <li><a href="/login">Connexion</a></li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <a href={`/profile/${userId}`}>Profil</a>
                            </li>
                        )}
                    </ul>
                </nav>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        color="inherit"
                        onClick={handleCartClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(212, 175, 55, 0.1)'
                            }
                        }}
                    >
                        <Badge
                            badgeContent={getItemCount()}
                            color="secondary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#d4af37',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <LuxuryKeyIcon />
                        </Badge>
                    </IconButton>

                    {isAuthenticated && (
                        <>
                            {(userRole === "admin" || userRole === "employee") && (
                                <IconButton color="inherit" onClick={handleListClick}>
                                    <ListIcon />
                                </IconButton>
                            )}
                            <Button variant="outlined" color="inherit" onClick={handleLogout}>
                                Déconnexion
                            </Button>
                        </>
                    )}
                </Box>
            </AppBar>
        </header>
    );
};

export default Header;