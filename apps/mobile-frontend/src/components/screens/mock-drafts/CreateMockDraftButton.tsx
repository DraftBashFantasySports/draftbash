import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLOR, FONT_WEIGHT, FONT_SIZE } from "../../../constants/theme";
import icons from "../../../constants/icons";
import { router } from "expo-router";

interface Props {
    sport: string;
}

export const CreateMockDraftButton = ({ sport }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={styles.container}
        >
            <View style={[
                styles.sportIconContainer,
                {
                    backgroundColor:
                        sport === "football" ? COLOR.green.default : COLOR.orange.default,
                },
            ]}>
                <View style={{ backgroundColor: COLOR.primary, padding: 5, borderRadius: 3 }}>
                    <Image
                        source={sport === "football" ? icons.football : icons.basketball}
                        style={[styles.sportIcon]}
                    />
                </View>
            </View>
            <Text style={styles.sportText}>{sport.toUpperCase()}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    sportIconContainer: {
        padding: 5,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        marginLeft: 8,
        marginRight: 10,
    },
    sportIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    sportText: {
        color: COLOR.secondary.default,
        fontFamily: FONT_WEIGHT.bold,
        fontSize: FONT_SIZE.small,
        textAlign: "center"
    }
});
