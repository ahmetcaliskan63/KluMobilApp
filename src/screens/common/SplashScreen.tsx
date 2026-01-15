/**
 * Splash Screen
 * Uygulama açılış ekranı - KLU Kurumsal Tasarım
 */

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

// Responsive Scaling Helpers
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export const SplashScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isAuthenticated } = useAuthStore();
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
            } else {
                navigation.navigate('Auth');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, fadeAnim, scaleAnim, navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#182958"
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
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.slogan}>Bilgeliğe Yolculuk</Text>
                </Animated.View>
            </View>

            <View style={styles.footerContainer}>
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
        backgroundColor: '#182958', // Official KLU Blue
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
        borderRadius: moderateScale(70),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
        ...theme.shadows.medium,
    },
    logo: {
        width: moderateScale(130),
        height: moderateScale(130),
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
