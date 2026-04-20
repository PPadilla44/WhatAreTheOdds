import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useClicker } from '../contexts/useClicker';

const SimulateButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, loading } = state;
    const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

    const simulate = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            dispatch!({ type: "SET_LOADING", payload: false });
            return;
        }

        if (!didHit) {
            dispatch!({ type: "SET_LOADING", payload: true });
            const newInterval = setInterval(() => {
                dispatch!({ type: "INCREASE" });
            }, 10);
            setIntervalId(newInterval);
        }
    };

    useEffect(() => {
        if (didHit) {
            dispatch!({ type: "SET_LOADING", payload: false });
            clearInterval(intervalId as ReturnType<typeof setInterval>);
            setIntervalId(null);
        }
    }, [didHit]);

    const active = loading;
    const disabled = didHit;

    return (
        <Pressable
            testID='simBtn'
            onPress={simulate}
            disabled={disabled}
            style={({ pressed }) => [
                styles.btn,
                active ? styles.btnActive : styles.btnIdle,
                disabled && styles.btnDisabled,
                pressed && !disabled ? { opacity: 0.7 } : null,
            ]}
        >
            <View style={styles.content}>
                <Feather
                    name={active ? "square" : "play"}
                    size={11}
                    color={disabled ? Colors.light.mutedText : (active ? Colors.light.danger : Colors.shared.primary)}
                />
                <Text
                    style={[
                        styles.text,
                        { color: disabled ? Colors.light.mutedText : (active ? Colors.light.danger : Colors.shared.primary) },
                    ]}
                >
                    {active ? 'Cancel' : 'Simulate'}
                </Text>
            </View>
        </Pressable>
    );
};

export default SimulateButton;

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1,
    },
    btnIdle: {
        backgroundColor: 'rgba(37,99,235,0.10)',
        borderColor: 'rgba(37,99,235,0.22)',
    },
    btnActive: {
        backgroundColor: 'rgba(239,68,68,0.10)',
        borderColor: 'rgba(239,68,68,0.28)',
    },
    btnDisabled: {
        opacity: 0.4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    text: {
        fontFamily: Fonts.bodyBold,
        fontSize: 11,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
});
