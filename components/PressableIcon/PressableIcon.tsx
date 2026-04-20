import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Feather } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

type FeatherName = React.ComponentProps<typeof Feather>['name'];

interface Props {
    callBack: () => any,
    name: FeatherName,
    size?: number,
    color?: string,
    hitSlop?: number,
}

/**
 * Modern pressable icon with soft subtle hover / press feedback.
 * Uses Feather icon set from @expo/vector-icons for a consistent, clean look
 * across the entire app.
 */
const PressableIcon: FC<Props> = ({ callBack, name, size = 22, color = Colors.shared.primary, hitSlop = 8 }) => {
    return (
        <Pressable
            testID='pressableIconBtn'
            onPress={callBack}
            hitSlop={hitSlop}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.45 : 1 }]}
        >
            <View style={styles.inner}>
                <Feather testID='pressableIcon' name={name} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default PressableIcon

const styles = StyleSheet.create({
    btn: {
        padding: 8,
        borderRadius: 999,
    },
    inner: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: 'rgba(37,99,235,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(37,99,235,0.22)',
    }
})
