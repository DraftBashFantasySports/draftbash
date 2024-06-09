import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import icons from "../../../constants/icons";
import React, { useState } from "react";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";
import { BasketballDraft, FootballDraft } from "../../../services/api/drafts/types";
import { timeSince } from "../../../utils/time";
import { useGlobalContext } from "../../../context/GlobalProvider";

interface Props {
    draftSettings: FootballDraft | BasketballDraft;
}

export const MockDraftItem = ({ draftSettings }: Props) => {
    const [bgColor] = useState(new Animated.Value(0));

    const handlePressIn = () => {
        Animated.timing(bgColor, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(bgColor, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: [COLOR.black.light, COLOR.grey.dark],
    });

    return (
        <TouchableOpacity
            style={styles.touchableContainer}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
        >
            <Animated.View style={[styles.container, { backgroundColor }]}>
                <View
                    style={[
                        styles.sportIconContainer,
                        {
                            backgroundColor:
                                draftSettings.sport === "football"
                                    ? COLOR.green.default
                                    : COLOR.orange.default,
                        },
                    ]}
                >
                    <View style={{ backgroundColor: COLOR.primary, padding: 5, borderRadius: 3 }}>
                        <Image
                            source={
                                draftSettings.sport === "football"
                                    ? icons.football
                                    : icons.basketball
                            }
                            style={[styles.sportIcon]}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.basicSettings}>
                        {draftSettings.teamCount}-team {draftSettings.scoringFormat}{" "}
                        {draftSettings.pickOrderFormat}
                    </Text>
                    {draftSettings.sport === "football" ? (
                        <Text style={styles.teamSettings}>
                            {(draftSettings as FootballDraft).quarterbackLimit} QB,{" "}
                            {(draftSettings as FootballDraft).runningBackLimit} RB,{" "}
                            {(draftSettings as FootballDraft).wideReceiverLimit} WR,{" "}
                            {(draftSettings as FootballDraft).tightendLimit} TE,{" "}
                            {(draftSettings as FootballDraftSettings).flexLimit} FLEX,{" "}
                            {(draftSettings as FootballDraftSettings).benchLimit} BE
                            
                        </Text>
                    ) : (
                        <Text style={styles.teamSettings}>
                            {(draftSettings as BasketballDraftSettings).pointGuardLimit} PG,{" "}
                            {(draftSettings as BasketballDraftSettings).shootingGuardLimit} SG,{" "}
                            {(draftSettings as BasketballDraftSettings).smallForwardLimit} SF,{" "}
                            {(draftSettings as BasketballDraftSettings).powerForwardLimit} PF,{" "}
                            {(draftSettings as BasketballDraftSettings).centerLimit} C,{" "}
                            {(draftSettings as BasketballDraftSettings).utilityLimit} UTIL,{" "}
                            {(draftSettings as BasketballDraftSettings).benchLimit} BE
                        </Text>
                    )}
                </View>
                <Text style={styles.timestamp}>
                    {timeSince(draftSettings.createdAt)}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        marginVertical: 5,
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    sportIconContainer: {
        padding: 5,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        marginRight: 10,
    },
    sportIcon: {
        width: 15,
        height: 15,
        resizeMode: "contain",
    },
    basicSettings: {
        color: COLOR.white.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.small,
    },
    teamSettings: {
        color: COLOR.grey.default,
        fontFamily: FONT_WEIGHT.regular,
        fontSize: FONT_SIZE.xSmall,
    },
    timestamp: {
        color: COLOR.grey.default,
        fontFamily: FONT_WEIGHT.regular,
        fontSize: FONT_SIZE.xSmall,
        marginLeft: "auto",
    }
});
