import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem("authToken");
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;