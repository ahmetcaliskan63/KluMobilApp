import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { SemesterData } from '../types';
import { CourseRow } from './CourseRow';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface SemesterCardProps {
    semester: SemesterData;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({ semester }) => {
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.semesterCard}>
            <LinearGradient
                colors={isDarkMode ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'] : ['#F8FAFC', '#F1F5F9']}
                style={s.semesterHeader}
            >
                <View style={s.semesterTitleWrapper}>
                    <View style={[s.semesterBlueIndicator, { backgroundColor: isDarkMode ? theme.colors.primary : '#3B82F6' }]} />
                    <View>
                        <Text style={s.semesterTitleText}>{semester.semester}</Text>
                        <Text style={s.semesterSubtitleText}>{semester.subTitle}</Text>
                    </View>
                </View>

                <View style={s.semesterGpaBadge}>
                    <Text style={s.semesterGpaLabel}>{t('transcript.semesterGpa')}</Text>
                    <Text style={s.semesterGpaValue}>{semester.gpa}</Text>
                </View>
            </LinearGradient>

            <View style={s.tableHeader}>
                <Text style={s.courseInfoLabel}>{t('transcript.courseInfo')}</Text>
                <View style={s.tableHeaderStats}>
                    <Text style={[s.columnLabel, s.statCol]}>{t('transcript.credit').toUpperCase()}</Text>
                    <Text style={[s.columnLabel, s.statCol]}>{t('profile.ects').toUpperCase()}</Text>
                    <Text style={[s.columnLabel, s.gradeCol]}>{t('transcript.grade').toUpperCase()}</Text>
                </View>
            </View>

            <View style={s.courseList}>
                {semester.courses.map((course, index) => (
                    <CourseRow
                        key={course.id}
                        course={course}
                        isLast={index === semester.courses.length - 1}
                        isAlternate={index % 2 === 1}
                    />
                ))}
            </View>

            <View style={s.semesterFooter}>
                <View style={s.footerLeft}>
                    <Icon name="information-circle-outline" size={14} color="#94A3B8" />
                    <Text style={s.footerInfoText}>{t('transcript.semesterSummary')}</Text>
                </View>
                <View style={s.footerStats}>
                    <Text style={s.footerSummaryText}>{t('transcript.totalAkts')}</Text>
                    <Text style={s.footerSummaryValue}>{semester.totalAkts}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    semesterCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        marginBottom: 24,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#D1D5DB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDarkMode ? 0.2 : 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    semesterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#E2E8F0',
    },
    semesterTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    semesterBlueIndicator: {
        width: 4,
        height: 32,
        borderRadius: 2,
        marginRight: 12,
    },
    semesterTitleText: {
        fontSize: moderateScale(15),
        fontWeight: '900',
        color: isDarkMode ? '#FFFFFF' : '#1E293B',
        marginBottom: 2,
    },
    semesterSubtitleText: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    semesterGpaBadge: {
        alignItems: 'center',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
    },
    semesterGpaLabel: {
        fontSize: moderateScale(9),
        fontWeight: '800',
        color: '#64748B',
        marginBottom: 1,
    },
    semesterGpaValue: {
        fontSize: moderateScale(15),
        fontWeight: '900',
        color: isDarkMode ? theme.colors.primary : '#182958',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.015)' : '#F8FAFC',
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9',
    },
    courseInfoLabel: {
        flex: 2.2,
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 0.4,
    },
    tableHeaderStats: {
        flex: 1.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    columnLabel: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 0.4,
    },
    statCol: {
        flex: 1,
        textAlign: 'center',
    },
    gradeCol: {
        flex: 1.2,
        textAlign: 'center',
    },
    courseList: {
        backgroundColor: 'transparent',
    },
    semesterFooter: {
        paddingHorizontal: 18,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.01)' : '#FDFEFF',
        borderTopWidth: 1,
        borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9',
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerInfoText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: '#94A3B8',
    },
    footerStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerSummaryText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        color: isDarkMode ? theme.colors.textSecondary : '#64748B',
    },
    footerSummaryValue: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        fontSize: moderateScale(11),
        fontWeight: '900',
        color: isDarkMode ? theme.colors.primary : '#182958',
    },
});
