import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Button, Input } from '@/shared/components/common';
import { useAuthStore } from '@/shared/store/authStore';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme } from '@/core/theme/theme';
import { viewport, moderateScale, scale, verticalScale } from '@/shared/utils/responsive';


export const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('1220404025@ogr.klu.edu.tr');
    const [password, setPassword] = useState('123456');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading } = useAuthStore();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);

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
                // Execute login via global auth store
                await login({ studentId: email, password });
            } catch (error) {
                Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
            }
        }
    };

    return (
        <View
            style={s.container}>

            {/* Background */}
            <View style={s.backgroundOverlay} />

            <ScrollView
                contentContainerStyle={s.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                <Animated.View style={[s.content, { opacity: fadeAnim }]}>
                    <View style={s.mainContent}>
                        {/* Logo Section */}
                        <View style={s.logoContainer}>
                            <View style={s.logoWrapper}>
                                <Image
                                    source={require('@/shared/assets/logo.png')}
                                    style={s.logo}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={s.universityName}>
                                Kırklareli Üniversitesi
                            </Text>
                            <Text style={s.appName}>Mobil Uygulama</Text>
                        </View>

                        {/* Form Card */}
                        <View style={s.formCard}>
                            <Text style={s.welcomeText}>Hoş Geldiniz</Text>
                            <Text style={s.subtitle}>
                                KLU Öğrenci Portalı
                            </Text>

                            <View style={s.inputContainer}>
                                <Input
                                    label="Öğrenci Numarası / E-posta"
                                    placeholder="20210001 veya ornek@klu.edu.tr"
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

                            <View style={s.inputContainer}>
                                <View style={s.passwordContainer}>
                                    <View style={s.passwordInputWrapper}>
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
                                        style={s.eyeButton}
                                        onPress={() => setShowPassword(!showPassword)}
                                        activeOpacity={0.7}>
                                        <Icon
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={moderateScale(22)}
                                            color={theme.colors.textSecondary}
                                            style={s.eyeIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={s.forgotPasswordContainer}
                                onPress={() => (navigation as any).navigate('ForgotPassword')}
                            >
                                <Text style={s.forgotPassword}>
                                    Şifremi Unuttum
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[s.loginButton, isLoading && s.loginButtonDisabled]}
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}>
                                <Text style={s.loginButtonText}>
                                    {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                </Text>
                            </TouchableOpacity>

                            {/* DEV: Auto-fill Buttons for Testing */}
                            <View style={s.devContainer}>
                                <TouchableOpacity
                                    style={s.devButton}
                                    onPress={() => {
                                        setEmail('1220404025@ogr.klu.edu.tr');
                                        setPassword('123456');
                                    }}
                                >
                                    <Text style={s.devButtonText}>Öğrenci</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={s.devButton}
                                    onPress={() => {
                                        setEmail('ahmet.caliskan@klu.edu.tr');
                                        setPassword('654321');
                                    }}
                                >
                                    <Text style={s.devButtonText}>Akademisyen</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Footer - Pushed to bottom */}
                    <View style={s.footerContainer}>
                        <Text style={s.footer}>
                            © 2026 - Bilgi İşlem Daire Başkanlığı
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
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
        paddingHorizontal: scale(20),
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
        width: moderateScale(140),
        height: moderateScale(140),
        borderRadius: moderateScale(70),
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(15),
        ...theme.shadows.medium,
    },
    logo: {
        width: moderateScale(130),
        height: moderateScale(130),
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
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        ...theme.shadows.large,
        marginBottom: verticalScale(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: theme.colors.shadow,
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
        right: scale(10),
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        zIndex: 10,
    },
    eyeIcon: {
        marginTop: verticalScale(20),
        opacity: 0.8,
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
    devContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(15),
        gap: scale(10),
    },
    devButton: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(8),
        backgroundColor: 'rgba(0, 52, 120, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 52, 120, 0.1)',
    },
    devButtonText: {
        fontSize: moderateScale(11),
        color: theme.colors.primary,
        fontWeight: '600',
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
