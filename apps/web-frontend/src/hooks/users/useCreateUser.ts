import { UserCreationRequest } from "types/users";
import { UserApi } from "../../services/api/users/UserApi";
import { useState } from "react";
import { TokenStorage } from "../../services/security/TokenStorage";
import { AxiosError } from "axios";
import { useGlobalContext } from "contexts/GlobalProvider";
import { useNavigate } from "react-router-dom";

export function useCreateUser() {
    const { setUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();
    const validateUsername = (username: string) => {
        if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters long.");
        }
        else if (username.length > 15) {
            setUsernameError("Username must be at most 15 characters long.");
        }
        else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            setUsernameError("Username must contain only numbers and letters.");
        } else {
            setUsernameError("");
        }
    };
    const validateEmail = (email: string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Email must be valid.");
        } else {
            setEmailError("");
        }
    };
    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        }
        else if (password.length > 20) {
            setPasswordError("Password must be at most 20 characters long.");
        }
        else if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must be contain at least 1 uppercase.");
        }
        else if (!/[a-z]/.test(password)) {
            setPasswordError("Password must be contain at least 1 lowercase.");
        }
        else if (!/[0-9]/.test(password)) {
            setPasswordError("Password must be contain at least 1 number.");
        }
        else if (!/[^a-zA-Z0-9]/.test(password)) {
            setPasswordError("Password must be contain at least 1 special character.");
        } else {
            setPasswordError("");
        }
    };
    const createUser = async (userData: UserCreationRequest) => {
        if (usernameError == "" && emailError == "" && passwordError == "") {
            try {
                const { jwtToken, user } = await UserApi.createUser(userData);
                setUser(user);
                await TokenStorage.saveToken(jwtToken);
                navigate(`/`);
            } catch (error: unknown) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const serverValidationError = axiosError.response.data as {
                        username: string;
                        email: string;
                        password: string;
                    };
                    if (serverValidationError.username) {
                        setUsernameError(serverValidationError.username);
                    }
                    if (serverValidationError.email) {
                        setEmailError(serverValidationError.email);
                    }
                    if (serverValidationError.password) {
                        setPasswordError(serverValidationError.password);
                    }
                } else {
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        createUser,
        isLoading,
        validateEmail,
        validatePassword,
        validateUsername,
        usernameError,
        emailError,
        passwordError,
    };
}
