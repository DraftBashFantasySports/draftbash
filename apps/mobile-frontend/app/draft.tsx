import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Draft = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: "Poppins-Black" }}>Draft</Text>
        </View>
    );
};

export default Draft;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});