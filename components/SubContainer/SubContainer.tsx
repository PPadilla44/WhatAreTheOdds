import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { View, Text } from "../Themed";
import React, { FC, useEffect, useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export interface Props {
    textStyle: StyleProp<TextStyle>
    title: string,
    text: string,
    animate?: boolean
}

const SubContainer: FC<Props> = ({ textStyle, title, text, animate = true }) => {

    const scale = useSharedValue(1);
    const prevText = useRef(text);

    useEffect(() => {
        if (!animate) return;
        if (prevText.current !== text) {
            prevText.current = text;
            scale.value = withSequence(
                withTiming(1.12, { duration: 110, easing: Easing.out(Easing.quad) }),
                withSpring(1, { damping: 7, stiffness: 240 }),
            );
        }
    }, [text, animate]);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View testID='SubContainer' style={styles.subContainer}>
            <Text testID='title' style={styles.title}>{title}</Text>
            <Animated.View style={animStyle}>
                <Text testID='text' style={[styles.text, textStyle]}>{text}</Text>
            </Animated.View>
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
        fontWeight: "700",
        fontSize: 12,
        textAlign: "center",
        fontFamily: Fonts.bodyBold,
        color: Colors.shared.primary,
        letterSpacing: 3,
        textTransform: "uppercase",
        marginBottom: 10,
        opacity: 0.9,
    },
    text: {
        textAlign: "center",
    }
})
