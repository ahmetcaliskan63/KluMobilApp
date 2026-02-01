import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MOCK_STATS } from '../../data/mockData';

export const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme);

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
            ]
        );
    };

    const renderSettingItem = (icon: string, title: string, color: string = theme.colors.text, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity style={s.settingItem} onPress={onPress}>
            <View style={s.settingLeft}>
                <View style={[s.iconBg, { backgroundColor: color + '15' }]}>
                    <Icon name={icon} size={22} color={color} />
                </View>
                <Text style={[s.settingTitle, { color }]}>{title}</Text>
            </View>
            {rightElement || <Icon name="chevron-forward" size={20} color={theme.colors.textLight} />}
        </TouchableOpacity>
    );

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#101D42" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Avatar Section */}
                <View style={s.avatarSection}>
                    <View style={s.avatarContainer}>
                        <View style={s.avatar}>
                            <Text style={s.avatarText}>
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                            </Text>
                        </View>
                        <TouchableOpacity style={s.editButton}>
                            <Icon name="camera" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={s.userName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={s.studentNumber}>{user?.studentNumber}</Text>
                    <View style={s.departmentBadge}>
                        <Text style={s.departmentText}>{user?.department}</Text>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={s.statsContainer}>
                    <View style={s.statItem}>
                        <Text style={s.statLabel}>Sınıf</Text>
                        <Text style={s.statValue}>{user?.grade}. Sınıf</Text>
                    </View>
                    <View style={s.statDivider} />
                    <View style={s.statItem}>
                        <Text style={s.statLabel}>Genel Ortalama</Text>
                        <Text style={s.statValue}>{MOCK_STATS.gpa}</Text>
                    </View>
                    <View style={s.statDivider} />
                    <View style={s.statItem}>
                        <Text style={s.statLabel}>Kredi</Text>
                        <Text style={s.statValue}>{MOCK_STATS.totalCredits}</Text>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Akademik Bilgiler</Text>
                    {renderSettingItem('school-outline', 'Ders Programım', theme.colors.primary)}
                    {renderSettingItem('document-text-outline', 'Transkript Belleği', theme.colors.primary)}
                    {renderSettingItem('calendar-outline', 'Akademik Takvim', theme.colors.primary)}
                </View>

                <View style={s.section}>
                    <Text style={s.sectionTitle}>Uygulama Ayarları</Text>
                    {renderSettingItem('notifications-outline', 'Bildirim Ayarları', theme.colors.text)}
                    {renderSettingItem(
                        isDarkMode ? 'moon' : 'sunny-outline',
                        'Karanlık Mod',
                        theme.colors.text,
                        toggleDarkMode,
                        <View style={{ pointerEvents: 'none' }}>
                            <Icon
                                name={isDarkMode ? 'checkbox' : 'square-outline'}
                                size={22}
                                color={theme.colors.primary}
                            />
                        </View>
                    )}
                    {renderSettingItem('shield-checkmark-outline', 'Güvenlik ve Gizlilik', theme.colors.text)}
                </View>

                <View style={s.section}>
                    <Text style={s.sectionTitle}>Destek</Text>
                    {renderSettingItem('help-circle-outline', 'Yardım Merkezi', theme.colors.text)}
                    {renderSettingItem('information-circle-outline', 'Hakkımızda', theme.colors.text)}
                    {renderSettingItem('log-out-outline', 'Çıkış Yap', theme.colors.error, handleLogout)}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    avatarSection: {
        backgroundColor: theme.colors.primary,
        paddingBottom: 40,
        paddingTop: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primaryLight,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    studentNumber: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 12,
    },
    departmentBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    departmentText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        marginHorizontal: theme.spacing.lg,
        marginTop: -30,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        fontSize: 11,
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: theme.colors.border,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        marginBottom: 12,
        letterSpacing: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
        ...theme.shadows.small,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBg: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
});
