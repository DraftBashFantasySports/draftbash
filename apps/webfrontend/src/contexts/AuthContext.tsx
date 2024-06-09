import React, { createContext, useContext, useEffect, useState } from "react";
import { UserResponse } from "../services/api/responses/UserResponse";

interface AuthContextType {
    user: UserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

interface Props {
    children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        try {
            const jwtToken: string | null = localStorage.getItem("draftbashJwtToken");
            if (jwtToken) {
                fetch(`${import.meta.env.VITE_API_URL}/users/tokens?token=${jwtToken}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setUser(data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setUser(null);
                        setIsLoading(false);
                    });
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setUser(null);
            setIsLoading(false);
        }
    }, []);

    const contextValue = {
        user,
        setUser,
        isLoading,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
