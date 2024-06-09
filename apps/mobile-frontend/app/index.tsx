import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../src/constants/theme";
import images from "../src/constants/images";
import FormButton from "../src/components/common/FormButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../src/context/GlobalProvider";

const App = () => {
    const { isLoading, user } = useGlobalContext();

    if (!isLoading && user) return <Redirect href="/home" />;

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.view}>
                    <View style={styles.logo}>
                        <Image source={images.logo} style={styles.logoImage} />
                        <Text style={styles.logoText}>DraftBash</Text>
                    </View>
                    <Image source={images.confetti} style={styles.confetti} />
                    <View>
                        <Text style={styles.subTitle}>
                            Have a bash with <Text style={{ color: COLOR.secondary.medium }}>DraftBash</Text>
                        </Text>
                        <Image source={images.underline} style={styles.underline} />
                    </View>
                    <Text style={styles.message}>
                        Where fantasy sports dreams come true: compete against friends with DraftBash
                    </Text>
                    <FormButton 
                        title="Continue with Email"
                        handlePress={() => router.push("/sign-in")}
                        isLoading={false}
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor={COLOR.primary} style="light" />
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: COLOR.primary,
    },
    view: {
        alignItems: "center",
        padding: 16,
        height: "100%",
        width: "100%",
        position: "relative",
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
    confetti: {
        marginTop: 20,
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
    subTitle: {
        marginTop: 20,
        fontSize: FONT_SIZE.large,
        fontFamily: FONT_WEIGHT.bold,
        color: COLOR.white.default,
        textAlign: "center",
    },
    underline: {
        width: 300,
        height: 35,
        resizeMode: "contain",
        position: "absolute",
        bottom: -18,
        right: -8,
    },
    message: {
        marginTop: 40,
        fontSize: FONT_SIZE.small,
        fontFamily: FONT_WEIGHT.regular,
        color: COLOR.grey.default,
        textAlign: "center",
        marginBottom: 20,
    }
});
