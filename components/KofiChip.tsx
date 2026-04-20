import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fonts from '../constants/Fonts';
import { KOFI_URL } from './KofiButton';

/**
 * Tiny Ko-fi support chip for the main-screen header – warm coral pill with a
 * coffee icon. Opens the creator's Ko-fi page on tap.
 */
const KofiChip: React.FC = () => {

    const handlePress = () => {
        Linking.openURL(KOFI_URL).catch(() => { });
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [styles.chip, { opacity: pressed ? 0.75 : 1 }]}
            accessibilityLabel="Support on Ko-fi"
        >
            <View style={styles.inner}>
                <Feather name="coffee" size={11} color="#FF5E5B" />
                <Text style={styles.text}>Support</Text>
            </View>
        </Pressable>
    );
};

export default KofiChip;

const styles = StyleSheet.create({
    chip: {
        borderRadius: 999,
        backgroundColor: 'rgba(255,94,91,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(255,94,91,0.30)',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        color: '#FF7A77',
        fontSize: 11,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.6,
    },
});
