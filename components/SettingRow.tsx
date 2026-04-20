import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import useColorScheme from '../hooks/useColorScheme';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

interface Props {
    icon: FeatherName;
    label: string;
    description?: string;
    onPress?: () => void;
    destructive?: boolean;
    trailing?: React.ReactNode;
    disabled?: boolean;
}

/**
 * A single tappable settings row – icon chip on the left, label + optional
 * description in the middle, chevron or custom trailing on the right.
 */
const SettingRow: React.FC<Props> = ({ icon, label, description, onPress, destructive, trailing, disabled }) => {
    const theme = useColorScheme() ?? 'dark';
    const fg = destructive ? Colors.light.danger : Colors.shared.primary;
    const labelColor = destructive ? Colors.light.danger : (theme === 'dark' ? Colors.dark.text : Colors.light.text);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || !onPress}
            style={({ pressed }) => [
                styles.row,
                { opacity: disabled ? 0.45 : (pressed ? 0.7 : 1) },
            ]}
        >
            <View style={[styles.iconWrap, { backgroundColor: destructive ? 'rgba(239,68,68,0.12)' : 'rgba(37,99,235,0.12)', borderColor: destructive ? 'rgba(239,68,68,0.25)' : 'rgba(37,99,235,0.22)' }]}>
                <Feather name={icon} size={15} color={fg} />
            </View>
            <View style={styles.textWrap}>
                <Text style={[styles.label, { color: labelColor }]} numberOfLines={1}>{label}</Text>
                {description ? (
                    <Text style={styles.desc} numberOfLines={2}>{description}</Text>
                ) : null}
            </View>
            {trailing ?? (onPress ? (
                <Feather name="chevron-right" size={18} color={Colors.light.mutedText} />
            ) : null)}
        </Pressable>
    );
};

export default SettingRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 14,
    },
    iconWrap: {
        width: 32,
        height: 32,
        borderRadius: 999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrap: {
        flex: 1,
    },
    label: {
        fontSize: 15,
        fontFamily: Fonts.bodySemiBold,
        letterSpacing: 0.1,
    },
    desc: {
        fontSize: 12,
        color: Colors.light.mutedText,
        marginTop: 2,
        fontFamily: Fonts.bodyRegular,
    },
});
