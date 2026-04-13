import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Switch,
    StatusBar,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useThemeStore } from '@/shared/store/themeStore';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';

export const SettingsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const s = styles(theme);

    const [fadeAnim] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const renderSettingItem = (
        icon: string,
        title: string,
        subtitle: string,
        rightElement?: React.ReactNode,
        onPress?: () => void
    ) => (
        <TouchableOpacity
            style={s.settingCard}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={s.cardGlow} />
            <View style={s.settingLeft}>
                <View style={[s.iconWrapper, { backgroundColor: theme.colors.primary + '10' }]}>
                    <Icon name={icon} size={22} color={theme.colors.primary} />
                </View>
                <View style={s.settingInfo}>
                    <Text style={s.settingTitle}>{title}</Text>
                    <Text style={s.settingSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <View style={s.settingRight}>
                {rightElement || <Icon name="chevron-forward" size={18} color={theme.colors.primary} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={s.meshBackground}>
                <View style={[s.bgGlow, { top: '10%', right: '-10%', width: 300, height: 300, backgroundColor: 'rgba(59, 130, 246, 0.05)' }]} />
                <View style={[s.bgGlow, { bottom: '20%', left: '-20%', width: 400, height: 400, backgroundColor: 'rgba(99, 102, 241, 0.03)' }]} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            >
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={s.sectionHeader}>UYGULAMA AYARLARI</Text>
                    {renderSettingItem(
                        "moon-outline",
                        "Koyu Tema",
                        "Uygulama görünümünü değiştir",
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: '#E0E0E0', true: theme.colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
                        />
                    )}
                    {renderSettingItem("notifications-outline", "Bildirimler", "Duyuru ve mesaj bildirimleri")}
                    {renderSettingItem("language-outline", "Dil", "Türkçe (TR)")}

                    <Text style={[s.sectionHeader, { marginTop: spacing.xl }]}>DESTEK</Text>
                    {renderSettingItem("help-circle-outline", "Yardım Merkezi", "Sıkça sorulan sorular")}
                    {renderSettingItem("mail-outline", "Geri Bildirim", "Bize ulaşın")}
                    {renderSettingItem("information-circle-outline", "Hakkında", "Sürüm 1.0.0")}

                    <TouchableOpacity style={s.logoutBtnContainer}>
                        <LinearGradient
                            colors={['#FFF1F1', '#FFF']}
                            style={s.logoutGradient}
                        >
                            <View style={s.logoutContent}>
                                <View style={s.logoutIconWrapper}>
                                    <Icon name="log-out-outline" size={20} color={theme.colors.error} />
                                </View>
                                <Text style={s.logoutText}>Hesaptan Çıkış Yap</Text>
                            </View>
                            <Icon name="chevron-forward" size={16} color={theme.colors.error + '40'} />
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={s.appVersion}>KLU Mobile - v1.0.0 (Build 2026)</Text>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    header: {
        paddingBottom: verticalScale(20),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    headerIconButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    notifBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4D4D',
        zIndex: 1,
        borderWidth: 1.5,
        borderColor: '#182958',
    },
    scrollContent: {
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    sectionHeader: {
        fontSize: moderateScale(13),
        fontWeight: '900',
        color: theme.colors.primary, // University Blue
        letterSpacing: 2,
        marginBottom: spacing.md,
        paddingLeft: spacing.xs,
        opacity: 0.9,
    },
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: spacing.md,
        borderRadius: 20,
        marginBottom: spacing.sm,
        ...theme.shadows.small,
        borderWidth: 1.5,
        borderColor: theme.colors.primary + '25', // Stronger university blue border
        overflow: 'hidden',
    },
    cardGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary + '03',
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
        color: theme.colors.text,
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
        fontWeight: '400',
    },
    settingRight: {
        marginLeft: spacing.sm,
    },
    logoutBtnContainer: {
        marginTop: spacing.md,
        borderRadius: 24,
        overflow: 'hidden',
        ...theme.shadows.small,
        borderWidth: 1.5,
        borderColor: theme.colors.primary + '25', // Blue border for logout too
    },
    logoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
    },
    logoutContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIconWrapper: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: 12,
        backgroundColor: theme.colors.error + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    logoutText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: theme.colors.error,
    },
    appVersion: {
        textAlign: 'center',
        fontSize: moderateScale(11),
        color: theme.colors.textLight,
        marginTop: spacing.xl,
        fontWeight: '500',
    },
    meshBackground: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: -1,
    },
    bgGlow: {
        position: 'absolute',
        borderRadius: 200,
    },
});
