import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/mobile/login-page/LoginPage";
import { SignupPage } from "../pages/mobile/signup-page/SignupPage";

export function MobileRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    );
}
