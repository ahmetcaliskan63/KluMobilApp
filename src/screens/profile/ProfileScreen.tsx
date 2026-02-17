import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
    Modal,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Theme, spacing } from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';
import { DigitalPassportCard } from '../../components/profile/DigitalPassportCard';

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user, logout } = useAuthStore();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const [showIdModal, setShowIdModal] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
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

    return (
        <View style={s.container}>
            <StatusBar
                barStyle={theme.colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
                backgroundColor={theme.colors.background}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingTop: insets.top }]}
            >
                {/* 🎨 Premium Background Element (Decorative) */}
                <View style={s.decorativeCircle} />

                {/* STEP 1: Hyper-Premium Persona Info (Integrated Stats) */}
                <TouchableOpacity
                    style={s.personaInfoSection}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ProfileDetail')}
                >
                    <LinearGradient
                        colors={['rgba(150, 150, 150, 0.12)', 'rgba(200, 200, 200, 0.03)', 'transparent']}
                        style={s.personaGradientWrapper}
                    >
                        <View style={s.personaMain}>
                            {/* Top Floor: Identity */}
                            <View style={s.personaTopRow}>
                                <View style={s.avatarContainer}>
                                    <LinearGradient
                                        colors={['#3B82F6', '#2DD4BF']}
                                        style={s.avatarGlow}
                                    />
                                    <View style={[s.avatarBox, { backgroundColor: theme.colors.card }]}>
                                        <Text style={[s.avatarInitial, { color: theme.colors.text }]}>
                                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={[s.editBadge, { backgroundColor: theme.colors.primary, borderColor: theme.colors.background }]}>
                                        <Icon name="camera" size={10} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>

                                <View style={s.textDetails}>
                                    <Text style={[s.userName, { color: theme.colors.text }]}>
                                        {user?.firstName} {user?.lastName}
                                    </Text>
                                    <View style={s.deptInfo}>
                                        <Icon name="school" size={16} color={theme.colors.primary} />
                                        <Text style={[s.deptName, { color: theme.colors.textSecondary }]}>
                                            {user?.department}
                                        </Text>
                                    </View>
                                </View>

                                <Icon name="chevron-forward" size={20} color="#182958" style={s.personaChevron} />
                            </View>

                            {/* Divider Line */}
                            <View style={s.personaDivider} />

                            {/* Bottom Floor: Academic Micro-Cards */}
                            <View style={s.personaStatsRow}>
                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(248, 250, 252, 1)']}
                                    style={s.personaStatCard}
                                >
                                    <Text style={s.personaStatLabel}>GANO</Text>
                                    <Text style={s.personaStatValue}>3.52</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(248, 250, 252, 1)']}
                                    style={s.personaStatCard}
                                >
                                    <Text style={s.personaStatLabel}>AKTS</Text>
                                    <Text style={s.personaStatValue}>120</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(248, 250, 252, 1)']}
                                    style={s.personaStatCard}
                                >
                                    <Text style={s.personaStatLabel}>YARIYIL</Text>
                                    <Text style={s.personaStatValue}>5</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={s.actionStack}>
                    <TouchableOpacity
                        style={s.idCardBtn}
                        activeOpacity={0.8}
                        onPress={() => setShowIdModal(true)}
                    >
                        <LinearGradient
                            colors={['#1E293B', '#0F172A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={s.idBtnGradient}
                        >
                            <View style={s.idBtnContent}>
                                <View style={s.idIconWrapper}>
                                    <Icon name="card-outline" size={18} color="#FFFFFF" />
                                </View>
                                <View style={s.idBtnTextWrapper}>
                                    <Text style={s.idBtnText}>Dijital Kimlik Kartı</Text>
                                    <Text style={s.idBtnSubtitle}>Kampüs Giriş ve Kimlik Doğrulama</Text>
                                </View>
                            </View>
                            <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* 🚀 Hızlı Erişim (Quick Access) Section */}
                <View style={s.quickAccessSection}>
                    <View style={s.sectionHeader}>
                        <View style={s.sectionTitleContainer}>
                            <View style={[s.sectionIconDot, { backgroundColor: '#3B82F6' }]} />
                            <Text style={[s.sectionTitle, { color: theme.colors.text }]}>HIZLI ERİŞİM</Text>
                        </View>
                        <View style={s.headerLine} />
                    </View>

                    <View style={s.quickStack}>
                        {[
                            { id: '1', title: 'Ders Programı', icon: 'calendar', color: '#3B82F6', subtitle: 'Haftalık Plan' },
                            { id: '2', title: 'Transkript', icon: 'document-text', color: '#8B5CF6', subtitle: 'Not Dökümü' },
                            { id: '3', title: 'Akademik Takvim', icon: 'time', color: '#10B981', subtitle: '2025 Planı' },
                            { id: '4', title: 'Sınav Programı', icon: 'notifications', color: '#F59E0B', subtitle: 'Vize / Final' },
                            { id: '5', title: 'Sınav Sonuçları', icon: 'ribbon', color: '#EF4444', subtitle: 'Not Sorgula' },
                            { id: '6', title: 'E-Posta / Şifre', icon: 'key', color: '#6366F1', subtitle: 'Hesap Ayarı' },
                            { id: '7', title: 'WiFi İşlemleri', icon: 'wifi', color: '#06B6D4', subtitle: 'Kampüs Net' },
                            { id: '8', title: 'Hocalarımız', icon: 'people', color: '#EC4899', subtitle: 'Akademik Kadro' },
                            { id: '9', title: 'Birimler', icon: 'business', color: '#475569', subtitle: 'Fakülteler' },
                        ].map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={s.quickListItemWrapper}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#FFFFFF', '#FDFDFD']}
                                    style={s.quickListItemGradient}
                                >
                                    <View style={s.quickListItemContent}>
                                        <View style={[s.quickIconCircle, { backgroundColor: `${item.color}08` }]}>
                                            <Icon name={item.icon} size={20} color={item.color} />
                                        </View>

                                        <View style={s.quickListItemTextWrapper}>
                                            <Text style={[s.quickListItemTitle, { color: theme.colors.text }]}>{item.title}</Text>
                                            <Text style={s.quickListItemSubtitle}>{item.subtitle}</Text>
                                        </View>

                                        <Icon name="chevron-forward" size={14} color="#CBD5E1" />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Content can follow here */}
            </ScrollView>

            {/* Premium Digital ID Modal */}
            <Modal
                visible={showIdModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowIdModal(false)}
            >
                <Pressable
                    style={s.modalOverlay}
                >
                    <View style={s.modalControls}>
                        <TouchableOpacity
                            onPress={() => setIsLandscape(!isLandscape)}
                            style={s.controlBtn}
                        >
                            <Icon name={isLandscape ? "contract" : "expand"} size={26} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setShowIdModal(false);
                                setIsLandscape(false);
                            }}
                            style={s.controlBtn}
                        >
                            <Icon name="close" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={s.modalContainer}>
                        <View style={[
                            s.cardScaleWrapper,
                            isLandscape && s.landscapeCard
                        ]}>
                            <DigitalPassportCard user={user} theme={theme} />
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: spacing.xxl,
        paddingHorizontal: spacing.xl,
    },
    decorativeCircle: {
        position: 'absolute',
        top: -verticalScale(50),
        right: -scale(30),
        width: scale(200),
        height: scale(200),
        borderRadius: scale(100),
        backgroundColor: theme.colors.primary,
        opacity: 0.03,
    },
    personaInfoSection: {
        width: '100%',
        marginTop: verticalScale(-35),
        marginBottom: verticalScale(15),
    },
    personaGradientWrapper: {
        padding: 2, // Glow thickness
        borderRadius: moderateScale(30),
        marginHorizontal: -10, // Added 10px expansion on each side
        opacity: 0.9,
    },
    personaMain: {
        flexDirection: 'column',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(28),
        borderWidth: 1.5,
        borderColor: 'rgba(80, 80, 80, 0.5)',
        ...theme.shadows.medium,
        overflow: 'hidden',
    },
    personaTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: verticalScale(6), // A bit more breathing room as requested
    },
    personaDivider: {
        height: 1,
        backgroundColor: 'rgba(80, 80, 80, 0.15)',
        marginHorizontal: spacing.lg,
    },
    personaStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: verticalScale(4),     // Minimized gap
        paddingBottom: verticalScale(12),
        gap: spacing.md,
    },
    personaStatCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: verticalScale(6), // Reduced padding
        borderRadius: moderateScale(14),
        borderWidth: 1.5,
        borderColor: 'rgba(71, 85, 105, 0.4)', // Darker/sharper slate border
        ...theme.shadows.small,
        elevation: 2,
    },
    personaStatLabel: {
        fontSize: moderateScale(9),
        fontWeight: '800',
        color: 'rgba(100, 116, 139, 1)', // Slate gray label
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    personaStatValue: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#1e293b', // Darker slate for value
        letterSpacing: -0.5,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: spacing.lg,
    },
    avatarGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: moderateScale(54),
        opacity: 0.15,
    },
    avatarBox: {
        width: scale(76),
        height: scale(76),
        borderRadius: moderateScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#182958',
        ...theme.shadows.small,
    },
    avatarInitial: {
        fontSize: moderateScale(26),
        fontWeight: 'bold',
    },
    editBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        padding: 4,
        borderRadius: 12,
        borderWidth: 1.5,
    },
    textDetails: {
        flex: 1,
        justifyContent: 'center',
        gap: 2,
    },
    userName: {
        fontSize: moderateScale(22),
        fontWeight: '900',
        letterSpacing: -0.6,
    },
    deptInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deptName: {
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    personaChevron: {
        marginLeft: spacing.sm,
    },
    actionStack: {
        width: '100%',
        gap: spacing.md,
        alignItems: 'center',
        marginTop: verticalScale(5),
    },
    viewProfileBtn: {
        width: '100%',
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        ...theme.shadows.medium,
    },
    idCardBtn: {
        width: '100%',
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        ...theme.shadows.medium,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    idBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: verticalScale(16),
        justifyContent: 'space-between',
    },
    idBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    idIconWrapper: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(10),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idBtnTextWrapper: {
        gap: 1,
    },
    idBtnText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    idBtnSubtitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: moderateScale(11),
        fontWeight: '500',
        letterSpacing: 0.1,
    },
    btnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(14),
        gap: 10,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center',
    },
    modalControls: {
        position: 'absolute',
        top: verticalScale(60),
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    controlBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: moderateScale(10),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    cardScaleWrapper: {
        transform: [{ scale: 1.07 }],
        width: viewport.width,
        alignItems: 'center',
    },
    landscapeCard: {
        transform: [
            { rotate: '90deg' },
            { scale: 1.4 }
        ],
        marginTop: verticalScale(40),
    },
    quickAccessSection: {
        width: '100%',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(10),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(15),
        paddingHorizontal: 5,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionIconDot: {
        width: 4,
        height: 14,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: moderateScale(11),
        fontWeight: '900',
        letterSpacing: 1.2,
    },
    headerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(80, 80, 80, 0.1)',
        marginLeft: 15,
    },
    quickStack: {
        flexDirection: 'column',
        gap: verticalScale(12),
    },
    quickListItemWrapper: {
        width: '100%',
        borderRadius: moderateScale(16),
        backgroundColor: theme.colors.card,
        // Minimalist professional shadow
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        // Subtle border
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    quickListItemGradient: {
        borderRadius: moderateScale(16),
        overflow: 'hidden',
    },
    quickListItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: verticalScale(14),
        gap: spacing.md,
    },
    quickIconCircle: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickListItemTextWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    quickListItemTitle: {
        fontSize: moderateScale(13.5),
        fontWeight: '700',
        color: '#1E293B',
        letterSpacing: -0.2,
    },
    quickListItemSubtitle: {
        fontSize: moderateScale(9.5),
        fontWeight: '500',
        color: '#94A3B8',
        marginTop: 1,
        letterSpacing: 0.2,
    },
    quickListItemChevronWrapper: {
        paddingHorizontal: spacing.xs,
    },
});
