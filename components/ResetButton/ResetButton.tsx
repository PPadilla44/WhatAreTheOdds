import { Alert, Platform, StyleSheet, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useClicker } from '../contexts/useClicker';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

/**
 * Cross-platform confirmation – React Native's `Alert` on web only renders
 * the message via `window.alert` (no OK/Cancel buttons), so on web we fall
 * back to `window.confirm`.
 */
const confirm = (title: string, message: string, onYes: () => void) => {
    if (Platform.OS === 'web') {
        // eslint-disable-next-line no-alert
        if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) {
            onYes();
        }
        return;
    }
    Alert.alert(title, message, [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: onYes },
    ]);
};

const ResetButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, loading, count } = state;

    // Reset should be available whenever there's state to reset: either a hit
    // has occurred, or clicks have accumulated. Previously it was gated only
    // on `didHit`, making it appear broken (disabled) when the user just
    // wanted to clear a tall click count.
    const enabled = !loading && (didHit || count > 0);

    const resetAll = () => dispatch!({ type: 'RESET' });

    const handlePress = () => {
        if (!enabled) return;
        confirm('Reset', 'Are you sure you would like to reset?', resetAll);
    };

    return (
        <View testID='resetWrapper' style={styles.wrap}>
            <Pressable
                testID='resetBtn'
                onPress={handlePress}
                disabled={!enabled}
                style={({ pressed }) => [
                    styles.btn,
                    enabled ? styles.btnEnabled : styles.btnDisabled,
                    pressed && enabled ? { opacity: 0.6 } : null,
                ]}
            >
                <Feather name="rotate-ccw" size={13} color={enabled ? Colors.light.danger : Colors.light.mutedText} />
                <Text style={[styles.text, { color: enabled ? Colors.light.danger : Colors.light.mutedText }]}>
                    Reset
                </Text>
            </Pressable>
        </View>
    );
};

export default ResetButton;

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 16,
        bottom: 78,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
    },
    btnEnabled: {
        backgroundColor: 'rgba(239,68,68,0.10)',
        borderColor: 'rgba(239,68,68,0.28)',
    },
    btnDisabled: {
        backgroundColor: 'rgba(148,163,184,0.08)',
        borderColor: 'rgba(148,163,184,0.18)',
        opacity: 0.6,
    },
    text: {
        fontFamily: Fonts.bodyBold,
        fontSize: 12,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },
});
