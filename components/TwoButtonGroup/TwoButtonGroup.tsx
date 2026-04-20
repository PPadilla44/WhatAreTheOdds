import { StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { ButtonGroup } from '../Themed'
import { useClicker } from '../contexts/useClicker';
import { Alert } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    buttons: any[];
    clearForm: () => {
        oddsString: string,
        title: string,
        numerator: string,
        denominator: string,
        multiplier: string,
        isValid: boolean,
    };
}

const TwoButtonGroup: FC<Props> = ({ buttons, clearForm }) => {

    const { state, dispatch } = useClicker();


    useEffect(() => {
        if (state.fractionPref && state.fraction.denominator.toString().length > 4) {
            dispatch!({ type: "SET_FRACTIONPREF", payload: 0 })
        }

    }, [])

    const switchAndReset = (index: number) => {
        const clearedForm = clearForm();
        const newForm = {
            ...clearedForm,
            fraction: {
                denominator: parseInt(clearedForm.denominator),
                numerator: parseInt(clearedForm.numerator)
            }
        }
        dispatch!({ type: "SET_STATE", payload: newForm })
        dispatch!({ type: "SET_FRACTIONPREF", payload: index })
    }

    const handleSwitch = (index: number) => {
        if (index === 0 && isNaN(parseInt(state.multiplier))) {

            Alert.alert(
                "This Will Reset Your Current Odds",
                "Would you like to continue?",
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: () => switchAndReset(index) }
                ]
            )
            return;
        }

        if (index === 1 && state.fraction.denominator.toString().length > 4) {
            Alert.alert(
                "This Will Reset Your Current Odds",
                "Would you like to continue?",
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: () => switchAndReset(index) }
                ]
            )
            return;
        }

        dispatch!({ type: "SET_FRACTIONPREF", payload: index })
    }

    return (
        <ButtonGroup
            buttons={buttons}
            onPress={(newIndex: number) => handleSwitch(newIndex)}
            selectedIndex={state.fractionPref}
            containerStyle={styles.container}
            buttonStyle={styles.button}
            textStyle={styles.text}
            selectedButtonStyle={styles.selectedButton}
            selectedTextStyle={styles.selectedText}
            innerBorderStyle={{ color: "transparent" }}
        />
    )
}

export default TwoButtonGroup

const styles = StyleSheet.create({
    container: {
        padding: 4,
        height: 40,
        borderRadius: 14,
        marginBottom: 24,
        marginTop: 0,
        marginHorizontal: 14,
        borderWidth: 0,
    },
    button: {
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    text: {
        fontFamily: "Futura",
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.5,
        color: Colors.light.mutedText,
    },
    selectedButton: {
        backgroundColor: Colors.shared.primary,
        borderRadius: 10,
    },
    selectedText: {
        color: "white",
        fontWeight: "700",
    }
})
