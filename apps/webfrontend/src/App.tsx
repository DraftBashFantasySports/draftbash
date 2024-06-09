import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoadingScreen } from "./pages/web/LoadingScreen";
import { WebRoutes } from "./routes/WebRoutes";
import { MobileRoutes } from "./routes/MobileRoutes";

export function App() {
    return (
        <AuthProvider>
            <LoadingProvider>
                <LoadingScreen />
                <Router>{window.innerWidth > 800 ? <WebRoutes /> : <MobileRoutes />}</Router>
            </LoadingProvider>
        </AuthProvider>
    );
}
