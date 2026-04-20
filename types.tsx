import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

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

// Root stack – wraps the tab navigator + NotFound
export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
    // Legacy keys kept for backwards compat with navigation calls
    Modal: undefined;
    Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;


// Bottom tabs
export type RootTabParamList = {
    Play: undefined;
    New: undefined;
    Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = BottomTabScreenProps<RootTabParamList, Screen>;
