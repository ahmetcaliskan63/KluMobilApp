import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { MOCK_STATS } from '../../data/mockData';

export const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuthStore();
    const insets = useSafeAreaInsets();

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

    const renderSettingItem = (icon: string, title: string, color: string = theme.colors.text, onPress?: () => void) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingLeft}>
                <View style={[styles.iconBg, { backgroundColor: color + '15' }]}>
                    <Icon name={icon} size={22} color={color} />
                </View>
                <Text style={[styles.settingTitle, { color }]}>{title}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Icon name="camera" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                        <Text style={styles.studentNumber}>{user?.studentNumber}</Text>
                        <View style={styles.departmentBadge}>
                            <Text style={styles.departmentText}>{user?.department}</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Sınıf</Text>
                        <Text style={styles.statValue}>{user?.grade}. Sınıf</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Genel Ortalama</Text>
                        <Text style={styles.statValue}>{MOCK_STATS.gpa}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Kredi</Text>
                        <Text style={styles.statValue}>{MOCK_STATS.totalCredits}</Text>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Akademik Bilgiler</Text>
                    {renderSettingItem('school-outline', 'Ders Programım', theme.colors.primary)}
                    {renderSettingItem('document-text-outline', 'Transkript Belleği', theme.colors.primary)}
                    {renderSettingItem('calendar-outline', 'Akademik Takvim', theme.colors.primary)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Uygulama Ayarları</Text>
                    {renderSettingItem('notifications-outline', 'Bildirim Ayarları')}
                    {renderSettingItem('color-palette-outline', 'Tema Tercihi')}
                    {renderSettingItem('shield-checkmark-outline', 'Güvenlik ve Gizlilik')}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Destek</Text>
                    {renderSettingItem('help-circle-outline', 'Yardım Merkezi')}
                    {renderSettingItem('information-circle-outline', 'Hakkımızda')}
                    {renderSettingItem('log-out-outline', 'Çıkış Yap', theme.colors.error, handleLogout)}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingBottom: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...theme.shadows.medium,
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 10,
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
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#EEEEEE',
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
        backgroundColor: '#FFFFFF',
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
