import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import MultiplierModal from './MultiplierModal'


export interface Props {
    denominator: string;
    numerator: string;
    handleChanges: (data: {}) => void;
    multiplier: string;
}

const FractionInput: FC<Props> = ({ denominator, numerator, handleChanges, multiplier }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [focus, setFocus] = useState<'num' | 'den' | null>(null);

    const multLabel = multiplier === 'B' ? '× Billion'
        : multiplier === 'M' ? '× Million'
            : multiplier === '1' ? '× 1'
                : `× ${multiplier}`;

    return (
        <>
            <View style={[styles.card, focus && styles.cardFocused]}>
                <TextInput
                    testID='numeratorInput'
                    style={styles.numInput}
                    keyboardType="number-pad"
                    placeholder="1"
                    placeholderTextColor={Colors.light.mutedText}
                    maxLength={2}
                    value={numerator}
                    onFocus={() => setFocus('num')}
                    onBlur={() => setFocus(null)}
                    onChangeText={(v) => handleChanges({ numerator: v })}
                    selectTextOnFocus
                />
                <Text style={styles.slash}>/</Text>
                <TextInput
                    testID='denominatorInput'
                    style={styles.denInput}
                    keyboardType="number-pad"
                    placeholder="4"
                    placeholderTextColor={Colors.light.mutedText}
                    maxLength={4}
                    value={denominator}
                    onFocus={() => setFocus('den')}
                    onBlur={() => setFocus(null)}
                    onChangeText={(v) => handleChanges({ denominator: v })}
                    selectTextOnFocus
                />
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={({ pressed }) => [styles.multPill, { opacity: pressed ? 0.75 : 1 }]}
                >
                    <Text style={styles.multText}>{multLabel}</Text>
                </Pressable>
            </View>

            <MultiplierModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                mult={multiplier}
                handleChanges={handleChanges}
            />
        </>
    )
}

export default FractionInput

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 1.5,
        borderColor: 'rgba(37,99,235,0.22)',
        borderRadius: 18,
        gap: 8,
    },
    cardFocused: {
        borderColor: Colors.shared.primary,
        backgroundColor: 'rgba(37,99,235,0.14)',
    },
    numInput: {
        minWidth: 52,
        fontSize: 40,
        fontFamily: Fonts.displayExtraBold,
        color: '#FFFFFF',
        textAlign: 'right',
        letterSpacing: -1,
        paddingVertical: 0,
    },
    slash: {
        fontSize: 40,
        fontFamily: Fonts.displayBold,
        color: Colors.shared.primary,
    },
    denInput: {
        minWidth: 70,
        fontSize: 40,
        fontFamily: Fonts.displayExtraBold,
        color: '#FFFFFF',
        textAlign: 'left',
        letterSpacing: -1,
        paddingVertical: 0,
    },
    multPill: {
        marginLeft: 8,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        backgroundColor: Colors.shared.primary,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    multText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.4,
    },
})
