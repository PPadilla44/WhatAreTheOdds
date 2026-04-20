import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';

interface Props {
    callback: () => any;
}

const RightSwipe: FC<Props> = ({ callback }) => {
    return (
        <TouchableOpacity testID='rightSwipeBtn' onPress={callback} containerStyle={styles.btn}>
            <Text style={styles.txt}>Delete</Text>
        </TouchableOpacity>
    );
};

export default RightSwipe

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.light.danger,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 4,
    },
    txt: {
        color: 'white',
        fontWeight: '700',
        paddingHorizontal: 28,
        fontSize: 18,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        fontFamily: 'Futura',
    }
})
