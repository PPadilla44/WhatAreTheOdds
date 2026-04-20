import { Alert, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";
import { View } from "../../components/Themed";
import React from 'react';
import { useClicker } from '../contexts/useClicker';
import Colors from '../../constants/Colors';

const ResetButton = () => {

    const { state, dispatch } = useClicker();

    const { didHit } = state;

    const resetAll = () => dispatch!({ type: 'RESET' })

    const createTwoButtonAlert = () => (

        Alert.alert(
            "Reset",
            "Are you sure you would like to reset?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", style: "destructive", onPress: resetAll }
            ]
        ));

    return (
        <View testID='resetWrapper' style={[styles.btn, { opacity: didHit ? 1 : 0.45 }]}>
            <Button
                testID='resetBtn'
                title='Reset'
                onPress={createTwoButtonAlert}
                titleStyle={{
                    color: didHit ? Colors.light.danger : Colors.light.mutedText,
                    fontFamily: "Futura",
                    fontWeight: "700",
                    letterSpacing: 1,
                    fontSize: 14,
                    textTransform: "uppercase",
                }}
                buttonStyle={{ backgroundColor: undefined, paddingVertical: 10, paddingHorizontal: 18 }}
                disabled={state.loading}
                disabledStyle={{ backgroundColor: "transparent" }}
                disabledTitleStyle={{ opacity: .3 }}
                activeOpacity={.6}

            />
        </View>
    )
}

export default ResetButton

const styles = StyleSheet.create({
    btn: {
        position: "absolute",
        left: 14,
        bottom: 14,
    }
})
