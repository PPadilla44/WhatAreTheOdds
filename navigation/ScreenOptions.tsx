import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import PressableIcon from "../components/PressableIcon";
import StatsChip from "../components/StatsChip";
import KofiChip from "../components/KofiChip";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { RootStackParamList } from "../types";

export const MainScreenOptions = (colorScheme: "light" | "dark", _navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <StatsChip />
                <KofiChip />
            </View>
        ),
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerShadowVisible: false,
        headerLeft: () => null,
        headerRight: () => null,
    })

export const ModalScreenOptions = (colorScheme: "light" | "dark", navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: "New Odds",
        headerTitleStyle: { fontFamily: Fonts.displayBold, fontSize: 17, color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text },
        headerStyle: { backgroundColor: Colors[colorScheme].modal },
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
                <PressableIcon callBack={() => navigation.goBack()} name="x" size={18} />
            </View>
        )
    })

export const SettingsScreenOptions = (colorScheme: "light" | "dark", navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: "Settings",
        headerTitleStyle: { fontFamily: Fonts.displayBold, fontSize: 17, color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text },
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
                <PressableIcon callBack={() => navigation.goBack()} name="chevron-left" size={20} />
            </View>
        )
    })
