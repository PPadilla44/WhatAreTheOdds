import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { OddsListState } from '../../store/oddsItems';
import OddsItem from '../OddsItem'
import Colors from '../../constants/Colors';

interface Props {
    data: OddsListState;
}

const OddsList: FC<Props> = ({ data }) => {


    if (data.fetching || !data.data) {
        return (
            <View style={styles.loading} darkColor="#252525">
                <ActivityIndicator size={"large"} color={Colors.shared.primary} />
            </View>
        )
    }

    return (
        <View style={styles.wrapper} darkColor="#252525">
            {
                data.data.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <View
                                    style={styles.divider}
                                    lightColor={Colors.light.border}
                                    darkColor={Colors.dark.border}
                                />
                            )}
                            <OddsItem item={item} />
                        </React.Fragment>
                    )
                })
            }
        </View>
    )
}

export default OddsList

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 4,
    },
    loading: {
        paddingVertical: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        width: "86%",
        alignSelf: "center",
        opacity: 0.6,
    }
})
