import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme } from '../../config/theme';

import { MOCK_ANNOUNCEMENTS, Announcement } from '../../data/mockData';

const CATEGORIES = ['Tümü', 'Genel', 'Akademik', 'Etkinlik'];

export const AnnouncementsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [activeCategory, setActiveCategory] = useState('Tümü');

    const filteredAnnouncements = activeCategory === 'Tümü'
        ? MOCK_ANNOUNCEMENTS
        : MOCK_ANNOUNCEMENTS.filter(a => a.category === activeCategory);

    const renderHeader = () => (
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
            <Text style={styles.headerTitle}>Duyurular</Text>
            <View style={styles.categoryContainer}>
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryChip,
                            activeCategory === cat && styles.categoryChipActive
                        ]}
                        onPress={() => setActiveCategory(cat)}
                    >
                        <Text style={[
                            styles.categoryText,
                            activeCategory === cat && styles.categoryTextActive
                        ]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderItem = ({ item }: { item: Announcement }) => (
        <Card style={styles.announcementCard} elevation="small">
            <View style={styles.cardTop}>
                <View style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(item.category) + '15' }
                ]}>
                    <Text style={[styles.categoryBadgeText, { color: getCategoryColor(item.category) }]}>
                        {item.category}
                    </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.snippetText} numberOfLines={2}>{item.snippet}</Text>
            <TouchableOpacity style={styles.readMore}>
                <Text style={styles.readMoreText}>Devamını Oku</Text>
                <Icon name="arrow-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
        </Card>
    );

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Akademik': return theme.colors.primary;
            case 'Etkinlik': return theme.colors.warning;
            default: return theme.colors.info;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
            {renderHeader()}
            <FlatList
                data={filteredAnnouncements}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="notifications-off-outline" size={64} color={theme.colors.textLight} />
                        <Text style={styles.emptyText}>Bu kategoride duyuru bulunamadı.</Text>
                    </View>
                }
            />
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
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: theme.spacing.md,
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    categoryChipActive: {
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#FFFFFF',
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
