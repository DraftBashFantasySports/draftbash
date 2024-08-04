import { useState } from "react";
import { UserCreationRequest } from "types/users";
import { UserApi } from "../../services/api/users/UserApi";
import { TokenStorage } from "../../services/security/TokenStorage";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "contexts/GlobalProvider";

export function useSignInUser() {
    const { setUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const signInUser = async (userData: UserCreationRequest) => {
        setIsLoading(true);
        try {
            const { jwtToken, user } = await UserApi.signInUser(userData);
            setUser(user);
            await TokenStorage.saveToken(jwtToken);
            navigate(`/`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signInUser,
        isLoading,
        error,
    };
}
