import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    Pressable,
    Animated,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing } from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { useAppTheme } from '../../hooks/useAppTheme';
import { AcademicStats } from '../../types/models';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';
import { DigitalPassportCard } from '../../components/profile/DigitalPassportCard';

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuth();
    const { data: stats, loading: statsLoading } = useFetch<AcademicStats>('/profile/stats');
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const [showIdModal, setShowIdModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const s = styles(theme);


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
                                    <Text style={s.personaStatValue}>{stats?.gpa || '0.00'}</Text>
                                </LinearGradient>
 
                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(248, 250, 252, 1)']}
                                    style={s.personaStatCard}
                                >
                                    <Text style={s.personaStatLabel}>AKTS</Text>
                                    <Text style={s.personaStatValue}>{stats?.totalCredits || '0'}</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(248, 250, 252, 1)']}
                                    style={s.personaStatCard}
                                >
                                    <Text style={s.personaStatLabel}>YARIYIL</Text>
                                    <Text style={s.personaStatValue}>{stats?.currentSemester || '-'}</Text>
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
                        ].map((item) => {
                            // Add press animation scale
                            const scaleValue = React.useRef(new Animated.Value(1)).current;

                            const onPressIn = () => {
                                Animated.spring(scaleValue, {
                                    toValue: 0.96,
                                    useNativeDriver: true,
                                }).start();
                            };

                            const onPressOut = () => {
                                Animated.spring(scaleValue, {
                                    toValue: 1,
                                    friction: 3,
                                    tension: 40,
                                    useNativeDriver: true,
                                }).start();
                            };

                            return (
                                <Animated.View key={item.id} style={{ transform: [{ scale: scaleValue }] }}>
                                    <TouchableOpacity
                                        style={s.quickListItemWrapper}
                                        activeOpacity={1}
                                        onPressIn={onPressIn}
                                        onPressOut={onPressOut}
                                        onPress={() => {
                                            if (item.id === '1') {
                                                navigation.navigate('HomeStack' as never, { screen: 'Schedule' } as never);
                                            } else if (item.id === '2') {
                                                navigation.navigate('Transcript');
                                            } else if (item.id === '3') {
                                                setShowCalendarModal(true);
                                            } else if (item.id === '4') {
                                                navigation.navigate('ExamSchedule');
                                            } else if (item.id === '5') {
                                                navigation.navigate('ExamResults');
                                            } else if (item.id === '6') {
                                                Linking.openURL('https://kluposta.klu.edu.tr/');
                                            } else if (item.id === '8') {
                                                navigation.navigate('Faculty');
                                            }
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['#F8FAFC', '#F1F5F9']} // Light Grey Background
                                            style={s.quickListItemGradient}
                                        >
                                            <View style={s.quickListItemContent}>
                                                <View style={[s.quickIconCircle, { backgroundColor: item.color + '15' }]}>
                                                    <Icon name={item.icon} size={20} color={item.color} />
                                                </View>

                                                <View style={s.quickListItemTextWrapper}>
                                                    <Text style={[s.quickListItemTitle, { color: theme.colors.text }]}>{item.title}</Text>
                                                </View>

                                                <Icon name="chevron-forward" size={14} color="#CBD5E1" />
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })}
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

            {/* Academic Calendar Selection Modal */}
            <Modal
                visible={showCalendarModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCalendarModal(false)}
            >
                <Pressable
                    style={s.modalOverlay}
                    onPress={() => setShowCalendarModal(false)}
                >
                    <Animated.View
                        style={s.calendarModalCard}
                    >
                        <View style={s.calendarModalHeader}>
                            <Text style={[s.calendarModalTitle, { color: theme.colors.text }]}>Akademik Takvim</Text>
                            <Text style={s.calendarModalSubtitle}>2024 - 2025 Eğitim Yılı Program Seçimi</Text>
                        </View>

                        <View style={s.calendarBtnStack}>
                            <TouchableOpacity
                                style={s.calendarOptionBtn}
                                onPress={() => {
                                    Linking.openURL('https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_AKADEMIK_TAKVIM_ONLISANS-LISANS.pdf');
                                    setShowCalendarModal(false);
                                }}
                            >
                                <LinearGradient
                                    colors={['#0F172A', '#1E3A8A']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={s.calendarBtnGradient}
                                >
                                    <View style={s.calendarBtnMain}>
                                        <Text style={s.calendarBtnText}>Lisans Akademik Takvim</Text>
                                        <Text style={s.calendarBtnSubtext}>Fakülte ve Yüksekokullar</Text>
                                    </View>
                                    <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={s.calendarOptionBtn}
                                onPress={() => {
                                    Linking.openURL('https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_AKADEMIK_TAKVIM_ONLISANS-LISANS.pdf');
                                    setShowCalendarModal(false);
                                }}
                            >
                                <LinearGradient
                                    colors={['#064E3B', '#059669']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={s.calendarBtnGradient}
                                >
                                    <View style={s.calendarBtnMain}>
                                        <Text style={s.calendarBtnText}>Ön Lisans Akademik Takvim</Text>
                                        <Text style={s.calendarBtnSubtext}>Meslek Yüksekokulları</Text>
                                    </View>
                                    <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={s.calendarOptionBtn}
                                onPress={() => {
                                    Linking.openURL('https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_LISANSUSTU_AKADEMIK_TAKVIMI.pdf');
                                    setShowCalendarModal(false);
                                }}
                            >
                                <LinearGradient
                                    colors={['#312E81', '#4338CA']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={s.calendarBtnGradient}
                                >
                                    <View style={s.calendarBtnMain}>
                                        <Text style={s.calendarBtnText}>Lisansüstü Akademik Takvim</Text>
                                        <Text style={s.calendarBtnSubtext}>Enstitü Programları</Text>
                                    </View>
                                    <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={s.calendarCloseBtn}
                            onPress={() => setShowCalendarModal(false)}
                        >
                            <Text style={s.calendarCloseBtnText}>Kapat</Text>
                        </TouchableOpacity>
                    </Animated.View>
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
        paddingBottom: verticalScale(100), // Increased for better visibility
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
        gap: verticalScale(4), // Minimal spacing between cards
    },
    quickListItemWrapper: {
        width: '100%',
        borderRadius: moderateScale(22),
        backgroundColor: '#F1F5F9',
        // Sharper, more visible shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
    },
    quickListItemGradient: {
        borderRadius: moderateScale(22),
        overflow: 'hidden',
    },
    quickListItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: verticalScale(12),
        gap: spacing.lg,
    },
    quickIconCircle: {
        width: moderateScale(46),
        height: moderateScale(46),
        borderRadius: moderateScale(14),
        justifyContent: 'center',
        alignItems: 'center',
        // Subtle depth for the icon circle itself
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    quickListItemTextWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    quickListItemTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#1E293B',
        letterSpacing: -0.3,
    },
    quickListItemChevronWrapper: {
        paddingHorizontal: spacing.xs,
    },
    calendarModalCard: {
        width: '92%',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(30),
        paddingVertical: verticalScale(30),
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.25,
        shadowRadius: 35,
        elevation: 25,
        borderWidth: 2,
        borderColor: '#991B1B', // Darker red as requested
    },
    calendarModalHeader: {
        alignItems: 'center',
        marginBottom: verticalScale(28),
    },
    calendarIconWrapper: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(22),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    calendarModalTitle: {
        fontSize: moderateScale(24),
        fontWeight: '900',
        marginBottom: 6,
        letterSpacing: -0.8,
    },
    calendarModalSubtitle: {
        fontSize: moderateScale(14),
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    calendarBtnStack: {
        width: '100%',
        gap: verticalScale(14),
    },
    calendarOptionBtn: {
        width: '100%',
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    calendarBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: verticalScale(16),
    },
    calendarBtnMain: {
        gap: 2,
    },
    calendarBtnText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    calendarBtnSubtext: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: moderateScale(11),
        fontWeight: '500',
    },
    calendarCloseBtn: {
        marginTop: verticalScale(25),
        paddingVertical: verticalScale(12),
        paddingHorizontal: spacing.xxl,
        borderRadius: moderateScale(16),
        backgroundColor: '#F1F5F9',
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    calendarCloseBtnText: {
        color: '#475569',
        fontSize: moderateScale(14),
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
