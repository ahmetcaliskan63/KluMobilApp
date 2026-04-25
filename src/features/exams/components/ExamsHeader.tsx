import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

interface ExamsHeaderProps {
    title: string;
}

export const ExamsHeader: React.FC<ExamsHeaderProps> = ({ title }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { isDarkMode } = useAppTheme();

    return (
        <LinearGradient
            colors={isDarkMode ? ['#0F172A', '#020617'] : ['#0B1120', '#101D42']}
            style={[styles.header, { paddingTop: insets.top + 10 }]}
        >
            <View style={styles.headerTop}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <Icon name="chevron-back" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.termText}>{t('exams.term')}</Text>
                </View>
                <View style={{ width: scale(36) }} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: verticalScale(20),
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    backBtn: {
        width: scale(36),
        height: scale(36),
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    termText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: moderateScale(11),
        fontWeight: '600',
    },
});
