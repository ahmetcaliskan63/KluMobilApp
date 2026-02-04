import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Platform,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation';
import { useAppTheme } from '../../hooks/useAppTheme';

import { MOCK_ANNOUNCEMENTS, Announcement } from '../../data/mockData';

const CATEGORIES = ['Tümü', 'Genel', 'Akademik', 'Etkinlik'];

export const AnnouncementsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);
    const [activeCategory, setActiveCategory] = useState('Tümü');

    const filteredAnnouncements = activeCategory === 'Tümü'
        ? MOCK_ANNOUNCEMENTS
        : MOCK_ANNOUNCEMENTS.filter(a => a.category === activeCategory);

    // Manual header removed to use global glassmorphic header

    const renderItem = ({ item }: { item: Announcement }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
        >
            <Card style={s.announcementCard} elevation="small">
                <View style={s.cardTop}>
                    <View style={[
                        s.categoryBadge,
                        { backgroundColor: getCategoryColor(item.category) + (isDarkMode ? '30' : '15') }
                    ]}>
                        <Text style={[s.categoryBadgeText, { color: getCategoryColor(item.category) }]}>
                            {item.category}
                        </Text>
                    </View>
                    <Text style={s.dateText}>{item.date}</Text>
                </View>
                <Text style={s.titleText}>{item.title}</Text>
                <Text style={s.snippetText} numberOfLines={2}>{item.snippet}</Text>
                <View style={s.readMore}>
                    <Text style={s.readMoreText}>Devamını Oku</Text>
                    <Icon name="arrow-forward" size={16} color={theme.colors.primary} />
                </View>
            </Card>
        </TouchableOpacity>
    );

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Akademik': return theme.colors.primary;
            case 'Etkinlik': return theme.colors.warning;
            default: return theme.colors.info;
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#101D42" />

            {/* Category Filter */}
            <View style={s.categoryFilterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categoryContainer}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                s.categoryChip,
                                activeCategory === cat && s.categoryChipActive
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[
                                s.categoryText,
                                activeCategory === cat && s.categoryTextActive
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredAnnouncements}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={s.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={s.emptyContainer}>
                        <Icon name="notifications-off-outline" size={64} color={theme.colors.textLight} />
                        <Text style={s.emptyText}>Bu kategoride duyuru bulunamadı.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    categoryFilterWrapper: {
        paddingVertical: 12,
        backgroundColor: theme.colors.surface,
    },
    categoryContainer: {
        paddingHorizontal: theme.spacing.md,
        flexDirection: 'row',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 41, 88, 0.05)',
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 41, 88, 0.1)',
    },
    categoryChipActive: {
        backgroundColor: '#101D42',
        borderColor: '#101D42',
    },
    categoryText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 13,
    },
    categoryTextActive: {
        color: theme.colors.primary,
    },
    listContent: {
        padding: theme.spacing.md,
        paddingTop: theme.spacing.lg,
    },
    announcementCard: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: 20,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryBadgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        color: theme.colors.textLight,
    },
    titleText: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 8,
        lineHeight: 22,
    },
    snippetText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        lineHeight: 20,
        marginBottom: 12,
    },
    readMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
    },
    readMoreText: {
        fontSize: 13,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
        opacity: 0.5,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
});
