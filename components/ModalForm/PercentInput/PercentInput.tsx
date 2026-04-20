import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { FC, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'


export interface Props {
    oddsString: string;
    changeText: (data: {}) => void;
}

const PercentInput: FC<Props> = ({ changeText, oddsString }) => {

    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.card, focused && styles.cardFocused]}>
            <TextInput
                testID='percentInput'
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="25"
                placeholderTextColor={Colors.light.mutedText}
                maxLength={10}
                value={oddsString}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChangeText={(v) => changeText({ oddsString: v })}
                selectTextOnFocus
            />
            <Text style={styles.unit}>%</Text>
        </View>
    )
}

export default PercentInput

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 1.5,
        borderColor: 'rgba(37,99,235,0.22)',
        borderRadius: 18,
        gap: 6,
    },
    cardFocused: {
        borderColor: Colors.shared.primary,
        backgroundColor: 'rgba(37,99,235,0.14)',
    },
    input: {
        minWidth: 70,
        fontSize: 44,
        fontFamily: Fonts.displayExtraBold,
        color: '#FFFFFF',
        textAlign: 'right',
        letterSpacing: -1,
        paddingVertical: 0,
    },
    unit: {
        fontSize: 40,
        fontFamily: Fonts.displayBold,
        color: Colors.shared.primary,
        letterSpacing: -1,
    },
})
