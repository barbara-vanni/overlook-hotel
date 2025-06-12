import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem("accessToken");
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;