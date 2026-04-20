import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { useSettings } from '../components/contexts/useSettings';
import NotFoundScreen from '../screens/NotFoundScreen';
import { fetchSettings } from '../store/utils/thunkerFunctions';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TabNavigator from './TabNavigator';

export default function Navigation() {
    const { state, dispatch } = useSettings();

    useEffect(() => {
        fetchSettings(dispatch);
    }, []);

    const theme = state.data.appearance.appearance as 'light' | 'dark';

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator theme={theme} />
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ theme }: { theme: 'light' | 'dark' }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root">
                {() => <TabNavigator theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!', headerShown: true }} />
        </Stack.Navigator>
    );
}
