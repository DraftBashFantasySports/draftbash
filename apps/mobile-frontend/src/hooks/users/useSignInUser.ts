import { useState } from "react";
import { UserCreationRequest } from "../../services/api/users/types";
import { UserApi } from "../../services/api/users/UserApi";
import { UserTokenResponse } from "../../services/api/users/types";
import { Alert } from "react-native";
import { TokenStorage } from "../../services/security/TokenStorage";
import { router } from "expo-router";

export function useSignInUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const signInUser = async (userData: UserCreationRequest) => {
        setIsLoading(true);
        try {
            const { jwtToken } = await UserApi.signInUser(userData);
            // Save token and user to storage
            await TokenStorage.saveToken(jwtToken);
            router.push("/home");
        } catch (error) {
            Alert.alert("Error", "Username or password is incorrect");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signInUser,
        isLoading,
    };
}
