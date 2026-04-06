import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import {
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

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
        <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
            {/* Drawer Header */}
            <LinearGradient
                colors={['#182958', '#101D42', '#080F26']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                {/* Decorative Premium Glows */}
                <View style={[styles.glowCircle, { top: -40, right: -40, backgroundColor: '#3B82F640' }]} />
                <View style={[styles.glowCircle, { bottom: -20, left: -20, backgroundColor: '#6366F130' }]} />

                {/* Back / Close Button */}
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => props.navigation.closeDrawer()}
                >
                    <Icon name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoWrapper}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.universityName}>KIRKLARELİ</Text>
                        <Text style={styles.subTitle}>ÜNİVERSİTESİ</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Fixed Menu List */}
            <View style={styles.mainContent}>
                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>HIZLI ERİŞİM</Text>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItemCard}
                            onPress={() => handlePress(item.url)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                                <Icon name={item.icon} size={22} color={item.color} />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <View style={styles.chevronWrapper}>
                                <Icon name="chevron-forward" size={18} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Info Card */}
                <LinearGradient
                    colors={['#FFFFFF', '#F1F5F9']}
                    style={styles.infoCard}
                >
                    <Icon name="information-circle" size={24} color="#1E293B" />
                    <Text style={styles.infoText}>
                        Kırklareli Üniversitesi Mobil Uygulaması ile kampüs hayatı parmaklarınızın ucunda.
                    </Text>
                </LinearGradient>
            </View>

            {/* Drawer Footer */}
            <View style={styles.footer}>
                <View style={styles.footerGlow} />
                <Text style={styles.footerText}>© 2026 Kırklareli Üniversitesi</Text>
                <View style={styles.versionBadge}>
                    <Text style={styles.versionText}>v1.0.0</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        left: 20,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
        fontSize: moderateScale(12),
        fontWeight: '600',
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
        fontSize: 12,
        fontWeight: '800',
        color: '#64748B',
        letterSpacing: 1.5,
        marginBottom: 15,
        marginLeft: 5,
    },
    menuItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(12),
        borderRadius: moderateScale(18),
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        ...Platform.select({
            ios: {
                shadowColor: '#1E293B',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
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
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#1E293B',
    },
    chevronWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCard: {
        margin: moderateScale(20),
        padding: moderateScale(20),
        borderRadius: moderateScale(24),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#475569',
        lineHeight: 20,
        fontWeight: '500',
    },
    footer: {
        padding: moderateScale(25),
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    footerGlow: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 1,
        backgroundColor: '#F1F5F9',
    },
    footerText: {
        fontSize: moderateScale(12),
        color: '#94A3B8',
        fontWeight: '700',
    },
    versionBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 8,
    },
    versionText: {
        fontSize: moderateScale(10),
        color: '#64748B',
        fontWeight: '800',
    },
});

