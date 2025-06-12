import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Header from "./components/HeaderModule/Header";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations.tsx";
import Rooms from "./pages/Rooms.tsx";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./components/Authentication/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservations" element={
                    <PrivateRoute>
                        <Reservations/>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App
