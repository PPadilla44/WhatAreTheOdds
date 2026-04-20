import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useStats } from './contexts/useStats';

/**
 * Compact header chip showing the user's personal best (fewest clicks to hit)
 * and lifetime hit count. Live-updated via the stats context.
 */
const StatsChip: React.FC = () => {
    const { state } = useStats();
    const { bestClicks, totalHits } = state.data;

    return (
        <View style={styles.chip}>
            <Feather name="target" size={12} color={Colors.shared.primary} />
            <Text style={styles.label}>
                <Text style={styles.muted}>Best </Text>
                <Text style={styles.value}>{bestClicks ?? '—'}</Text>
            </Text>
            <View style={styles.dot} />
            <Text style={styles.label}>
                <Text style={styles.muted}>Hits </Text>
                <Text style={styles.value}>{totalHits}</Text>
            </Text>
        </View>
    );
};

export default StatsChip;

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(37,99,235,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(37,99,235,0.22)',
        gap: 8,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.bodyMedium,
    },
    muted: {
        color: Colors.light.mutedText,
        letterSpacing: 0.5,
    },
    value: {
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.3,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(148,163,184,0.5)',
    },
});
