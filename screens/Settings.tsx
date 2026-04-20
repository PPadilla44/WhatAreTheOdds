import React, { FC, useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, Alert, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RootStackScreenProps } from '../types';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

import SettingSection from '../components/SettingSection';
import SettingRow from '../components/SettingRow';
import KofiButton from '../components/KofiButton';

import { useSettings } from '../components/contexts/useSettings';
import { useStats } from '../components/contexts/useStats';
import { useOddsItems } from '../components/contexts/useOddsItems';
import { setAppearance, resetStats as resetStatsThunk, clearOddsList } from '../store/utils/thunkerFunctions';

const APP_VERSION = '2.0.0';

const confirm = (title: string, message: string, onYes: () => void) => {
    if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) onYes();
        return;
    }
    Alert.alert(title, message, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'destructive', onPress: onYes },
    ]);
};

const Settings: FC<RootStackScreenProps<"Settings">> = ({ }) => {

    const { state: settings, dispatch: settingsDispatch } = useSettings();
    const { state: stats, dispatch: statsDispatch } = useStats();
    const { state: odds, dispatch: oddsDispatch } = useOddsItems();

    const appearance = settings.data.appearance;
    const currentAppearance: 'automatic' | 'dark' | 'light' = appearance.fromDevice
        ? 'automatic'
        : (appearance.appearance as 'dark' | 'light');

    const options: { key: 'automatic' | 'dark' | 'light'; label: string; icon: React.ComponentProps<typeof Feather>['name'] }[] = useMemo(() => ([
        { key: 'automatic', label: 'Automatic', icon: 'smartphone' },
        { key: 'light', label: 'Light', icon: 'sun' },
        { key: 'dark', label: 'Dark', icon: 'moon' },
    ]), []);

    const setMode = (mode: 'automatic' | 'dark' | 'light') => {
        if (mode === 'automatic') {
            setAppearance(settings, settingsDispatch, { fromDevice: true });
        } else {
            setAppearance(settings, settingsDispatch, { fromDevice: false, appearance: mode });
        }
    };

    const handleResetStats = () => {
        confirm('Reset stats', 'Your best streak and total hits will be permanently erased.', () => {
            resetStatsThunk(statsDispatch);
        });
    };

    const handleClearOdds = () => {
        confirm('Clear saved odds', 'All of your saved odds presets will be removed.', () => {
            clearOddsList(oddsDispatch);
        });
    };

    const savedCount = odds.data?.length ?? 0;

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >

            {/* APPEARANCE */}
            <SettingSection title="Appearance" footer="Automatic follows your device's dark mode preference.">
                {options.map(opt => (
                    <SettingRow
                        key={opt.key}
                        icon={opt.icon}
                        label={opt.label}
                        onPress={() => setMode(opt.key)}
                        trailing={currentAppearance === opt.key ? (
                            <View style={styles.check}>
                                <Feather name="check" size={14} color="#FFFFFF" />
                            </View>
                        ) : <View style={styles.emptyCheck} />}
                    />
                ))}
            </SettingSection>

            {/* STATS */}
            <SettingSection title="Stats" footer="Your progress is stored locally on this device.">
                <View style={styles.statsRow}>
                    <View style={styles.statCell}>
                        <Text style={styles.statValue}>{stats.data.bestClicks ?? '—'}</Text>
                        <Text style={styles.statLabel}>Best</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCell}>
                        <Text style={styles.statValue}>{stats.data.totalHits}</Text>
                        <Text style={styles.statLabel}>Hits</Text>
                    </View>
                </View>
                <SettingRow
                    icon="refresh-ccw"
                    label="Reset stats"
                    description="Clear best streak and hit count"
                    destructive
                    onPress={handleResetStats}
                />
            </SettingSection>

            {/* DATA */}
            <SettingSection title="Data">
                <SettingRow
                    icon="trash-2"
                    label="Clear saved odds"
                    description={savedCount ? `${savedCount} preset${savedCount === 1 ? '' : 's'} currently saved` : 'No presets saved'}
                    destructive
                    onPress={handleClearOdds}
                    disabled={savedCount === 0}
                />
            </SettingSection>

            {/* SUPPORT */}
            <SettingSection title="Support" footer="This little app is built for fun – your support keeps it growing.">
                <View style={styles.supportPadding}>
                    <KofiButton />
                </View>
            </SettingSection>

            {/* ABOUT */}
            <SettingSection title="About">
                <SettingRow icon="info" label="Version" trailing={<Text style={styles.versionText}>{APP_VERSION}</Text>} />
                <SettingRow
                    icon="heart"
                    label="Made with ♥"
                    description="A tiny probability toy"
                    onPress={() => Linking.openURL('https://expo.dev').catch(() => { })}
                />
            </SettingSection>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 4,
    },
    check: {
        width: 22,
        height: 22,
        borderRadius: 999,
        backgroundColor: Colors.shared.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCheck: {
        width: 22,
        height: 22,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.3)',
    },
    statsRow: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    statCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: 30,
        fontFamily: Fonts.displayExtraBold,
        color: Colors.shared.primary,
        letterSpacing: -1,
    },
    statLabel: {
        fontSize: 10,
        color: Colors.light.mutedText,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 2,
        fontFamily: Fonts.bodyBold,
    },
    statDivider: {
        width: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(148,163,184,0.3)',
    },
    supportPadding: {
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    versionText: {
        fontSize: 13,
        color: Colors.light.mutedText,
        fontFamily: Fonts.bodyMedium,
    },
});
