import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from '@/shared/utils/responsive';
import { spacing } from '@/core/theme/theme';

interface UnitsHeaderProps {
    title: string;
    isDarkMode: boolean;
}

export const UnitsHeader: React.FC<UnitsHeaderProps> = ({ title, isDarkMode }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isDarkMode ? ['#0F172A', '#020617'] : ['#182958', '#2A3F7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <View style={[styles.content, { paddingTop: insets.top + spacing.sm }]}>
                <View style={styles.topRow}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={{ width: 40 }} />
                </View>
            </View>

            <View style={styles.headerWatermark}>
                <Icon name="business" size={moderateScale(100)} color="rgba(255,255,255,0.04)" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    searchContainer: {
        marginTop: spacing.xs,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        paddingHorizontal: spacing.md,
        height: 48,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.sm,
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    headerWatermark: {
        position: 'absolute',
        right: -10,
        bottom: -20,
        zIndex: -1,
    },
});
