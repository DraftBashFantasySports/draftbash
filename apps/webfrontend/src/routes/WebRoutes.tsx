import { Route, Routes } from "react-router-dom";
import { SignupPage } from "../pages/web/signup-page/SignupPage";
import { LoginPage } from "../pages/web/login-page/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { MockDraftsPage } from "../pages/web/mock-drafts-page/MockDraftsPage";
import { DirectMessagesPage } from "../pages/web/direct-messages-page/DirectMessagesPage";

export function WebRoutes() {
    return (
        <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MockDraftsPage />} />
                <Route path="/messages" element={<DirectMessagesPage />} />
                <Route path="/drafts" element={<MockDraftsPage />} />
            </Route>
        </Routes>
    );
}
