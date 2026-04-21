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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@/shared/types/navigation';
import { theme as defaultTheme, Theme } from '@/core/theme/theme';
import { MOCK_GRADES } from '@/shared/services/mockData';
import { Card } from '@/shared/components/common';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';

type ExamDetailRouteProp = RouteProp<HomeStackParamList, 'ExamDetail'>;

export const ExamDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<ExamDetailRouteProp>();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const { examId } = route.params;

    const grade = MOCK_GRADES.find(g => g.id === examId);

    if (!grade) {
        return (
            <View style={s.errorContainer}>
                <Text style={{ color: theme.colors.text }}>Not bilgisi bulunamadı.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: theme.colors.primary, marginTop: 10 }}>Geri Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderStatItem = (label: string, value: number | string, color: string) => (
        <View style={s.statBox}>
            <Text style={s.statLabel}>{label}</Text>
            <Text style={[s.statValue, { color }]}>{value}</Text>
        </View>
    );

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" />

            {/* Custom Header */}
            <View style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={s.headerTop}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.headerButton}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle} numberOfLines={1}>Not Detayı</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={s.headerContent}>
                    <Text style={s.courseName}>{grade.courseName}</Text>
                    <View style={s.letterCircle}>
                        <Text style={s.letterGrade}>{grade.letterGrade}</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Main Grades Card */}
                <Card style={s.mainCard}>
                    <View style={s.gradeRow}>
                        <View style={s.gradeBlock}>
                            <Text style={s.gradeLabel}>VİZE</Text>
                            <Text style={s.gradeText}>{grade.midterm ?? '-'}</Text>
                            <Text style={s.weightText}>%40</Text>
                        </View>
                        <View style={s.gradeDivider} />
                        <View style={s.gradeBlock}>
                            <Text style={s.gradeLabel}>FİNAL</Text>
                            <Text style={s.gradeText}>{grade.final ?? '-'}</Text>
                            <Text style={s.weightText}>%60</Text>
                        </View>
                    </View>
                </Card>

                {/* Statistics Section */}
                {grade.stats && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>Sınıf İstatistikleri</Text>
                        <View style={s.statsGrid}>
                            {renderStatItem('Ortalama', grade.stats.average, theme.colors.primary)}
                            {renderStatItem('En Yüksek', grade.stats.high, theme.colors.success)}
                            {renderStatItem('En Düşük', grade.stats.low, theme.colors.error)}
                        </View>

                        {/* Visualization Placeholder */}
                        <Card style={s.chartCard}>
                            <View style={s.chartHeader}>
                                <Icon name="stats-chart" size={18} color={theme.colors.primary} />
                                <Text style={s.chartTitle}>Başarı Dağılımı</Text>
                            </View>
                            <View style={s.chartPlaceholder}>
                                {[40, 70, 90, 60, 30].map((h, i) => (
                                    <View key={i} style={s.chartArea}>
                                        <View style={[s.chartBar, { height: h, backgroundColor: i === 2 ? theme.colors.primary : (isDarkMode ? '#334155' : '#E0E0E0') }]} />
                                        <Text style={s.chartLabel}>{['FF', 'CC', 'BA', 'BB', 'AA'][i]}</Text>
                                    </View>
                                ))}
                            </View>
                        </Card>
                    </View>
                )}

                {/* Additional Info */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Ders Bilgileri</Text>
                    <Card style={s.infoCard}>
                        <View style={s.infoRow}>
                            <Icon name="ribbon-outline" size={20} color={theme.colors.textLight} />
                            <Text style={s.infoText}>Kredi: {grade.credits}</Text>
                        </View>
                        <View style={s.infoRow}>
                            <Icon name="checkmark-circle-outline" size={20} color={grade.status === 'Passed' ? theme.colors.success : theme.colors.warning} />
                            <Text style={s.infoText}>Durum: {grade.status === 'Passed' ? 'Geçti' : 'Beklemede'}</Text>
                        </View>
                    </Card>
                </View>

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
        backgroundColor: theme.colors.primary,
        paddingBottom: verticalScale(40),
        borderBottomLeftRadius: moderateScale(35),
        borderBottomRightRadius: moderateScale(35),
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
    },
    headerButton: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: scale(10),
    },
    headerContent: {
        alignItems: 'center',
        marginTop: verticalScale(20),
    },
    courseName: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: verticalScale(15),
        textAlign: 'center',
        paddingHorizontal: scale(20),
    },
    letterCircle: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(40),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    letterGrade: {
        fontSize: moderateScale(32),
        fontWeight: '900',
        color: defaultTheme.colors.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: scale(20),
    },
    mainCard: {
        marginTop: verticalScale(-30),
        borderRadius: moderateScale(20),
        padding: scale(24),
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    gradeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    gradeBlock: {
        alignItems: 'center',
    },
    gradeLabel: {
        fontSize: moderateScale(12),
        color: theme.colors.textLight,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: verticalScale(8),
    },
    gradeText: {
        fontSize: moderateScale(32),
        fontWeight: '900',
        color: theme.colors.text,
    },
    weightText: {
        fontSize: moderateScale(11),
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginTop: verticalScale(4),
    },
    gradeDivider: {
        width: 1,
        height: verticalScale(50),
        backgroundColor: theme.colors.border,
    },
    section: {
        marginTop: verticalScale(30),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: verticalScale(16),
    },
    statsGrid: {
        flexDirection: 'row',
        gap: scale(12),
        marginBottom: verticalScale(16),
    },
    statBox: {
        flex: 1,
        backgroundColor: theme.colors.card,
        padding: scale(15),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    statLabel: {
        fontSize: moderateScale(10),
        color: theme.colors.textLight,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: verticalScale(6),
    },
    statValue: {
        fontSize: moderateScale(18),
        fontWeight: '800',
    },
    chartCard: {
        padding: scale(20),
        borderRadius: moderateScale(20),
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(20),
    },
    chartTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: theme.colors.text,
    },
    chartPlaceholder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: verticalScale(120),
        paddingHorizontal: scale(10),
    },
    chartArea: {
        alignItems: 'center',
        gap: scale(8),
    },
    chartBar: {
        width: scale(30),
        borderRadius: moderateScale(8),
    },
    chartLabel: {
        fontSize: moderateScale(10),
        color: theme.colors.textLight,
        fontWeight: 'bold',
    },
    infoCard: {
        padding: scale(20),
        borderRadius: moderateScale(20),
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: scale(15),
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(12),
    },
    infoText: {
        fontSize: moderateScale(15),
        color: theme.colors.text,
        fontWeight: '500',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    }
});
