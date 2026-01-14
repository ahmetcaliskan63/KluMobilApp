/**
 * Login Screen - Professional Redesign
 * Kırklareli Üniversitesi Mobil Uygulama Giriş Ekranı
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { Button, Input } from '../../components/common';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';

const { width, height } = Dimensions.get('window');

// Standard Screen Dimensions (iPhone 11 as base: 375x812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading } = useAuthStore();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!text) {
            setEmailError('E-posta adresi gereklidir');
            return false;
        }
        if (!emailRegex.test(text)) {
            setEmailError('Geçerli bir e-posta adresi giriniz');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (text: string) => {
        if (!text) {
            setPasswordError('Şifre gereklidir');
            return false;
        }
        if (text.length < 6) {
            setPasswordError('Şifre en az 6 karakter olmalıdır');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleLogin = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            try {
                await login(email, password);
            } catch (error) {
                Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
            }
        }
    };

    return (
        <View
            style={styles.container}>

            {/* Background */}
            <View style={styles.backgroundOverlay} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <View style={styles.mainContent}>
                        {/* Logo Section */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={require('../../assets/logo.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.universityName}>
                                Kırklareli Üniversitesi
                            </Text>
                            <Text style={styles.appName}>Mobil Uygulama</Text>
                        </View>

                        {/* Form Card */}
                        <View style={styles.formCard}>
                            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
                            <Text style={styles.subtitle}>
                                KLU Öğrenci Portalı
                            </Text>

                            <View style={styles.inputContainer}>
                                <Input
                                    label="E-posta"
                                    placeholder="ornek@klu.edu.tr"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        if (emailError) validateEmail(text);
                                    }}
                                    onBlur={() => validateEmail(email)}
                                    error={emailError}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.passwordContainer}>
                                    <View style={styles.passwordInputWrapper}>
                                        <Input
                                            label="Şifre"
                                            placeholder="••••••••"
                                            value={password}
                                            onChangeText={(text) => {
                                                setPassword(text);
                                                if (passwordError) validatePassword(text);
                                            }}
                                            onBlur={() => validatePassword(password)}
                                            error={passwordError}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowPassword(!showPassword)}
                                        activeOpacity={0.7}>
                                        <Text style={styles.eyeIcon}>
                                            {showPassword ? '👁️' : '🙈'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.forgotPasswordContainer}>
                                <Text style={styles.forgotPassword}>
                                    Şifremi Unuttum
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}>
                                <Text style={styles.loginButtonText}>
                                    {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer - Pushed to bottom */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footer}>
                            © 2026 Kırklareli Üniversitesi
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    backgroundOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.colors.primary,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: verticalScale(40),
        marginBottom: verticalScale(20),
    },
    logoWrapper: {
        width: horizontalScale(110),
        height: horizontalScale(110),
        borderRadius: horizontalScale(55),
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(15),
        ...theme.shadows.medium,
    },
    logo: {
        width: horizontalScale(100),
        height: horizontalScale(100),
    },
    universityName: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    appName: {
        fontSize: moderateScale(13),
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: verticalScale(5),
        fontWeight: '400',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        ...theme.shadows.large,
        marginBottom: verticalScale(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: verticalScale(10),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(15),
        elevation: 12,
    },
    welcomeText: {
        fontSize: moderateScale(28),
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: verticalScale(5),
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: theme.colors.textSecondary,
        marginBottom: verticalScale(25),
        fontWeight: '400',
        letterSpacing: 0.2,
    },
    inputContainer: {
        marginBottom: verticalScale(15),
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInputWrapper: {
        flex: 1,
    },
    eyeButton: {
        position: 'absolute',
        right: horizontalScale(10),
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: horizontalScale(10),
        zIndex: 10,
    },
    eyeIcon: {
        fontSize: moderateScale(18),
        marginTop: verticalScale(14),
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: verticalScale(25),
        marginTop: verticalScale(-5),
    },
    forgotPassword: {
        fontSize: moderateScale(13),
        color: theme.colors.primary,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: moderateScale(12),
        paddingVertical: verticalScale(14),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: verticalScale(4),
        },
        shadowOpacity: 0.3,
        shadowRadius: moderateScale(6),
        elevation: 6,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    footerContainer: {
        paddingBottom: verticalScale(20),
        marginTop: verticalScale(10),
    },
    footer: {
        fontSize: moderateScale(11),
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        opacity: 0.9,
    },
});
