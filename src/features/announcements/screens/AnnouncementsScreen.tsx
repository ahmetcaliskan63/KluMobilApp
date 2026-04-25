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
    Pressable,
    Animated,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme } from '@/core/theme/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '@/shared/types/navigation';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { MOCK_ANNOUNCEMENTS, Announcement } from '@/shared/services/mockData';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { useTranslation } from 'react-i18next';

export const AnnouncementsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);

    const CATEGORIES = [
        { id: 'all', label: t('common.seeAll') },
        { id: 'general', label: t('dashboard.categories.general') },
        { id: 'academic', label: t('dashboard.categories.academic') },
        { id: 'event', label: t('dashboard.categories.social') }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const announcements = MOCK_ANNOUNCEMENTS(t);

    // Dynamic filtering based on translated labels found in mock data
    const filteredAnnouncements = activeCategory === 'all'
        ? announcements
        : announcements.filter(a => {
            const categoryLabel = activeCategory === 'general' ? t('dashboard.categories.general') :
                                activeCategory === 'academic' ? t('dashboard.categories.academic') :
                                activeCategory === 'event' ? t('dashboard.categories.social') : '';
            return a.category === categoryLabel;
        });

    const getCategoryColor = (category: string) => {
        if (category === t('dashboard.categories.academic')) return isDarkMode ? '#0A84FF' : '#182958';
        if (category === t('dashboard.categories.social')) return '#FF9500';
        return isDarkMode ? theme.colors.primary : '#101D42';
    };

    const renderItem = ({ item, index }: { item: Announcement; index: number }) => {
        const scale = React.useRef(new Animated.Value(1)).current;
        const opacity = React.useRef(new Animated.Value(0)).current;

        React.useEffect(() => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        const handlePressIn = () => {
            Animated.parallel([
                Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, tension: 150, friction: 12 }),
                Animated.timing(opacity, { toValue: 0.85, duration: 150, useNativeDriver: true })
            ]).start();
        };
        const handlePressOut = () => {
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 150, friction: 12 }),
                Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true })
            ]).start();
        };

        const categoryColor = getCategoryColor(item.category);

        return (
            <Animated.View style={{ opacity, transform: [{ scale }], marginBottom: 20 }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
                    style={s.crystalCard}
                >
                    <View style={s.crystalGradientLayer} />
                    <View style={[s.crystalAccentBorder, { backgroundColor: categoryColor }]} />

                    <View style={s.cardInner}>
                        <View style={s.cardMainHeader}>
                            <View style={[s.glassCategory, { backgroundColor: `${categoryColor}15` }]}>
                                <View style={[s.categoryDot, { backgroundColor: categoryColor }]} />
                                <Text style={[s.glassCategoryText, { color: categoryColor }]}>
                                    {item.category}
                                </Text>
                            </View>
                            <View style={s.datePill}>
                                <Icon name="time-outline" size={12} color={theme.colors.textSecondary} />
                                <Text style={s.datePillText}>{item.date}</Text>
                            </View>
                        </View>

                        <Text style={s.crystalTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={s.crystalSnippet} numberOfLines={2}>{item.snippet}</Text>

                        <View style={s.crystalFooter}>
                            <View style={s.statBox}>
                                <View style={s.statCircle}>
                                    <Icon name="eye-outline" size={12} color={theme.colors.textSecondary} />
                                </View>
                                <Text style={s.statLabel}>{item.views}</Text>
                            </View>

                            <View style={[s.actionPill, { backgroundColor: `${categoryColor}10` }]}>
                                <Text style={[s.actionPillText, { color: categoryColor }]}>{t('common.details')}</Text>
                                <Icon name="chevron-forward-circle-outline" size={18} color={categoryColor} />
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" translucent={false} />

            {/* Category Filter */}
            <View style={s.categoryFilterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categoryContainer}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                s.categoryChip,
                                activeCategory === cat.id && s.categoryChipActive
                            ]}
                            onPress={() => setActiveCategory(cat.id)}
                        >
                            <Text style={[
                                s.categoryText,
                                activeCategory === cat.id && s.categoryTextActive
                            ]}>
                                {cat.label}
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
                        <Icon name="notifications-off-outline" size={64} color={theme.colors.border} />
                        <Text style={s.emptyText}>{t('common.noData')}</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    categoryFilterWrapper: {
        paddingVertical: verticalScale(14),
        backgroundColor: theme.colors.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    categoryContainer: {
        paddingHorizontal: scale(20),
        gap: scale(10),
    },
    categoryChip: {
        paddingHorizontal: scale(18),
        paddingVertical: verticalScale(9),
        borderRadius: moderateScale(22),
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F2F2F7',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: theme.colors.primary,
        ...theme.shadows.small,
    },
    categoryText: {
        color: theme.colors.textSecondary,
        fontWeight: '700',
        fontSize: moderateScale(13),
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    listContent: {
        padding: scale(20),
        paddingBottom: verticalScale(120),
    },
    crystalCard: {
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(32),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: verticalScale(10) },
                shadowOpacity: isDarkMode ? 0.3 : 0.08,
                shadowRadius: moderateScale(20),
            },
            android: {
                elevation: 6,
            },
        }),
    },
    crystalGradientLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.card,
        opacity: 0.95,
        borderRadius: moderateScale(32),
    },
    crystalAccentBorder: {
        position: 'absolute',
        top: verticalScale(24),
        left: 0,
        bottom: verticalScale(24),
        width: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    cardInner: {
        padding: scale(24),
    },
    cardMainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    glassCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(14),
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    categoryDot: {
        width: scale(6),
        height: scale(6),
        borderRadius: scale(3),
        marginRight: scale(8),
    },
    glassCategoryText: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F2F2F7',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(10),
        gap: scale(4),
    },
    datePillText: {
        fontSize: moderateScale(10),
        color: theme.colors.textSecondary,
        fontWeight: '700',
    },
    crystalTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: theme.colors.text,
        lineHeight: moderateScale(24),
        marginBottom: verticalScale(10),
        letterSpacing: -0.5,
    },
    crystalSnippet: {
        fontSize: moderateScale(14),
        color: theme.colors.textSecondary,
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(20),
        fontWeight: '500',
    },
    crystalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: verticalScale(16),
    },
    statBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },
    statCircle: {
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
        fontWeight: '700',
    },
    actionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(16),
        gap: scale(8),
    },
    actionPillText: {
        fontSize: moderateScale(13),
        fontWeight: '900',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: verticalScale(100),
        opacity: 0.5,
    },
    emptyText: {
        marginTop: verticalScale(16),
        fontSize: moderateScale(16),
        color: theme.colors.textSecondary,
        fontWeight: '700',
    },
});
