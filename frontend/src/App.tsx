import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Header from "./components/HeaderModule/Header";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations.tsx";
import Rooms from "./pages/Rooms.tsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservations" element={<Reservations/>} />
                <Route path="/rooms" element={<Rooms/>} />
            </Routes>
        </Router>
    );
}

export default App
