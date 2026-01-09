/**
 * Dashboard Screen
 * Ana Sayfa - Öğrenci Portalı
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Card } from '../../components/common';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { DashboardModule } from '../../types/models';

const dashboardModules: DashboardModule[] = [
    {
        id: '1',
        title: 'Ders Programı',
        icon: '📚',
        route: 'Schedule',
        color: theme.colors.primary,
    },
    {
        id: '2',
        title: 'Sınav Takvimi',
        icon: '📝',
        route: 'Exams',
        color: '#E91E63',
    },
    {
        id: '3',
        title: 'Yemekhane',
        icon: '🍽️',
        route: 'Cafeteria',
        color: '#FF9800',
    },
    {
        id: '4',
        title: 'Duyurular',
        icon: '📢',
        route: 'Announcements',
        color: '#2196F3',
    },
    {
        id: '5',
        title: 'Kütüphane',
        icon: '📖',
        route: 'Library',
        color: '#4CAF50',
    },
    {
        id: '6',
        title: 'Kampüs Haritası',
        icon: '🗺️',
        route: 'Map',
        color: '#9C27B0',
    },
    {
        id: '7',
        title: 'Danışmanlık',
        icon: '👨‍🏫',
        route: 'Advisor',
        color: '#00BCD4',
    },
    {
        id: '8',
        title: 'Geri Bildirim',
        icon: '💬',
        route: 'Feedback',
        color: '#607D8B',
    },
];

export const DashboardScreen: React.FC = () => {
    const { user } = useAuthStore();

    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date().toLocaleDateString('tr-TR', options);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Merhaba, {user?.firstName || 'Öğrenci'} 👋
                </Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <Card style={styles.statCard} elevation="small">
                    <Text style={styles.statValue}>3.45</Text>
                    <Text style={styles.statLabel}>GPA</Text>
                </Card>
                <Card style={styles.statCard} elevation="small">
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Dersler</Text>
                </Card>
                <Card style={styles.statCard} elevation="small">
                    <Text style={styles.statValue}>5</Text>
                    <Text style={styles.statLabel}>Sınavlar</Text>
                </Card>
            </View>

            {/* Dashboard Modules Grid */}
            <View style={styles.modulesContainer}>
                <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
                <View style={styles.grid}>
                    {dashboardModules.map((module) => (
                        <TouchableOpacity
                            key={module.id}
                            style={styles.moduleCard}
                            activeOpacity={0.7}>
                            <Card style={styles.moduleCardInner} elevation="medium">
                                <View
                                    style={[
                                        styles.iconContainer,
                                        { backgroundColor: module.color + '20' },
                                    ]}>
                                    <Text style={styles.icon}>{module.icon}</Text>
                                </View>
                                <Text style={styles.moduleTitle} numberOfLines={2}>
                                    {module.title}
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Today's Schedule Preview */}
            <View style={styles.todaySection}>
                <Text style={styles.sectionTitle}>Bugünkü Dersler</Text>
                <Card elevation="small">
                    <View style={styles.scheduleItem}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.time}>09:00</Text>
                            <Text style={styles.timeLabel}>11:50</Text>
                        </View>
                        <View style={styles.scheduleDetails}>
                            <Text style={styles.courseName}>Mobil Uygulama Geliştirme</Text>
                            <Text style={styles.courseInfo}>Prof. Dr. Ahmet Yılmaz • A-201</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xxl,
        paddingBottom: theme.spacing.xl,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.textOnPrimary,
        marginBottom: theme.spacing.xs,
    },
    date: {
        fontSize: 14,
        color: theme.colors.textOnPrimary,
        opacity: 0.9,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        marginTop: -theme.spacing.xl,
        marginBottom: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    modulesContainer: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
    },
    moduleCard: {
        width: '47%',
    },
    moduleCardInner: {
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    icon: {
        fontSize: 32,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.text,
        textAlign: 'center',
    },
    todaySection: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    scheduleItem: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    timeContainer: {
        alignItems: 'center',
        paddingRight: theme.spacing.md,
        borderRightWidth: 2,
        borderRightColor: theme.colors.primary,
    },
    time: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    timeLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    scheduleDetails: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    courseInfo: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
});
