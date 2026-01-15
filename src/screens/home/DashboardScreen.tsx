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
import { Card } from '../../components/common';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');
const horizontalScale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Merhaba, {user?.firstName || 'Öğrenci'} 👋
                </Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>
            </View>

            <View style={styles.content}>
                {/* 1. Bugünün Yemeği */}
                <Card style={[styles.mainCard, { marginTop: 0 }]} elevation="small">
                    <View style={styles.cardHeader}>
                        <Icon name="restaurant" size={20} color={theme.colors.primary} />
                        <Text style={styles.cardTitle}>Bugün Yemekhanede</Text>
                    </View>
                    <View style={styles.mealList}>
                        <Text style={styles.mealItem}>• Ezogelin Çorbası</Text>
                        <Text style={styles.mealItem}>• İzmir Köfte</Text>
                        <Text style={styles.mealItem}>• Pirinç Pilavı</Text>
                        <Text style={styles.mealItem}>• Mevsim Salata / Ayva Tatlısı</Text>
                    </View>
                    <TouchableOpacity style={styles.cardFooter}>
                        <Text style={styles.footerLink}>Tüm haftalık menü...</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                {/* 2. Yaklaşan Ders/Sınav */}
                <Card style={styles.mainCard} elevation="small">
                    <View style={styles.cardHeader}>
                        <Icon name="time" size={20} color="#FF9800" />
                        <Text style={styles.cardTitle}>Yaklaşan Ders</Text>
                    </View>
                    <View style={styles.courseContainer}>
                        <Text style={styles.courseTime}>15:00 - 17:50</Text>
                        <Text style={styles.courseName}>MAT101 Calculus</Text>
                        <Text style={styles.courseInfo}>HB202 nolu sınıf • Prof. Dr. A. Yılmaz</Text>
                    </View>
                    <TouchableOpacity style={styles.cardFooter}>
                        <Text style={styles.footerLink}>Ders programına git</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                {/* 3. En Yeni Duyuru */}
                <Card style={styles.mainCard} elevation="small">
                    <View style={styles.cardHeader}>
                        <Icon name="notifications" size={20} color="#2196F3" />
                        <Text style={styles.cardTitle}>En Yeni Duyuru</Text>
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle} numberOfLines={2}>
                            2025-2026 Bahar Yarıyılı Kayıt Yenileme İşlemleri Hakkında Önemli Bilgilendirme
                        </Text>
                        <Text style={styles.announcementDate}>12 Mart 2026</Text>
                    </View>
                    <TouchableOpacity style={styles.cardFooter}>
                        <Text style={styles.footerLink}>Devamı...</Text>
                        <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </Card>

                {/* 4. Önemli Bağlantılar */}
                <Text style={styles.sectionHeading}>Önemli Bağlantılar</Text>
                <View style={styles.linksGrid}>
                    {[
                        { title: 'OBS', icon: 'school', color: '#182958' },
                        { title: 'E-Posta', icon: 'mail', color: '#182958' },
                        { title: 'Kütüphane', icon: 'book', color: '#182958' },
                        { title: 'Harita', icon: 'map', color: '#182958' },
                    ].map((link, index) => (
                        <TouchableOpacity key={index} style={styles.linkItem}>
                            <View style={[styles.linkIcon, { backgroundColor: link.color + '10' }]}>
                                <Icon name={link.icon} size={24} color={link.color} />
                            </View>
                            <Text style={styles.linkText}>{link.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xxl,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    greeting: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    date: {
        fontSize: moderateScale(14),
        color: 'rgba(255, 255, 255, 0.8)',
    },
    content: {
        padding: theme.spacing.md,
        marginTop: theme.spacing.sm,
    },
    mainCard: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        gap: 8,
    },
    cardTitle: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: theme.colors.text,
    },
    mealList: {
        marginBottom: theme.spacing.sm,
    },
    mealItem: {
        fontSize: moderateScale(14),
        color: theme.colors.textSecondary,
        marginBottom: 4,
        lineHeight: 20,
    },
    courseContainer: {
        marginBottom: theme.spacing.sm,
    },
    courseTime: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 2,
    },
    courseName: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 2,
    },
    courseInfo: {
        fontSize: moderateScale(13),
        color: theme.colors.textSecondary,
    },
    announcementContent: {
        marginBottom: theme.spacing.sm,
    },
    announcementTitle: {
        fontSize: moderateScale(15),
        fontWeight: '500',
        color: theme.colors.text,
        lineHeight: 22,
        marginBottom: 4,
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
        borderTopColor: '#F0F0F0',
    },
    footerLink: {
        fontSize: moderateScale(13),
        color: theme.colors.primary,
        fontWeight: '500',
        marginRight: 4,
    },
    sectionHeading: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    linksGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
    },
    linkItem: {
        width: '47%',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing.md,
        borderRadius: 12,
        alignItems: 'center',
        ...theme.shadows.small,
    },
    linkIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xs,
    },
    linkText: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: theme.colors.text,
    },
});
