import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { FC } from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';


interface Props {
    showTry: boolean;
    handleTry: () => void;
    handleSave: () => void;
}


const SaveTryButtons: FC<Props> = ({ showTry, handleSave, handleTry }) => {

    return (
        <View style={styles.container}>
            <Pressable
                testID='saveBtn'
                onPress={handleSave}
                disabled={!showTry}
                style={({ pressed }) => [
                    styles.saveBtn,
                    !showTry && styles.btnDisabled,
                    pressed && showTry ? { opacity: 0.75 } : null,
                ]}
            >
                <Feather name="bookmark" size={16} color={showTry ? Colors.shared.primary : Colors.light.mutedText} />
                <Text style={[styles.saveText, { color: showTry ? Colors.shared.primary : Colors.light.mutedText }]}>Save</Text>
            </Pressable>

            <Pressable
                testID='tryBtn'
                onPress={handleTry}
                disabled={!showTry}
                style={({ pressed }) => [
                    styles.tryBtn,
                    !showTry && styles.btnDisabled,
                    pressed && showTry ? { opacity: 0.88, transform: [{ scale: 0.98 }] } : null,
                ]}
            >
                <Feather name="target" size={16} color="#FFFFFF" />
                <Text style={styles.tryText}>Try it</Text>
            </Pressable>
        </View>
    )
}

export default SaveTryButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 14,
        gap: 10,
    },
    saveBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: 54,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(37,99,235,0.28)',
        backgroundColor: 'rgba(37,99,235,0.08)',
    },
    saveText: {
        fontSize: 15,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.4,
    },
    tryBtn: {
        flex: 2,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        height: 54,
        borderRadius: 16,
        backgroundColor: Colors.shared.primary,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 8,
    },
    tryText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.4,
    },
    btnDisabled: {
        opacity: 0.5,
    },
})
