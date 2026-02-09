import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { theme as defaultTheme, Theme } from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MOCK_STATS, MOCK_GRADUATION_PROGRESS, MOCK_ATTENDANCE } from '../../data/mockData';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';
import { MenuItem } from '../../components/common/MenuItem';
import { MenuSection } from '../../components/common/MenuSection';
import { DigitalPassportCard } from '../../components/profile/DigitalPassportCard';
import { GraduationStatusBar } from '../../components/profile/GraduationStatusBar';
import { AttendanceRiskCard } from '../../components/profile/AttendanceRiskCard';

export const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme);

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
            ]
        );
    };

    // Senior Refactoring: renderSettingItem replaced by MenuItem component

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
                {/* 0. Premium Header Section */}
                <LinearGradient
                    colors={['#0F172A', '#1E293B']}
                    style={s.headerGradient}
                >
                    <SafeAreaView style={{ paddingTop: insets.top }}>
                        <View style={s.headerTop}>
                            <View style={s.headerAvatarContainer}>
                                <View style={s.avatarRim}>
                                    <View style={s.avatarBox}>
                                        <Text style={s.avatarInitial}>
                                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={s.cameraButton}>
                                    <Icon name="camera" size={14} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>

                            <View style={s.headerInfo}>
                                <Text style={s.userNameText}>{user?.firstName} {user?.lastName}</Text>
                                <View style={s.deptInfo}>
                                    <Icon name="school" size={14} color="rgba(255,255,255,0.6)" />
                                    <Text style={s.deptNameText}>{user?.department}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={s.notificationBtn}>
                                <Icon name="notifications-outline" size={24} color="#FFFFFF" />
                                <View style={s.notificationDot} />
                            </TouchableOpacity>
                        </View>

                        {/* Quick Metrics Deck (Hyper-Premium Glassmorphism) */}
                        <View style={s.metricsDeckWrapper}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
                                style={s.metricsDeck}
                            >
                                <View style={s.metricItem}>
                                    <Text style={s.metricValue}>3.42</Text>
                                    <Text style={s.metricLabel}>GANO</Text>
                                </View>
                                <View style={s.metricDivider} />
                                <View style={s.metricItem}>
                                    <Text style={s.metricValue}>184</Text>
                                    <Text style={s.metricLabel}>AKTS</Text>
                                </View>
                                <View style={s.metricDivider} />
                                <View style={s.metricItem}>
                                    <Text style={s.metricValue}>4 / 8</Text>
                                    <Text style={s.metricLabel}>YARIYIL</Text>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Achievement Badges Section (Subtle Polish) */}
                        <View style={s.badgeSection}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.badgeScroll}>
                                <TouchableOpacity activeOpacity={0.7} style={[s.badgeItem, { backgroundColor: '#FFD70015', borderColor: '#FFD70030', borderWidth: 1 }]}>
                                    <Icon name="ribbon" size={18} color="#FFD700" />
                                    <Text style={[s.badgeText, { color: '#FFD700' }]}>High Honor</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={[s.badgeItem, { backgroundColor: '#00D1FF15', borderColor: '#00D1FF30', borderWidth: 1 }]}>
                                    <Icon name="terminal" size={18} color="#00D1FF" />
                                    <Text style={[s.badgeText, { color: '#00D1FF' }]}>Tech Enthusiast</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={[s.badgeItem, { backgroundColor: '#FF4D4D15', borderColor: '#FF4D4D30', borderWidth: 1 }]}>
                                    <Icon name="flash" size={18} color="#FF4D4D" />
                                    <Text style={[s.badgeText, { color: '#FF4D4D' }]}>Fast Learner</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
                {/* 1. Digital Passport Launcher (Kimlik Girişi) */}
                <TouchableOpacity
                    style={s.digitalIDLauncher}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('DigitalID' as never)}
                >
                    <LinearGradient
                        colors={['#0F172A', '#1E293B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={s.launcherGradient}
                    >
                        <View style={s.launcherContent}>
                            <View style={s.launcherLeft}>
                                <View style={s.launcherIconBox}>
                                    <Icon name="id-card-outline" size={24} color="#FFFFFF" />
                                </View>
                                <View>
                                    <Text style={s.launcherTitle}>DİJİTAL KİMLİK</Text>
                                    <Text style={s.launcherSubtitle}>Üniversite kimlik kartını görüntüle</Text>
                                </View>
                            </View>
                            <Icon name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* 2. Graduation Roadmap (Mezuniyet Yol Haritası - Enhanced) */}
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitleText}>Mezuniyet Yol Haritası</Text>
                    <TouchableOpacity>
                        <Text style={s.sectionActionText}>Detaylar</Text>
                    </TouchableOpacity>
                </View>
                {user?.graduationProgress && (
                    <GraduationStatusBar progress={user.graduationProgress} theme={theme} />
                )}

                {/* 3. Academic Insights (GANO Trend & Risk) */}
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitleText}>Akademik Analiz</Text>
                    <Icon name="trending-up" size={18} color={theme.colors.primary} />
                </View>
                <View style={s.insightCard}>
                    <View style={s.insightHeader}>
                        <View>
                            <Text style={s.insightMainValue}>+0.12</Text>
                            <Text style={s.insightSubLabel}>Geçen döneme göre artış</Text>
                        </View>
                        <View style={s.sparklineContainer}>
                            {[40, 60, 45, 80, 55, 90, 65, 100].map((h, i) => (
                                <View
                                    key={i}
                                    style={[s.sparkBar, { height: verticalScale(h / 3), backgroundColor: i === 7 ? '#3B82F6' : 'rgba(59, 130, 246, 0.2)' }]}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* 4. Attendance Risk (Devamsizlik) */}
                {user?.attendance && (
                    <AttendanceRiskCard data={user.attendance} theme={theme} />
                )}


                {/* 5. Academic Section (Menu) */}
                <MenuSection title="Akademik Detaylar" theme={theme}>
                    <MenuItem
                        icon="school-outline"
                        title="Ders Programım"
                        subtitle="Haftalık ders saati ve yerleri"
                        color={theme.colors.primary}
                        theme={theme}
                    />
                    <MenuItem
                        icon="document-text-outline"
                        title="Transkript Belgesi"
                        subtitle="Resmi olmayan not dökümü"
                        color={theme.colors.primary}
                        theme={theme}
                    />
                    <MenuItem
                        icon="calendar-outline"
                        title="Akademik Takvim"
                        subtitle="2025-2026 Eğitim yılı tarihleri"
                        color={theme.colors.primary}
                        theme={theme}
                    />
                </MenuSection>

                <View style={{ height: verticalScale(100) }} />
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerGradient: {
        borderBottomLeftRadius: moderateScale(30),
        borderBottomRightRadius: moderateScale(30),
        paddingBottom: verticalScale(30),
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        marginTop: verticalScale(10),
    },
    headerAvatarContainer: {
        position: 'relative',
    },
    avatarRim: {
        width: scale(74),
        height: scale(74),
        borderRadius: scale(37),
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 3,
    },
    avatarBox: {
        flex: 1,
        borderRadius: scale(34),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3B82F6',
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0F172A',
    },
    headerInfo: {
        flex: 1,
        marginLeft: scale(16),
    },
    userNameText: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    deptInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    deptNameText: {
        fontSize: moderateScale(12),
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
    },
    notificationBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4D4D',
        borderWidth: 1.5,
        borderColor: '#0F172A',
    },
    metricsDeckWrapper: {
        marginHorizontal: scale(20),
        marginTop: verticalScale(24),
        borderRadius: moderateScale(24),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        ...theme.shadows.medium,
    },
    metricsDeck: {
        flexDirection: 'row',
        paddingVertical: verticalScale(18),
    },
    metricItem: {
        flex: 1,
        alignItems: 'center',
    },
    metricValue: {
        fontSize: moderateScale(18),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    metricLabel: {
        fontSize: moderateScale(10),
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 'bold',
        marginTop: 4,
        letterSpacing: 1,
    },
    metricDivider: {
        width: 1,
        height: verticalScale(24),
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignSelf: 'center',
    },
    badgeSection: {
        marginTop: verticalScale(24),
    },
    badgeScroll: {
        paddingHorizontal: scale(20),
        gap: scale(12),
    },
    badgeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(14),
    },
    badgeText: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        marginTop: verticalScale(24),
        marginBottom: verticalScale(12),
    },
    sectionTitleText: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: '#1F2937',
        letterSpacing: -0.5,
    },
    sectionActionText: {
        fontSize: moderateScale(12),
        color: '#3B82F6',
        fontWeight: '600',
    },
    insightCard: {
        marginHorizontal: scale(20),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        padding: scale(20),
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        ...theme.shadows.small,
    },
    insightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    insightMainValue: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#10B981',
    },
    insightSubLabel: {
        fontSize: moderateScale(11),
        color: '#6B7280',
        marginTop: 2,
    },
    sparklineContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        height: verticalScale(40),
    },
    sparkBar: {
        width: scale(4),
        borderRadius: 2,
    },
    digitalIDLauncher: {
        marginHorizontal: scale(20),
        marginBottom: verticalScale(16),
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        ...theme.shadows.medium,
    },
    launcherGradient: {
        padding: scale(20),
    },
    launcherContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    launcherLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(15),
    },
    launcherIconBox: {
        width: scale(48),
        height: scale(48),
        borderRadius: moderateScale(14),
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    launcherTitle: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    launcherSubtitle: {
        fontSize: moderateScale(11),
        color: 'rgba(255,255,255,0.6)',
        marginTop: 2,
    },
    // Old styles kept for compatibility if needed, but the layout is now component-driven
    avatarSection: {
        display: 'none', // Hide old section
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: verticalScale(16),
    },
    avatar: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    avatarText: {
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primaryLight,
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: verticalScale(4),
    },
    studentNumber: {
        fontSize: moderateScale(16),
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: verticalScale(12),
    },
    departmentBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(20),
    },
    departmentText: {
        color: '#FFFFFF',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        marginHorizontal: scale(20),
        marginTop: verticalScale(-30),
        borderRadius: moderateScale(20),
        padding: scale(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        fontSize: moderateScale(11),
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        marginBottom: verticalScale(4),
    },
    statValue: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    statDivider: {
        width: 1,
        height: verticalScale(30),
        backgroundColor: theme.colors.border,
    },
    section: {
        marginTop: verticalScale(24),
        paddingHorizontal: scale(20),
    },
    sectionTitle: {
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        marginBottom: verticalScale(12),
        letterSpacing: 1,
    },
    settingItem: {
        // Replaced by MenuItem container style
    },
    settingLeft: {
        // Replaced by MenuItem left style
    },
    iconBg: {
        // Replaced by MenuItem iconBg style
    },
    settingTitle: {
        // Replaced by MenuItem title style
    },
});
