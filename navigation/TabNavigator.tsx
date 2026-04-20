import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Main from '../screens/Main';
import Dropdown from '../screens/Dropdown';
import Settings from '../screens/Settings';

import StatsChip from '../components/StatsChip';
import KofiChip from '../components/KofiChip';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { RootTabParamList } from '../types';

type TabKey = keyof RootTabParamList;
type IconName = React.ComponentProps<typeof Feather>['name'];

const ICONS: Record<TabKey, IconName> = {
    Play: 'target',
    New: 'plus-circle',
    Settings: 'settings',
};

const LABELS: Record<TabKey, string> = {
    Play: 'Play',
    New: 'New',
    Settings: 'Settings',
};

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Custom bottom tab bar – pill-style active indicator that matches the rest
 * of the app's design language. Uses blurred-tint background + top hairline
 * so it floats cleanly over content.
 */
const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            {state.routes.map((route, index) => {
                const focused = state.index === index;
                const { options } = descriptors[route.key];
                const label = (options.tabBarLabel as string) ?? options.title ?? route.name;
                const key = route.name as TabKey;
                const onPress = () => {
                    const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!focused && !e.defaultPrevented) navigation.navigate(route.name as never);
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        accessibilityRole='button'
                        accessibilityState={focused ? { selected: true } : {}}
                        style={({ pressed }) => [styles.item, pressed ? { opacity: 0.7 } : null]}
                    >
                        <View style={[styles.pill, focused ? styles.pillActive : null]}>
                            <Feather
                                name={ICONS[key] ?? 'circle'}
                                size={18}
                                color={focused ? '#FFFFFF' : Colors.light.mutedText}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    { color: focused ? '#FFFFFF' : Colors.light.mutedText },
                                ]}
                            >
                                {label}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default function TabNavigator({ theme }: { theme: 'light' | 'dark' }) {
    const surface = Colors[theme].background;
    const text = Colors[theme].text;

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: surface },
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: Fonts.displayBold, fontSize: 17, color: text },
                headerTitleAlign: 'center',
            }}
        >
            <Tab.Screen
                name="Play"
                component={Main}
                options={{
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <StatsChip />
                            <KofiChip />
                        </View>
                    ),
                    tabBarLabel: LABELS.Play,
                }}
            />
            <Tab.Screen
                name="New"
                component={Dropdown}
                options={{
                    headerTitle: 'New Odds',
                    tabBarLabel: LABELS.New,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: 'Settings',
                    tabBarLabel: LABELS.Settings,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(11,17,32,0.92)',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(148,163,184,0.16)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: { elevation: 12 },
        }),
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    pillActive: {
        backgroundColor: Colors.shared.primary,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.5,
    },
});
