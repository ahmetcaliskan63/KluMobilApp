import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../../components/common/MenuItem';
import { MenuSection } from '../../components/common/MenuSection';
import { useThemeStore } from '../../store/themeStore';
import { Theme, spacing } from '../../config/theme';

export const SettingsScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const s = styles(theme);

    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MenuSection title="Uygulama Ayarları" theme={theme}>
                    <MenuItem
                        icon="moon-outline"
                        title="Koyu Tema"
                        subtitle="Uygulama görünümünü değiştir"
                        theme={theme}
                        rightElement={
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleDarkMode}
                                trackColor={{ true: theme.colors.primary }}
                            />
                        }
                    />
                    <MenuItem icon="notifications-outline" title="Bildirimler" subtitle="Duyuru ve mesaj bildirimleri" theme={theme} />
                    <MenuItem icon="language-outline" title="Dil" subtitle="Türkçe (TR)" theme={theme} />
                </MenuSection>

                <MenuSection title="Destek" theme={theme}>
                    <MenuItem icon="help-circle-outline" title="Yardım Merkezi" subtitle="Sıkça sorulan sorular" theme={theme} />
                    <MenuItem icon="mail-outline" title="Geri Bildirim" subtitle="Bize ulaşın" theme={theme} />
                    <MenuItem icon="information-circle-outline" title="Hakkında" subtitle="Sürüm 1.0.0" theme={theme} />
                </MenuSection>

                <TouchableOpacity style={s.logoutButton}>
                    <Icon name="log-out-outline" size={20} color={theme.colors.error} />
                    <Text style={s.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.xxl,
        paddingVertical: spacing.sm,
    },
    logoutText: {
        color: theme.colors.error,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: spacing.sm,
    },
});
