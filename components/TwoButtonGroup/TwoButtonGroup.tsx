import { Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useClicker } from '../contexts/useClicker';
import SegmentedPill from '../SegmentedPill';

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
        <SegmentedPill
            options={buttons}
            selectedIndex={state.fractionPref}
            onChange={handleSwitch}
            width={280}
        />
    )
}

export default TwoButtonGroup
