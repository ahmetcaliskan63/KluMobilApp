import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Linking,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale } from '@/shared/utils/responsive';
import { MOCK_SCHEDULE } from '@/shared/services/mockData';


// 🎩 Mock Data for Featured Faculty
const ACADEMIC_PROFILES = {
    ADVISOR: {
        id: 'adv_1',
        name: 'Prof. Dr. Ayşe Yılmaz',
        title: 'Akademik Danışman',
        role: 'Bölüm Başkanı',
        department: 'Yazılım Mühendisliği',
        email: 'ayse.yilmaz@klu.edu.tr',
        office: 'A Blok, Kat 3, No: 312',
        avatar: 'AY',
        color: ['#1E293B', '#0F172A'], // Premium Navy/Slate
        accent: '#F59E0B', // Gold
    },
    DEPT_HEAD: {
        id: 'dept_1',
        name: 'Prof. Dr. Ahmet Demir',
        title: 'Bölüm Başkanı',
        role: 'Yazılım Mühendisliği Bölüm Başkanı',
        department: 'Yazılım Mühendisliği',
        email: 'ahmet.demir@klu.edu.tr',
        office: 'B Blok, Kat 2, No: 205',
        avatar: 'AD',
        color: ['#334155', '#1E293B'], // Slate
        accent: '#94A3B8', // Silver
    }
};

// 👩‍🏫 Mock database for detailed faculty info (to bridge names from schedule)
const FACULTY_DIRECTORY = [
    { id: 'f1', name: 'Doç. Dr. M. Kaya', email: 'm.kaya@klu.edu.tr', office: 'C-201', dept: 'Yazılım Mühendisliği', avatar: 'MK', color: '#3B82F6' },
    { id: 'f2', name: 'Dr. Öğr. Üyesi A. Demir', email: 'a.demir@klu.edu.tr', office: 'Lab-2', dept: 'Yazılım Mühendisliği', avatar: 'AD', color: '#8B5CF6' },
    { id: 'f3', name: 'Dr. Öğr. Üyesi S. Demir', email: 's.demir@klu.edu.tr', office: 'Lab-1', dept: 'Yazılım Mühendisliği', avatar: 'SD', color: '#10B981' },
    { id: 'f4', name: 'Prof. Dr. L. Aksoy', email: 'l.aksoy@klu.edu.tr', office: 'HB-202', dept: 'Matematik Bölümü', avatar: 'LA', color: '#F59E0B' },
    { id: 'f5', name: 'Okutman M. Yılmaz', email: 'm.yilmaz@klu.edu.tr', office: 'HB-305', dept: 'Yabancı Diller', avatar: 'MY', color: '#6366F1' },
    { id: 'f6', name: 'Prof. Dr. A. Yılmaz', email: 'a.yilmaz@klu.edu.tr', office: 'HB-202', dept: 'Matematik Bölümü', avatar: 'AY', color: '#4A90E2' },
    { id: 'f7', name: 'Dr. Öğr. Üyesi C. Can', email: 'c.can@klu.edu.tr', office: 'Lab-1', dept: 'Yazılım Mühendisliği', avatar: 'CC', color: '#F43F5E' },
    { id: 'f8', name: 'Öğr. Gör. H. Arslan', email: 'h.arslan@klu.edu.tr', office: 'HB-301', dept: 'Türk Dili', avatar: 'HA', color: '#D0021B' },
    { id: 'f9', name: 'Doç. Dr. V. Şahin', email: 'v.sahin@klu.edu.tr', office: 'HB-204', dept: 'Yazılım Mühendisliği', avatar: 'VŞ', color: '#8B5CF6' },
];

export const FacultyScreen: React.FC = () => {
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const s = styles(theme);

    // Animations
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(20))[0];
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    // 🧠 Extract "Term Instructors" from Schedule
    const termInstructors = useMemo(() => {
        const names = [...new Set(MOCK_SCHEDULE.map(course => course.instructor))];
        return FACULTY_DIRECTORY.filter(f => names.includes(f.name));
    }, []);

    const handleEmailPress = async (email: string) => {
        const url = `mailto:${email}`;
        if (await Linking.canOpenURL(url)) await Linking.openURL(url);
    };

    const renderFacultyCard = (item: any, isPremium = false) => (
        <TouchableOpacity
            key={item.id}
            style={[s.memberCard, isPremium && s.premiumMemberCard]}
            activeOpacity={0.8}
        >
            <View style={s.memberCardInner}>
                <View style={[s.avatarCircle, { backgroundColor: item.color + '10', borderColor: item.color + '30' }]}>
                    <Text style={[s.avatarInitial, { color: item.color }]}>{item.avatar}</Text>
                </View>
                <View style={s.memberInfo}>
                    <Text style={[s.memberName, { color: theme.colors.text }]}>{item.name}</Text>
                    <Text style={[s.memberDept, { color: theme.colors.textSecondary }]}>{item.dept}</Text>
                </View>
                <TouchableOpacity
                    style={[s.cardActionBtn, { backgroundColor: theme.colors.primary + '10' }]}
                    onPress={() => handleEmailPress(item.email)}
                >
                    <Icon name="mail" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderFeaturedCard = (profile: any, label: string) => (
        <View style={s.featuredWrapper}>
            <LinearGradient colors={profile.color} style={s.featuredCard}>
                <View style={[s.featuredGlow, { backgroundColor: profile.accent }]} />
                <View style={s.featuredHeader}>
                    <View style={[s.featuredAvatarBorder, { borderColor: profile.accent }]}>
                        <View style={s.featuredAvatar}>
                            <Text style={s.featuredAvatarText}>{profile.avatar}</Text>
                        </View>
                    </View>
                    <View style={s.featuredText}>
                        <View style={s.labelBadge}>
                            <Text style={[s.labelText, { color: profile.accent }]}>{label}</Text>
                        </View>
                        <Text style={s.featuredName}>{profile.name}</Text>
                        <Text style={s.featuredTitle}>{profile.role}</Text>
                    </View>
                </View>
                <View style={s.featuredDivider} />
                <View style={s.featuredActions}>
                    <TouchableOpacity style={s.featuredActionItem} onPress={() => handleEmailPress(profile.email)}>
                        <Icon name="mail" size={16} color={profile.accent} />
                        <Text style={s.featuredActionText}>{profile.email}</Text>
                    </TouchableOpacity>
                    <View style={s.featuredActionItem}>
                        <Icon name="location" size={16} color={profile.accent} />
                        <Text style={s.featuredActionText}>{profile.office}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

            {/* 👑 Senior Designer Header */}
            <LinearGradient colors={['#0f172a', '#1e293b']} style={[s.header, { paddingTop: insets.top + spacing.sm }]}>
                <View style={s.headerRow}>
                    <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Hocalarımız</Text>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <Animated.ScrollView
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[s.sectionHeader, { marginTop: 0 }]}>Akademik Danışman</Text>
                {renderFeaturedCard(ACADEMIC_PROFILES.ADVISOR, 'DANIŞMANIM')}

                {/* 2. Bölüm Başkanı */}
                <Text style={[s.sectionHeader, { marginTop: spacing.md }]}>Bölüm Yönetimi</Text>
                {renderFeaturedCard(ACADEMIC_PROFILES.DEPT_HEAD, 'BÖLÜM BAŞKANI')}

                {/* 3. Dönem Hocalarım */}
                <View style={[s.sectionTitleRow, { marginTop: spacing.md }]}>
                    <Text style={s.sectionHeader}>Dönem Hocalarım</Text>
                    <View style={s.termBadge}>
                        <Text style={s.termBadgeText}>2024-2025 Bahar</Text>
                    </View>
                </View>
                <View style={s.termList}>
                    {termInstructors.map(item => renderFacultyCard(item, true))}
                </View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingBottom: spacing.sm,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    searchContainer: {
        paddingHorizontal: spacing.lg,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        height: 48,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.sm,
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    scrollContent: {
        padding: spacing.md,
    },
    sectionHeader: {
        fontSize: moderateScale(14),
        fontWeight: '900',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: spacing.xs,
        marginTop: spacing.md,
        marginLeft: 4,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    termBadge: {
        backgroundColor: theme.colors.primary + '15',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 10,
    },
    termBadgeText: {
        color: theme.colors.primary,
        fontSize: moderateScale(10),
        fontWeight: '800',
    },
    featuredWrapper: {
        marginBottom: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    featuredCard: {
        borderRadius: 24,
        padding: spacing.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    featuredGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.2,
    },
    featuredHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    featuredAvatarBorder: {
        padding: 2,
        borderRadius: 30,
        borderWidth: 1.5,
    },
    featuredAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredAvatarText: {
        color: '#FFF',
        fontSize: moderateScale(18),
        fontWeight: '900',
    },
    featuredText: {
        flex: 1,
    },
    labelBadge: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    labelText: {
        fontSize: moderateScale(8),
        fontWeight: '900',
    },
    featuredName: {
        color: '#FFF',
        fontSize: moderateScale(17),
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    featuredTitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: moderateScale(11),
        fontWeight: '600',
        marginTop: 1,
    },
    featuredDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginVertical: spacing.md,
    },
    featuredActions: {
        gap: 6,
    },
    featuredActionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    featuredActionText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    memberCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginBottom: spacing.md,
        padding: spacing.md,
        borderWidth: 1.5,
        borderColor: '#CBD5E1', // Darker grey border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 2,
    },
    premiumMemberCard: {
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    memberCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    avatarCircle: {
        width: 48,
        height: 48,
        borderRadius: 18,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: moderateScale(16),
        fontWeight: '900',
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    memberDept: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        marginTop: 2,
    },
    cardActionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    facultyGrid: {
        gap: 0,
    },
    termList: {
        marginBottom: spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing.xxl,
        opacity: 0.5,
    },
    emptyText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        marginTop: spacing.md,
    },
});
