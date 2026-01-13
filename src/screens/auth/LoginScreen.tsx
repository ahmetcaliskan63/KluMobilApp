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
const scale = width / 375; // Base design width
const moderateScale = (size: number, factor = 0.5) => size + (scale - 1) * size * factor;

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
        <KeyboardAvoidingView
            style={styles.container}>

            {/* Background */}
            <View style={styles.backgroundOverlay} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
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

                    {/* Footer */}
                    <Text style={styles.footer}>
                        © 2026 Kırklareli Üniversitesi
                    </Text>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: height * 0.08,
        marginBottom: theme.spacing.xl,
    },
    logoWrapper: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
        ...theme.shadows.medium,
    },
    logo: {
        width: moderateScale(115),
        height: moderateScale(115),
    },
    universityName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    appName: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: theme.spacing.xs,
        fontWeight: '400',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: theme.spacing.xl,
        ...theme.shadows.large,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 12,
    },
    welcomeText: {
        fontSize: moderateScale(32),
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: moderateScale(15),
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl + theme.spacing.xs,
        fontWeight: '400',
        letterSpacing: 0.2,
    },
    inputContainer: {
        marginBottom: theme.spacing.lg + theme.spacing.xs,
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInputWrapper: {
        flex: 1,
    },
    eyeButton: {
        position: 'absolute',
        right: theme.spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.sm,
        zIndex: 10,
    },
    eyeIcon: {
        fontSize: 20,
        marginTop: 15,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: theme.spacing.lg + theme.spacing.sm,
        marginTop: -theme.spacing.xs,
    },
    forgotPassword: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        paddingVertical: theme.spacing.md + 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    footer: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: theme.spacing.lg,
        fontWeight: '400',
        opacity: 0.9,
    },
});
