import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/core/theme/theme';
import { useAuthStore } from '@/shared/store/authStore';
import { useAppStore } from '@/shared/store/appStore';
import { RootStackParamList } from '@/shared/types/navigation';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const SplashScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isAuthenticated } = useAuthStore();
    const { hasCompletedOnboarding } = useAppStore();
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.8));

    useEffect(() => {
        // Logo animasyonunu başlat
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        // 2 saniye sonra yönlendirme yap
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigation.navigate('Main');
            } else if (!hasCompletedOnboarding) {
                navigation.navigate('Onboarding');
            } else {
                navigation.navigate('Auth');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, hasCompletedOnboarding, fadeAnim, scaleAnim, navigation]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <StatusBar
                backgroundColor={theme.colors.primary}
                barStyle="light-content"
            />

            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.logoAndSlogan,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={require('@/shared/assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.slogan}>Bilgeliğe Yolculuk</Text>
                </Animated.View>
            </View>

            <View style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, verticalScale(30)) }]}>
                <Text style={styles.footerText}>
                    © 2026 - Bilgi İşlem Daire Başkanlığı
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoAndSlogan: {
        alignItems: 'center',
    },
    logoWrapper: {
        width: moderateScale(140),
        height: moderateScale(140),
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: moderateScale(140) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
        ...theme.shadows.medium,
    },
    logo: {
        width: moderateScale(135), // Precision scaled for perfect fit in 140dp circle
        height: moderateScale(135),
    },
    slogan: {
        fontSize: moderateScale(22),
        color: '#FFFFFF',
        fontStyle: 'italic',
        fontWeight: '300',
        letterSpacing: 0.5,
    },
    footerContainer: {
        paddingBottom: verticalScale(30),
        alignItems: 'center',
    },
    footerText: {
        fontSize: moderateScale(12),
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '400',
    },
});
