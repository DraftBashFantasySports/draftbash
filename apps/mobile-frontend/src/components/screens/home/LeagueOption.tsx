import { StyleSheet, Text, View, Image } from "react-native";
import icons from "../../../constants/icons";
import React from "react";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";

interface Props {
    leagueName: string;
    leagueId: number;
    sport: string;
    teamCount: number;
}

export const LeagueOption = ({ leagueName, leagueId, sport, teamCount }: Props) => {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.sportIconContainer,
                    {
                        backgroundColor:
                            sport === "football" ? COLOR.green.default : COLOR.orange.default,
                    },
                ]}
            >
                <View style={{ backgroundColor: COLOR.primary, padding: 5, borderRadius: 3 }}>
                    <Image
                        source={sport === "football" ? icons.football : icons.basketball}
                        style={[styles.sportIcon]}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.leagueName}>{leagueName}</Text>
                <Text style={styles.teamCount}>{teamCount}-Team</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        paddingLeft: 20,
    },
    sportIconContainer: {
        padding: 5,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        marginRight: 10 
    },
    sportIcon: {
        width: 15,
        height: 15,
        resizeMode: "contain",
    },
    leagueName: {
        color: COLOR.white.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.small
    },
    teamCount: {
        color: COLOR.grey.default,
        fontFamily: FONT_WEIGHT.regular,
        fontSize: FONT_SIZE.xSmall
    },
});
