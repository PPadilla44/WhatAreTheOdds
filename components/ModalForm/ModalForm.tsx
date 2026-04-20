import { StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { Input, View } from '../Themed';
import TwoButtonGroup from '../TwoButtonGroup';
import SaveTryButtons from '../SaveTryButtons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OddsItemInterface, RootStackParamList } from '../../types';
import { useClicker } from '../contexts/useClicker';
import PercentInput from './PercentInput';
import FractionInput from './FractionInput';
import { useOddsItems } from '../contexts/useOddsItems';
import { addItem } from '../../store/utils/thunkerFunctions';

export function generateUUID(digits = 15) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, any>
}

const ModalForm: FC<Props> = ({ navigation }) => {

    const { state, dispatch } = useClicker();
    const { state: oState, dispatch: oDispatch } = useOddsItems();

    const [formData, setFormData] = useState({
        oddsString: state.oddsString,
        title: state.title,
        denominator: `${state.fraction.denominator}`,
        numerator: `${state.fraction.numerator}`,
        isValid: true,
        multiplier: state.multiplier,
    });

    const percentButton = "Percentage";
    const fractionButton = "Fraction";
    const buttons = [percentButton, fractionButton];

    const clearForm = () => {
        const clearedForm = {
            oddsString: "50",
            title: formData.title,
            numerator: "1",
            denominator: "2",
            multiplier: "1",
            isValid: true,
        }
        setFormData(clearedForm)
        return clearedForm;
    }

    const validatePercent = (data: { oddsString: string, title: string }) => {
        const { oddsString, title } = data;

        if (oddsString.length < 1 || title.length < 1) {
            return false;
        }
        if (isNaN(parseFloat(oddsString))) {
            return false
        }
        if (parseFloat(oddsString) > 100) {
            return false
        }
        if (oddsString[0] === ".") {
            return false
        }

        return true
    }

    const validateFraction = (data: { denominator: string, numerator: string, multiplier: string, title: string }) => {
        const { denominator, numerator, title } = data;

        if (denominator.length < 1 && numerator.length < 1 && title.length < 1) {
            return false;
        }
        if (isNaN(parseFloat(denominator)) || isNaN(parseFloat(numerator))) {
            return false;
        }
        if (denominator.length >= 5 && numerator.length >= 3) {
            return false;
        }
        return true
    }

    const handleChanges = (data: { oddsString?: string, title?: string }) => {

        const tempForm = { ...formData, ...data };
        const { oddsString, title } = tempForm;

        if (validatePercent(tempForm)) {
            setFormData({ ...tempForm, isValid: true })
        } else {
            if (parseFloat(oddsString) > 100) {
                return
            }
            if (oddsString[0] === ".") {
                return
            }
            setFormData({ ...tempForm, isValid: false })
        }
    }

    const handleFractionChanges = (data: { denominator?: string, numerator?: string, multiplier?: string }) => {
        const tempForm = { ...formData, ...data };
        validateFraction(tempForm) ? setFormData({ ...tempForm, isValid: true }) : setFormData({ ...tempForm, isValid: false })
    }

    const handleTry = () => {
        if (state.fractionPref) {
            if (!validateFraction({ denominator: formData.denominator, multiplier: formData.multiplier, numerator: formData.numerator, title: formData.title })) {
                return
            }
            const payload = {
                title: formData.title,
                denominator: parseFloat(formData.denominator),
                numerator: parseFloat(formData.numerator),
                multiplier: formData.multiplier
            }
            dispatch!({ type: "UPDATE_FRACTION", payload })
        } else {
            if (!validatePercent({ oddsString: formData.oddsString, title: formData.title })) {
                return
            }
            const payload = {
                title: formData.title,
                oddsString: formData.oddsString,
                multiplier: formData.multiplier
            }
            dispatch!({ type: "UPDATE_PERCENT", payload })
        }
        navigation.goBack();
    }

    const handleSave = async () => {
        const payload: OddsItemInterface = {
            id: `OddsItem-${generateUUID()}`,
            title: formData.title,
            multiplier: formData.multiplier,
            fraction: {
                denominator: formData.denominator,
                numerator: formData.numerator,
            },
            fractionPref: "1",
        }
        if (state.fractionPref) {
            if (!validateFraction({ denominator: formData.denominator, multiplier: formData.multiplier, numerator: formData.numerator, title: formData.title })) {
                return
            }
            await addItem(oState, oDispatch, payload)
        } else {
            if (!validatePercent({ oddsString: formData.oddsString, title: formData.title })) {
                return
            }
            await addItem(oState, oDispatch, {
                ...payload,
                fraction: undefined,
                oddsString: formData.oddsString,
                fractionPref: "0"
            })
        }
    }

    return (
        <View testID='modalForm' style={styles.container}>

            <View style={styles.topRow}>
                {
                    state.fractionPref ?
                        <FractionInput
                            denominator={formData.denominator}
                            numerator={formData.numerator}
                            multiplier={formData.multiplier}
                            handleChanges={handleFractionChanges}
                        />
                        :
                        <PercentInput
                            oddsString={formData.oddsString}
                            changeText={handleChanges} />
                }
            </View>

            <TwoButtonGroup clearForm={clearForm} buttons={buttons} />

            <View style={styles.titleContainer}>
                <Input
                    placeholder='Title'
                    style={[styles.input, { fontSize: 22 }]}
                    inputContainerStyle={styles.inputContainer}
                    keyboardType='ascii-capable'
                    maxLength={30}
                    value={formData.title}
                    onChangeText={title => handleChanges({ title })}
                />
            </View>

            <SaveTryButtons showTry={formData.isValid} handleTry={handleTry} handleSave={handleSave} />

        </View>
    )
}

export default ModalForm

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 8,
        backgroundColor: "transparent"
    },
    topRow: {
        height: 60,
        marginBottom: 22,
        flexDirection: "row",
        marginHorizontal: 14,
        backgroundColor: "transparent"
    },
    input: {
        borderRadius: 16,
        fontSize: 44,
        fontWeight: "700",
        fontFamily: "Futura",
        textAlign: "center",
        height: 56,
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    titleContainer: {
        marginHorizontal: 14,
        height: 56,
        marginBottom: 26,
        backgroundColor: "transparent"
    }

})
