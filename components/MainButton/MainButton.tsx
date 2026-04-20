import { Pressable, StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    withSpring,
    Easing,
} from 'react-native-reanimated';

import { BtnColorObj } from '../../store/clicker';
import { useClicker } from '../contexts/useClicker';
import Fonts from '../../constants/Fonts';

const SIZE = 220;

const MainButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, results, count } = state;

    // Press micro-interaction
    const pressScale = useSharedValue(1);
    // Idle halo pulse
    const halo = useSharedValue(1);
    // Count bounce
    const bounce = useSharedValue(1);

    useEffect(() => {
        halo.value = withRepeat(
            withTiming(1.18, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
            -1,
            true
        );
    }, []);

    useEffect(() => {
        if (count > 0 && !didHit) {
            bounce.value = withSequence(
                withTiming(0.93, { duration: 80, easing: Easing.out(Easing.quad) }),
                withSpring(1, { damping: 6, stiffness: 220 }),
            );
        }
    }, [count, didHit]);

    const haloAnimStyle = useAnimatedStyle(() => ({
        transform: [{ scale: halo.value }],
        opacity: 0.55 - (halo.value - 1) * 2.2, // fade as it expands
    }));

    const circleAnimStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pressScale.value * bounce.value }],
    }));

    const handlePressIn = () => {
        pressScale.value = withTiming(0.94, { duration: 90, easing: Easing.out(Easing.quad) });
    };
    const handlePressOut = () => {
        pressScale.value = withSpring(1, { damping: 7, stiffness: 260 });
    };
    const handlePress = () => dispatch!({ type: 'INCREASE' });

    if (didHit) {
        const color = BtnColorObj[results.BtnColor];
        return (
            <View style={styles.stage}>
                <View style={[styles.halo, { shadowColor: color, backgroundColor: color }]} />
                <View
                    testID='mainBtnResults'
                    style={[styles.circle, { backgroundColor: color, shadowColor: color }]}
                >
                    <LinearGradient
                        colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0)', 'rgba(0,0,0,0.18)']}
                        style={StyleSheet.absoluteFillObject}
                        pointerEvents="none"
                    />
                    <View style={styles.textWrap} pointerEvents="none">
                        <Text style={styles.btnText}>{results.text}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const primary = BtnColorObj.default;
    const primaryLight = BtnColorObj.normal;

    return (
        <View style={styles.stage}>
            {/* Pulsing halo */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.halo,
                    { shadowColor: primary, backgroundColor: primary },
                    haloAnimStyle,
                ]}
            />

            {/* The button */}
            <Animated.View style={circleAnimStyle}>
                <Pressable
                    testID='mainBtn'
                    onPress={handlePress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={[styles.circle, { backgroundColor: primary, shadowColor: primary }]}
                >
                    <LinearGradient
                        colors={[primaryLight, primary, '#1E3A8A']}
                        start={{ x: 0.3, y: 0 }}
                        end={{ x: 0.7, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                        pointerEvents="none"
                    />
                    {/* Top highlight */}
                    <LinearGradient
                        colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 0.55 }}
                        style={StyleSheet.absoluteFillObject}
                        pointerEvents="none"
                    />
                    <View style={styles.textWrap} pointerEvents="none">
                        <Text style={styles.btnText}>What Are The Odds?</Text>
                    </View>
                </Pressable>
            </Animated.View>
        </View>
    )
}

export default MainButton

const styles = StyleSheet.create({
    stage: {
        width: SIZE + 80,
        height: SIZE + 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    halo: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        opacity: 0.35,
        // Glow on web via box-shadow mapping; on iOS via real shadow
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 70,
        elevation: 0,
    },
    circle: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZE / 2,
        borderWidth: 0,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.45,
        shadowRadius: 34,
        elevation: 16,
    },
    btnText: {
        fontSize: 28,
        color: '#FFFFFF',
        fontFamily: Fonts.displayExtraBold,
        textAlign: 'center',
        letterSpacing: -0.5,
        paddingHorizontal: 28,
        backgroundColor: 'transparent',
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    textWrap: {
        zIndex: 10,
        elevation: 10,
    }
})
