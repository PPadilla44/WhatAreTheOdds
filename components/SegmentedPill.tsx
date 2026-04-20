import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

interface Props {
    options: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
    disabled?: boolean;
    width?: number;
    testID?: string;
}

/**
 * Modern segmented pill – rounded container, animated blue highlight that
 * slides under the active tab. No borders, uppercase labels, tight kerning.
 */
const SegmentedPill: React.FC<Props> = ({ options, selectedIndex, onChange, disabled, width = 260, testID }) => {

    const PAD = 4;
    const innerW = width - PAD * 2;
    const tabW = innerW / options.length;

    const translate = useSharedValue(selectedIndex * tabW);

    useEffect(() => {
        translate.value = withSpring(selectedIndex * tabW, { damping: 18, stiffness: 220, mass: 0.8 });
    }, [selectedIndex, tabW]);

    const highlightStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translate.value }],
        width: tabW,
    }));

    return (
        <View style={[styles.container, { width, opacity: disabled ? 0.55 : 1 }]} testID={testID}>
            <Animated.View style={[styles.highlight, highlightStyle]} pointerEvents="none" />
            {options.map((label, i) => {
                const active = i === selectedIndex;
                return (
                    <Pressable
                        key={label}
                        style={[styles.tab, { width: tabW }]}
                        onPress={() => !disabled && onChange(i)}
                        disabled={disabled}
                    >
                        <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default SegmentedPill;

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 999,
        backgroundColor: 'rgba(148,163,184,0.12)', // slate-400 alpha
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        alignSelf: 'center',
        position: 'relative',
    },
    highlight: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        borderRadius: 999,
        backgroundColor: Colors.shared.primary,
        shadowColor: Colors.shared.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
    },
    tab: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    label: {
        fontSize: 12,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        fontFamily: Fonts.bodyBold,
    },
    labelActive: {
        color: '#FFFFFF',
    },
    labelInactive: {
        color: Colors.light.mutedText,
    },
});
