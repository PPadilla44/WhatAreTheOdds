import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Input, View } from '../../Themed'
import { TextAsIcon } from '../../UI'
import Colors from '../../../constants/Colors'


export interface Props {
    oddsString: string;
    changeText: (data: {}) => void;
}
const PercentInput: FC<Props> = ({ changeText, oddsString }) => {

    return (
        <>
            <View style={styles.percentWrapper}>
                <Input
                    testID='percentInput'
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    keyboardType="numeric"
                    placeholder={"1.0"}
                    maxLength={10}
                    value={oddsString}
                    onChangeText={oddsString => changeText({ oddsString })}
                />
            </View>
            <View style={styles.percentIconContainer}>
                <TextAsIcon style={{ fontSize: 44, fontWeight: "700", color: Colors.shared.primary }} text={'%'} />
            </View>
        </>
    )
}

export default PercentInput

const styles = StyleSheet.create({
    percentWrapper: {
        flex: 1,
        backgroundColor: "transparent"
    },
    input: {
        borderRadius: 16,
        fontSize: 44,
        fontWeight: "700",
        fontFamily: "Futura",
        textAlign: "center",
        height: 60,
        letterSpacing: -0.5,
    },
    percentIconContainer: {
        height: 60,
        marginLeft: 10,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
})
