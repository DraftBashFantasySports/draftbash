import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { GlobalProvider } from "../src/context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Bold": require("../src/assets/fonts/Poppins-Bold.ttf"),
        "Poppins-Regular": require("../src/assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../src/assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../src/assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Light": require("../src/assets/fonts/Poppins-Light.ttf"),
        "Poppins-ExtraLight": require("../src/assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-ExtraBold": require("../src/assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Thin": require("../src/assets/fonts/Poppins-Thin.ttf"),
        "Poppins-Black": require("../src/assets/fonts/Poppins-Black.ttf"),
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <GlobalProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    presentation: "modal",
                    animation: "ios",
                }}
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/*<Stack.Screen name="/search/[query]" options={{ headerShown: false }} />*/}
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;