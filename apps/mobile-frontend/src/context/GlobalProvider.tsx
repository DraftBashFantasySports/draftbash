import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../services/api/users/types";
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
        TokenStorage.getToken()
            .then((jwtToken) => {
                if (jwtToken) {
                    setUser(decodeJwt(jwtToken) as User);
                } else {
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
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
