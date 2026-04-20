import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import PressableIcon from "../components/PressableIcon";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { RootStackParamList } from "../types";
import SimulateButton from "../components/SimulateButton";
import { View } from "react-native";
import { Button } from "@rneui/themed";

export const MainScreenOptions = (colorScheme: "light" | "dark", navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: "",
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerShadowVisible: false,
        headerRight: () =>
            <View style={{ flexDirection: "row", width: 80, justifyContent: "space-between", paddingRight: 6 }}>
                <PressableIcon callBack={() => navigation.navigate('Settings')} name='gear' type='evilicon' size={32} />
                <PressableIcon callBack={() => navigation.navigate('Modal')} name='plus' type='evilicon' size={32} />
            </View>,
        headerLeft: () => <SimulateButton />

    })

export const ModalScreenOptions = (colorScheme: "light" | "dark", navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: "New Odds",
        headerTitleStyle: { fontFamily: Fonts.bodyBold, fontSize: 17, fontWeight: "700", color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text },
        headerStyle: { backgroundColor: Colors[colorScheme].modal },
        headerShadowVisible: false,
        headerLeft: () => (
            <Button
                title="Cancel"
                titleStyle={{ color: Colors.shared.primary, fontFamily: Fonts.bodyBold, fontSize: 15, fontWeight: "600" }}
                buttonStyle={{ padding: 0, backgroundColor: "transparent" }}
                onPress={() => navigation.goBack()}
            />
        )
    })

export const SettingsScreenOptions = (colorScheme: "light" | "dark", navigation: NativeStackNavigationProp<RootStackParamList, any>)
    : NativeStackNavigationOptions => ({
        headerTitle: "Settings",
        headerTitleStyle: { fontFamily: Fonts.bodyBold, fontSize: 17, fontWeight: "700", color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text },
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerShadowVisible: false,
        headerLeft: () => <PressableIcon callBack={() => navigation.goBack()} name="arrowleft" size={28} type="antdesign" />
    })
