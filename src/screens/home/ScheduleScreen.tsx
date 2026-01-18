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
import { theme } from '../../config/theme';
import { MOCK_SCHEDULE, Course } from '../../data/mockData';
import { Card } from '../../components/common';
import { useNavigation } from '@react-navigation/native';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

export const ScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState('Pazartesi');

    const filteredSchedule = MOCK_SCHEDULE.filter(course => course.day === selectedDay);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ders Programı</Text>
                    <View style={{ width: 40 }} /> {/* Spacer */}
                </View>

                {/* Day Picker */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dayPicker}
                >
                    {DAYS.map((day) => (
                        <TouchableOpacity
                            key={day}
                            onPress={() => setSelectedDay(day)}
                            style={[
                                styles.dayItem,
                                selectedDay === day && styles.activeDayItem
                            ]}
                        >
                            <Text style={[
                                styles.dayText,
                                selectedDay === day && styles.activeDayText
                            ]}>
                                {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((course) => (
                        <View key={course.id} style={styles.timelineRow}>
                            <View style={styles.timeColumn}>
                                <Text style={styles.startTime}>{course.startTime}</Text>
                                <Text style={styles.endTime}>{course.endTime}</Text>
                            </View>
                            <View style={styles.timelineLine}>
                                <View style={[styles.timelineDot, { backgroundColor: course.color }]} />
                                <View style={styles.line} />
                            </View>
                            <Card style={styles.courseCard} elevation="small">
                                <View style={[styles.colorBar, { backgroundColor: course.color }]} />
                                <View style={styles.courseInfo}>
                                    <Text style={styles.courseName}>{course.name}</Text>
                                    <View style={styles.detailRow}>
                                        <Icon name="location-outline" size={14} color={theme.colors.textLight} />
                                        <Text style={styles.detailText}>{course.room}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Icon name="person-outline" size={14} color={theme.colors.textLight} />
                                        <Text style={styles.detailText}>{course.instructor}</Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Icon name="calendar-outline" size={64} color={theme.colors.border} />
                        <Text style={styles.emptyText}>Bu gün için kayıtlı ders bulunamadı.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dayPicker: {
        paddingHorizontal: 20,
        gap: 15,
    },
    dayItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeDayItem: {
        backgroundColor: '#FFFFFF',
    },
    dayText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '600',
        fontSize: 14,
    },
    activeDayText: {
        color: theme.colors.primary,
    },
    scrollContent: {
        padding: 20,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timeColumn: {
        width: 50,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 4,
    },
    startTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    endTime: {
        fontSize: 11,
        color: theme.colors.textLight,
        marginTop: 2,
    },
    timelineLine: {
        width: 20,
        alignItems: 'center',
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
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
        borderRadius: 12,
    },
    colorBar: {
        width: 6,
        height: '100%',
    },
    courseInfo: {
        flex: 1,
        padding: 12,
    },
    courseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    detailText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        opacity: 0.6,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.colors.textLight,
        textAlign: 'center',
    },
});
