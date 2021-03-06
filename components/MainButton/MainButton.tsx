import { StyleSheet } from 'react-native'
import { Text, View, TouchableOpacity } from "../../components/Themed";
import React from 'react'
import { BtnColorObj } from '../../store/clicker';
import { useClicker } from '../contexts/useClicker';

const MainButton = () => {

    const {state, dispatch} = useClicker();
    const { didHit, results } = state;

    const handlePress = () => dispatch!({ type: 'INCREASE' });

    if (didHit) {
        return (
            <View testID='mainBtnResults' style={[styles.btnDone, { backgroundColor: BtnColorObj[results.BtnColor]}]} >
                <Text style={styles.btnText}>{results.text}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity testID='mainBtn' containerStyle={styles.btn} onPress={handlePress} activeOpacity={0.7}>
            <Text style={styles.btnText}>What Are The Odds?</Text>
        </TouchableOpacity>
    )
}

export default MainButton

const styles = StyleSheet.create({
    btn: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    btnDone: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    btnText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        fontFamily: "Futura",
        textAlign: "center"
    }
})