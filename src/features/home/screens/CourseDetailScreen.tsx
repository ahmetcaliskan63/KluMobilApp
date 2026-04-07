import React from 'react';
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@/shared/types/navigation';
import { Course } from '@/shared/types/models';
import { Card } from '@/shared/components/common';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useFetch } from '@/shared/hooks/useFetch';
import { Theme } from '@/app/theme/theme';

type CourseDetailRouteProp = RouteProp<HomeStackParamList, 'CourseDetail'>;

export const CourseDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<CourseDetailRouteProp>();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const { courseId } = route.params;

    const { data: course, loading, error } = useFetch<Course>(`/courses/${courseId}`);

    if (loading && !course) {
        return (
            <View style={[s.errorContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={{ color: theme.colors.primary }}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error || !course) {
        return (
            <View style={s.errorContainer}>
                <Text style={{ color: theme.colors.text }}>Ders bulunamadı.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: theme.colors.primary }}>Geri Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" />

            {/* Custom Header */}
            <View style={[s.header, { paddingTop: Math.max(insets.top, 20), backgroundColor: course.color }]}>
                <View style={s.headerTop}>
                    <TouchableOpacity
                        onPress={() => (navigation as any).navigate('Profile')}
                        style={s.headerButton}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle} numberOfLines={1}>{course.name}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={s.headerContent}>
                    <Icon name="school" size={48} color="rgba(255, 255, 255, 0.3)" style={s.headerIcon} />
                    <Text style={s.courseCode}>{course.id.padStart(3, '0')}</Text>
                    <Text style={s.instructorName}>{course.instructor}</Text>
                </View>
            </View>

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Time and Location Card */}
                <Card style={s.infoCard}>
                    <View style={s.infoRow}>
                        <View style={s.infoItem}>
                            <View style={[s.iconBox, { backgroundColor: isDarkMode ? '#1E293B' : '#E3F2FD' }]}>
                                <Icon name="time-outline" size={20} color={isDarkMode ? '#3B82F6' : '#1976D2'} />
                            </View>
                            <View>
                                <Text style={s.infoLabel}>Saat</Text>
                                <Text style={s.infoValue}>{course.startTime} - {course.endTime}</Text>
                            </View>
                        </View>
                        <View style={s.infoDivider} />
                        <View style={s.infoItem}>
                            <View style={[s.iconBox, { backgroundColor: isDarkMode ? '#1E293B' : '#F3E5F5' }]}>
                                <Icon name="location-outline" size={20} color={isDarkMode ? '#A855F7' : '#7B1FA2'} />
                            </View>
                            <View>
                                <Text style={s.infoLabel}>Derslik</Text>
                                <Text style={s.infoValue}>{course.room}</Text>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Attendance Section */}
                {course.attendance !== undefined && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>Devamsızlık Durumu</Text>
                        <Card style={s.attendanceCard}>
                            <View style={s.attendanceHeader}>
                                <Text style={s.attendancePercent}>{course.attendance}%</Text>
                                <Text style={s.attendanceLabel}>Katılım Oranı</Text>
                            </View>
                            <View style={s.progressBarBg}>
                                <View style={[
                                    s.progressBarFill,
                                    { width: `${course.attendance}%`, backgroundColor: course.attendance < 70 ? theme.colors.error : theme.colors.success }
                                ]} />
                            </View>
                            <Text style={s.attendanceHint}>Kritik sınır: %70</Text>
                        </Card>
                    </View>
                )}

                {/* Syllabus Section */}
                {course.syllabus && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>Ders İçeriği</Text>
                        {course.syllabus.map((item, index) => (
                            <View key={index} style={s.syllabusItem}>
                                <View style={[s.syllabusNumber, { backgroundColor: course.color + (isDarkMode ? '30' : '20') }]}>
                                    <Text style={{ color: course.color, fontWeight: 'bold' }}>{index + 1}</Text>
                                </View>
                                <Text style={s.syllabusText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingBottom: 30,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    headerContent: {
        alignItems: 'center',
        marginTop: 20,
        position: 'relative',
    },
    headerIcon: {
        position: 'absolute',
        top: -10,
        right: 40,
    },
    courseCode: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    instructorName: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 8,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    infoCard: {
        marginTop: -25,
        borderRadius: 20,
        padding: 20,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoDivider: {
        width: 1,
        height: 30,
        backgroundColor: theme.colors.border,
        marginHorizontal: 15,
    },
    infoLabel: {
        fontSize: 11,
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.text,
        marginTop: 2,
    },
    section: {
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 16,
    },
    attendanceCard: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    attendanceHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 15,
    },
    attendancePercent: {
        fontSize: 36,
        fontWeight: '900',
        color: theme.colors.text,
    },
    attendanceLabel: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    progressBarBg: {
        height: 10,
        backgroundColor: theme.colors.surface,
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
    },
    attendanceHint: {
        fontSize: 12,
        color: theme.colors.textLight,
        fontStyle: 'italic',
    },
    syllabusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    syllabusNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    syllabusText: {
        fontSize: 15,
        color: theme.colors.text,
        fontWeight: '500',
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    }
});

