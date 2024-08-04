import { useState } from "react";
import { UserApi } from "../../services/api/users/UserApi";
import { User } from "types/users";

export function useGetUsersByUsername() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const getUsersByUsername = async (username: string, excludeUserId: number) => {
        setIsLoading(true);
        try {
            const users: User[] = await UserApi.getUsersByUsername(username, excludeUserId);
            return users;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getUsersByUsername,
        isLoading,
        error
    };
}
