import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user === null) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the child routes if the user is authenticated
    return <Outlet />;
}
