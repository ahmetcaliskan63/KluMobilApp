import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { ExamResult } from '@/shared/types/models';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

interface ResultCardProps {
    item: ExamResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
    const { t } = useTranslation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    const isMarking = item.status === t('exams.marking');

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={s.resultCard}
        >
            <View style={[s.cardAccent, { backgroundColor: item.color }]} />

            <View style={s.cardContent}>
                <View style={s.cardTop}>
                    <View style={s.typeWrapper}>
                        <View style={[s.typeBadge, { backgroundColor: item.color + '15' }]}>
                            <Text style={[s.examType, { color: item.color }]}>{item.type}</Text>
                        </View>
                        <View style={s.dotSeparator} />
                        <Text style={s.dateText}>{item.date}</Text>
                    </View>
                    <View style={[s.statusBadge, { backgroundColor: isMarking ? (isDarkMode ? 'rgba(241, 245, 249, 0.1)' : '#F1F5F9') : '#DCFCE7' }]}>
                        <Text style={[s.statusText, { color: isMarking ? '#64748B' : '#166534' }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={s.cardBody}>
                    <View style={s.courseInfo}>
                        <Text style={s.courseName} numberOfLines={1}>{item.courseName}</Text>
                        <Text style={s.instructorName}>{t('units.facultyEngineering')}</Text>
                    </View>

                    <View style={s.gradesWrapper}>
                        <View style={s.gradeContainer}>
                            <View style={s.numericBadge}>
                                <Text style={s.numericValue}>{item.grade}</Text>
                            </View>
                            <View style={s.letterGradeBox}>
                                <Text style={s.letterGradeValue}>{item.letterGrade}</Text>
                                <Text style={s.gradeLabel}>{t('exams.gradeLabel')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    resultCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        marginBottom: verticalScale(14),
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkMode ? 0.3 : 0.12,
        shadowRadius: 12,
    },
    cardAccent: {
        width: 4,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: spacing.lg,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    typeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    examType: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    dotSeparator: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#CBD5E1',
        marginHorizontal: 8,
    },
    dateText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    statusText: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseInfo: {
        flex: 1,
        marginRight: spacing.md,
    },
    courseName: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: 2,
    },
    instructorName: {
        fontSize: moderateScale(11),
        color: '#94A3B8',
        fontWeight: '600',
    },
    gradesWrapper: {
        flexDirection: 'row',
    },
    gradeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: scale(60),
    },
    numericBadge: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: -8,
        zIndex: 2,
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    numericValue: {
        fontSize: moderateScale(12),
        fontWeight: '800',
        color: isDarkMode ? '#F1F5F9' : '#1E293B',
    },
    letterGradeBox: {
        backgroundColor: isDarkMode ? '#1E293B' : '#0F172A',
        width: '100%',
        paddingTop: 14,
        paddingBottom: 8,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    letterGradeValue: {
        fontSize: moderateScale(20),
        fontWeight: '900',
        color: '#FFFFFF',
    },
    gradeLabel: {
        fontSize: moderateScale(8),
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '800',
        textTransform: 'uppercase',
        marginTop: 2,
    },
});
