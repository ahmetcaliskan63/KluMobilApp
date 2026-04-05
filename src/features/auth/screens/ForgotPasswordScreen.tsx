import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@/app/theme/theme';
import { Input, Button } from '@/shared/components/common';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

export const ForgotPasswordScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email.includes('@')) {
            Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }

        setIsLoading(true);
        // Mock password reset
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Başarılı',
                'Şifre sıfırlama talimatları e-posta adresinize gönderildi.',
                [{ text: 'Tamam', onPress: () => navigation.goBack() }]
            );
        }, 1500);
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

            <View style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={s.backButton}
                >
                    <Icon name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            <View style={s.content}>
                <View style={s.iconContainer}>
                    <Icon name="lock-open-outline" size={60} color={theme.colors.primary} />
                </View>

                <Text style={s.title}>Şifremi Unuttum</Text>
                <Text style={s.subtitle}>
                    Kayıtlı e-posta adresinizi girin. Şifrenizi sıfırlamanız için size bir bağlantı göndereceğiz.
                </Text>

                <View style={s.form}>
                    <Input
                        label="E-posta"
                        placeholder="ornek@klu.edu.tr"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <View style={{ height: 30 }} />

                    <Button
                        title="Bağlantı Gönder"
                        onPress={handleResetPassword}
                        loading={isLoading}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    form: {
        width: '100%',
    },
});

