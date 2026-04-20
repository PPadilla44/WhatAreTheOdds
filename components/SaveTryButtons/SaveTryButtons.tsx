import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from "../Themed";
import Colors from '../../constants/Colors';


interface Props {
    showTry: boolean
    handleTry: () => void;
    handleSave: () => void;
}


const SaveTryButtons: FC<Props> = ({ showTry, handleSave, handleTry }) => {

    return (
        <View style={styles.container}>

            <TouchableOpacity testID='saveBtn'
                disabled={!showTry}
                lightColor={showTry ? Colors.shared.primaryDeep : Colors.light.input}
                darkColor={showTry ? Colors.shared.primaryDeep : Colors.dark.input}
                containerStyle={[styles.saveBtn, { opacity: showTry ? 1 : .5 }]}
                onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                testID='tryBtn'
                lightColor={showTry ? Colors.shared.primary : Colors.light.input}
                darkColor={showTry ? Colors.shared.primary : Colors.dark.input}
                containerStyle={styles.tryBtn}
                onPress={handleTry}
                disabled={!showTry}
            >
                <Text
                    lightColor={showTry ? "white" : Colors.light.mutedText}
                    darkColor={showTry ? "white" : Colors.dark.mutedText}
                    style={[styles.tryText, { opacity: showTry ? 1 : .6 }]} >
                    Try it
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default SaveTryButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "transparent",
        marginHorizontal: 10,
        gap: 12,
    },
    tryBtn: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
        elevation: 6,
    },
    tryText: {
        fontSize: 22,
        fontWeight: "700",
        color: "white",
        letterSpacing: 0.4,
    },
    saveBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        overflow: "hidden",
    },
    saveText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 0.4,
    }
})
