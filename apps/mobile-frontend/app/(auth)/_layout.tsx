import { View, Text } from "react-native";
import { COLOR } from "../../src/constants/theme";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false, animation: "ios" }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false, animation: "ios" }} />
            </Stack>
            <StatusBar backgroundColor={COLOR.primary} style="light" />
        </>
    );
}
