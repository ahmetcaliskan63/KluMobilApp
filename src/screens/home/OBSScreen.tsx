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

    const renderGradeRow = (grade: Grade) => (
        <Card key={grade.id} style={styles.gradeCard} elevation="small">
            <View style={styles.gradeHeader}>
                <Text style={styles.courseName}>{grade.courseName}</Text>
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
                        <Text style={styles.summaryLabel}>GNO</Text>
                        <Text style={styles.summaryValue}>{MOCK_STATS.gpa}</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryLabel}>TAM. KREDİ</Text>
                        <Text style={styles.summaryValue}>{MOCK_STATS.totalCredits}</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryLabel}>DÖNEM</Text>
                        <Text style={styles.summaryValue}>Güz 2025</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollContent: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
    },
    gradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    courseName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    gradeGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
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
    },
    gradeValue: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
    },
    gradeLetter: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    gradeDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#E0E0E0',
    },
});
