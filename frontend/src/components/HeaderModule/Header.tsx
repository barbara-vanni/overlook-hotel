import "./Header.css";
import {AppBar} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("accessToken");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    const userId = localStorage.getItem("userId");

    return (
        <header className="header">
            <AppBar sx={{ flexDirection: "row", padding: "0 50px", alignItems: "center", gap: 4 }} className="app-bar">
                <h1>Overlook Hotel</h1>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/reservations">Booking</a></li>
                        <li><a href="/rooms">Rooms</a></li>
                        <li><a href="/avis">Avis</a></li>
                        {!isAuthenticated && (
                            <li><a href="/login">Login</a></li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <a href={`/profile/${userId}`}>Profil</a>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Afficher uniquement le bouton Déconnexion */}
                {isAuthenticated && (
                    <Button variant="outlined" color="inherit" onClick={handleLogout}>
                        Déconnexion
                    </Button>
                )}
            </AppBar>
        </header>
    );
};

export default Header;