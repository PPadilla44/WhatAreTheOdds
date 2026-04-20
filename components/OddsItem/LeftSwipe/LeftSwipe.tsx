import { StyleSheet, Text } from 'react-native'
import React, { FC } from 'react'
import Colors from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    callback: () => any;
}

const LeftSwipe: FC<Props> = ({ callback }) => {
    return (
        <TouchableOpacity testID='leftSwipeBtn' onPress={callback} containerStyle={styles.btn}>
            <Text style={styles.txt}>Share</Text>
        </TouchableOpacity>
    );
};

export default LeftSwipe

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.shared.primary,
        justifyContent: 'center',
        alignItems: "flex-start",
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
