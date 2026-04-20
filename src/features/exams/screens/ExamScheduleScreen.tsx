import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { Theme, spacing } from '@/core/theme/theme';

const EXAM_DATA = [
    {
        id: '1',
        courseName: 'Yazılım Mühendisliği Güncel Konular',
        type: 'VİZE',
        date: '14 Nis',
        day: 'Pazartesi',
        time: '10:30',
        location: 'Derslik 302',
        status: 'Yaklaşıyor',
        color: '#2563EB',
    },
    {
        id: '2',
        courseName: 'Veri Yapıları ve Algoritmalar',
        type: 'VİZE',
        date: '15 Nis',
        day: 'Salı',
        time: '13:00',
        location: 'Lab 1',
        status: 'Yaklaşıyor',
        color: '#7C3AED',
    },
    {
        id: '3',
        courseName: 'İşletim Sistemleri',
        type: 'VİZE',
        date: '17 Nis',
        day: 'Perşembe',
        time: '09:00',
        location: 'Amfi 2',
        status: 'Gelecek Hafta',
        color: '#059669',
    },
    {
        id: '4',
        courseName: 'Mikroişlemciler',
        type: 'VİZE',
        date: '18 Nis',
        day: 'Cuma',
        time: '15:30',
        location: 'Derslik 104',
        status: 'Gelecek Hafta',
        color: '#D97706',
    },
    {
        id: '5',
        courseName: 'Veri Tabanı Yönetim Sistemleri',
        type: 'VİZE',
        date: '21 Nis',
        day: 'Pazartesi',
        time: '11:00',
        location: 'Amfi 1',
        status: 'Sonraki Hafta',
        color: '#475569',
    },
];

export const ExamScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />

            <LinearGradient
                colors={isDarkMode ? ['#0F172A', '#020617'] : ['#0B1120', '#101D42']}
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

                {EXAM_DATA.map((exam) => (
                    <TouchableOpacity
                        key={exam.id}
                        activeOpacity={0.85}
                        style={s.examCard}
                    >
                        <View style={[s.cardAccent, { backgroundColor: exam.color }]} />

                        <View style={s.cardContent}>
                            <View style={s.cardTop}>
                                <View style={s.typeWrapper}>
                                    <Text style={[s.examType, { color: exam.color }]}>{exam.type}</Text>
                                    <View style={s.dotSeparator} />
                                    <Text style={s.statusText}>{exam.status}</Text>
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
                                    <Text style={s.detailValue}>{exam.date} • {exam.day}</Text>
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

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    locationText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: isDarkMode ? theme.colors.textSecondary : '#475569',
    },
    courseName: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: theme.colors.text,
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
        color: theme.colors.textSecondary,
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
