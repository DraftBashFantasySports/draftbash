import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCreationRequest } from "../services/api/requests/UserCreationRequest";
import { useLoading } from "../contexts/LoadingContext";
import { useAuth } from "../contexts/AuthContext";

export function useSignup() {
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const { setUser } = useAuth();
    const passwordRules = {
        "Password needs at least 8 characters": password.length >= 8,
        "Password needs at least 1 lowercase letter": /[a-z]/.test(password),
        "Password needs at least 1 uppercase letter": /[A-Z]/.test(password),
        "Password needs at least 1 number": /[0-9]/.test(password),
        "Password needs at least 1 special character": /[^a-zA-Z0-9]/.test(password),
        "Passwords must match": password === confirmPassword && password.length !== 0,
    };
    const usernameRules = {
        "Username needs at least 3 characters": username.length >= 3,
        "Username needs at most 25 characters": username.length <= 25,
        "Username needs only letters and numbers": /^[a-zA-Z0-9]+$/.test(username),
    };
    const emailRules = {
        "Email must be valid": /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };

    useEffect(() => {
        let isUsernameErrorFound = false;
        let isEmailErrorFound = false;
        let isPasswordErrorFound = false;
        Object.entries(passwordRules).forEach(([message, condition]) => {
            if (!condition && !isPasswordErrorFound) {
                isPasswordErrorFound = true;
                setPasswordError(message);
            } else if (!isPasswordErrorFound) {
                setPasswordError("");
            }
        });
        Object.entries(usernameRules).forEach(([message, condition]) => {
            if (!condition && !isUsernameErrorFound) {
                isUsernameErrorFound = true;
                setUsernameError(message);
            } else if (!isUsernameErrorFound) {
                setUsernameError("");
            }
        });
        Object.entries(emailRules).forEach(([message, condition]) => {
            if (!condition && !isEmailErrorFound) {
                isEmailErrorFound = true;
                setEmailError(message);
            } else if (!isEmailErrorFound) {
                setEmailError("");
            }
        });
    }, [password, username, email, confirmPassword]);

    const createUser = (userData: UserCreationRequest) => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                localStorage.setItem("draftbashJwtToken", data.jwtToken);
                setUser(data.user);
                navigate("/");
            })
            .catch((err) => {
                setIsLoading(false);

                // Extract the message from the error object
                let errorMessage = "";
                if (err instanceof Error) {
                    errorMessage = err.message;
                }

                // Parse the error message if it's a JSON string
                const errorDetails = JSON.parse(errorMessage);

                setUsernameError(errorDetails?.username || "");
                setEmailError(errorDetails?.email || "");
                setPasswordError(errorDetails?.password || "");
            });
    };

    return {
        createUser,
        username,
        email,
        password,
        setPassword,
        setUsername,
        setEmail,
        setConfirmPassword,
        passwordError,
        usernameError,
        emailError,
        passwordRules,
    };
}
