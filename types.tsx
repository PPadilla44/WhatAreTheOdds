import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface OddsItemInterface {
    id: string
    title: string;
    oddsString?: string;
    fraction?: {
        denominator: string;
        numerator: string;
    };
    multiplier: string;
    fractionPref: "0" | "1";
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
    Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;


export type RootTabParamList = {
    Main: undefined;
    Modal: undefined;
    Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
