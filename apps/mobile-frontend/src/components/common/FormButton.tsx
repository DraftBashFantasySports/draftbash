import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLOR, FONT_WEIGHT, FONT_SIZE } from '../../constants/theme'

interface Props {
    title: string;
    handlePress: () => void;
    isLoading: boolean;
}

export default function FormButton({ title, handlePress, isLoading }: Props) {
  return (
      <TouchableOpacity 
        style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
          <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.secondary.default,
        borderRadius: 10,
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: COLOR.black.default,
        fontFamily: FONT_WEIGHT.semiBold,
        fontSize: FONT_SIZE.medium,
    },
})