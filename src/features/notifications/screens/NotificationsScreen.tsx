import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Sınav Programı Açıklandı',
        description: '2024-2025 Güz Dönemi Vize sınav programı yayınlanmıştır. Kontrol etmeyi unutmayın.',
        time: '2 saat önce',
        type: 'exam',
        isRead: false,
    },
    {
        id: '2',
        title: 'Yemek Menüsü Güncellendi',
        description: 'Bugünkü öğle yemeği menüsü: Mercimek Çorbası, Orman Kebabı, Pilav ve Meyve.',
        time: '5 saat önce',
        type: 'cafeteria',
        isRead: false,
    },
    {
        id: '3',
        title: 'Kütüphane Duyurusu',
        description: 'Sınav haftası nedeniyle kütüphanemiz 7/24 hizmet verecektir.',
        time: '1 gün önce',
        type: 'library',
        isRead: true,
    },
];

export const NotificationsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => {
        let iconName = 'notifications';
        let iconColor = '#3B82F6';

        switch (item.type) {
            case 'exam': iconName = 'calendar'; iconColor = '#EF4444'; break;
            case 'cafeteria': iconName = 'restaurant'; iconColor = '#10B981'; break;
            case 'library': iconName = 'book'; iconColor = '#6366F1'; break;
        }

        return (
            <TouchableOpacity
                style={[
                    s.notificationItem,
                    !item.isRead && s.unreadItem
                ]}
                activeOpacity={0.7}
            >
                <View style={[s.iconContainer, { backgroundColor: isDarkMode ? iconColor + '20' : iconColor + '15' }]}>
                    <Icon name={iconName as any} size={22} color={iconColor} />
                </View>
                <View style={s.contentContainer}>
                    <View style={s.headerRow}>
                        <Text style={s.title} numberOfLines={1}>
                            {item.title}
                        </Text>
                        {!item.isRead && <View style={s.unreadDot} />}
                    </View>
                    <Text style={s.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <Text style={s.time}>
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={s.headerContainer}>
                <LinearGradient
                    colors={isDarkMode ? ['#0F172A', '#020617'] : ['#182958', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[s.header, { paddingTop: insets.top + 10 }]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backButton}
                    >
                        <Icon name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Bildirimler</Text>
                    <TouchableOpacity style={s.headerRight}>
                        <Icon name="checkmark-done" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[s.listContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={s.emptyContainer}>
                        <Icon name="notifications-off-outline" size={64} color={theme.colors.textSecondary} />
                        <Text style={s.emptyText}>
                            Henüz bildiriminiz yok.
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = (theme: any, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        height: verticalScale(110),
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
        marginTop: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 18,
        borderRadius: 24,
        marginBottom: 16,
        backgroundColor: theme.colors.card,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.3 : 0.08,
        shadowRadius: 12,
        borderWidth: 1.2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
    },
    unreadItem: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : '#FFFBFA',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#FEE2E2',
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: theme.colors.text,
        flex: 1,
        marginRight: 8,
        letterSpacing: -0.4,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 4,
    },
    description: {
        fontSize: moderateScale(13),
        lineHeight: 18,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        opacity: 0.9,
    },
    time: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: theme.colors.textSecondary,
        opacity: 0.6,
        letterSpacing: 0.2,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
});
