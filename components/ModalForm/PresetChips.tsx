import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export type PresetIcon = React.ComponentProps<typeof Feather>['name'];

export interface Preset {
    key: string;
    label: string;
    icon: PresetIcon;
    type: 'percent' | 'fraction';
    oddsString?: string;
    numerator?: string;
    denominator?: string;
    multiplier?: string;
}

export const POPULAR_PRESETS: Preset[] = [
    { key: 'coin', label: 'Coin flip', icon: 'disc', type: 'percent', oddsString: '50' },
    { key: 'dice', label: 'Dice roll', icon: 'grid', type: 'fraction', numerator: '1', denominator: '6', multiplier: '1' },
    { key: 'poker', label: 'Royal flush', icon: 'target', type: 'fraction', numerator: '1', denominator: '649740', multiplier: '1' },
    { key: 'rare', label: 'Rare event', icon: 'alert-circle', type: 'fraction', numerator: '1', denominator: '1000', multiplier: '1' },
    { key: 'million', label: 'One in a million', icon: 'star', type: 'fraction', numerator: '1', denominator: '1', multiplier: 'M' },
    { key: 'lottery', label: 'Lottery', icon: 'award', type: 'fraction', numerator: '1', denominator: '300', multiplier: 'M' },
];

interface Props {
    onPick: (preset: Preset) => void;
    selectedKey?: string | null;
}

const PresetChips: React.FC<Props> = ({ onPick, selectedKey }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
        >
            {POPULAR_PRESETS.map((p) => {
                const active = selectedKey === p.key;
                return (
                    <Pressable
                        key={p.key}
                        onPress={() => onPick(p)}
                        style={({ pressed }) => [
                            styles.chip,
                            active ? styles.chipActive : null,
                            pressed ? { opacity: 0.75 } : null,
                        ]}
                    >
                        <Feather name={p.icon} size={13} color={active ? '#FFFFFF' : Colors.shared.primary} />
                        <Text style={[styles.label, { color: active ? '#FFFFFF' : Colors.shared.primary }]}>
                            {p.label}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
};

export default PresetChips;

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 16,
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(37,99,235,0.22)',
    },
    chipActive: {
        backgroundColor: Colors.shared.primary,
        borderColor: Colors.shared.primary,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.3,
    },
});
