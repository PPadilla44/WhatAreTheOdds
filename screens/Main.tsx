import { StyleSheet } from 'react-native';
import { View } from "../components/Themed";
import React, { FC, useEffect, useRef } from 'react';
import SubContainer from '../components/SubContainer';
import ResetButton from '../components/ResetButton';
import MainButton from '../components/MainButton';
import BackgroundAmbient from '../components/BackgroundAmbient';
import BottomActionBar from '../components/BottomActionBar';
import SegmentedPill from '../components/SegmentedPill';
import { useClicker } from '../components/contexts/useClicker';
import { useSettings } from '../components/contexts/useSettings';
import { useStats } from '../components/contexts/useStats';
import { recordHit } from '../store/utils/thunkerFunctions';
import { RootTabScreenProps } from '../types';
import Fonts from '../constants/Fonts';


const Main: FC<RootTabScreenProps<"Root">> = ({ }) => {

    const { state, dispatch } = useClicker();
    const { state: settings } = useSettings();
    const { state: stats, dispatch: statsDispatch } = useStats();
    const { count, oddsString, title, fraction, multiplier, fractionPref, didHit } = state;
    const { numerator, denominator } = fraction;

    const theme = (settings.data.appearance.appearance as 'light' | 'dark') ?? 'dark';

    // Record a hit into persistent stats once, when didHit flips true
    const prevHit = useRef(false);
    useEffect(() => {
        if (didHit && !prevHit.current) {
            recordHit(stats, statsDispatch, count);
        }
        prevHit.current = didHit;
    }, [didHit, count]);

    const probDisabled = multiplier === "B" || multiplier === "M";

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
                        probDisabled ?
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

                <View style={styles.toggleWrap} darkColor="transparent" lightColor="transparent">
                    <SegmentedPill
                        testID="percent-fraction-toggle"
                        options={["Percent", "Fraction"]}
                        selectedIndex={probDisabled ? 1 : fractionPref}
                        disabled={probDisabled}
                        onChange={(newIndex) => dispatch!({ type: "SET_FRACTIONPREF", payload: newIndex })}
                        width={260}
                    />
                </View>
            </View>

            <ResetButton />
            <BottomActionBar />

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
        paddingBottom: 96,
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
    toggleWrap: {
        marginTop: 18,
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
})
