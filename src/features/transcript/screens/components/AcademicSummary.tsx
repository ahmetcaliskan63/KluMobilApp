import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { AcademicSummary as AcademicSummaryType } from '../types';
import { useTranslation } from 'react-i18next';
import { moderateScale } from '@/shared/utils/responsive';
import { Theme } from '@/core/theme/theme';

interface AcademicSummaryProps {
    data: AcademicSummaryType;
}

export const AcademicSummary: React.FC<AcademicSummaryProps> = ({ data }) => {
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.summarySection}>
            <View style={s.summaryCard}>
                <LinearGradient
                    colors={isDarkMode ?
                        ['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.01)'] :
                        ['#FFFFFF', '#F8FAFC']
                    }
                    style={StyleSheet.absoluteFill}
                />

                <SummaryItem
                    icon="stats-chart"
                    label={t('transcript.gpa')}
                    value={data.overallGpa}
                    color="#3B82F6"
                    bgColor={isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF'}
                    isDarkMode={isDarkMode}
                    theme={theme}
                />

                <View style={s.summaryDivider} />

                <SummaryItem
                    icon="medal"
                    label={t('transcript.completedAkts')}
                    value={data.totalCompletedAkts}
                    color="#10B981"
                    bgColor={isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5'}
                    isDarkMode={isDarkMode}
                    theme={theme}
                />

                <View style={s.summaryDivider} />

                <SummaryItem
                    icon="school"
                    label={t('profile.semester').toUpperCase()}
                    value={data.activeSemester}
                    color="#6366F1"
                    bgColor={isDarkMode ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF'}
                    isDarkMode={isDarkMode}
                    theme={theme}
                />
            </View>

            <View style={s.footerInfo}>
                <Icon name="shield-checkmark" size={12} color="#94A3B8" />
                <Text style={s.footerInfoText}>{t('transcript.officialData')}</Text>
            </View>
        </View>
    );
};

const SummaryItem = ({ icon, label, value, color, bgColor, isDarkMode, theme }: any) => (
    <View style={itemStyles.summaryItem}>
        <View style={[itemStyles.iconBox, { backgroundColor: bgColor }]}>
            <Icon name={icon} size={16} color={color} />
        </View>
        <Text style={[itemStyles.summaryLabel, { color: isDarkMode ? theme.colors.textSecondary : '#64748B' }]}>
            {label}
        </Text>
        <Text style={[itemStyles.summaryValue, { color }]}>{value}</Text>
    </View>
);

const itemStyles = StyleSheet.create({
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    iconBox: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        letterSpacing: 0.8,
        marginBottom: 6,
        textAlign: 'center',
    },
    summaryValue: {
        fontSize: moderateScale(19),
        fontWeight: '900',
    },
});

const styles = (_theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    summarySection: {
        marginTop: 15,
        marginBottom: 20,
    },
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 22,
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: isDarkMode ? 0.4 : 0.06,
        shadowRadius: 24,
        elevation: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    summaryDivider: {
        width: 1.5,
        height: '60%',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0',
        alignSelf: 'center',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
        opacity: 0.8,
    },
    footerInfoText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.5,
    }
});
