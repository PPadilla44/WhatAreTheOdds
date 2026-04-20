import { Pressable, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { BtnColorObj } from '../../store/clicker';
import { useClicker } from '../contexts/useClicker';

const MainButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, results } = state;

    const handlePress = () => dispatch!({ type: 'INCREASE' });

    if (didHit) {
        const color = BtnColorObj[results.BtnColor];
        return (
            <View
                testID='mainBtnResults'
                style={[styles.circle, { backgroundColor: color, shadowColor: color }]}
            >
                <Text style={styles.btnText}>{results.text}</Text>
            </View>
        )
    }

    const defaultColor = BtnColorObj.default;

    return (
        <Pressable
            testID='mainBtn'
            onPress={handlePress}
            style={({ pressed }) => [
                styles.circle,
                {
                    backgroundColor: defaultColor,
                    shadowColor: defaultColor,
                    opacity: pressed ? 0.85 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                },
            ]}
        >
            <Text style={styles.btnText}>What Are The Odds?</Text>
        </Pressable>
    )
}

export default MainButton

const SIZE = 220;

const styles = StyleSheet.create({
    circle: {
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        // Soft colored glow (iOS)
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        // Android elevation
        elevation: 12,
        // Make sure no default border/outline bleeds in on web
        borderWidth: 0,
    },
    btnText: {
        fontSize: 30,
        fontWeight: "700",
        color: "#FFFFFF",
        fontFamily: "Futura",
        textAlign: "center",
        letterSpacing: 0.5,
        paddingHorizontal: 24,
        backgroundColor: "transparent",
    }
})
