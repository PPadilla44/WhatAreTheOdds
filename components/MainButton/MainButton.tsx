import { StyleSheet } from 'react-native'
import { Text, View, TouchableOpacity } from "../../components/Themed";
import React from 'react'
import { BtnColorObj } from '../../store/clicker';
import { useClicker } from '../contexts/useClicker';

const MainButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, results } = state;

    const handlePress = () => dispatch!({ type: 'INCREASE' });

    if (didHit) {
        return (
            <View testID='mainBtnResults' style={[styles.btnDone, { backgroundColor: BtnColorObj[results.BtnColor], shadowColor: BtnColorObj[results.BtnColor] }]} >
                <View style={styles.innerRing} pointerEvents="none" />
                <Text style={styles.btnText}>{results.text}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity testID='mainBtn' containerStyle={[styles.btn, { shadowColor: BtnColorObj.default }]} onPress={handlePress} activeOpacity={0.85}>
            <View style={styles.innerRing} pointerEvents="none" />
            <Text style={styles.btnText}>What Are The Odds?</Text>
        </TouchableOpacity>
    )
}

export default MainButton

const SIZE = 220;

const styles = StyleSheet.create({
    btn: {
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        // Soft colored glow (iOS) – heavier for modern depth
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        // Android elevation
        elevation: 12,
    },
    btnDone: {
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        elevation: 12,
    },
    innerRing: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: (SIZE - 20) / 2,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    btnText: {
        fontSize: 30,
        fontWeight: "700",
        color: "white",
        fontFamily: "Futura",
        textAlign: "center",
        letterSpacing: 0.5,
        paddingHorizontal: 24,
    }
})
