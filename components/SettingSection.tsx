import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import useColorScheme from '../hooks/useColorScheme';

interface Props {
    title: string;
    children: React.ReactNode;
    footer?: string;
}

/**
 * Grouped settings section – uppercase accent label + a rounded card that
 * holds the rows. Divides rows with subtle hairlines handled by the card
 * layout (rows placed back-to-back).
 */
const SettingSection: React.FC<Props> = ({ title, children, footer }) => {
    const theme = useColorScheme() ?? 'dark';
    const surface = theme === 'dark' ? Colors.dark.surface : Colors.light.surface;
    const border = theme === 'dark' ? Colors.dark.border : Colors.light.border;

    // Inject dividers between children (excluding last)
    const items = React.Children.toArray(children);

    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
                {items.map((child, i) => (
                    <View key={i}>
                        {child}
                        {i < items.length - 1 ? (
                            <View style={[styles.divider, { backgroundColor: border }]} />
                        ) : null}
                    </View>
                ))}
            </View>
            {footer ? <Text style={styles.footer}>{footer}</Text> : null}
        </View>
    );
};

export default SettingSection;

const styles = StyleSheet.create({
    wrap: {
        marginBottom: 24,
    },
    title: {
        fontSize: 11,
        letterSpacing: 2.2,
        textTransform: 'uppercase',
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
        marginBottom: 8,
        marginLeft: 18,
        opacity: 0.85,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 62,
        opacity: 0.7,
    },
    footer: {
        fontSize: 11,
        color: Colors.light.mutedText,
        marginTop: 6,
        marginLeft: 18,
        fontFamily: Fonts.bodyRegular,
    }
});
