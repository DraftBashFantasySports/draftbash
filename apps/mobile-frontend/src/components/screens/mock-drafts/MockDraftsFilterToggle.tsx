import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";

interface Props {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
}

export const MockDraftsFilterToggle = ({ isOn, onToggle }: Props) => {
    const [position, setPosition] = useState(new Animated.Value(isOn ? 1 : 0));
    const containerWidth = Dimensions.get("window").width - 40; // Adjust the width based on container
    let toggleWidth = containerWidth - 10;

    useEffect(() => {
        Animated.timing(position, {
            toValue: isOn ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOn]);

    const toggleSwitch = () => {
        Animated.timing(position, {
            toValue: isOn ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            onToggle(!isOn);
        });
    };

    const translateX = position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, toggleWidth / 2], // Adjust based on the width of the toggle switch
    });

    return (
        <TouchableOpacity
            onPress={toggleSwitch}
            style={[styles.toggleContainer, { width: containerWidth }]}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[
                    styles.toggleCircle,
                    { transform: [{ translateX }], width: toggleWidth / 2 },
                ]}
            >
                <Text style={styles.toggleText}>{isOn ? "Inactive Drafts" : "Active Drafts"}</Text>
            </Animated.View>
            <Text style={styles.hiddenText}>{isOn ? "Inactive Drafts" : "Active Drafts"}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        height: 40,
        backgroundColor: COLOR.black.default,
        borderRadius: 20,
        overflow: "hidden",
        justifyContent: "center",
        position: "relative",
        padding: 5,
        marginLeft: 20,
        marginBottom: 5,
    },
    toggleCircle: {
        height: "100%",
        borderRadius: 20,
        backgroundColor: COLOR.secondary.default,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 5,
    },
    toggleText: {
        color: COLOR.black.default,
        fontFamily: FONT_WEIGHT.semiBold,
    },
    hiddenText: {
        opacity: 0,
        width: "100%",
        textAlign: "center",
    },
});
