import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    StyleSheet,
} from "react-native";
import { COLOR, FONT_WEIGHT } from "../../constants/theme";

interface Props {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}

export const TabIcon = ({ icon, color, name, focused }: Props) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={[styles.image, { tintColor: color }]} />
            <Text style={[focused ? styles.focused : styles.notFocused]}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 35,
        height: 25,
        resizeMode: "contain",
    },
    focused: {
        fontFamily: FONT_WEIGHT.bold,
        color: COLOR.secondary.default,
    },
    notFocused: {
        fontFamily: FONT_WEIGHT.regular,
        color: COLOR.grey.default,
    }
});
