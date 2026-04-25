import React, { useRef, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/shared/store/authStore';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { Theme, spacing } from '@/core/theme/theme';
import { useTranslation } from 'react-i18next';

// Refactored Components
import { ProfileHeader } from '../components/ProfileDetail/ProfileHeader';
import { DetailSection, InfoRow } from '../components/ProfileDetail/DetailSection';

export const ProfileDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const s = styles(theme, isDarkMode);

    // 🏎️ Animation Logic
    const scrollY = useRef(new Animated.Value(0)).current;

    // Header Dimensions
    const NAV_BAR_HEIGHT = verticalScale(50) + insets.top;
    const TOTAL_HEADER_HEIGHT = verticalScale(220) + insets.top;

    // Animation Interpolations
    const navBarBgOpacity = useMemo(() => scrollY.interpolate({
        inputRange: [verticalScale(80), verticalScale(140)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    }), [scrollY]);

    const headerTranslateY = useMemo(() => scrollY.interpolate({
        inputRange: [0, verticalScale(160)],
        outputRange: [0, -TOTAL_HEADER_HEIGHT * 0.6],
        extrapolate: 'clamp',
    }), [scrollY, TOTAL_HEADER_HEIGHT]);

    const headerOpacity = useMemo(() => scrollY.interpolate({
        inputRange: [0, verticalScale(130)],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    }), [scrollY]);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Sticky Navigation Bar */}
            <View style={[s.stickyNavContainer, { height: NAV_BAR_HEIGHT }]}>
                <Animated.View style={[
                    s.navBarBackground,
                    { opacity: navBarBgOpacity, backgroundColor: isDarkMode ? theme.colors.card : '#0F172A' }
                ]} />

                <View style={[s.navBarContent, { paddingTop: insets.top }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                    >
                        <Icon name="arrow-back" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>{t('profile.personalInfo').toUpperCase()}</Text>
                    <View style={{ width: 44 }} />
                </View>
            </View>

            {/* Animated Profile Header */}
            <ProfileHeader 
                user={user}
                totalHeaderHeight={TOTAL_HEADER_HEIGHT}
                headerTranslateY={headerTranslateY}
                headerOpacity={headerOpacity}
                topInset={insets.top}
                t={t}
            />

            {/* Main Content */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    s.scrollContent,
                    {
                        paddingTop: TOTAL_HEADER_HEIGHT + spacing.md,
                        paddingBottom: insets.bottom + spacing.xl
                    }
                ]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <DetailSection 
                    title={t('profile.idVerification').toUpperCase()} 
                    icon="barcode-outline" 
                    colors={['#2563EB', '#1D4ED8']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                >
                    <InfoRow label={t('profile.tcNo').toUpperCase()} value={user?.tcNo || ''} indicatorColor="#2563EB" theme={theme} />
                    <InfoRow label={t('profile.birthPlace').toUpperCase()} value={user?.birthPlace || ''} indicatorColor="#2563EB" theme={theme} />
                    <InfoRow label={t('profile.birthDate').toUpperCase()} value={user?.birthDate || ''} indicatorColor="#2563EB" theme={theme} isLast />
                </DetailSection>

                <DetailSection 
                    title={t('profile.academicStatus').toUpperCase()} 
                    icon="ribbon-outline" 
                    colors={['#059669', '#047857']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                >
                    <InfoRow label={t('profile.studentNo').toUpperCase()} value={
                        user?.studentNumber?.includes('@')
                            ? user.studentNumber.split('@')[0]
                            : user?.studentNumber || ''
                    } indicatorColor="#059669" theme={theme} />
                    <InfoRow label={t('profile.faculty').toUpperCase()} value={user?.faculty || ''} indicatorColor="#059669" theme={theme} />
                    <InfoRow label={t('profile.department').toUpperCase()} value={user?.department || ''} indicatorColor="#059669" theme={theme} />
                    <InfoRow label={t('profile.registrationDate').toUpperCase()} value={user?.registrationDate || ''} indicatorColor="#059669" theme={theme} isLast />
                </DetailSection>

                <DetailSection 
                    title={t('profile.contactInfo').toUpperCase()} 
                    icon="planet-outline" 
                    colors={['#D97706', '#B45309']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                >
                    <InfoRow label={t('profile.email').toUpperCase()} value={user?.email || ''} indicatorColor="#D97706" theme={theme} />
                    <InfoRow label={t('profile.phone').toUpperCase()} value={user?.phone || ''} indicatorColor="#D97706" theme={theme} />
                    <InfoRow label={t('profile.address').toUpperCase()} value={user?.address || ''} indicatorColor="#D97706" theme={theme} isLast />
                </DetailSection>
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    stickyNavContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    navBarBackground: {
        ...StyleSheet.absoluteFillObject,
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.3 : 0.15,
        shadowRadius: 8,
        elevation: 10,
    },
    navBarContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    backBtn: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(19),
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(13),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
    },
});
