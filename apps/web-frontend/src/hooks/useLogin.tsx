import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCreationRequest } from "../services/api/requests/UserCreationRequest";
import { useLoading } from "../contexts/LoadingContext";
import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const { setUser } = useAuth();

    const loginUser = (userData: UserCreationRequest) => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/users/tokens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    setLoginError("Invalid username or password");
                    setIsLoading(false);
                    throw new Error("Invalid username or password");
                }
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                localStorage.setItem("draftbashJwtToken", data.jwtToken);
                setUser(data.user);
                navigate("/");
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return {
        loginUser,
        username,
        email,
        password,
        setPassword,
        setUsername,
        setEmail,
        loginError,
    };
}
