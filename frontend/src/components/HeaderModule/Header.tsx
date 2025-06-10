import "./Header.css";
import {AppBar} from "@mui/material";

const Header = () => {
    return (
        <header className="header">
            <AppBar sx={{flexDirection: "row", padding:"0 50px"}} className="app-bar">
            <h1>Overlook Hotel</h1>
            <nav className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/reservations">Reservations</a></li>
                    <li><a href="/rooms">Rooms</a></li>
                    <li><a href="/guests">Guests</a></li>
                </ul>
            </nav>
            </AppBar>
        </header>
    );
};

export default Header;