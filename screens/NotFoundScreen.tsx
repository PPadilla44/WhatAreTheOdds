import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>404</Text>
            <Text style={styles.title}>This screen doesn't exist.</Text>
            <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
                <Text style={styles.linkText}>Go to home screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    emoji: {
        fontSize: 72,
        fontWeight: "800",
        letterSpacing: 4,
        color: Colors.shared.primary,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        opacity: 0.75,
    },
    link: {
        marginTop: 24,
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: 999,
        backgroundColor: Colors.shared.primary,
    },
    linkText: {
        fontSize: 15,
        color: 'white',
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});
