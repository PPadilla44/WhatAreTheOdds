import { Platform, StyleSheet } from 'react-native';
import { View, ScrollView } from "../components/Themed"
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { RootTabScreenProps } from '../types';
import ModalForm from '../components/ModalForm';
import OddsList from '../components/OddsList';
import { useOddsItems } from '../components/contexts/useOddsItems';
import { fetchOddsList } from '../store/utils/thunkerFunctions';
import Colors from '../constants/Colors';


const Dropdown = (props: RootTabScreenProps<"Modal">) => {

    const { state: oState, dispatch: oDispatch } = useOddsItems();

    const fetch = async () => {
        await fetchOddsList(oDispatch)
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <View style={styles.container} darkColor={Colors.dark.modal} lightColor={Colors.light.modal}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

            <View style={styles.handleWrap} darkColor={Colors.dark.modal} lightColor={Colors.light.modal}>
                <View style={styles.handle} darkColor={Colors.dark.border} lightColor={Colors.light.border} />
            </View>

            <ScrollView darkColor={Colors.dark.modal} lightColor={Colors.light.modal}>

                <ModalForm navigation={props.navigation} />

                <OddsList data={oState} />

            </ScrollView>

        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    handleWrap: {
        alignItems: "center",
        paddingVertical: 8,
    },
    handle: {
        width: 44,
        height: 5,
        borderRadius: 999,
        opacity: 0.8,
    }
})
