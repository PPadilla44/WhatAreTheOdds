import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { RootStackScreenProps } from '../types';
import { View, Text } from '../components/Themed';
import Radio from '../components/Radio';
import Colors from '../constants/Colors';

const Settings: FC<RootStackScreenProps<"Settings">> = ({ }) => {


    return (
        <View style={styles.container}>

            <Text style={styles.sectionLabel}>Appearance</Text>
            <Text style={styles.hint}>Choose how the app looks. Auto follows your device settings.</Text>
            <Radio />


        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionLabel: {
        fontSize: 13,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontWeight: "700",
        color: Colors.shared.primary,
        marginBottom: 6,
        marginLeft: 4,
    },
    hint: {
        fontSize: 14,
        marginBottom: 16,
        marginLeft: 4,
        opacity: 0.6,
    },
})
