import { ScrollView, StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../src/constants/theme";
import images from "../../src/constants/images";
import FormField from "../../src/components/common/FormField";
import FormButton from "../../src/components/common/FormButton";
import { Link, router } from "expo-router";
import { useSignInUser } from "../../src/hooks/users/useSignInUser";
import { UserCreationRequest } from "../../src/services/api/users/types";

export default function SignIn() {
    const [form, setForm] = useState<UserCreationRequest>({ username: "", email: "", password: "" });
    const { signInUser, isLoading } = useSignInUser();

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentArea}>
                    <View style={styles.logo}>
                        <Image source={images.logo} style={styles.logoImage} />
                        <Text style={styles.logoText}>DraftBash</Text>
                    </View>
                    <Text style={styles.loginSuggestion}>Log in to DraftBash</Text>
                    <FormField
                        title="Email or Username"
                        value={form.email}
                        handleChangeText={(e: string) =>
                            setForm({ ...form, email: e, username: e })
                        }
                        keyboardType="username"
                        placeholder=""
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: string) => setForm({ ...form, password: e })}
                        keyboardType="password"
                        placeholder=""
                    />
                    <FormButton title="Sign In" handlePress={() => signInUser(form)} isLoading={isLoading} />
                    <View style={styles.signupArea}>
                        <Text style={styles.signupSuggestion}>Don't have an account? </Text>
                        <Link href="/sign-up" style={styles.signupLink}>
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLOR.primary,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    contentArea: {
        flex: 1,
        padding: 16,
        gap: 25,
        justifyContent: "center",
    },
    logoImage: {
        width: 55,
        height: 50,
        resizeMode: "contain",
    },
    logo: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    logoText: {
        fontSize: FONT_SIZE.xLarge,
        fontFamily: FONT_WEIGHT.bold,
        color: COLOR.white.default,
    },
    loginSuggestion: {
        color: COLOR.white.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.large,
    },
    signupArea: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 5,
    },
    signupSuggestion: {
        color: COLOR.grey.default,
        fontFamily: FONT_WEIGHT.regular,
        fontSize: FONT_SIZE.medium,
    },
    signupLink: {
        color: COLOR.secondary.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.medium,
    },
});
