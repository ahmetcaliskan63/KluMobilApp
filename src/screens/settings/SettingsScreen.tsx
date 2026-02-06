import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../../components/common/MenuItem';
import { MenuSection } from '../../components/common/MenuSection';
import { useThemeStore } from '../../store/themeStore';

export const SettingsScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { isDarkMode, toggleDarkMode } = useThemeStore();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

                <TouchableOpacity style={styles.logoutButton}>
                    <Icon name="log-out-outline" size={20} color="#FF3B30" />
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        marginBottom: 48,
        paddingVertical: 12,
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
});
