import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../src/constants/theme";
import { HomeHeader } from "../../src/components/screens/home/HomeHeader";
import { LeagueOption } from "../../src/components/screens/home/LeagueOption";
import { MockDraftsLink } from "../../src/components/screens/home/MockDraftsLink";

export default function Home() {
    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={[
                    { id: 1, leagueName: "FOFC-football", sport: "football", teamCount: 10 },
                    { id: 2, leagueName: "FOFC-basketball", sport: "basketball", teamCount: 8 },
                ]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LeagueOption leagueName={item.leagueName} leagueId={item.id} sport={item.sport} teamCount={item.teamCount} />
                )}
                ListHeaderComponent={() => <HomeHeader />}
                ListEmptyComponent={() => (
                    <View>
                        <Text>No items</Text>
                    </View>
                )}
            />
            <MockDraftsLink />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: COLOR.primary,
        height: "100%",
        justifyContent: "flex-end",
        padding: 10
    },
});
