import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Header from "./components/HeaderModule/Header";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations.tsx";
import Rooms from "./pages/Rooms.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./components/Authentication/PrivateRoute.tsx";
import Admin from "./pages/Admin.tsx";
import Employee from "./pages/Employee.tsx";
import Footer from "./components/FooterModule/Footer.tsx";
import { CartProvider } from "./context/CartContext";
import UserDashboard from "./pages/UserDashboard.tsx";
import FormulaireCreation from "./pages/CreateForm.tsx";
import Avis from "./pages/Avis.tsx";

function App() {
    return (
        <CartProvider>
            <Router>
                <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/rooms" element={<Rooms/>} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create/:type" element={<FormulaireCreation />} />
                    <Route path="/:type/:id" element={<UserDashboard />} />
                    <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                    <Route path="/employee" element={<PrivateRoute><Employee /></PrivateRoute>} />
                    <Route path="/avis" element={<Avis />} />
                </Routes>
            </main>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App
