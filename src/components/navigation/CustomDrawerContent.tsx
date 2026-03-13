import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
    Platform,
} from 'react-native';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';
import { useAppTheme } from '../../hooks/useAppTheme';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { theme } = useAppTheme();

    const menuItems = [
        {
            id: 'university',
            title: 'Üniversitemiz',
            icon: 'business-outline',
            url: 'https://www.klu.edu.tr/sayfa/32/universitemiz'
        },
        {
            id: 'candidate',
            title: 'Aday Öğrenci',
            icon: 'school-outline',
            url: 'https://aday.klu.edu.tr/'
        },
        {
            id: 'contact',
            title: 'İletişim',
            icon: 'call-outline',
            url: 'https://www.klu.edu.tr/iletisim'
        },
        {
            id: 'social',
            title: 'KLÜ Sosyal',
            icon: 'share-social-outline',
            url: 'https://www.instagram.com/kirklareliedu/'
        },
    ];

    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
            {/* Drawer Header */}
            <LinearGradient
                colors={['#182958', '#101D42']}
                style={styles.header}
            >
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.universityName}>Kırklareli Üniversitesi</Text>
            </LinearGradient>

            <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => handlePress(item.url)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.primary + '10' }]}>
                                <Icon name={item.icon} size={22} color={theme.colors.primary} />
                            </View>
                            <Text style={[styles.menuText, { color: theme.colors.text }]}>
                                {item.title}
                            </Text>
                            <Icon name="chevron-forward" size={16} color="#CBD5E1" />
                        </TouchableOpacity>
                    ))}
                </View>
            </DrawerContentScrollView>

            {/* Drawer Footer */}
            <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
                <Text style={styles.footerText}>© 2026 Kırklareli Üniversitesi</Text>
                <Text style={styles.versionText}>v1.0.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: verticalScale(200),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(20),
    },
    logoWrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(15),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    logo: {
        width: moderateScale(90),
        height: moderateScale(90),
    },
    universityName: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    scrollContent: {
        paddingTop: 0,
    },
    menuContainer: {
        padding: moderateScale(15),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(14),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(8),
    },
    iconWrapper: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(15),
    },
    menuText: {
        flex: 1,
        fontSize: moderateScale(15),
        fontWeight: '600',
    },
    footer: {
        padding: moderateScale(20),
        borderTopWidth: 1,
        alignItems: 'center',
    },
    footerText: {
        fontSize: moderateScale(12),
        color: '#94A3B8',
        fontWeight: '500',
    },
    versionText: {
        fontSize: moderateScale(10),
        color: '#CBD5E1',
        marginTop: 4,
    },
});
