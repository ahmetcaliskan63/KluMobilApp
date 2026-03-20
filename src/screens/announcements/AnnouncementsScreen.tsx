import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Pressable,
    Animated,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useFetch } from '../../hooks/useFetch';
import { Announcement } from '../../types/models';
import { Theme } from '../../config/theme';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';

const CATEGORIES = ['Tümü', 'Genel', 'Akademik', 'Etkinlik'];

export const AnnouncementsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
    const { theme, isDarkMode } = useAppTheme();
    const { data: announcements, loading, error } = useFetch<Announcement[]>('/announcements');
    const s = styles(theme, isDarkMode);
    const [activeCategory, setActiveCategory] = useState('Tümü');

    if (loading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text }}>Duyurular yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Hata: {error}</Text>
            </View>
        );
    }

    const filteredAnnouncements = activeCategory === 'Tümü'
        ? (announcements || [])
        : (announcements || []).filter(a => a.category === activeCategory);

    // Manual header removed to use global glassmorphic header

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Akademik': return '#0A84FF'; // iOS Blue
            case 'Etkinlik': return '#FF9500'; // iOS Orange
            default: return '#101D42'; // KLU Blue
        }
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
                                <Text style={[s.glassCategoryText, { color: categoryColor }]}>{item.category}</Text>
                            </View>
                            <View style={s.datePill}>
                                <Icon name="time-outline" size={12} color="#8E8E93" />
                                <Text style={s.datePillText}>{item.date}</Text>
                            </View>
                        </View>

                        <Text style={s.crystalTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={s.crystalSnippet} numberOfLines={2}>{item.snippet}</Text>

                        <View style={s.crystalFooter}>
                            <View style={s.statBox}>
                                <View style={s.statCircle}>
                                    <Icon name="eye-outline" size={12} color="#8E8E93" />
                                </View>
                                <Text style={s.statLabel}>{item.views}</Text>
                            </View>

                            <View style={[s.actionPill, { backgroundColor: `${categoryColor}10` }]}>
                                <Text style={[s.actionPillText, { color: categoryColor }]}>İncele</Text>
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
        backgroundColor: '#F2F2F7',
    },
    categoryFilterWrapper: {
        paddingVertical: verticalScale(14),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)',
    },
    categoryContainer: {
        paddingHorizontal: scale(20),
        gap: scale(10),
    },
    categoryChip: {
        paddingHorizontal: scale(18),
        paddingVertical: verticalScale(9),
        borderRadius: moderateScale(22),
        backgroundColor: '#F2F2F7',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: '#101D42',
        ...theme.shadows.small,
    },
    categoryText: {
        color: '#8E8E93',
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
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(32),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        ...Platform.select({
            ios: {
                shadowColor: '#101D42',
                shadowOffset: { width: 0, height: verticalScale(10) },
                shadowOpacity: 0.08,
                shadowRadius: moderateScale(20),
            },
            android: {
                elevation: 6,
            },
        }),
    },
    crystalGradientLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFF',
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
        borderColor: 'rgba(255,255,255,0.3)',
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
        backgroundColor: '#F2F2F7',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(10),
        gap: scale(4),
    },
    datePillText: {
        fontSize: moderateScale(10),
        color: '#8E8E93',
        fontWeight: '700',
    },
    crystalTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#1C1C1E',
        lineHeight: moderateScale(24),
        marginBottom: verticalScale(10),
        letterSpacing: -0.5,
    },
    crystalSnippet: {
        fontSize: moderateScale(14),
        color: '#636366',
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(20),
        fontWeight: '500',
    },
    crystalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.03)',
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
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: moderateScale(12),
        color: '#8E8E93',
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
        color: '#8E8E93',
        fontWeight: '700',
    },
});
