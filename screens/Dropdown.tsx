import { Platform, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { ScrollView } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ModalForm from '../components/ModalForm';
import OddsList from '../components/OddsList';
import { useOddsItems } from '../components/contexts/useOddsItems';
import { fetchOddsList } from '../store/utils/thunkerFunctions';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';


const Dropdown = (props: RootTabScreenProps<"Modal">) => {

    const { state: oState, dispatch: oDispatch } = useOddsItems();

    useEffect(() => {
        fetchOddsList(oDispatch);
    }, []);

    const savedCount = oState.data?.length ?? 0;

    return (
        <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

            <View style={styles.handleWrap}>
                <View style={styles.handle} />
            </View>

            <ScrollView
                darkColor={Colors.dark.modal}
                lightColor={Colors.light.modal}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >

                <ModalForm navigation={props.navigation} />

                {/* Saved odds section */}
                <View style={styles.savedHead}>
                    <Text style={styles.sectionLabel}>Saved odds</Text>
                    {savedCount > 0 ? (
                        <View style={styles.countPill}>
                            <Text style={styles.countText}>{savedCount}</Text>
                        </View>
                    ) : null}
                </View>

                {savedCount === 0 && !oState.fetching ? (
                    <View style={styles.empty}>
                        <View style={styles.emptyIcon}>
                            <Feather name="bookmark" size={18} color={Colors.shared.primary} />
                        </View>
                        <Text style={styles.emptyTitle}>No saved odds yet</Text>
                        <Text style={styles.emptyDesc}>Configure odds above and tap <Text style={{ fontFamily: Fonts.bodyBold }}>Save</Text> to keep them for later.</Text>
                    </View>
                ) : (
                    <View style={styles.savedCard}>
                        <OddsList data={oState} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.modal,
    },
    handleWrap: {
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 2,
    },
    handle: {
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: 'rgba(148,163,184,0.4)',
    },
    savedHead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 14,
        marginBottom: 10,
        marginHorizontal: 22,
    },
    sectionLabel: {
        fontSize: 11,
        letterSpacing: 2.2,
        textTransform: 'uppercase',
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
        opacity: 0.85,
    },
    countPill: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: 'rgba(37,99,235,0.16)',
        borderWidth: 1,
        borderColor: 'rgba(37,99,235,0.28)',
    },
    countText: {
        fontSize: 10,
        color: Colors.shared.primary,
        fontFamily: Fonts.bodyBold,
        letterSpacing: 0.4,
    },
    savedCard: {
        marginHorizontal: 14,
        borderRadius: 18,
        backgroundColor: Colors.dark.surface,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        overflow: 'hidden',
    },
    empty: {
        alignItems: 'center',
        marginHorizontal: 14,
        paddingVertical: 26,
        paddingHorizontal: 20,
        borderRadius: 18,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(148,163,184,0.25)',
    },
    emptyIcon: {
        width: 44,
        height: 44,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(37,99,235,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(37,99,235,0.22)',
        marginBottom: 10,
    },
    emptyTitle: {
        fontSize: 15,
        color: '#FFFFFF',
        fontFamily: Fonts.bodyBold,
        marginBottom: 4,
    },
    emptyDesc: {
        fontSize: 13,
        color: Colors.light.mutedText,
        textAlign: 'center',
        fontFamily: Fonts.bodyRegular,
        lineHeight: 18,
    },
});
