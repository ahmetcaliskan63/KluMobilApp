import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../TranscriptScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Course } from '../types';
import { GRADE_COLORS } from '../constants';

interface Props {
    course: Course;
    isLast: boolean;
    isAlternate: boolean;
}

export const CourseRow: React.FC<Props> = ({ course, isLast, isAlternate }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    const getGradeColor = (grade: string) => {
        return GRADE_COLORS[grade as keyof typeof GRADE_COLORS] || '#64748B';
    };

    return (
        <View style={[
            s.courseRow,
            isAlternate && { backgroundColor: '#F9FBFF' },
            isLast && { borderBottomWidth: 0 }
        ]}>
            <View style={{ flex: 2.2 }}>
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

