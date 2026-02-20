import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { MOCK_SCHEDULE, Course } from '../../data/mockData';
import { Card } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

export const ScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const s = styles(theme);
    const [selectedDay, setSelectedDay] = useState('Pazartesi');

    const filteredSchedule = MOCK_SCHEDULE.filter(course => course.day === selectedDay);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />

            <LinearGradient
                colors={['#182958', '#101D42']}
                style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}
            >
                <View style={s.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
                        <Icon name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Ders Programı</Text>
                    <View style={{ width: 40 }} />
                </View>

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
            </LinearGradient>

            <ScrollView
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((course) => (
                        <View key={course.id} style={s.timelineRow}>
                            <View style={s.timeColumn}>
                                <Text style={s.startTime}>{course.startTime}</Text>
                                <Text style={s.endTime}>{course.endTime}</Text>
                            </View>
                            <View style={s.timelineLine}>
                                <View style={[s.timelineDot, { backgroundColor: course.color }]}>
                                    <View style={[s.innerDot, { backgroundColor: '#FFFFFF' }]} />
                                </View>
                                <View style={s.line} />
                            </View>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                activeOpacity={0.8}
                                onPress={() => (navigation as any).navigate('CourseDetail', { courseId: course.id })}
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
                    ))
                ) : (
                    <View style={s.emptyState}>
                        <View style={s.emptyIconContainer}>
                            <Icon name="calendar-outline" size={64} color="#CBD5E1" />
                        </View>
                        <Text style={[s.emptyText, { color: theme.colors.textSecondary }]}>
                            Bu gün için kayıtlı ders bulunamadı.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingBottom: verticalScale(24),
        borderBottomLeftRadius: moderateScale(32),
        borderBottomRightRadius: moderateScale(32),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: verticalScale(20),
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    dayPicker: {
        paddingHorizontal: 20,
        gap: 12,
    },
    dayItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeDayItem: {
        backgroundColor: '#FFFFFF',
    },
    dayText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '700',
        fontSize: moderateScale(14),
    },
    activeDayText: {
        color: '#182958',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 100,
    },
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
        color: '#1E293B',
    },
    endTime: {
        fontSize: moderateScale(11),
        color: '#64748B',
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
        backgroundColor: '#E2E8F0',
        marginTop: -4,
        borderRadius: 1,
    },
    courseCard: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
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
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    emptyText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 22,
    },
});
