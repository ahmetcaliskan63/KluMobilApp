import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import Icon from 'react-native-vector-icons/Ionicons';

export const SettingsScreen: React.FC = () => {
    const { theme, isDarkMode } = useAppTheme();

    const renderSettingItem = (icon: string, title: string, subtitle: string, rightElement?: React.ReactNode) => (
        <TouchableOpacity style={[styles.itemContainer, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.card }]}>
                <Icon name={icon} size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>
            </View>
            {rightElement || <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Uygulama Ayarları</Text>
                    {renderSettingItem('moon-outline', 'Koyu Tema', 'Uygulama görünümünü değiştir',
                        <Switch value={isDarkMode} onValueChange={() => { }} trackColor={{ true: theme.colors.primary }} />
                    )}
                    {renderSettingItem('notifications-outline', 'Bildirimler', 'Duyuru ve mesaj bildirimleri')}
                    {renderSettingItem('language-outline', 'Dil', 'Türkçe (TR)')}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Destek</Text>
                    {renderSettingItem('help-circle-outline', 'Yardım Merkezi', 'Sıkça sorulan sorular')}
                    {renderSettingItem('mail-outline', 'Geri Bildirim', 'Bize ulaşın')}
                    {renderSettingItem('information-circle-outline', 'Hakkında', 'Sürüm 1.0.0')}
                </View>

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
