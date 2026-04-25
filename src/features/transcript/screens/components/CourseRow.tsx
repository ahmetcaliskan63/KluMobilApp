import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Course } from '../types';
import { GRADE_COLORS } from '@/shared/services/mockData';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface CourseRowProps {
    course: Course;
    isLast: boolean;
    isAlternate: boolean;
}

export const CourseRow: React.FC<CourseRowProps> = ({ course, isLast, isAlternate }) => {
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    const getGradeColor = (grade: string) => {
        return GRADE_COLORS[grade as keyof typeof GRADE_COLORS] || '#64748B';
    };

    return (
        <View style={[
            s.courseRow,
            isAlternate && { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.015)' : '#F9FBFF' },
            isLast && { borderBottomWidth: 0 }
        ]}>
            <View style={s.courseInfo}>
                <Text style={s.courseName} numberOfLines={1}>{course.name}</Text>
                <View style={s.courseCodeWrapper}>
                    <Icon name="barcode-outline" size={10} color="#94A3B8" />
                    <Text style={s.courseCode}>{course.code}</Text>
                </View>
            </View>

            <View style={s.tableHeaderStats}>
                <Text style={[s.courseValue, s.statCol]}>{course.credit}</Text>
                <Text style={[s.courseValue, s.statCol]}>{course.akts}</Text>
                <View style={[s.gradeCol, { alignItems: 'center' }]}>
                    <View style={[s.gradeBadge, { backgroundColor: getGradeColor(course.grade) }]}>
                        <Text style={s.gradeText}>{course.grade}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    courseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#E2E8F0', 
    },
    courseInfo: {
        flex: 2.2,
    },
    courseName: {
        fontSize: moderateScale(13),
        fontWeight: '800',
        color: isDarkMode ? theme.colors.text : '#1E293B',
        marginBottom: 2,
    },
    courseCodeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    courseCode: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.4,
    },
    tableHeaderStats: {
        flex: 1.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    courseValue: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: isDarkMode ? theme.colors.textSecondary : '#475569',
    },
    statCol: {
        flex: 1,
        textAlign: 'center',
    },
    gradeCol: {
        flex: 1.2,
        textAlign: 'center',
    },
    gradeBadge: {
        width: 38,
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    gradeText: {
        fontSize: moderateScale(12),
        fontWeight: '900',
        color: '#FFFFFF',
    },
});
