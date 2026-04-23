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

import { useTranslation } from 'react-i18next';

export const SettingsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useAppTheme();
    const { t, i18n } = useTranslation();
    const { toggleDarkMode } = useThemeStore();
    const { logout } = useAuthStore();
    const { language, setLanguage } = useAppSettingsStore();
    const s = styles(theme, isDarkMode);

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
            t('profile.logout'),
            t('profile.logoutConfirm'),
            [
                { text: t('common.cancel'), style: "cancel" },
                {
                    text: t('profile.logout'),
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
            <StatusBar barStyle="light-content" backgroundColor="#182958" translucent={false} />



            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 120 }]}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
                    {/* ACCOUNT SECTION */}
                    <Text style={s.sectionHeader}>{t('settings.accountSecurity')}</Text>
                    {renderSettingItem(
                        "lock-closed-outline",
                        t('settings.changePassword'),
                        t('settings.comingSoon'),
                        undefined,
                        undefined,
                        () => Alert.alert(t('common.info'), t('settings.comingSoon'))
                    )}

                    {/* APP SETTINGS SECTION */}
                    <Text style={[s.sectionHeader, { marginTop: spacing.xl }]}>{t('settings.appPreferences')}</Text>
                    {renderSettingItem(
                        "moon-outline",
                        t('settings.darkMode'),
                        isDarkMode ? t('common.on') : t('common.off'),
                        "#8B5CF6",
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: isDarkMode ? '#334155' : '#CBD5E1', true: theme.colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
                        />
                    )}
                    {renderSettingItem(
                        "notifications-outline",
                        t('settings.notifications'),
                        t('settings.comingSoon'),
                        "#F59E0B"
                    )}
                    {renderSettingItem(
                        "language-outline",
                        t('settings.language'),
                        language === 'tr' ? t('settings.langTr') : t('settings.langEn'),
                        "#10B981",
                        undefined,
                        () => setShowLangModal(true)
                    )}


                    {/* SUPPORT SECTION */}
                    <Text style={[s.sectionHeader, { marginTop: spacing.xl }]}>{t('settings.helpSupport')}</Text>
                    {renderSettingItem("help-circle-outline", t('settings.helpCenter'), t('settings.comingSoon'), "#3B82F6")}
                    {renderSettingItem("send-outline", t('settings.feedback'), t('settings.comingSoon'), "#EC4899")}
                    {renderSettingItem("document-text-outline", t('settings.terms'), t('settings.comingSoon'), isDarkMode ? "#94A3B8" : "#475569")}
                    {renderSettingItem("shield-checkmark-outline", t('settings.privacy'), t('settings.comingSoon'), "#10B981")}

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
                            <Text style={s.logoutText}>{t('profile.logout')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={s.appVersion}>{t('settings.version')} v1.0.5 (Build 2026)</Text>
                    <Text style={s.copyright}>{t('settings.copyright')}</Text>
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
                        <Text style={s.modalTitle}>{t('settings.language')}</Text>
                        <TouchableOpacity
                            style={[s.langOption, language === 'tr' && s.langOptionActive]}
                            onPress={() => { 
                                setLanguage('tr'); 
                                i18n.changeLanguage('tr');
                                setShowLangModal(false); 
                            }}
                        >
                            <Text style={[s.langText, language === 'tr' && s.langTextActive]}>{t('settings.langTr')}</Text>
                            {language === 'tr' && <Icon name="checkmark-circle" size={20} color="#10B981" />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[s.langOption, language === 'en' && s.langOptionActive]}
                            onPress={() => { 
                                setLanguage('en'); 
                                i18n.changeLanguage('en');
                                setShowLangModal(false); 
                            }}
                        >
                            <Text style={[s.langText, language === 'en' && s.langTextActive]}>{t('settings.langEn')}</Text>
                            {language === 'en' && <Icon name="checkmark-circle" size={20} color="#10B981" />}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
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
        opacity: isDarkMode ? 0.9 : 1,
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
