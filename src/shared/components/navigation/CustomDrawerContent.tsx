import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    Platform,
    Animated,
} from 'react-native';
import {
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    const menuItems = [
        {
            id: 'university',
            title: 'Üniversitemiz',
            icon: 'business',
            color: '#3B82F6',
            url: 'https://www.klu.edu.tr/sayfa/32/universitemiz'
        },
        {
            id: 'candidate',
            title: 'Aday Öğrenci',
            icon: 'school',
            color: '#10B981',
            url: 'https://aday.klu.edu.tr/'
        },
        {
            id: 'contact',
            title: 'İletişim',
            icon: 'call',
            color: '#F59E0B',
            url: 'https://www.klu.edu.tr/iletisim'
        },
        {
            id: 'social',
            title: 'KLÜ Sosyal',
            icon: 'share-social',
            color: '#EC4899',
            url: 'https://www.instagram.com/kirklareliedu/'
        },
    ];

    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={s.container}>
            {/* Drawer Header */}
            <LinearGradient
                colors={isDarkMode ? ['#0F172A', '#020617', '#000000'] : ['#182958', '#101D42', '#080F26']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.header}
            >
                {/* Decorative Premium Glows */}
                <View style={[s.glowCircle, { top: -40, right: -40, backgroundColor: isDarkMode ? '#3B82F615' : '#3B82F640' }]} />
                <View style={[s.glowCircle, { bottom: -20, left: -20, backgroundColor: isDarkMode ? '#6366F110' : '#6366F130' }]} />

                {/* Back / Close Button */}
                <TouchableOpacity 
                    style={s.closeButton} 
                    onPress={() => props.navigation.closeDrawer()}
                    activeOpacity={0.7}
                >
                    <Icon name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={s.headerContent}>
                    <View style={s.logoContainer}>
                        <View style={s.logoWrapper}>
                            <Image
                                source={require('@/shared/assets/logo.png')}
                                style={s.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={s.headerTextContainer}>
                        <Text style={s.universityName}>KIRKLARELİ</Text>
                        <Text style={s.subTitle}>ÜNİVERSİTESİ</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Fixed Menu List */}
            <View style={s.mainContent}>
                <View style={s.menuContainer}>
                    <Text style={s.sectionTitle}>HIZLI ERİŞİM</Text>
                    {menuItems.map((item) => {
                        const scaleAnim = useRef(new Animated.Value(1)).current;

                        const onPressIn = () => {
                            Animated.spring(scaleAnim, {
                                toValue: 0.95,
                                useNativeDriver: true,
                            }).start();
                        };

                        const onPressOut = () => {
                            Animated.spring(scaleAnim, {
                                toValue: 1,
                                useNativeDriver: true,
                            }).start();
                        };

                        return (
                            <Animated.View key={item.id} style={{ transform: [{ scale: scaleAnim }] }}>
                                <TouchableOpacity
                                    style={s.menuItemCard}
                                    onPress={() => handlePress(item.url)}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    activeOpacity={1}
                                >
                                    <View style={[s.iconBox, { backgroundColor: isDarkMode ? item.color + '25' : item.color + '15' }]}>
                                        <Icon name={item.icon as any} size={22} color={item.color} />
                                    </View>
                                    <Text style={s.menuText}>{item.title}</Text>
                                    <View style={s.chevronWrapper}>
                                        <Icon name="chevron-forward" size={18} color={isDarkMode ? 'rgba(255,255,255,0.3)' : '#94A3B8'} />
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>

                {/* Info Card */}
                <LinearGradient
                    colors={isDarkMode ? ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.01)'] : ['#FFFFFF', '#F1F5F9']}
                    style={s.infoCard}
                >
                    <Icon name="information-circle" size={24} color={isDarkMode ? theme.colors.primary : '#1E293B'} />
                    <Text style={s.infoText}>
                        Kırklareli Üniversitesi Mobil Uygulaması ile kampüs hayatı parmaklarınızın ucunda.
                    </Text>
                </LinearGradient>
            </View>

            {/* Drawer Footer */}
            <View style={s.footer}>
                <View style={s.footerGlow} />
                <Text style={s.footerText}>© 2026 Kırklareli Üniversitesi</Text>
                <View style={s.versionBadge}>
                    <Text style={s.versionText}>v1.0.0</Text>
                </View>
            </View>
        </View>
    );
};

const styles = (theme: any, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        height: verticalScale(220),
        justifyContent: 'flex-end',
        paddingBottom: verticalScale(30),
        overflow: 'hidden',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 65 : 45,
        left: 15,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    glowCircle: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
    },
    headerContent: {
        alignItems: 'center',
        zIndex: 1,
    },
    logoContainer: {
        padding: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: moderateScale(60),
        marginBottom: 12,
    },
    logoWrapper: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(45),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#f1f5f9',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    logo: {
        width: moderateScale(88),
        height: moderateScale(88),
    },
    headerTextContainer: {
        alignItems: 'center',
    },
    universityName: {
        color: '#FFFFFF',
        fontSize: moderateScale(20),
        fontWeight: '900',
        letterSpacing: 2,
    },
    subTitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: moderateScale(11),
        fontWeight: '700',
        letterSpacing: 4,
        marginTop: 2,
    },
    mainContent: {
        flex: 1,
    },
    menuContainer: {
        padding: moderateScale(20),
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: theme.colors.textSecondary,
        letterSpacing: 1.5,
        marginBottom: 15,
        marginLeft: 5,
        opacity: 0.6,
    },
    menuItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(12),
        borderRadius: moderateScale(18),
        marginBottom: 12,
        borderWidth: 1.2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
        ...Platform.select({
            ios: {
                shadowColor: '#1E293B',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isDarkMode ? 0.2 : 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    iconBox: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(14),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(16),
    },
    menuText: {
        flex: 1,
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: theme.colors.text,
    },
    chevronWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCard: {
        margin: moderateScale(20),
        padding: moderateScale(18),
        borderRadius: moderateScale(22),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderWidth: 1.2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: theme.colors.textSecondary,
        lineHeight: 18,
        fontWeight: '600',
        opacity: 0.8,
    },
    footer: {
        padding: moderateScale(25),
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        position: 'relative',
    },
    footerGlow: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 1,
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9',
    },
    footerText: {
        fontSize: moderateScale(11),
        color: theme.colors.textSecondary,
        fontWeight: '700',
        opacity: 0.5,
    },
    versionBadge: {
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 8,
    },
    versionText: {
        fontSize: moderateScale(9),
        color: theme.colors.textSecondary,
        fontWeight: '900',
        opacity: 0.7,
    },
});

