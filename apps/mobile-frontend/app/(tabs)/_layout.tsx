import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import MockDraftsScreen from "./mock-drafts";
import ProfileScreen from "./profile";
import icons from "../../src/constants/icons";
import { TabIcon } from "../../src/components/common/TabIcon";
import { COLOR } from "../../src/constants/theme";
import { Image, Touchable, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MockDraftsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MockDrafts"
                component={MockDraftsScreen}
                options={({ navigation }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: 'transparent', // Make the background transparent
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                    },
                    headerTransparent: true, // Ensure the header background is transparent
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft: 25 }}>
                            <Image
                                source={icons.leftArrow}
                                tintColor={COLOR.white.default}
                                style={{ width: 30, height: 30, backgroundColor: "rgba(0,0,0,0)" }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

export default function TabsLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: COLOR.secondary.default,
                tabBarInactiveTintColor: COLOR.grey.default,
                tabBarStyle: {
                    backgroundColor: COLOR.primary,
                    borderTopWidth: 1,
                    borderTopColor: COLOR.black.medium,
                    height: 64,
                },
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="mock-drafts"
                component={MockDraftsStack}
                options={{
                    title: "Mock Drafts",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.draft}
                            color={color}
                            name="Mock Drafts"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
