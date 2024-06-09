import { Alert } from "react-native";
import { UserCreationRequest } from "../../services/api/users/types";
import { UserApi } from "../../services/api/users/UserApi";
import { useState } from "react";
import { TokenStorage } from "../../services/security/TokenStorage";
import { router } from "expo-router";
import { AxiosError } from "axios";

export function useCreateUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const createUser = async (userData: UserCreationRequest) => {
        let errorMessages = "";
        if (userData.username.length < 3) {
            errorMessages += "Username must be at least 3 characters long.\n";
        }
        if (userData.username.length > 15) {
            errorMessages += "Username must be at most 15 characters long.\n";
        }
        if (!/^[a-zA-Z0-9]+$/.test(userData.username)) {
            errorMessages += "Username must contain only numbers and letters.\n";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errorMessages += "Email must be valid.\n";
        }
        if (userData.password.length < 8) {
            errorMessages += "Password must be at least 8 characters long.\n";
        }
        if (userData.password.length > 20) {
            errorMessages += "Password must be at most 20 characters long.\n";
        }
        if (!/[A-Z]/.test(userData.password)) {
            errorMessages += "Password must be contain at least 1 uppercase.\n";
        }
        if (!/[a-z]/.test(userData.password)) {
            errorMessages += "Password must be contain at least 1 lowercase.\n";
        }
        if (!/[0-9]/.test(userData.password)) {
            errorMessages += "Password must be contain at least 1 number.\n";
        }
        if (!/[^a-zA-Z0-9]/.test(userData.password)) {
            errorMessages += "Password must be contain at least 1 special character.\n";
        }

        if (errorMessages !== "") {
            Alert.alert("Error", errorMessages);
        } else {
            try {
                const { jwtToken, user } = await UserApi.createUser(userData);
                await TokenStorage.saveToken(jwtToken);
                router.push("/home");
            } catch (error: unknown) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const serverValidationError = axiosError.response.data as {
                        username: string;
                        email: string;
                        password: string;
                    };
                    if (serverValidationError.username) {
                        errorMessages += serverValidationError.username + ".\n";
                    }
                    if (serverValidationError.email) {
                        errorMessages += serverValidationError.email + ".\n";
                    }
                    if (serverValidationError.password) {
                        errorMessages += serverValidationError.password + ".\n";
                    }
                    Alert.alert("Error", errorMessages);
                } else {
                    Alert.alert("Error", "Server error");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        createUser,
        isLoading,
    };
}
