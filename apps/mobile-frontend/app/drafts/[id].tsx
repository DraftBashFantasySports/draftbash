import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { DraggablePanel } from '../../src/components/screens/draft/DraggablePanel';
export default function Draft() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <DraggablePanel />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
