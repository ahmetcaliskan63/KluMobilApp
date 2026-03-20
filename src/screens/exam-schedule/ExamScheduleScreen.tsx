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
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useFetch } from '../../hooks/useFetch';
import { Exam } from '../../types/models';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import { Theme, spacing } from '../../config/theme';

export const ExamScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const { data: exams, loading, error } = useFetch<Exam[]>('/exams/schedule');
    const s = styles(theme);

    if (loading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text }}>Program yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Hata: {error}</Text>
            </View>
        );
    }

    const examList = exams || [];

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#0B1120', '#101D42']}
                style={[s.header, { paddingTop: insets.top + 10 }]}
            >
                <View style={s.headerTop}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                    >
                        <Icon name="chevron-back" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={s.headerTitleContainer}>
                        <Text style={s.headerTitle}>Sınav Programı</Text>
                        <Text style={s.termText}>2024 - 2025 Bahar Dönemi</Text>
                    </View>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {examList.map((exam) => (
                    <TouchableOpacity
                        key={exam.id}
                        activeOpacity={0.85}
                        style={s.examCard}
                    >
                        <View style={[s.cardAccent, { backgroundColor: exam.color || theme.colors.primary }]} />

                        <View style={s.cardContent}>
                            <View style={s.cardTop}>
                                <View style={s.typeWrapper}>
                                    <Text style={[s.examType, { color: exam.color || theme.colors.primary }]}>{exam.type}</Text>
                                    <View style={s.dotSeparator} />
                                    <Text style={s.statusText}>{exam.status || 'Gelecek'}</Text>
                                </View>
                                <View style={s.locationBadge}>
                                    <Icon name="location" size={12} color="#64748B" />
                                    <Text style={s.locationText}>{exam.location}</Text>
                                </View>
                            </View>

                            <Text style={s.courseName} numberOfLines={1}>{exam.courseName}</Text>

                            <View style={s.detailsRow}>
                                <View style={s.detailItem}>
                                    <Icon name="calendar-outline" size={14} color="#64748B" />
                                    <Text style={s.detailValue}>{exam.date}{exam.day ? ` • ${exam.day}` : ''}</Text>
                                </View>

                                <View style={s.detailItem}>
                                    <Icon name="time-outline" size={14} color="#64748B" />
                                    <Text style={s.detailValue}>{exam.time}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={s.footerContainer}>
                    <Text style={s.footerInfo}>Kırklareli Üniversitesi • Bilgi İşlem</Text>
                    <Text style={s.successWish}>Başarılar.</Text>
                </View>
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
        paddingBottom: verticalScale(20),
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    backBtn: {
        width: scale(36),
        height: scale(36),
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    termText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: moderateScale(11),
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    examCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: verticalScale(14),
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#94A3B8', // Sharper, darker border
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
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
        marginBottom: 8,
    },
    typeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    examType: {
        fontSize: moderateScale(10),
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
    statusText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#64748B',
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    locationText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#475569',
    },
    courseName: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xl,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailValue: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: '#475569',
    },
    footerContainer: {
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
    },
    footerInfo: {
        fontSize: moderateScale(11),
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    successWish: {
        fontSize: moderateScale(12),
        color: '#64748B',
        fontWeight: '800',
        fontStyle: 'italic',
        marginTop: 4,
    }
});
