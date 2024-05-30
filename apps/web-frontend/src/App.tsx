import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SignupPage } from "./pages/web/signup-page/SignupPage";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoadingScreen } from "./pages/web/LoadingScreen";
import { LoginPage } from "./pages/web/login-page/LoginPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { DirectMessagesPage } from "./pages/web/direct-messages-page/DirectMessagesPage";
import { MockDraftsPage } from "./pages/web/mock-drafts-page/MockDraftsPage";

export function App() {
    return (
        <AuthProvider>
            <LoadingProvider>
                <LoadingScreen />
                <Router>
                    <Routes>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<MockDraftsPage />} />
                            <Route path="/messages" element={<DirectMessagesPage />} />
                            <Route path="/drafts" element={<MockDraftsPage />} />
                        </Route>
                    </Routes>
                </Router>
            </LoadingProvider>
        </AuthProvider>
    );
}
