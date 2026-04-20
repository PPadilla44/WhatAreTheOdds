import { StyleSheet } from 'react-native'
import { View } from '../../components/Themed';
import React from 'react'
import CheckBox from './CheckBox'
import Colors from '../../constants/Colors';
import { useSettings } from '../contexts/useSettings';
import { setAppearance } from '../../store/utils/thunkerFunctions';


const Radio = () => {

    const options = ["automatic", "dark", "light"];
    const { state, dispatch } = useSettings();
    const { data } = state;

    const handleChange = (_index: number, option: string) => {
        if (option === "automatic") {
            setAppearance(state, dispatch, { fromDevice: true })
        } else {
            setAppearance(state, dispatch, { fromDevice: false, appearance: option })
        }
    }

    return (
        <View darkColor={Colors.dark.surface} lightColor={Colors.light.surface} style={styles.container}>

            {
                options.map((o, i) =>
                    <CheckBox
                        key={`check-${i}`}
                        title={o[0].toUpperCase() + o.substring(1)}
                        checked={data.appearance.fromDevice ? i === 0 : data.appearance.appearance === o}
                        setChecked={() => handleChange(i, o)}
                    />
                )
            }


        </View>
    )
}

export default Radio

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        paddingHorizontal: 4,
        paddingVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 14,
        elevation: 2,
    }
})
