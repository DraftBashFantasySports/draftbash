import { StyleSheet, Text, View, Image } from "react-native";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";
import icons from "../../../constants/icons";

export const HomeHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileIconContainer}>
                <Image source={icons.profile} style={styles.profileIcon} />
            </View>
            <Text style={styles.title}>Home</Text>
            <Image source={icons.add} style={styles.addIcon} />
            <Image source={icons.menu} style={styles.menuIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
    addIcon: {
        width: 30,
        height: 30,
        marginBottom: 5,
        backgroundColor: COLOR.primary,
        resizeMode: "contain",
        marginLeft: "auto",
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginBottom: 5,
        resizeMode: "contain",
    },
    profileIconContainer: {
        marginBottom: 5,
        padding: 5,
        backgroundColor: COLOR.secondary.default,
        borderRadius: 20,
        resizeMode: "contain",
    },
    profileIcon: {
        width: 30,
        height: 30,
        borderRadius: 17,
        resizeMode: "contain",
    },
    title: {
        fontSize: FONT_SIZE.large,
        fontFamily: FONT_WEIGHT.bold,
        color: COLOR.white.default,
    },
});
