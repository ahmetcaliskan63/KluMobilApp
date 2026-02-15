import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, verticalScale, scale } from '../../utils/responsive';
import { Theme, spacing } from '../../config/theme';

export const ProfileDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const s = styles(theme);

    // 🏎️ Animation Logic
    const scrollY = useRef(new Animated.Value(0)).current;

    // Header Dimensions
    const NAV_BAR_HEIGHT = verticalScale(50) + insets.top;
    const TOTAL_HEADER_HEIGHT = verticalScale(220) + insets.top;

    // 1. Navigation Bar Background Opacity
    const navBarBgOpacity = scrollY.interpolate({
        inputRange: [verticalScale(80), verticalScale(140)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // 2. Main Profile Card
    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, verticalScale(160)],
        outputRange: [0, -TOTAL_HEADER_HEIGHT * 0.6],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, verticalScale(130)],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const InfoRow = ({ label, value, isLast = false, indicatorColor }: { label: string; value: string; isLast?: boolean; indicatorColor?: string }) => (
        <View style={s.rowWrapper}>
            <View style={s.infoRow}>
                <View style={[s.rowIndicator, { backgroundColor: indicatorColor || '#94A3B8' }]} />
                <View style={s.rowTextContent}>
                    <Text style={s.labelText}>{label}</Text>
                    <Text style={[s.valueText, { color: theme.colors.text }]}>{value || 'Belirtilmemiş'}</Text>
                </View>
            </View>
            {!isLast && <View style={s.separator} />}
        </View>
    );

    const SectionCard = ({ title, icon, colors, children }: { title: string; icon: string; colors: string[]; children: React.ReactNode }) => (
        <View style={[s.detailedCard, { borderColor: colors[0], borderWidth: 2 }]}>
            <View style={[s.corner, s.topLeft, { borderColor: colors[0] }]} />
            <View style={[s.corner, s.topRight, { borderColor: colors[0] }]} />

            <View style={s.cardHeader}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={s.cardHeaderIcon}
                >
                    <Icon name={icon} size={14} color="#FFFFFF" />
                </LinearGradient>
                <Text style={[s.cardHeaderTitle, { color: theme.colors.text }]}>{title}</Text>
                <View style={[s.activeDot, { backgroundColor: colors[0] }]} />
            </View>

            <View style={s.cardContent}>
                {children}
            </View>
        </View>
    );

    return (
        <View style={[s.container, { backgroundColor: '#F0F2F5' }]}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View style={[s.stickyNavContainer, { height: NAV_BAR_HEIGHT }]}>
                <Animated.View style={[
                    s.navBarBackground,
                    { opacity: navBarBgOpacity, backgroundColor: '#0F172A' }
                ]} />

                <View style={[s.navBarContent, { paddingTop: insets.top }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                    >
                        <Icon name="arrow-back" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Öğrenci Kişisel Bilgileri</Text>
                    <View style={{ width: 44 }} />
                </View>
            </View>

            <Animated.View style={[
                s.animatedHeader,
                {
                    height: TOTAL_HEADER_HEIGHT,
                    transform: [{ translateY: headerTranslateY }],
                    opacity: headerOpacity,
                    zIndex: 40
                }
            ]}>
                <LinearGradient
                    colors={['#182958', '#0F172A']}
                    style={[StyleSheet.absoluteFill, s.headerGradient]}
                >
                    <View style={s.meshCircle1} />
                    <View style={s.meshCircle2} />

                    <View style={[s.profileOverview, { marginTop: insets.top + verticalScale(60) }]}>
                        {/* Avatar with User Initials */}
                        <View style={s.avatarContainer}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.2)', 'transparent']}
                                style={s.avatarHalo}
                            />
                            <View style={s.avatar}>
                                <Text style={s.avatarText}>
                                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                </Text>
                            </View>
                        </View>

                        <Text style={s.profileName}>{user?.firstName} {user?.lastName}</Text>
                        <Text style={s.profileSub}>
                            {user?.studentNumber?.includes('@')
                                ? user.studentNumber.split('@')[0]
                                : user?.studentNumber} • KLU Sistem
                        </Text>
                    </View>
                </LinearGradient>
            </Animated.View>

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
                <SectionCard title="KİMLİK VERİLERİ" icon="barcode-outline" colors={['#2563EB', '#1D4ED8']}>
                    <InfoRow label="T.C. KİMLİK NUMARASI" value={user?.tcNo || ''} indicatorColor="#2563EB" />
                    <InfoRow label="DOĞUM YERİ" value={user?.birthPlace || ''} indicatorColor="#2563EB" />
                    <InfoRow label="DOĞUM TARİHİ" value={user?.birthDate || ''} indicatorColor="#2563EB" isLast />
                </SectionCard>

                <SectionCard title="AKADEMİK STATÜ" icon="ribbon-outline" colors={['#059669', '#047857']}>
                    <InfoRow label="ÖĞRENCİ NUMARASI" value={
                        user?.studentNumber?.includes('@')
                            ? user.studentNumber.split('@')[0]
                            : user?.studentNumber || ''
                    } indicatorColor="#059669" />
                    <InfoRow label="FAKÜLTE" value={user?.faculty || ''} indicatorColor="#059669" />
                    <InfoRow label="BÖLÜM" value={user?.department || ''} indicatorColor="#059669" />
                    <InfoRow label="ANABİLİM DALI" value={user?.majorBranch || ''} indicatorColor="#059669" />
                    <InfoRow label="GANO (GÜNCEL)" value={user?.gpa || ''} indicatorColor="#059669" />
                    <InfoRow label="SINIF / DÖNEM" value={user?.grade?.toString() || ''} indicatorColor="#059669" />
                    <InfoRow label="KAYIT TARİHİ" value={user?.registrationDate || ''} indicatorColor="#059669" isLast />
                </SectionCard>

                <SectionCard title="İLETİŞİM KANALLARI" icon="planet-outline" colors={['#D97706', '#B45309']}>
                    <InfoRow label="KURUMSAL E-POSTA" value={user?.email || ''} indicatorColor="#D97706" />
                    <InfoRow label="TELEFON" value={user?.phone || ''} indicatorColor="#D97706" />
                    <InfoRow label="RESMİ ADRES" value={user?.address || ''} indicatorColor="#D97706" isLast />
                </SectionCard>
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
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
        shadowOpacity: 0.15,
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
    animatedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerGradient: {
        borderBottomLeftRadius: moderateScale(40),
        borderBottomRightRadius: moderateScale(40),
        overflow: 'hidden',
    },
    meshCircle1: {
        position: 'absolute',
        top: -scale(40),
        right: -scale(20),
        width: scale(190),
        height: scale(190),
        borderRadius: scale(95),
        backgroundColor: '#4F46E5',
        opacity: 0.12,
    },
    meshCircle2: {
        position: 'absolute',
        bottom: -scale(30),
        left: -scale(10),
        width: scale(150),
        height: scale(150),
        borderRadius: scale(75),
        backgroundColor: '#10B981',
        opacity: 0.1,
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
    profileOverview: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: verticalScale(10),
    },
    avatarHalo: {
        position: 'absolute',
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        borderRadius: moderateScale(50),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    avatar: {
        width: scale(75),
        height: scale(75),
        borderRadius: moderateScale(37.5),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: moderateScale(26),
        fontWeight: '900',
    },
    profileName: {
        fontSize: moderateScale(23),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.6,
    },
    profileSub: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.45)',
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
    },
    detailedCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        marginBottom: spacing.lg,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    corner: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderColor: '#CBD5E1',
    },
    topLeft: {
        top: 6,
        left: 6,
        borderTopWidth: 1.5,
        borderLeftWidth: 1.5,
    },
    topRight: {
        top: 6,
        right: 6,
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: verticalScale(11),
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: '#F8FAFC',
    },
    cardHeaderIcon: {
        width: moderateScale(26),
        height: moderateScale(26),
        borderRadius: moderateScale(7),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    cardHeaderTitle: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        letterSpacing: 1,
        flex: 1,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginRight: 4,
    },
    cardContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xs,
    },
    rowWrapper: {
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(8),
    },
    rowIndicator: {
        width: 3,
        height: moderateScale(14),
        backgroundColor: '#94A3B8',
        borderRadius: 1.5,
        marginRight: spacing.md,
    },
    rowTextContent: {
        flex: 1,
    },
    labelText: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 0.8,
        marginBottom: 1,
    },
    valueText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    separator: {
        height: 1,
        backgroundColor: '#bebfc1',
        marginLeft: spacing.md + 3,
    },
});
