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
import { ExamResult } from '../../types/models';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import { Theme, spacing } from '../../config/theme';

export const ExamResultsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const { data: results, loading, error } = useFetch<ExamResult[]>('/exams/results');
    const s = styles(theme);

    if (loading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text }}>Sonuçlar yükleniyor...</Text>
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

    const examResults = results || [];

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
                        <Text style={s.headerTitle}>Sınav Sonuçları</Text>
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
                {examResults.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        style={s.resultCard}
                    >
                        <View style={[s.cardAccent, { backgroundColor: item.color || theme.colors.primary }]} />

                        <View style={s.cardContent}>
                            <View style={s.cardTop}>
                                <View style={s.typeWrapper}>
                                    <View style={[s.typeBadge, { backgroundColor: (item.color || theme.colors.primary) + '15' }]}>
                                        <Text style={[s.examType, { color: item.color || theme.colors.primary }]}>{item.type}</Text>
                                    </View>
                                    <View style={s.dotSeparator} />
                                    <Text style={s.dateText}>{item.date}</Text>
                                </View>
                                <View style={[s.statusBadge, { backgroundColor: item.status === 'Okunuyor' ? '#F1F5F9' : '#DCFCE7' }]}>
                                    <Text style={[s.statusText, { color: item.status === 'Okunuyor' ? '#64748B' : '#166534' }]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={s.cardBody}>
                                <View style={s.courseInfo}>
                                    <Text style={s.courseName} numberOfLines={1}>{item.courseName}</Text>
                                    <Text style={s.instructorName}>Fen Edebiyat Fakültesi</Text>
                                </View>

                                <View style={s.gradesWrapper}>
                                    <View style={s.gradeContainer}>
                                        <View style={s.numericBadge}>
                                            <Text style={s.numericValue}>{item.grade}</Text>
                                        </View>
                                        <View style={s.letterGradeBox}>
                                            <Text style={s.letterGradeValue}>{item.letterGrade}</Text>
                                            <Text style={s.gradeLabel}>Harf</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={s.footerContainer}>
                    <Text style={s.footerInfo}>Kırklareli Üniversitesi • Bilgi İşlem</Text>
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
    resultCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: verticalScale(14),
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#94A3B8',
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
        color: '#0F172A',
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
        minWidth: scale(54),
    },
    numericBadge: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: -10, // Pull the letter box up
        zIndex: 1,
        borderWidth: 1.5,
        borderColor: '#94A3B8',
        elevation: 2,
    },
    numericValue: {
        fontSize: moderateScale(11),
        fontWeight: '900',
        color: '#1E293B', // Darker for better contrast
    },
    letterGradeBox: {
        backgroundColor: '#101D42',
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#101D42',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    letterGradeValue: {
        fontSize: moderateScale(17),
        fontWeight: '900',
        color: '#FFFFFF',
    },
    gradeLabel: {
        fontSize: moderateScale(7),
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '800',
        textTransform: 'uppercase',
        marginTop: -1,
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
    }
});
