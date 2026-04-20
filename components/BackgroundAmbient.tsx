import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Ambient background – a soft vertical gradient wash plus a centered blue
 * glow behind the main button. Purely decorative, does not intercept touches.
 */
const BackgroundAmbient: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const isDark = theme === 'dark';

    const topColor = isDark ? 'rgba(37,99,235,0.10)' : 'rgba(37,99,235,0.05)';
    const midColor = 'transparent';
    const bottomColor = isDark ? 'rgba(14,165,233,0.06)' : 'rgba(14,165,233,0.04)';

    return (
        <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}>
            <LinearGradient
                colors={[topColor, midColor, bottomColor]}
                locations={[0, 0.55, 1]}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Centered radial-like aura via a giant soft-shadow circle */}
            <View style={styles.auraWrap} pointerEvents="none">
                <View style={[styles.aura, { shadowColor: '#2563EB', backgroundColor: '#2563EB' }]} />
            </View>
        </View>
    );
};

export default BackgroundAmbient;

const styles = StyleSheet.create({
    auraWrap: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aura: {
        width: 380,
        height: 380,
        borderRadius: 190,
        opacity: 0.12,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 180,
    },
});
