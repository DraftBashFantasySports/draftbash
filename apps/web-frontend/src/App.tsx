import { Routes, Route } from "react-router-dom";
import { SignInPage } from "views/authentication/sign-in/SignInPage";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "contexts/GlobalProvider";
import { ProtectedRoute } from "@components/protected-route/ProtectedRoute";
import { MessagesPage } from "views/dashboard/messages/MessagesPage";
import { MockDraftsPage } from "views/dashboard/mock-drafts/MockDraftsPage";
import { DraftPage } from "views/draft/DraftPage";

// Entry point for the application
export const App = () => {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<MessagesPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/mock-drafts" element={<MockDraftsPage />} />
                        <Route path="/draft/:sport/:id" element={<DraftPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    );
}
