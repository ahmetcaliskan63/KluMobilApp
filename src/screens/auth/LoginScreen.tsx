/**
 * Login Screen
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
} from 'react-native';
import { Button, Input } from '../../components/common';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login, isLoading } = useAuthStore();

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
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled">

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>KLU</Text>
                    </View>
                    <Text style={styles.universityName}>
                        Kırklareli Üniversitesi
                    </Text>
                    <Text style={styles.appName}>Mobil Uygulama</Text>
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                    <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
                    <Text style={styles.subtitle}>
                        Hesabınıza giriş yapın
                    </Text>

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
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <Text style={styles.forgotPassword}>
                        Şifremi Unuttum
                    </Text>

                    <Button
                        title="Giriş Yap"
                        onPress={handleLogin}
                        loading={isLoading}
                        style={styles.loginButton}
                    />
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    © 2026 Kırklareli Üniversitesi
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.xxl * 2,
        marginBottom: theme.spacing.xl,
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.textOnPrimary,
    },
    universityName: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text,
        textAlign: 'center',
    },
    appName: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    formContainer: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl,
    },
    forgotPassword: {
        fontSize: 14,
        color: theme.colors.primary,
        textAlign: 'right',
        marginTop: -theme.spacing.sm,
        marginBottom: theme.spacing.lg,
    },
    loginButton: {
        marginTop: theme.spacing.md,
    },
    footer: {
        fontSize: 12,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginVertical: theme.spacing.lg,
    },
});
