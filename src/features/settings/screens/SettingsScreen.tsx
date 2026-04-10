import React, { useEffect, useState, useRef, ComponentProps } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Switch,
    StatusBar,
    Animated,
    Alert,
    Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useThemeStore } from '@/shared/store/themeStore';
import { useAuthStore } from '@/shared/store/authStore';
import { useAppSettingsStore } from '@/shared/store/appSettingsStore';
import { Theme, spacing, borderRadius, shadows } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const SettingsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const { logout } = useAuthStore();
    const { language, setLanguage } = useAppSettingsStore();
    const s = styles(theme);

    const [showLangModal, setShowLangModal] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            "Oturumu Kapat",
            "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
            [
                { text: "Vazgeç", style: "cancel" },
                {
                    text: "Çıkış Yap",
                    style: "destructive",
                    onPress: () => {
                        logout();
                    }
                }
            ]
        );
    };


    const renderSettingItem = (
        icon: ComponentProps<typeof Icon>['name'],
        title: string,
        subtitle: string,
        iconColor?: string,
        rightElement?: React.ReactNode,
        onPress?: () => void
    ) => {
        // Press scale animation
        const itemScale = useRef(new Animated.Value(1)).current;
        const handlePressIn = () => Animated.spring(itemScale, { toValue: 0.97, useNativeDriver: true }).start();
        const handlePressOut = () => Animated.spring(itemScale, { toValue: 1, useNativeDriver: true }).start();

        return (
            <Animated.View style={{ transform: [{ scale: itemScale }] }}>
                <TouchableOpacity
                    style={s.settingCard}
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.9}
                >
                    <View style={s.settingLeft}>
                        <View style={[s.iconWrapper, { backgroundColor: (iconColor || theme.colors.primary) + '15' }]}>
                            <Icon name={icon} size={22} color={iconColor || theme.colors.primary} />
                        </View>
                        <View style={s.settingInfo}>
                            <Text style={[s.settingTitle, { color: theme.colors.text }]}>{title}</Text>
                            <Text style={[s.settingSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>
                        </View>
                    </View>
                    <View style={s.settingRight}>
                        {rightElement || <Icon name="chevron-forward" size={18} color={theme.colors.textLight} />}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />



            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 120 }]}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
                    {/* ACCOUNT SECTION */}
                    <Text style={s.sectionHeader}>HESAP VE GÜVENLİK</Text>
                    {renderSettingItem(
                        "lock-closed-outline",
                        "Şifre Değiştir",
                        "Hesap güvenliğini artırın",
                        undefined,
                        undefined,
                        () => Alert.alert("Bilgi", "Şifre değiştirme ekranı yakında eklenecek.")
                    )}

                    {/* APP SETTINGS SECTION */}
                    <Text style={[s.sectionHeader, { marginTop: spacing.xl }]}>UYGULAMA TERCİHLERİ</Text>
                    {renderSettingItem(
                        "moon-outline",
                        "Koyu Tema",
                        isDarkMode ? "Koyu mod aktif" : "Aydınlık mod aktif",
                        "#8B5CF6",
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: '#CBD5E1', true: theme.colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
                        />
                    )}
                    {renderSettingItem(
                        "notifications-outline",
                        "Bildirimler",
                        "Duyuru ve hatırlatıcıları yönet",
                        "#F59E0B"
                    )}
                    {renderSettingItem(
                        "language-outline",
                        "Dil Seçimi",
                        language === 'tr' ? "Türkçe (TR)" : "English (EN)",
                        "#10B981",
                        undefined,
                        () => setShowLangModal(true)
                    )}


                    {/* SUPPORT SECTION */}
                    <Text style={[s.sectionHeader, { marginTop: spacing.xl }]}>BİLGİ VE DESTEK</Text>
                    {renderSettingItem("help-circle-outline", "Yardım Merkezi", "Sıkça sorulan sorular", "#3B82F6")}
                    {renderSettingItem("send-outline", "Geri Bildirim", "Bize önerilerinizi iletin", "#EC4899")}
                    {renderSettingItem("document-text-outline", "Kullanım Koşulları", "Yasal bilgilendirmeler", isDarkMode ? "#94A3B8" : "#475569")}
                    {renderSettingItem("shield-checkmark-outline", "Gizlilik Politikası", "KVKK ve veri güvenliği", "#10B981")}

                    {/* LOGOUT */}
                    <TouchableOpacity
                        style={s.logoutBtn}
                        onPress={handleLogout}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#EF4444', '#B91C1C']}
                            style={s.logoutGradient}
                        >
                            <Icon name="log-out-outline" size={20} color="#FFFFFF" />
                            <Text style={s.logoutText}>Oturumu Kapat</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={s.appVersion}>KLU Mobile v1.0.5 (Build 2026)</Text>
                    <Text style={s.copyright}>© 2026 Kırklareli Üniversitesi</Text>
                </Animated.View>
            </ScrollView>

            {/* Language Modal */}
            <Modal
                visible={showLangModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLangModal(false)}
            >
                <TouchableOpacity
                    style={s.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowLangModal(false)}
                >
                    <View style={s.modalContent}>
                        <Text style={s.modalTitle}>Dil Seçimi</Text>
                        <TouchableOpacity
                            style={[s.langOption, language === 'tr' && s.langOptionActive]}
                            onPress={() => { setLanguage('tr'); setShowLangModal(false); }}
                        >
                            <Text style={[s.langText, language === 'tr' && s.langTextActive]}>Türkçe (TR)</Text>
                            {language === 'tr' && <Icon name="checkmark-circle" size={20} color="#10B981" />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[s.langOption, language === 'en' && s.langOptionActive]}
                            onPress={() => { setLanguage('en'); setShowLangModal(false); }}
                        >
                            <Text style={[s.langText, language === 'en' && s.langTextActive]}>English (EN)</Text>
                            {language === 'en' && <Icon name="checkmark-circle" size={20} color="#10B981" />}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    sectionHeader: {
        fontSize: moderateScale(11),
        fontWeight: '900',
        color: theme.colors.textLight,
        letterSpacing: 1.5,
        marginBottom: spacing.sm,
        marginTop: spacing.sm,
        paddingLeft: spacing.xs,
        opacity: 0.8,
    },
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        padding: spacing.md,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.xs,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: moderateScale(42),
        height: moderateScale(42),
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: moderateScale(12),
        fontWeight: '500',
        opacity: 0.7,
    },
    settingRight: {
        marginLeft: spacing.sm,
    },
    logoutBtn: {
        marginTop: spacing.xl,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        ...theme.shadows.medium,
    },
    logoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(16),
        gap: 10,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    appVersion: {
        textAlign: 'center',
        fontSize: moderateScale(12),
        color: theme.colors.textLight,
        marginTop: spacing.xl,
        fontWeight: '700',
    },
    copyright: {
        textAlign: 'center',
        fontSize: moderateScale(10),
        color: theme.colors.textLight,
        marginTop: 4,
        fontWeight: '500',
        opacity: 0.6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    modalContent: {
        width: '100%',
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        ...shadows.large,
    },
    modalTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: theme.colors.text,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    langOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.xs,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    langOptionActive: {
        backgroundColor: theme.colors.primary + '10',
        borderColor: theme.colors.primary + '30',
    },
    langText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: theme.colors.text,
    },
    langTextActive: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
});
