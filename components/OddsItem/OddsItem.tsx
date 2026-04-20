import { StyleSheet } from 'react-native'
import React, { FC, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { OddsItemInterface } from '../../types'
import RightSwipe from './RightSwipe'
import { Text, TouchableOpacity } from "../Themed"
import Colors from '../../constants/Colors'
import { removeItem } from '../../store/utils/thunkerFunctions'
import { useOddsItems } from '../contexts/useOddsItems'
import { useClicker } from '../contexts/useClicker'
import { useNavigation } from '@react-navigation/native'

interface Props {
    item: OddsItemInterface
}


const OddsItem: FC<Props> = ({ item }) => {

    const { state, dispatch } = useOddsItems();
    const { dispatch: cDispatch } = useClicker();
    const navigation = useNavigation();

    const ref = useRef<Swipeable>(null)

    const deleteItem = async (id: string) => {
        removeItem(state, dispatch, id);
        ref.current?.state.dragX.setValue(0)
        ref.current?.state.rowTranslation.setValue(0);
    }

    const setDisplay = (oddItem: OddsItemInterface) => {
        cDispatch!({ type: 'SET_DISPLAY', payload: oddItem })
        navigation.goBack();
    }

    const oddsLabel = item.multiplier === "B" || item.multiplier === "M" ?
        `${item.fraction?.numerator} / ${item.fraction?.denominator} ${item.multiplier}`
        :
        parseInt(item.fractionPref) ?
            `${item.fraction?.numerator} / ${parseInt(item.fraction!.denominator) * parseInt(item.multiplier)}`
            :
            `${item.oddsString}%`

    return (
        <Swipeable
            ref={ref}
            renderRightActions={() => <RightSwipe callback={() => deleteItem(item.id)} />}
        >
            <TouchableOpacity
                testID='oddsItemBtn'
                lightColor={Colors.light.surface}
                darkColor={Colors.dark.modal}
                onPress={() => setDisplay(item)}
                style={styles.item}
                containerStyle={styles.itemContainer}
                activeOpacity={.75}
            >
                <Text style={styles.titleTxt} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.oddsTxt}>{oddsLabel}</Text>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default OddsItem

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 24,
        paddingVertical: 22,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: "600",
        flex: 1,
        marginRight: 12,
    },
    oddsTxt: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.shared.primary,
    }
})
