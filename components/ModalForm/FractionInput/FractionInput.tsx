import { StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { TextAsIcon } from '../../UI';
import { TouchableOpacity, View, Text, Input } from '../../Themed';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import MultiplierModal from './MultiplierModal';


export interface Props {
    denominator: string;
    numerator: string;
    handleChanges: (data: {}) => void;
    multiplier: string;
}

const FractionInput: FC<Props> = ({ denominator, numerator, handleChanges, multiplier }) => {


    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>

            <View style={{ flex: 2, backgroundColor: "transparent" }}>
                <Input
                    testID='numeratorInput'
                    keyboardType="number-pad"
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    placeholder='1'
                    maxLength={2}
                    value={numerator}
                    onChangeText={numerator => handleChanges({ numerator })}
                />
            </View>
            <View style={{ marginHorizontal: 10, backgroundColor: "transparent", height: 60, justifyContent: "center" }}>
                <TextAsIcon style={{ fontSize: 44, fontWeight: "700", color: Colors.shared.primary }} text={'/'} />
            </View>
            <View style={{ flex: 3, backgroundColor: "transparent" }}>
                <Input
                    testID='denominatorInput'
                    keyboardType="number-pad"
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    placeholder='10'
                    maxLength={4}
                    value={denominator}
                    onChangeText={denominator => handleChanges({ denominator })}
                />
            </View>
            <TouchableOpacity
                darkColor={Colors.shared.primary}
                lightColor={Colors.shared.primary}
                onPress={() => setModalVisible(true)}
                containerStyle={styles.multBtn}
            >
                <Text darkColor={"white"} lightColor={"white"} style={styles.multText}>×{multiplier}</Text>
            </TouchableOpacity>

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
    input: {
        borderRadius: 16,
        fontSize: 44,
        fontWeight: "700",
        fontFamily: Fonts.bodyBold,
        textAlign: "center",
        height: 60,
        overflow: "visible",
        letterSpacing: -0.5,
    },
    inputContainer: {
        borderBottomWidth: 0,
        overflow: "visible"
    },
    multBtn: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginHorizontal: 8,
        borderRadius: 12,
        minWidth: 58,
        paddingHorizontal: 10,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    multText: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    }
})
