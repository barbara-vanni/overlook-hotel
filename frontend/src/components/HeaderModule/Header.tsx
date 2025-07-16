import "./Header.css";
import {AppBar, Box, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import {useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("accessToken");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    const handleListClick = () => {
        navigate(`/${role}`); // redirige vers la page de gestion des listes (admin et employé suelement)
    };


    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    return (
        <header className="header">
            <AppBar sx={{ flexDirection: "row", padding: "0 50px", alignItems: "center", gap: 4 }} className="app-bar">
                <h1>Overlook Hotel</h1>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/reservations">Réservation</a></li>
                        <li><a href="/rooms">Chambre</a></li>
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

                {isAuthenticated && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {(role === "admin" || role === "employee") && (
                            <IconButton color="inherit" onClick={handleListClick}>
                                <ListIcon />
                            </IconButton>
                        )}
                        <Button variant="outlined" color="inherit" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </Box>
                )}
            </AppBar>
        </header>
    );
};

export default Header;