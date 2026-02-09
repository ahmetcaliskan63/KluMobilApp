import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { MOCK_SCHEDULE, Course } from '../../data/mockData';
import { Card } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

export const ScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const [selectedDay, setSelectedDay] = useState('Pazartesi');

    const filteredSchedule = MOCK_SCHEDULE.filter(course => course.day === selectedDay);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={s.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Ders Programı</Text>
                    <View style={{ width: 40 }} /> {/* Spacer */}
                </View>

                {/* Day Picker */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.dayPicker}
                >
                    {DAYS.map((day) => (
                        <TouchableOpacity
                            key={day}
                            onPress={() => setSelectedDay(day)}
                            style={[
                                s.dayItem,
                                selectedDay === day && s.activeDayItem
                            ]}
                        >
                            <Text style={[
                                s.dayText,
                                selectedDay === day && s.activeDayText
                            ]}>
                                {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((course) => (
                        <View key={course.id} style={s.timelineRow}>
                            <View style={s.timeColumn}>
                                <Text style={s.startTime}>{course.startTime}</Text>
                                <Text style={s.endTime}>{course.endTime}</Text>
                            </View>
                            <View style={s.timelineLine}>
                                <View style={[s.timelineDot, { backgroundColor: course.color }]} />
                                <View style={s.line} />
                            </View>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                activeOpacity={0.7}
                                onPress={() => (navigation as any).navigate('CourseDetail', { courseId: course.id })}
                            >
                                <Card style={s.courseCard} elevation="small">
                                    <View style={[s.colorBar, { backgroundColor: course.color }]} />
                                    <View style={s.courseInfo}>
                                        <Text style={s.courseName}>{course.name}</Text>
                                        <View style={s.detailRow}>
                                            <Icon name="location-outline" size={14} color={theme.colors.textLight} />
                                            <Text style={s.detailText}>{course.room}</Text>
                                        </View>
                                        <View style={s.detailRow}>
                                            <Icon name="person-outline" size={14} color={theme.colors.textLight} />
                                            <Text style={s.detailText}>{course.instructor}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={s.emptyState}>
                        <Icon name="calendar-outline" size={64} color={theme.colors.border} />
                        <Text style={s.emptyText}>Bu gün için kayıtlı ders bulunamadı.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingBottom: verticalScale(20),
        borderBottomLeftRadius: moderateScale(30),
        borderBottomRightRadius: moderateScale(30),
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(20),
    },
    backButton: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dayPicker: {
        paddingHorizontal: scale(20),
        gap: scale(15),
    },
    dayItem: {
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeDayItem: {
        backgroundColor: '#FFFFFF',
    },
    dayText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '600',
        fontSize: moderateScale(14),
    },
    activeDayText: {
        color: theme.colors.primary,
    },
    scrollContent: {
        padding: scale(20),
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: verticalScale(20),
    },
    timeColumn: {
        width: scale(50),
        alignItems: 'flex-end',
        paddingRight: scale(10),
        paddingTop: verticalScale(4),
    },
    startTime: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    endTime: {
        fontSize: moderateScale(11),
        color: theme.colors.textLight,
        marginTop: verticalScale(2),
    },
    timelineLine: {
        width: scale(20),
        alignItems: 'center',
    },
    timelineDot: {
        width: scale(12),
        height: scale(12),
        borderRadius: scale(6),
        zIndex: 1,
    },
    line: {
        flex: 1,
        width: 2,
        backgroundColor: theme.colors.border,
        marginTop: -2,
    },
    courseCard: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        overflow: 'hidden',
        borderRadius: moderateScale(12),
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    colorBar: {
        width: scale(6),
        height: '100%',
    },
    courseInfo: {
        flex: 1,
        padding: scale(12),
    },
    courseName: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: verticalScale(8),
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
        marginBottom: verticalScale(4),
    },
    detailText: {
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(60),
        opacity: 0.6,
    },
    emptyText: {
        marginTop: verticalScale(16),
        fontSize: moderateScale(16),
        color: theme.colors.textLight,
        textAlign: 'center',
    },
});
