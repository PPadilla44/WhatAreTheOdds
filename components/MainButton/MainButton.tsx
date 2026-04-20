import { Pressable, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useMemo } from 'react'
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

// --- Probability-pressure helpers ---------------------------------------
// Cool → Warm → Hot palette that the button interpolates through as the
// statistical tension builds (count approaches expected clicks-to-hit).
const COOL = { r: 37, g: 99, b: 235 };   // #2563EB blue-600
const WARM = { r: 245, g: 158, b: 11 };  // #F59E0B amber-500
const HOT = { r: 239, g: 68, b: 68 };    // #EF4444 red-500
const DEEP_COOL = '#1E3A8A';             // far-edge of cool gradient

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const mix = (c1: typeof COOL, c2: typeof COOL, t: number) =>
    `rgb(${lerp(c1.r, c2.r, t)}, ${lerp(c1.g, c2.g, t)}, ${lerp(c1.b, c2.b, t)})`;

function pressureColor(p: number) {
    if (p <= 0) return `rgb(${COOL.r}, ${COOL.g}, ${COOL.b})`;
    if (p >= 1) return `rgb(${HOT.r}, ${HOT.g}, ${HOT.b})`;
    return p < 0.5 ? mix(COOL, WARM, p * 2) : mix(WARM, HOT, (p - 0.5) * 2);
}

function lightenColor(p: number) {
    // Slightly brighter version of the pressure color for gradient top
    if (p < 0.5) return mix({ r: 59, g: 130, b: 246 }, { r: 251, g: 191, b: 36 }, p * 2);
    return mix({ r: 251, g: 191, b: 36 }, { r: 248, g: 113, b: 113 }, (p - 0.5) * 2);
}
// -------------------------------------------------------------------------

const MainButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, results, count, oddsString, fraction, multiplier, fractionPref } = state;

    // Compute probability per click from the active odds. Then pressure =
    // count / expected-clicks-to-hit, clamped to [0, 1].
    const { pressure, color, highlight } = useMemo(() => {
        let prob = 0;
        if (fractionPref) {
            const n = fraction.numerator;
            let d = fraction.denominator;
            if (multiplier === 'M') d = d * 1e6;
            else if (multiplier === 'B') d = d * 1e9;
            else d = d * Math.max(1, parseFloat(multiplier) || 1);
            prob = d > 0 ? n / d : 0;
        } else {
            prob = (parseFloat(oddsString) || 0) / 100;
        }
        const expected = prob > 0 ? 1 / prob : Infinity;
        const p = Math.min(count / expected, 1);
        return { pressure: p, color: pressureColor(p), highlight: lightenColor(p) };
    }, [count, oddsString, fraction, multiplier, fractionPref]);

    // Press micro-interaction
    const pressScale = useSharedValue(1);
    // Idle halo pulse
    const halo = useSharedValue(1);
    // Count bounce
    const bounce = useSharedValue(1);

    // Restart halo cycle whenever tension changes – faster as pressure grows.
    useEffect(() => {
        const duration = Math.max(420, 1600 - pressure * 1200);
        halo.value = withRepeat(
            withTiming(1.18 + pressure * 0.12, { duration, easing: Easing.inOut(Easing.quad) }),
            -1,
            true
        );
    }, [pressure]);

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
        // Stronger glow as pressure rises
        opacity: 0.4 - (halo.value - 1) * 1.8 + pressure * 0.35,
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
        const resultColor = BtnColorObj[results.BtnColor];
        return (
            <View style={styles.stage}>
                <View style={[styles.halo, { shadowColor: resultColor, backgroundColor: resultColor }]} />
                <View
                    testID='mainBtnResults'
                    style={[styles.circle, { backgroundColor: resultColor, shadowColor: resultColor }]}
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

    // When pressure is low, deep-cool edge stays bluish. As pressure climbs
    // toward 1, the deep-edge fades to a darkened version of the pressure
    // color so the whole circle warms together.
    const deepEdge = pressure > 0.5 ? color : DEEP_COOL;

    return (
        <View style={styles.stage}>
            {/* Pulsing halo */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.halo,
                    { shadowColor: color, backgroundColor: color },
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
                    style={[styles.circle, { backgroundColor: color, shadowColor: color }]}
                >
                    <LinearGradient
                        colors={[highlight, color, deepEdge]}
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
