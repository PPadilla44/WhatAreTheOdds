import { increment, reset, updateDisplay, updateOddsFraction, updateOddsPercent } from "./utils/reducerFunctions";

export type BtnColorName = 'default' | 'lucky' | 'unlucky' | 'normal';


export const BtnColorObj = {
    unlucky : "#EF4444",   // rose-500 – missed / unlucky outcome
    lucky   : "#10B981",   // emerald-500 – hit / lucky outcome
    normal  : "#3B82F6",   // blue-500 – press feedback
    default : "#2563EB"    // blue-600 – idle primary
}

export interface ClickerResults {
    BtnColor: BtnColorName;
    text: string;
}

export interface ClickerState {
    count: number;
    oddsString: string;
    fraction: {
        denominator: number;
        numerator: number;
    };
    multiplier: string;
    didHit: boolean;
    title: string;
    results: ClickerResults;
    loading: boolean;
    fractionPref: 0 | 1 ; 
}

export interface Action {
    type: ClickerActionKind;
    payload?: any;
}

export const initialClickerState: ClickerState = {
    count: 0,
    oddsString: "25",
    fraction: {
        numerator: 1,
        denominator: 4
    },
    multiplier: "1",
    didHit: false,
    title: "What Are The Odds?",
    results: {
        BtnColor: "default",
        text: ""
    },
    loading: false,
    fractionPref: 0
}

// ACTIONS
export declare type ClickerActionKind = 
'INCREASE'
|| 'RESET' 
|| 'UPDATE_PERCENT' 
|| 'UPDATE_FRACTION' 
|| "SET_LOADING" 
|| "SET_FRACTIONPREF"
|| "SET_MULT"
|| "SET_STATE"
|| "SET_DISPLAY"
;

// REDUCER
function reducer(state: ClickerState ,  action: Action): ClickerState {
    const { type, payload } = action;
    
    switch (type) {
        case "SET_STATE":
            return { ...state, ...payload }
        case "INCREASE":
            return increment(state);
        case "RESET":
            return reset(state);
        case "UPDATE_PERCENT":
            return updateOddsPercent(state, payload);
        case "UPDATE_FRACTION":
            return updateOddsFraction(state, payload);
        case "SET_LOADING":
            return { ...state, loading: payload };
        case "SET_FRACTIONPREF":
            return { ...state, fractionPref: payload };
        case "SET_MULT":
            return { ...state, multiplier: payload };
        case "SET_DISPLAY":
            return updateDisplay(state, payload)
        default:
            return state;
    }
}

export default reducer
