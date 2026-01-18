import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');
const horizontalScale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, HomeStackParamList } from '../../types/navigation';
import {
    MOCK_ANNOUNCEMENTS,
    MOCK_WEEKLY_MENU,
    MOCK_STATS
} from '../../data/mockData';

type DashboardNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>,
    BottomTabNavigationProp<MainTabParamList>
>;

export const DashboardScreen: React.FC = () => {
    const { user } = useAuthStore();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<DashboardNavigationProp>();

    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date().toLocaleDateString('tr-TR', options);
    };

    // Bugünün yemeği (Çarşamba - mock verideki 3. item gibi düşünelim veya dinamik bulalım)
    const todayMeal = MOCK_WEEKLY_MENU[3];
    const latestAnnouncement = MOCK_ANNOUNCEMENTS[0];

    return (
        <View style={styles.container}>
            {/* Custom Header with Safe Area */}
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>
                            Merhaba, {user?.firstName || 'Öğrenci'} 👋
                        </Text>
                        <Text style={styles.date}>{getCurrentDate()}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <View style={styles.profilePlaceholder}>
                            <Icon name="person" size={24} color={theme.colors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Balance & Status Summary Card */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Kampüs Kart</Text>
                        <Text style={styles.summaryValue}>{MOCK_STATS.balance}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Yemek Hakkı</Text>
                        <Text style={styles.summaryValue}>{MOCK_STATS.mealCredits}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Kütüphane</Text>
                        <Text style={styles.summaryValue}>{MOCK_STATS.libraryBooks}</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 0. Hızlı İşlemler Section */}
                <Text style={styles.sectionHeading}>Hızlı İşlemler</Text>
                <View style={styles.quickActionsGrid}>
                    {[
                        { title: 'OBS', icon: 'school', color: '#4A90E2', tab: 'OBS' },
                        { title: 'Yemek Menüsü', icon: 'restaurant', color: '#50E3C2', tab: 'Cafeteria' },
                        { title: 'Kampüs Kart', icon: 'card', color: '#F5A623', tab: 'Cafeteria' },
                        { title: 'Duyurular', icon: 'megaphone', color: '#D0021B', tab: 'Announcements' },
                    ].map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionItem}
                            onPress={() => action.tab && navigation.navigate(action.tab as any)}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                                <Icon name={action.icon} size={24} color={action.color} />
                            </View>
                            <Text style={styles.actionText}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 1. Bugünün Yemeği */}
                <Card style={styles.mainCard} elevation="small">
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <Icon name="restaurant" size={20} color={theme.colors.primary} />
                            <Text style={styles.cardTitle}>Bugün Yemekhanede</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Öğle Yemeği</Text>
                        </View>
                    </View>
                    <View style={styles.mealList}>
                        {todayMeal.items.map((item, index) => (
                            <View key={index} style={styles.mealRow}>
                                <Icon name="ellipse" size={8} color={theme.colors.primary} style={styles.bullet} />
                                <Text style={styles.mealItem}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.cardFooter}
                        onPress={() => navigation.navigate('Cafeteria')}
                    >
                        <Text style={styles.footerLink}>Tüm haftalık menü...</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                {/* 2. Yaklaşan Ders/Sınav */}
                <Card style={styles.mainCard} elevation="small">
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <Icon name="time" size={20} color={theme.colors.warning} />
                            <Text style={styles.cardTitle}>Yaklaşan Ders</Text>
                        </View>
                    </View>
                    <View style={styles.courseContainer}>
                        <Text style={styles.courseTime}>15:00 - 17:50</Text>
                        <Text style={styles.courseName}>MAT101 Calculus</Text>
                        <Text style={styles.courseInfo}>HB202 nolu sınıf • Prof. Dr. A. Yılmaz</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.cardFooter}
                        onPress={() => navigation.navigate('Schedule')}
                    >
                        <Text style={styles.footerLink}>Ders programına git</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                {/* 3. En Yeni Duyuru */}
                <Card style={styles.mainCard} elevation="small">
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <Icon name="notifications" size={20} color={theme.colors.info} />
                            <Text style={styles.cardTitle}>En Yeni Duyuru</Text>
                        </View>
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle} numberOfLines={2}>
                            {latestAnnouncement.title}
                        </Text>
                        <Text style={styles.announcementDate}>{latestAnnouncement.date}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.cardFooter}
                        onPress={() => navigation.navigate('Announcements')}
                    >
                        <Text style={styles.footerLink}>Devamı...</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    greeting: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    date: {
        fontSize: moderateScale(13),
        color: 'rgba(255, 255, 255, 0.7)',
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    profilePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 15,
        padding: theme.spacing.md,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: moderateScale(11),
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    summaryValue: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: 'bold',
    },
    summaryDivider: {
        width: 1,
        height: '70%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    sectionHeading: {
        fontSize: moderateScale(17),
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
        marginTop: theme.spacing.xs,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.lg,
    },
    actionItem: {
        width: '23%',
        alignItems: 'center',
    },
    actionIcon: {
        width: horizontalScale(56),
        height: horizontalScale(56),
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        ...theme.shadows.small,
    },
    actionText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    mainCard: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    cardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardTitle: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: theme.colors.text,
    },
    badge: {
        backgroundColor: theme.colors.primary + '10',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: moderateScale(11),
        color: theme.colors.primary,
        fontWeight: '600',
    },
    mealList: {
        marginBottom: theme.spacing.md,
    },
    mealRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bullet: {
        marginRight: 10,
        opacity: 0.8,
    },
    mealItem: {
        fontSize: moderateScale(14),
        color: theme.colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
    courseContainer: {
        marginBottom: theme.spacing.md,
        backgroundColor: '#F8F9FA',
        padding: theme.spacing.md,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.warning,
    },
    courseTime: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: theme.colors.warning,
        marginBottom: 4,
    },
    courseName: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    courseInfo: {
        fontSize: moderateScale(13),
        color: theme.colors.textSecondary,
    },
    announcementContent: {
        marginBottom: theme.spacing.md,
    },
    announcementTitle: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: theme.colors.text,
        lineHeight: 22,
        marginBottom: 6,
    },
    announcementDate: {
        fontSize: moderateScale(12),
        color: theme.colors.textLight,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    footerLink: {
        fontSize: moderateScale(13),
        color: theme.colors.primary,
        fontWeight: '600',
        marginRight: 4,
    },
});
