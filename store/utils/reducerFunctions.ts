import { ClickerResults, ClickerState } from "../clicker";
import Fraction from "fraction.js";
import { OddsItemInterface } from "../../types";
import { OddsListState } from "../oddsItems";

// CLICKER

export const increment = (state: ClickerState): ClickerState => {

    const tempCount = state.count + 1;

    const { denominator, numerator } = state.fraction;

    const newDeno = multiplierToNum(state.multiplier) * denominator;

    const randomNumFromMax = Math.ceil(Math.random() * newDeno);

    if (randomNumFromMax <= numerator) {
        const max = (newDeno - numerator) + 1;

        let tempResults: ClickerResults;

        if (tempCount < max) {
            tempResults = { BtnColor: "lucky", text: "YOU ARE LUCKY" };
        } else if (tempCount > max) {
            tempResults = { BtnColor: "unlucky", text: "YOU ARE UNLUCKY" };
        } else {
            tempResults = { BtnColor: "normal", text: "YOU ARE normal" };
        }
        const newState: ClickerState = {
            ...state,
            count: tempCount,
            results: tempResults,
            didHit: true,
        }

        return newState
    }

    return {
        ...state,
        count: tempCount
    }
}

export const updateOddsPercent = (state: ClickerState, { title, oddsString }: { title: string, oddsString: string }): ClickerState => {

    const oddsNum = parseFloat(oddsString) / 100;

    const fractionWhole = new Fraction(oddsNum);

    const fraction = { denominator: Number(fractionWhole.d), numerator: Number(fractionWhole.n) };

    const tempState: ClickerState = { ...state, title, fraction, oddsString, fractionPref: 0, multiplier: "1" };
    const newState: ClickerState = reset(tempState);

    return newState;
}

export const updateOddsFraction = (state: ClickerState, { title, numerator, denominator, multiplier }: { title: string, numerator: number, denominator: number, multiplier: string }): ClickerState => {

    const multNum = multiplierToNum(multiplier) * denominator;

    const decimalNum = numerator / multNum;

    const oddsString = `${decimalNum * 100}`.substring(0, 10);
    const fraction = { numerator, denominator };
    const tempState: ClickerState = { ...state, title, fraction, oddsString, multiplier, fractionPref: 1 };
    const newState: ClickerState = reset(tempState);
    return newState;
}

export const reset = (state: ClickerState): ClickerState => {
    return { ...state, count: 0, didHit: false, results: { BtnColor: "default", text: "" }, loading: false }
}

export const updateDisplay = (state: ClickerState, payload: OddsItemInterface): ClickerState => {
    const fractionPref = parseInt(payload.fractionPref);
    if (fractionPref) {
        return updateOddsFraction(state, {
            title: payload.title,
            numerator: parseInt(payload.fraction!.numerator),
            denominator: parseInt(payload.fraction!.denominator),
            multiplier: payload.multiplier
        })
    }
    if (payload.oddsString) {
        return updateOddsPercent(state, {
            title: payload.title,
            oddsString: payload!.oddsString,
        })
    }

    return state;
}

const multiplierToNum = (mult: string): number => {
    switch (mult) {
        case "B":
            return 1000000000;
        case "M":
            return 1000000;
        case "10":
            return 10
        default:
            return 1
    }
}

// ODDS ITEMS