import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { View, Text } from "../Themed";
import React, { FC } from 'react';
import Colors from "../../constants/Colors";

export interface Props {
    textStyle: StyleProp<TextStyle>
    title: string,
    text: string
}

const SubContainer: FC<Props> = ({ textStyle, title, text }) => {
    return (
        <View testID='SubContainer' style={styles.subContainer}>
            <Text testID='title' style={styles.title}>{title}</Text>
            <Text testID='text' style={[styles.text, textStyle]}>{text}</Text>
        </View>
    )
}

export default SubContainer

const styles = StyleSheet.create({
    subContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        paddingVertical: 4,
    },
    title: {
        fontWeight: "600",
        fontSize: 13,
        textAlign: "center",
        fontFamily: "Futura",
        color: Colors.shared.primary,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 6,
    },
    text: {
        textAlign: "center",
    }
})
