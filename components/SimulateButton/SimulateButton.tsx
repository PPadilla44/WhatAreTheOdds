import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { useClicker } from '../contexts/useClicker'
import { Button } from '@rneui/themed'

const SimulateButton = () => {

    const { state, dispatch } = useClicker();
    const { didHit, loading } = state;
    const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

    const simulate = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            dispatch!({ type: "SET_LOADING", payload: false })
            return;
        }

        if (!didHit) {
            dispatch!({ type: "SET_LOADING", payload: true })
            const newInterval = setInterval(() => {
                dispatch!({ type: "INCREASE" });
            }, 10);

            setIntervalId(newInterval);
        }
    };

    useEffect(() => {
        if (didHit) {
            dispatch!({ type: "SET_LOADING", payload: false });
            clearInterval(intervalId as ReturnType<typeof setInterval>);
            setIntervalId(null);
        }
    }, [didHit])

    return (
        <Button
            testID='simBtn'
            title={loading ? "Cancel" : "Simulate"}
            onPress={simulate}
            activeOpacity={.6}
            titleStyle={[{ color: loading ? Colors.light.danger : Colors.shared.primary }, styles.simText]}
            buttonStyle={{ backgroundColor: undefined, paddingVertical: 8, paddingHorizontal: 14 }}
            disabled={didHit}
            disabledStyle={{ backgroundColor: "transparent" }}
            disabledTitleStyle={{ opacity: .3 }}
        />
    )
}

export default SimulateButton

const styles = StyleSheet.create({
    simText: {
        fontSize: 15,
        fontWeight: "700",
        fontFamily: Fonts.bodyBold,
        letterSpacing: 1,
        textTransform: "uppercase",
    }
})
