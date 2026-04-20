import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect } from 'react';
import { useSettings } from '../components/contexts/useSettings';
import Dropdown from '../screens/Dropdown';
import Main from '../screens/Main';
import NotFoundScreen from '../screens/NotFoundScreen';
import Settings from '../screens/Settings';
import { fetchSettings } from '../store/utils/thunkerFunctions';
import { RootStackParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { MainScreenOptions, ModalScreenOptions, SettingsScreenOptions } from './ScreenOptions';

export default function Navigation() {

    const { state, dispatch } = useSettings();


    const fetch = async () => {
        await fetchSettings(dispatch)
    }

    useEffect(() => {
        fetch();
    }, []);



    const theme = state.data.appearance.appearance as "light" | "dark";

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}>

            <RootNavigator />

            <StatusBar style={theme === 'dark' ? "light" : "dark"} />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

    const { state, dispatch } = useSettings();


    const fetch = async () => {
        await fetchSettings(dispatch)
    }

    useEffect(() => {
        fetch();
    }, []);

    const theme = state.data.appearance.appearance as "light" | "dark";

    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={Main} options={({ navigation }: RootTabScreenProps<'Root'>) => MainScreenOptions(theme, navigation)} />
            <Stack.Screen name="Settings" component={Settings} options={({ navigation }: RootTabScreenProps<'Settings'>) => SettingsScreenOptions(theme, navigation)} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={Dropdown} options={({ navigation }: RootTabScreenProps<'Modal'>) => ModalScreenOptions(theme, navigation)} />
            </Stack.Group>
        </Stack.Navigator>
    );
}