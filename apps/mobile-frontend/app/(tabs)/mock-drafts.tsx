import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { MockDraftItem } from "../../src/components/screens/mock-drafts/MockDraftItem";
import { MockDraftsFilterToggle } from "../../src/components/screens/mock-drafts/MockDraftsFilterToggle";
import { BasketballDraft, FootballDraft } from "../../src/services/api/drafts/types";
import { CreateMockDraftButton } from "../../src/components/screens/mock-drafts/CreateMockDraftButton";
import { useGetDrafts } from "../../src/hooks/drafts/useGetDrafts";

export default function MockDrafts() {
    const [isActiveDraftsSelected, setIsActiveDraftsSelected] = useState(false);
    const { drafts } = useGetDrafts();
    return (
        <LinearGradient
            colors={[
                COLOR.orange.default,
                COLOR.blue.default,
                COLOR.primary,
                COLOR.primary,
                COLOR.primary,
                COLOR.primary
            ]}
            style={styles.screen}
        >
            <SafeAreaView style={styles.screen}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Text style={styles.title}>Mock Drafts</Text>
                    <Text style={styles.subTitle}>Practice your fantasy draft strategy</Text>
                    <View style={styles.draftCreationButtons}>
                        <CreateMockDraftButton sport="football" />
                        <CreateMockDraftButton sport="basketball" />
                    </View>
                    <FlatList
                        data={drafts}
                        keyExtractor={(item: FootballDraft | BasketballDraft) =>
                            item.draftId.toString()
                        }
                        renderItem={({ item }) => <MockDraftItem draftSettings={item} />}
                        ListHeaderComponent={() => (
                            <MockDraftsFilterToggle
                                isOn={isActiveDraftsSelected}
                                onToggle={setIsActiveDraftsSelected}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyListContainer}>
                                <Text style={styles.emptyListTitle}>No drafts</Text>
                                <Text style={styles.emptyListSubTitle}>Create your own or join others</Text>
                            </View>
                        )}
                        scrollEnabled={false}
                        style={styles.draftsListContainer}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 30,
    },
    title: {
        paddingLeft: 20,
        fontSize: FONT_SIZE.large,
        color: COLOR.white.default,
        fontFamily: FONT_WEIGHT.bold,
    },
    subTitle: {
        paddingLeft: 20,
        fontSize: FONT_SIZE.small,
        color: COLOR.white.default,
        fontFamily: FONT_WEIGHT.regular,
        marginBottom: 30,
        width: 250,
    },
    draftsListContainer: {
        paddingTop: 20,
        width: "100%",
        backgroundColor: COLOR.black.light,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    draftCreationButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 50,
        padding: 10,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20
    },
    emptyListTitle: {
        color: COLOR.grey.default,
        fontSize: FONT_SIZE.medium,
    },
    emptyListSubTitle: {
        color: COLOR.grey.default,
        fontSize: FONT_SIZE.small,
    },
});
