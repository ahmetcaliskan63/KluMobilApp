import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme } from '@/core/theme/theme';
import { Card } from '@/shared/components/common';
import { moderateScale } from '@/shared/utils/responsive';
import { Course as CourseModel } from '@/shared/types/models';

interface ScheduleItemProps {
    course: CourseModel;
    theme: Theme;
    isDarkMode: boolean;
    onPress: () => void;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({
    course,
    theme,
    isDarkMode,
    onPress
}) => {
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.timelineRow}>
            <View style={s.timeColumn}>
                <Text style={s.startTime}>{course.startTime}</Text>
                <Text style={s.endTime}>{course.endTime}</Text>
            </View>
            <View style={s.timelineLine}>
                <View style={[s.timelineDot, { backgroundColor: course.color }]}>
                    <View style={[s.innerDot, { backgroundColor: isDarkMode ? theme.colors.card : '#FFFFFF' }]} />
                </View>
                <View style={s.line} />
            </View>
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Card style={s.courseCard} elevation="none">
                    <View style={[s.colorBar, { backgroundColor: course.color }]} />
                    <View style={s.courseInfo}>
                        <View style={s.courseHeader}>
                            <Text style={[s.courseName, { color: theme.colors.text }]} numberOfLines={1}>
                                {course.name}
                            </Text>
                            <Icon name="chevron-forward" size={16} color="#CBD5E1" />
                        </View>
                        <View style={s.detailsContainer}>
                            <View style={s.detailRow}>
                                <Icon name="location-outline" size={14} color={theme.colors.textSecondary} />
                                <Text style={[s.detailText, { color: theme.colors.textSecondary }]}>{course.room}</Text>
                            </View>
                            <View style={s.detailRow}>
                                <Icon name="person-outline" size={14} color={theme.colors.textSecondary} />
                                <Text style={[s.detailText, { color: theme.colors.textSecondary }]}>{course.instructor}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeColumn: {
        width: 50,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 4,
    },
    startTime: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: theme.colors.text,
    },
    endTime: {
        fontSize: moderateScale(11),
        color: theme.colors.textSecondary,
        marginTop: 2,
        fontWeight: '600',
    },
    timelineLine: {
        width: 24,
        alignItems: 'center',
    },
    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    innerDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    line: {
        flex: 1,
        width: 2,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
        marginTop: -4,
        borderRadius: 1,
    },
    courseCard: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: theme.colors.card,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.2 : 0.03,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    },
    colorBar: {
        width: 5,
        height: '100%',
    },
    courseInfo: {
        flex: 1,
        padding: 16,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    courseName: {
        fontSize: moderateScale(16),
        fontWeight: '800',
        flex: 1,
        marginRight: 8,
        letterSpacing: -0.3,
    },
    detailsContainer: {
        gap: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: moderateScale(13),
        fontWeight: '500',
    },
});
