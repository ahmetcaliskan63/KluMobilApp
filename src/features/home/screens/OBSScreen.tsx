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
import { Theme } from '@/core/theme/theme';
import { MOCK_GRADES, MOCK_STATS, MOCK_GRADUATION_PROGRESS, Grade } from '@/shared/services/mockData';
import { Card } from '@/shared/components/common';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';

export const OBSScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);

    const getCourseIcon = (courseName: string) => {
        const name = courseName.toLowerCase();
        if (name.includes('calculus') || name.includes('matematik')) return 'calculator';
        if (name.includes('physics') || name.includes('fizik')) return 'flash';
        if (name.includes('programming') || name.includes('programlama')) return 'code-slash';
        if (name.includes('türk dili')) return 'book';
        if (name.includes('english') || name.includes('ingilizce')) return 'language';
        return 'journal';
    };

    const renderGradeRow = (grade: Grade) => (
        <TouchableOpacity
            key={grade.id}
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('ExamDetail', { examId: grade.id })}
        >
            <Card style={s.gradeCard} elevation="small">
                <View style={s.gradeHeader}>
                    <View style={s.courseTitleContainer}>
                        <View style={[s.iconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
                            <Icon name={getCourseIcon(grade.courseName)} size={18} color={theme.colors.primary} />
                        </View>
                        <Text style={s.courseName}>{grade.courseName}</Text>
                    </View>
                    <View style={[
                        s.statusBadge,
                        { backgroundColor: grade.status === 'Passed' ? (isDarkMode ? '#064E3B' : '#E8F5E9') : grade.status === 'Pending' ? (isDarkMode ? '#451A03' : '#FFF3E0') : (isDarkMode ? '#7F1D1D' : '#FFEBEE') }
                    ]}>
                        <Text style={[
                            s.statusText,
                            { color: grade.status === 'Passed' ? (isDarkMode ? '#34D399' : '#2E7D32') : grade.status === 'Pending' ? (isDarkMode ? '#FBBF24' : '#EF6C00') : (isDarkMode ? '#F87171' : '#C62828') }
                        ]}>
                            {grade.status === 'Passed' ? 'Geçti' : grade.status === 'Pending' ? 'Açıklanmadı' : 'Kaldı'}
                        </Text>
                    </View>
                </View>

                <View style={s.gradeGrid}>
                    <View style={s.gradeItem}>
                        <Text style={s.gradeLabel}>Vize</Text>
                        <Text style={s.gradeValue}>{grade.midterm ?? '-'}</Text>
                    </View>
                    <View style={s.gradeDivider} />
                    <View style={s.gradeItem}>
                        <Text style={s.gradeLabel}>Final</Text>
                        <Text style={s.gradeValue}>{grade.final ?? '-'}</Text>
                    </View>
                    <View style={s.gradeDivider} />
                    <View style={s.gradeItem}>
                        <Text style={s.gradeLabel}>Harf</Text>
                        <Text style={s.gradeLetter}>{grade.letterGrade}</Text>
                    </View>
                    <View style={s.gradeDivider} />
                    <View style={s.gradeItem}>
                        <Text style={s.gradeLabel}>Kredi</Text>
                        <Text style={s.gradeValue}>{grade.credits}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[s.header, { paddingTop: Math.max(insets.top, verticalScale(20)) }]}>
                <View style={s.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
                        <Icon name="arrow-back" size={moderateScale(24)} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Öğrenci Bilgi Sistemi</Text>
                    <View style={{ width: scale(40) }} />
                </View>

                {/* Academic Summary */}
                <View style={s.summaryGrid}>
                    <View style={s.summaryBox}>
                        <View style={s.gpaCircle}>
                            <Text style={s.summaryValue}>{MOCK_STATS.gpa}</Text>
                            <Text style={s.gpaMax}>/ 4.0</Text>
                        </View>
                        <Text style={s.summaryLabel}>GNO</Text>
                    </View>
                    <View style={s.summaryBox}>
                        <Icon name="ribbon-outline" size={moderateScale(24)} color="#FFFFFF" style={{ marginBottom: verticalScale(4) }} />
                        <Text style={s.summaryValue}>{MOCK_STATS.totalCredits}</Text>
                        <Text style={s.summaryLabel}>TAM. KREDİ</Text>
                    </View>
                    <View style={s.summaryBox}>
                        <Icon name="calendar-outline" size={moderateScale(24)} color="#FFFFFF" style={{ marginBottom: verticalScale(4) }} />
                        <Text style={s.summaryValue}>{MOCK_STATS.activeSemester}. Yarıyıl</Text>
                        <Text style={s.summaryLabel}>DÖNEM</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Academic Progress */}
                <Card style={s.progressCard}>
                    <Text style={s.progressTitle}>Mezuniyet İlerlemesi</Text>
                    <View style={s.progressBarBg}>
                        <View style={[s.progressBarFill, { width: `${(MOCK_GRADUATION_PROGRESS.completedCredits / MOCK_GRADUATION_PROGRESS.totalRequiredCredits) * 100}%` }]} />
                    </View>
                    <View style={s.progressDetails}>
                        <Text style={s.progressText}>Tamamlanan: {MOCK_GRADUATION_PROGRESS.completedCredits} AKTS</Text>
                        <Text style={s.progressText}>Hedef: {MOCK_GRADUATION_PROGRESS.totalRequiredCredits} AKTS</Text>
                    </View>
                </Card>
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitle}>Dönem Notları</Text>
                    <TouchableOpacity>
                        <Text style={s.filterText}>Tüm Dönemler</Text>
                    </TouchableOpacity>
                </View>

                {MOCK_GRADES.map(renderGradeRow)}

                <View style={{ height: 20 }} />
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
        paddingBottom: verticalScale(24),
        borderBottomLeftRadius: moderateScale(30),
        borderBottomRightRadius: moderateScale(30),
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(24),
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
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    summaryGrid: {
        flexDirection: 'row',
        paddingHorizontal: scale(20),
        gap: scale(12),
    },
    summaryBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: moderateScale(20),
        padding: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    gpaCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(4),
    },
    gpaMax: {
        fontSize: moderateScale(10),
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: verticalScale(-2),
    },
    summaryLabel: {
        fontSize: moderateScale(10),
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollContent: {
        padding: scale(16),
    },
    progressCard: {
        marginBottom: verticalScale(20),
        padding: scale(16),
        borderRadius: moderateScale(20),
        backgroundColor: theme.colors.card,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    progressTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: verticalScale(12),
    },
    progressBarBg: {
        height: verticalScale(8),
        backgroundColor: theme.colors.surface,
        borderRadius: moderateScale(4),
        marginBottom: verticalScale(8),
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: moderateScale(4),
    },
    progressDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressText: {
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(16),
        paddingHorizontal: scale(4),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    filterText: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        fontWeight: '600',
    },
    gradeCard: {
        marginBottom: verticalScale(14),
        padding: scale(16),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    gradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    courseTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: scale(10),
    },
    iconContainer: {
        width: scale(36),
        height: scale(36),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12),
    },
    courseName: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: theme.colors.text,
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(10),
    },
    statusText: {
        fontSize: moderateScale(11),
        fontWeight: 'bold',
    },
    gradeGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: moderateScale(15),
        padding: scale(12),
    },
    gradeItem: {
        flex: 1,
        alignItems: 'center',
    },
    gradeLabel: {
        fontSize: moderateScale(10),
        color: theme.colors.textLight,
        marginBottom: verticalScale(4),
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    gradeValue: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: theme.colors.text,
    },
    gradeLetter: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: theme.colors.primary,
    },
    gradeDivider: {
        width: 1,
        height: verticalScale(20),
        backgroundColor: theme.colors.border,
    },
});
