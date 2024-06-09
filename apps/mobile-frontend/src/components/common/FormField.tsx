import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import icons from "../../constants/icons";

interface Props {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    keyboardType: string;
    placeholder: string;
}

export default function FormField({
    title,
    value,
    handleChangeText,
    keyboardType,
    placeholder,
}: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.formFieldText}>{title}</Text>
            <View
                style={[
                    styles.input,
                    { borderColor: isFocused ? COLOR.secondary.default : COLOR.black.medium },
                ]}
            >
                <TextInput
                    style={styles.inputText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLOR.grey.default}
                    onChangeText={handleChangeText}
                    secureTextEntry={keyboardType === "password" && !showPassword}
                    selectionColor={COLOR.secondary.default}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {keyboardType === "password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyehide}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 2,
    },
    formFieldText: {
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.medium,
        color: COLOR.grey.default,
    },
    input: {
        width: "100%",
        height: 60,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: COLOR.black.light,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    inputText: {
        color: COLOR.grey.default,
        fontSize: FONT_SIZE.medium,
        fontFamily: FONT_WEIGHT.semiBold,
        height: "100%",
        width: "90%",
    },
    eyeIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
});
