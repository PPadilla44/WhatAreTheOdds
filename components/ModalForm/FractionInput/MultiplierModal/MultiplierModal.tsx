import { Alert, Modal, Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Text, View } from "../../../Themed"
import Colors from '../../../../constants/Colors';

import Fonts from '../../../../constants/Fonts';

interface Props {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    mult: string;
    handleChanges: (data: {}) => void;
}

const MultiplierModal: FC<Props> = ({ modalVisible, setModalVisible, mult, handleChanges }) => {

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>

            <View darkColor="rgba(0,0,0,0.55)" lightColor="rgba(15,23,42,0.35)" style={styles.centeredView}>
                <View darkColor={Colors.dark.surface} lightColor={Colors.light.surface} style={styles.modalView}>
                    <Text style={styles.title}>Select a multiplier</Text>
                    <Text style={styles.subtitle}>Applies to denominator</Text>
                    <Picker
                        selectedValue={mult}
                        onValueChange={(multiplier, _index) => handleChanges({ multiplier })}
                        style={{
                            width: 300,
                            justifyContent: "center"
                        }}
                        itemStyle={{
                            fontFamily: Fonts.bodyBold,
                            fontWeight: "600"
                        }}
                    >
                        <Picker.Item label="× 1" value="1" />
                        <Picker.Item label="× 10" value="10" />
                        <Picker.Item label="× M (million)" value="M" />
                        <Picker.Item label="× B (billion)" value="B" />
                    </Picker>
                    <Pressable
                        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1 }]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Confirm</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>

    );

}

export default MultiplierModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 8,
        minWidth: 320,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        marginBottom: 2,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 13,
        opacity: 0.6,
        marginBottom: 8,
    },
    button: {
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: Colors.shared.primary,
        marginTop: 6,
    },
    textStyle: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
        fontSize: 15,
    },
});
