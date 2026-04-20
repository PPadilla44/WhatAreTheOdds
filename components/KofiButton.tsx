import React from 'react';
import { Pressable, StyleSheet, Text, View, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Fonts from '../constants/Fonts';

// Ko-fi page for this app's creator.
export const KOFI_URL = 'https://ko-fi.com/pablopadilla';

/**
 * Big, joyful Ko-fi support button. Uses Ko-fi's warm pink/red brand palette
 * with a subtle gradient and lift on press. Opens the creator's Ko-fi page.
 */
const KofiButton: React.FC<{ url?: string }> = ({ url = KOFI_URL }) => {

    const handlePress = () => {
        Linking.openURL(url).catch(err => console.log('Could not open Ko-fi URL', err));
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [styles.wrap, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}
        >
            <LinearGradient
                colors={['#FF5E5B', '#FF8C9E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.iconBubble}>
                        <Feather name="coffee" size={18} color="#FF5E5B" />
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.title}>Support on Ko-fi</Text>
                        <Text style={styles.subtitle}>Buy me a coffee to fuel more updates ✨</Text>
                    </View>
                    <Feather name="external-link" size={16} color="rgba(255,255,255,0.85)" />
                </View>
            </LinearGradient>
        </Pressable>
    );
};

export default KofiButton;

const styles = StyleSheet.create({
    wrap: {
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#FF5E5B',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    gradient: {
        borderRadius: 18,
        padding: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 14,
        borderRadius: 16,
    },
    iconBubble: {
        width: 40,
        height: 40,
        borderRadius: 999,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrap: {
        flex: 1,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.2,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        marginTop: 2,
        fontFamily: Fonts.bodyRegular,
    },
});
