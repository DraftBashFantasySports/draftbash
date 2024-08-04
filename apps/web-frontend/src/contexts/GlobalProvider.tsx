import { createContext, useContext, useState, useEffect } from "react";
import { User } from "types/users";
import { TokenStorage } from "../services/security/TokenStorage";
import { decodeJwt } from "../services/security/decodeJwt";

interface GlobalContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
    user: null,
    setUser: () => { },
    isLoading: true,
});
export const useGlobalContext = () => useContext(GlobalContext);

interface Props {
    children: React.ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            const jwtToken = TokenStorage.getToken();
            if (jwtToken) {
                const decodedToken = decodeJwt(jwtToken) as User;
                setUser(decodedToken);
            }
        } catch (error) {
            console.log("Error getting user", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
