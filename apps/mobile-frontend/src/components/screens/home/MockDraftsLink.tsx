import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { COLOR, FONT_WEIGHT, FONT_SIZE } from '../../../constants/theme'
import icons from '../../../constants/icons';
import { router } from 'expo-router';

export const MockDraftsLink = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => router.push("/mock-drafts")}>
            <Image
                source={icons.draft}
                tintColor={COLOR.grey.default}
                style={[styles.icon]}
            />
            <View>
                <Text style={styles.title}>Mock Drafts</Text>
                <Text style={styles.subTitle}>Practice fantasy drafting</Text>
            </View>
            <Text style={styles.join}>JOIN</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLOR.black.light,
        borderRadius: 20
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginRight: 10,
        color: COLOR.white.default
    },
    title: {
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.small,
        color: COLOR.white.default
    },
    subTitle: {
        color: COLOR.grey.default,
        fontFamily: FONT_WEIGHT.regular,
        fontSize: FONT_SIZE.xSmall
    },
    join: {
        color: COLOR.secondary.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.small,
        marginLeft: "auto",
        backgroundColor: COLOR.black.medium,
        paddingTop: 3,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 15
    }
});
