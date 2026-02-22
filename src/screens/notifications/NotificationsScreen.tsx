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
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, verticalScale } from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

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
    const { theme } = useAppTheme();

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
                    styles.notificationItem,
                    { backgroundColor: theme.colors.card },
                    !item.isRead && styles.unreadItem
                ]}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
                    <Icon name={iconName} size={22} color={iconColor} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
                            {item.title}
                        </Text>
                        {!item.isRead && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <Text style={[styles.time, { color: theme.colors.textSecondary }]}>
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header: Extended to top to remove white gap and integrate with Status Bar */}
            <LinearGradient
                colors={['#182958', '#101D42']}
                style={[styles.header, { paddingTop: insets.top + 10 }]}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bildirimler</Text>
                <TouchableOpacity style={styles.headerRight}>
                    <Icon name="checkmark-done" size={22} color="#FFFFFF" />
                </TouchableOpacity>
            </LinearGradient>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Icon name="notifications-off-outline" size={64} color={theme.colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                            Henüz bildiriminiz yok.
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: verticalScale(110),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 18,
        borderRadius: 24,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        // Hyper-Premium Ultra-Soft Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    unreadItem: {
        borderColor: 'rgba(239, 68, 68, 0.1)',
        backgroundColor: '#FFFBFA', // Very subtle red tint for unread
    },
    iconContainer: {
        width: 54,
        height: 54,
        borderRadius: 18,
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
        marginBottom: 2,
    },
    title: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        flex: 1,
        marginRight: 8,
        letterSpacing: -0.4,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    description: {
        fontSize: moderateScale(13),
        lineHeight: 18,
        marginBottom: 6,
        opacity: 0.8,
    },
    time: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        opacity: 0.5,
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
        fontWeight: '500',
    },
});
