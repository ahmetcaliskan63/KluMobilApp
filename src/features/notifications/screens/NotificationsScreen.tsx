import React, { useMemo } from 'react';
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_NOTIFICATIONS } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';
import { styles } from './NotificationsScreen.styles';
import { verticalScale } from '@/shared/utils/responsive';

export const NotificationsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, insets, isDarkMode);

    const rawNotifications = useMemo(() => MOCK_NOTIFICATIONS(t), [t]);

    const sections = useMemo(() => {
        const today: any[] = [];
        const yesterday: any[] = [];
        const older: any[] = [];

        rawNotifications.forEach(n => {
            if (n.date === '2026-04-24') today.push(n);
            else if (n.date === '2026-04-23') yesterday.push(n);
            else older.push(n);
        });

        const result = [];
        if (today.length > 0) result.push({ title: t('notifications.sections.today'), data: today });
        if (yesterday.length > 0) result.push({ title: t('notifications.sections.yesterday'), data: yesterday });
        if (older.length > 0) result.push({ title: t('notifications.sections.older'), data: older });

        return result;
    }, [rawNotifications, t]);

    const getIconConfig = (type: string) => {
        switch (type) {
            case 'exam': return { name: 'calendar', color: '#F87171' };
            case 'cafeteria': return { name: 'restaurant', color: '#34D399' };
            case 'library': return { name: 'book', color: '#818CF8' };
            case 'event': return { name: 'megaphone', color: '#FBBF24' };
            case 'announcement': return { name: 'information-circle', color: '#60A5FA' };
            default: return { name: 'notifications', color: '#94A3B8' };
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const iconConfig = getIconConfig(item.type);

        return (
            <TouchableOpacity
                style={[s.notificationCard, !item.isRead && s.unreadCard]}
                activeOpacity={0.8}
            >
                <Icon 
                    name={iconConfig.name as any} 
                    size={26} 
                    color={iconConfig.color} 
                    style={{ marginRight: 15, marginTop: 4 }} 
                />

                <View style={s.cardContent}>
                    <View style={s.cardHeader}>
                        <Text style={s.notifTitle} numberOfLines={1}>{item.title}</Text>
                        {!item.isRead && <View style={s.unreadDot} />}
                    </View>
                    
                    <Text style={s.notifDesc} numberOfLines={2}>{item.description}</Text>
                    
                    <View style={s.cardFooter}>
                        <View style={s.timeContainer}>
                            <Icon name="time-outline" size={12} color={theme.colors.textSecondary} style={{ opacity: 0.5 }} />
                            <Text style={s.notifTime}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={{ height: verticalScale(100) + insets.top }}>
                <LinearGradient
                    colors={isDarkMode ? ['#1E293B', '#0F172A'] : ['#182958', '#2A458F']}
                    style={s.headerGradient}
                >
                    <View style={s.headerContent}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={s.backButton}
                        >
                            <Icon name="chevron-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={s.headerTitle}>{t('notifications.title')}</Text>
                        <TouchableOpacity style={s.headerRight}>
                            <Icon name="checkmark-done" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

            <SectionList
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitle}>{title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={s.listContent}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={s.emptyState}>
                        <View style={s.emptyImageContainer}>
                            <Icon name="notifications-off-outline" size={60} color={isDarkMode ? '#3B82F6' : '#60A5FA'} />
                        </View>
                        <Text style={s.emptyTitle}>{t('notifications.empty.title')}</Text>
                        <Text style={s.emptySubtitle}>{t('notifications.empty.subtitle')}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default NotificationsScreen;
