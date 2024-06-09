import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the default value for the context
const defaultLoadingContext = {
    isLoading: false,
    setIsLoading: (value: boolean) => {},
};

const LoadingContext = createContext(defaultLoadingContext);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading with false

    // Provide the state and the state updater function directly
    const value = {
        isLoading,
        setIsLoading,
    };

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export const useLoading = () => useContext(LoadingContext);
