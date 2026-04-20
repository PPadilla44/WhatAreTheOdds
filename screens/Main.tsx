import { StyleSheet } from 'react-native';
import { ButtonGroup, View } from "../components/Themed";
import React, { FC } from 'react';
import SubContainer from '../components/SubContainer';
import ResetButton from '../components/ResetButton';
import MainButton from '../components/MainButton';
import { useClicker } from '../components/contexts/useClicker';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';


const Main: FC<RootTabScreenProps<"Root">> = ({ }) => {

    const { state, dispatch } = useClicker();
    const { count, oddsString, title, fraction, multiplier, fractionPref } = state;
    const { numerator, denominator } = fraction;

    return (
        <View testID='Main' style={styles.container}>

            <SubContainer
                text={`${count}`}
                textStyle={styles.clickAmnt}
                title={`Times Clicked`}
            />

            <MainButton />

            <View style={styles.bottomSection}>

                <SubContainer
                    text={
                        multiplier === "B" || multiplier === "M" ?
                            `${numerator} / ${denominator} ${multiplier}`
                            :
                            fractionPref ?
                                `${numerator} / ${denominator * parseInt(multiplier)}`
                                :
                                `${oddsString}%`
                    }
                    textStyle={styles.probText}
                    title={title}
                />

                <ButtonGroup
                    buttons={["Percent", "Fraction"]}
                    onPress={(newIndex: number) => dispatch!({ type: "SET_FRACTIONPREF", payload: newIndex })}
                    selectedIndex={multiplier === "B" || multiplier === "M" ? 1 : fractionPref}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    textStyle={styles.btnText}
                    selectedButtonStyle={styles.selectedBtn}
                    selectedTextStyle={styles.btnSelectedText}
                    disabled={multiplier === "B" || multiplier === "M"}
                    disabledSelectedTextStyle={{ color: Colors.shared.primary }}
                    disabledSelectedStyle={{ backgroundColor: "transparent" }}
                    innerBorderStyle={{ color: "transparent" }}
                />
            </View>

            <ResetButton />

        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },
    bottomSection: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    clickAmnt: {
        fontWeight: "800",
        fontSize: 72,
        fontFamily: "Futura",
        letterSpacing: -2,
    },
    probText: {
        fontWeight: "700",
        fontSize: 44,
        textAlign: "center",
        fontFamily: "Futura",
        letterSpacing: -0.5,
    },
    btnContainer: {
        height: 26,
        marginTop: 10,
        borderColor: "transparent",
        backgroundColor: "transparent",
        width: 240,
    },
    btn: {
        backgroundColor: "transparent",
    },
    btnText: {
        fontFamily: "Futura",
        fontSize: 13,
        letterSpacing: 1.6,
        fontWeight: "600",
        color: Colors.light.mutedText,
        textTransform: "uppercase",
    },
    selectedBtn: {
        backgroundColor: "transparent",
    },
    btnSelectedText: {
        color: Colors.shared.primary,
        fontWeight: "700",
    }
})
