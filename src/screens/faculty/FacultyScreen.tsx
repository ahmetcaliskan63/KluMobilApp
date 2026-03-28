import React, { useState, useEffect } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale } from '../../utils/responsive';
import { useFetch } from '../../hooks/useFetch';
import { FacultyMember, FacultyProfile } from '../../types/models';

export const FacultyScreen: React.FC = () => {
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const { data: profiles, loading: profilesLoading, error: profilesError } = useFetch<Record<string, FacultyProfile>>('/faculty/profiles');
    const { data: members, loading: membersLoading, error: membersError } = useFetch<FacultyMember[]>('/faculty/members');
    const s = styles(theme);

    // Animations - Moved to top level to satisfy Rules of Hooks
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(20))[0];
    
    useEffect(() => {
        if (!profilesLoading && !membersLoading && !profilesError && !membersError) {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]).start();
        }
    }, [profilesLoading, membersLoading, profilesError, membersError]);

    if (profilesLoading || membersLoading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text }}>Hocalarımız yükleniyor...</Text>
            </View>
        );
    }

    if (profilesError || membersError) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Hata: {profilesError || membersError}</Text>
            </View>
        );
    }

    const academicProfiles = profiles || {};
    const facultyList = members || [];
    
    const handleEmailPress = async (email: string) => {
        const url = `mailto:${email}`;
        try {
            if (await Linking.canOpenURL(url)) {
                await Linking.openURL(url);
            }
        } catch (error) {
            console.error('Could not open email', error);
        }
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
            <StatusBar barStyle="light-content" backgroundColor="#182958" />

            <LinearGradient colors={['#182958', '#2A3F7A']} style={[s.header, { paddingTop: insets.top + spacing.sm }]}>
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
                {academicProfiles.ADVISOR && renderFeaturedCard(academicProfiles.ADVISOR, 'DANIŞMANIM')}

                <Text style={[s.sectionHeader, { marginTop: spacing.md }]}>Bölüm Yönetimi</Text>
                {academicProfiles.DEPT_HEAD && renderFeaturedCard(academicProfiles.DEPT_HEAD, 'BÖLÜM BAŞKANI')}

                <View style={[s.sectionTitleRow, { marginTop: spacing.md }]}>
                    <Text style={s.sectionHeader}>Dönem Hocalarım</Text>
                    <View style={s.termBadge}>
                        <Text style={s.termBadgeText}>2024-2025 Bahar</Text>
                    </View>
                </View>
                <View style={s.termList}>
                    {facultyList.map(item => renderFacultyCard(item, true))}
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
        borderColor: '#CBD5E1', 
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
    termList: {
        marginBottom: spacing.md,
    },
});
