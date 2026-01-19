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
import { theme } from '../../config/theme';
import { MOCK_GRADES, MOCK_STATS, Grade } from '../../data/mockData';
import { Card } from '../../components/common';
import { useNavigation } from '@react-navigation/native';

export const OBSScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

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
        <Card key={grade.id} style={styles.gradeCard} elevation="small">
            <View style={styles.gradeHeader}>
                <View style={styles.courseTitleContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '10' }]}>
                        <Icon name={getCourseIcon(grade.courseName)} size={18} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.courseName}>{grade.courseName}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: grade.status === 'Passed' ? '#E8F5E9' : grade.status === 'Pending' ? '#FFF3E0' : '#FFEBEE' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: grade.status === 'Passed' ? '#2E7D32' : grade.status === 'Pending' ? '#EF6C00' : '#C62828' }
                    ]}>
                        {grade.status === 'Passed' ? 'Geçti' : grade.status === 'Pending' ? 'Açıklanmadı' : 'Kaldı'}
                    </Text>
                </View>
            </View>

            <View style={styles.gradeGrid}>
                <View style={styles.gradeItem}>
                    <Text style={styles.gradeLabel}>Vize</Text>
                    <Text style={styles.gradeValue}>{grade.midterm ?? '-'}</Text>
                </View>
                <View style={styles.gradeDivider} />
                <View style={styles.gradeItem}>
                    <Text style={styles.gradeLabel}>Final</Text>
                    <Text style={styles.gradeValue}>{grade.final ?? '-'}</Text>
                </View>
                <View style={styles.gradeDivider} />
                <View style={styles.gradeItem}>
                    <Text style={styles.gradeLabel}>Harf</Text>
                    <Text style={styles.gradeLetter}>{grade.letterGrade}</Text>
                </View>
                <View style={styles.gradeDivider} />
                <View style={styles.gradeItem}>
                    <Text style={styles.gradeLabel}>Kredi</Text>
                    <Text style={styles.gradeValue}>{grade.credits}</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Öğrenci Bilgi Sistemi</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Academic Summary */}
                <View style={styles.summaryGrid}>
                    <View style={styles.summaryBox}>
                        <View style={styles.gpaCircle}>
                            <Text style={styles.summaryValue}>{MOCK_STATS.gpa}</Text>
                            <Text style={styles.gpaMax}>/ 4.0</Text>
                        </View>
                        <Text style={styles.summaryLabel}>GNO</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Icon name="ribbon-outline" size={24} color="#FFFFFF" style={{ marginBottom: 4 }} />
                        <Text style={styles.summaryValue}>{MOCK_STATS.totalCredits}</Text>
                        <Text style={styles.summaryLabel}>TAM. KREDİ</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Icon name="calendar-outline" size={24} color="#FFFFFF" style={{ marginBottom: 4 }} />
                        <Text style={styles.summaryValue}>Güz 2025</Text>
                        <Text style={styles.summaryLabel}>DÖNEM</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Academic Progress */}
                <Card style={styles.progressCard}>
                    <Text style={styles.progressTitle}>Mezuniyet İlerlemesi</Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '75%' }]} />
                    </View>
                    <View style={styles.progressDetails}>
                        <Text style={styles.progressText}>Tamamlanan: {MOCK_STATS.totalCredits} AKTS</Text>
                        <Text style={styles.progressText}>Hedef: 240 AKTS</Text>
                    </View>
                </Card>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Dönem Notları</Text>
                    <TouchableOpacity>
                        <Text style={styles.filterText}>Tüm Dönemler</Text>
                    </TouchableOpacity>
                </View>

                {MOCK_GRADES.map(renderGradeRow)}

                <View style={{ height: 20 }} />
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
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    summaryGrid: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
    },
    summaryBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gpaCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    gpaMax: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: -2,
    },
    summaryLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollContent: {
        padding: 16,
    },
    progressCard: {
        marginBottom: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        ...theme.shadows.small,
    },
    progressTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 12,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F0F2F5',
        borderRadius: 4,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
    },
    progressDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    filterText: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    gradeCard: {
        marginBottom: 14,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0F2F5',
    },
    gradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    courseTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    courseName: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.text,
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    gradeGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 12,
    },
    gradeItem: {
        flex: 1,
        alignItems: 'center',
    },
    gradeLabel: {
        fontSize: 10,
        color: theme.colors.textLight,
        marginBottom: 4,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    gradeValue: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.text,
    },
    gradeLetter: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.primary,
    },
    gradeDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#EAECEF',
    },
});
