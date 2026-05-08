import {Navigate} from "react-router-dom"

type ProtectedRouteType = {
    children: React.ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteType) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (!userInfo) {
        return <Navigate to="/login" />
    }

    return children;
}