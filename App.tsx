import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import {
    useFonts as useLexend,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
} from '@expo-google-fonts/lexend-deca';
import {
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';

import Navigation from './navigation';
import { ClickerProvider } from './components/contexts/useClicker';
import { OddsItemsProvider } from './components/contexts/useOddsItems';
import { SettingsProvider } from './components/contexts/useSettings';
import Colors from './constants/Colors';


export default function App() {

    const [fontsLoaded] = useLexend({
        LexendDeca_400Regular,
        LexendDeca_500Medium,
        LexendDeca_600SemiBold,
        LexendDeca_700Bold,
        BricolageGrotesque_700Bold,
        BricolageGrotesque_800ExtraBold,
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.dark.background }}>
                <ActivityIndicator size="large" color={Colors.shared.primary} />
            </View>
        );
    }

    return (
        <SafeAreaProvider>

            <SettingsProvider>
                <OddsItemsProvider>
                    <ClickerProvider>
                        <Navigation />
                    </ClickerProvider>
                </OddsItemsProvider>
            </SettingsProvider>

        </SafeAreaProvider>
    );
}
