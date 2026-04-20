import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { FC, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { OddsItemInterface, RootStackParamList } from '../../types';
import { useClicker } from '../contexts/useClicker';
import { useOddsItems } from '../contexts/useOddsItems';
import { addItem } from '../../store/utils/thunkerFunctions';

import SegmentedPill from '../SegmentedPill';
import PercentInput from './PercentInput';
import FractionInput from './FractionInput';
import SaveTryButtons from '../SaveTryButtons';

export function generateUUID(digits = 15) {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, any>;
}

const ModalForm: FC<Props> = ({ navigation }) => {

    const { state, dispatch } = useClicker();
    const { state: oState, dispatch: oDispatch } = useOddsItems();
    const [titleFocused, setTitleFocused] = useState(false);

    const [formData, setFormData] = useState({
        oddsString: state.oddsString,
        title: state.title,
        denominator: `${state.fraction.denominator}`,
        numerator: `${state.fraction.numerator}`,
        isValid: true,
        multiplier: state.multiplier,
    });

    // -------- Live hint: translate between % ↔ "1 in X" ----------
    const hint = useMemo(() => {
        if (state.fractionPref) {
            const n = parseFloat(formData.numerator);
            let d = parseFloat(formData.denominator);
            if (!n || !d) return '';
            if (formData.multiplier === 'M') d = d * 1e6;
            else if (formData.multiplier === 'B') d = d * 1e9;
            else d = d * Math.max(1, parseFloat(formData.multiplier) || 1);
            const pct = (n / d) * 100;
            if (pct >= 0.01) return `≈ ${pct.toFixed(2).replace(/\.?0+$/, '')}% chance`;
            return `≈ 1 in ${Math.round(d / n).toLocaleString()} chance`;
        }
        const pct = parseFloat(formData.oddsString);
        if (!pct || pct <= 0) return '';
        const oneIn = Math.round(100 / pct);
        return pct >= 1 ? `≈ 1 in ${oneIn} chance` : `≈ 1 in ${Math.round(1 / (pct / 100))} chance`;
    }, [formData, state.fractionPref]);

    // -------- Form handlers (validation logic preserved) ---------
    const clearForm = () => {
        const clearedForm = {
            oddsString: '50',
            title: formData.title,
            numerator: '1',
            denominator: '2',
            multiplier: '1',
            isValid: true,
        };
        setFormData(clearedForm);
        return clearedForm;
    };

    const validatePercent = (d: { oddsString: string; title: string }) => {
        if (d.oddsString.length < 1 || d.title.length < 1) return false;
        if (isNaN(parseFloat(d.oddsString))) return false;
        if (parseFloat(d.oddsString) > 100) return false;
        if (d.oddsString[0] === '.') return false;
        return true;
    };

    const validateFraction = (d: { denominator: string; numerator: string; title: string }) => {
        if (d.denominator.length < 1 || d.numerator.length < 1 || d.title.length < 1) return false;
        if (isNaN(parseFloat(d.denominator)) || isNaN(parseFloat(d.numerator))) return false;
        if (d.denominator.length >= 5 && d.numerator.length >= 3) return false;
        return true;
    };

    const handleChanges = (data: { oddsString?: string; title?: string }) => {
        const next = { ...formData, ...data };
        const { oddsString } = next;
        if (validatePercent(next)) {
            setFormData({ ...next, isValid: true });
        } else {
            if (parseFloat(oddsString) > 100) return;
            if (oddsString[0] === '.') return;
            setFormData({ ...next, isValid: false });
        }
    };

    const handleFractionChanges = (data: { denominator?: string; numerator?: string; multiplier?: string }) => {
        const next = { ...formData, ...data };
        setFormData({ ...next, isValid: validateFraction(next) });
    };

    // Toggle percent/fraction with reset guard when multiplier or denom would break
    const handleSwitch = (index: number) => {
        if (index === 0 && isNaN(parseInt(formData.multiplier))) {
            const cleared = clearForm();
            dispatch!({ type: 'SET_STATE', payload: { ...cleared, fraction: { denominator: parseInt(cleared.denominator), numerator: parseInt(cleared.numerator) } } });
        }
        if (index === 1 && formData.denominator.toString().length > 4) {
            const cleared = clearForm();
            dispatch!({ type: 'SET_STATE', payload: { ...cleared, fraction: { denominator: parseInt(cleared.denominator), numerator: parseInt(cleared.numerator) } } });
        }
        dispatch!({ type: 'SET_FRACTIONPREF', payload: index });
    };

    const handleTry = () => {
        if (state.fractionPref) {
            if (!validateFraction(formData)) return;
            dispatch!({
                type: 'UPDATE_FRACTION',
                payload: {
                    title: formData.title,
                    denominator: parseFloat(formData.denominator),
                    numerator: parseFloat(formData.numerator),
                    multiplier: formData.multiplier,
                },
            });
        } else {
            if (!validatePercent(formData)) return;
            dispatch!({
                type: 'UPDATE_PERCENT',
                payload: { title: formData.title, oddsString: formData.oddsString, multiplier: formData.multiplier },
            });
        }
        navigation.goBack();
    };

    const handleSave = async () => {
        const payload: OddsItemInterface = {
            id: `OddsItem-${generateUUID()}`,
            title: formData.title,
            multiplier: formData.multiplier,
            fraction: { denominator: formData.denominator, numerator: formData.numerator },
            fractionPref: '1',
        };
        if (state.fractionPref) {
            if (!validateFraction(formData)) return;
            await addItem(oState, oDispatch, payload);
        } else {
            if (!validatePercent(formData)) return;
            await addItem(oState, oDispatch, { ...payload, fraction: undefined, oddsString: formData.oddsString, fractionPref: '0' });
        }
    };

    return (
        <View testID='modalForm' style={styles.container}>

            {/* Odds type toggle */}
            <View style={styles.sectionHead}>
                <Text style={styles.sectionLabel}>Odds type</Text>
            </View>
            <View style={styles.pillWrap}>
                <SegmentedPill
                    options={['Percentage', 'Fraction']}
                    selectedIndex={state.fractionPref}
                    onChange={handleSwitch}
                    width={300}
                />
            </View>

            {/* Odds value */}
            <View style={styles.sectionHead}>
                <Text style={styles.sectionLabel}>Chance of hitting</Text>
            </View>
            <View style={styles.inputRow}>
                {state.fractionPref ? (
                    <FractionInput
                        denominator={formData.denominator}
                        numerator={formData.numerator}
                        multiplier={formData.multiplier}
                        handleChanges={handleFractionChanges}
                    />
                ) : (
                    <PercentInput oddsString={formData.oddsString} changeText={handleChanges} />
                )}
            </View>
            {hint ? <Text style={styles.hint}>{hint}</Text> : <Text style={styles.hintPlaceholder}>Enter a value above</Text>}

            {/* Name / title */}
            <View style={styles.sectionHead}>
                <Text style={styles.sectionLabel}>Name</Text>
            </View>
            <View style={[styles.titleCard, titleFocused && styles.titleCardFocused]}>
                <Feather name="tag" size={16} color={Colors.shared.primary} />
                <TextInput
                    placeholder="What Are The Odds?"
                    placeholderTextColor={Colors.light.mutedText}
                    style={styles.titleInput}
                    maxLength={30}
                    value={formData.title}
                    onFocus={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                    onChangeText={(title) => handleChanges({ title })}
                />
            </View>

            <View style={{ height: 20 }} />
            <SaveTryButtons showTry={formData.isValid} handleTry={handleTry} handleSave={handleSave} />
        </View>
    );
};

export default ModalForm;

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 24,
        backgroundColor: 'transparent',
    },
    sectionHead: {
        marginTop: 18,
        marginBottom: 10,
        marginHorizontal: 22,
    },
    sectionLabel: {
        fontSize: 11,
        letterSpacing: 2.2,
        textTransform: 'uppercase',
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
        opacity: 0.8,
    },
    pillWrap: {
        alignItems: 'center',
        marginBottom: 6,
    },
    inputRow: {
        flexDirection: 'row',
        marginHorizontal: 14,
    },
    hint: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 13,
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyMedium,
        opacity: 0.9,
    },
    hintPlaceholder: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 13,
        color: Colors.light.mutedText,
        fontFamily: Fonts.bodyRegular,
        opacity: 0.7,
    },
    titleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 14,
        paddingHorizontal: 16,
        height: 54,
        borderRadius: 16,
        backgroundColor: 'rgba(37,99,235,0.06)',
        borderWidth: 1.5,
        borderColor: 'rgba(37,99,235,0.18)',
    },
    titleCardFocused: {
        borderColor: Colors.shared.primary,
        backgroundColor: 'rgba(37,99,235,0.12)',
    },
    titleInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: Fonts.bodyMedium,
    },
});
