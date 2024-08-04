import { useGlobalContext } from "contexts/GlobalProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { user, isLoading } = useGlobalContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user === null) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/sign-in" replace />;
    }

    // Render the child routes if the user is authenticated
    return <Outlet />;
}
