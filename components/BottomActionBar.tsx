import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { RootStackParamList } from '../types';
import { useClicker } from './contexts/useClicker';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

interface ActionProps {
    icon: FeatherName;
    label: string;
    onPress: () => void;
    disabled?: boolean;
    active?: boolean;
    destructive?: boolean;
    testID?: string;
}

const Action: React.FC<ActionProps> = ({ icon, label, onPress, disabled, active, destructive, testID }) => {
    const tint = destructive ? Colors.light.danger : (active ? '#FFFFFF' : Colors.shared.primary);
    return (
        <Pressable
            testID={testID}
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.btn,
                active ? styles.btnActive : destructive ? styles.btnDestructive : styles.btnIdle,
                disabled ? styles.btnDisabled : null,
                pressed && !disabled ? { opacity: 0.7, transform: [{ scale: 0.97 }] } : null,
            ]}
        >
            <Feather name={icon} size={16} color={tint} />
            <Text style={[styles.label, { color: tint }]}>{label}</Text>
        </Pressable>
    );
};

/**
 * Bottom action bar – replaces the cramped header icons with a clean row
 * of pill actions: Simulate / New Odds / Settings, plus auto-simulate
 * "Cancel" state. Uses the clicker context to drive Simulate.
 */
const BottomActionBar: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { state, dispatch } = useClicker();
    const { didHit, loading } = state;
    const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

    const handleSimulate = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            dispatch!({ type: 'SET_LOADING', payload: false });
            return;
        }
        if (!didHit) {
            dispatch!({ type: 'SET_LOADING', payload: true });
            const id = setInterval(() => dispatch!({ type: 'INCREASE' }), 10);
            setIntervalId(id);
        }
    };

    useEffect(() => {
        if (didHit && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            dispatch!({ type: 'SET_LOADING', payload: false });
        }
    }, [didHit]);

    return (
        <View style={styles.wrap} pointerEvents="box-none">
            <Action
                testID='simBtn'
                icon={loading ? 'square' : 'play'}
                label={loading ? 'Cancel' : 'Simulate'}
                onPress={handleSimulate}
                disabled={didHit}
                active={loading}
                destructive={loading}
            />
            <Action
                testID='addBtn'
                icon='plus-circle'
                label='New Odds'
                onPress={() => navigation.navigate('Modal')}
            />
            <Action
                testID='settingsBtn'
                icon='settings'
                label='Settings'
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
};

export default BottomActionBar;

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 22,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
    },
    btnIdle: {
        backgroundColor: 'rgba(37,99,235,0.10)',
        borderColor: 'rgba(37,99,235,0.24)',
    },
    btnActive: {
        backgroundColor: Colors.shared.primary,
        borderColor: Colors.shared.primary,
    },
    btnDestructive: {
        backgroundColor: 'rgba(239,68,68,0.12)',
        borderColor: 'rgba(239,68,68,0.30)',
    },
    btnDisabled: {
        opacity: 0.4,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.6,
    },
});
