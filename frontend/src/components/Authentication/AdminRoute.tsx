import { Navigate } from "react-router-dom";

function AdminRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");

    if (!token) return <Navigate to="/login" />;
    if (role !== "admin") return <Navigate to="/reservations" />;

    return children;
}

export default AdminRoute;
