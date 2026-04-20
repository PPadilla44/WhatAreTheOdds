import { StyleSheet } from 'react-native';
import { ButtonGroup, View } from "../components/Themed";
import React, { FC } from 'react';
import SubContainer from '../components/SubContainer';
import ResetButton from '../components/ResetButton';
import MainButton from '../components/MainButton';
import BackgroundAmbient from '../components/BackgroundAmbient';
import { useClicker } from '../components/contexts/useClicker';
import { useSettings } from '../components/contexts/useSettings';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';


const Main: FC<RootTabScreenProps<"Root">> = ({ }) => {

    const { state, dispatch } = useClicker();
    const { state: settings } = useSettings();
    const { count, oddsString, title, fraction, multiplier, fractionPref } = state;
    const { numerator, denominator } = fraction;

    const theme = (settings.data.appearance.appearance as 'light' | 'dark') ?? 'dark';

    return (
        <View testID='Main' style={styles.container}>
            <BackgroundAmbient theme={theme} />

            <View style={styles.topSection} darkColor="transparent" lightColor="transparent">
                <SubContainer
                    text={`${count}`}
                    textStyle={styles.clickAmnt}
                    title={`Times Clicked`}
                />
            </View>

            <View style={styles.centerSection} darkColor="transparent" lightColor="transparent">
                <MainButton />
            </View>

            <View style={styles.bottomSection} darkColor="transparent" lightColor="transparent">
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
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 80,
        paddingHorizontal: 20,
    },
    topSection: {
        width: "100%",
        alignItems: "center",
    },
    centerSection: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    bottomSection: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    clickAmnt: {
        fontSize: 80,
        fontFamily: Fonts.displayExtraBold,
        letterSpacing: -3,
        lineHeight: 86,
    },
    probText: {
        fontSize: 44,
        textAlign: "center",
        fontFamily: Fonts.displayBold,
        letterSpacing: -1,
    },
    btnContainer: {
        height: 30,
        marginTop: 14,
        borderColor: "transparent",
        backgroundColor: "transparent",
        width: 260,
    },
    btn: {
        backgroundColor: "transparent",
    },
    btnText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 12,
        letterSpacing: 2.2,
        color: Colors.light.mutedText,
        textTransform: "uppercase",
    },
    selectedBtn: {
        backgroundColor: "transparent",
    },
    btnSelectedText: {
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
    }
})
