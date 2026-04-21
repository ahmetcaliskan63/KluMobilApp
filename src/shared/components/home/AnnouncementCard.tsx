import React, { memo } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme, spacing } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Announcement } from '@/shared/types/models';

interface AnnouncementCardProps {
    item: Announcement;
    onPress: () => void;
}

const AnnouncementCardComponent: React.FC<AnnouncementCardProps> = ({ item, onPress }) => {
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);
    const scale = React.useRef(new Animated.Value(1)).current;
    const opacity = React.useRef(new Animated.Value(1)).current;

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

    const isAcademic = item.category.toUpperCase() === 'AKADEMİK';
    const categoryColor = isAcademic ? (isDarkMode ? '#0A84FF' : '#1976D2') : theme.colors.primary;

    return (
        <Animated.View style={[s.container, { transform: [{ scale }], opacity }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={s.card}
            >

                <View style={[s.accent, { backgroundColor: categoryColor }]} />

                <View style={s.inner}>
                    <View style={s.topRow}>
                        <View style={[s.tag, { backgroundColor: `${categoryColor}20` }]}>
                            <View style={[s.dot, { backgroundColor: categoryColor }]} />
                            <Text style={[s.categoryText, { color: categoryColor }]}>{item.category}</Text>
                        </View>
                        <Text style={s.dateText}>{item.date}</Text>
                    </View>

                    <Text style={s.title} numberOfLines={2}>{item.title}</Text>

                    <View style={s.bottomRow}>
                        <View style={s.metaItem}>
                            <Icon name="eye-outline" size={12} color={isDarkMode ? '#94A3B8' : '#8E8E93'} />
                            <Text style={s.viewsText}>{item.views}</Text>
                        </View>
                        <Icon name="chevron-forward-circle" size={20} color={categoryColor} />
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 28,
        backgroundColor: 'transparent',
        shadowColor: isDarkMode ? '#000' : '#101D42',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: isDarkMode ? 0.3 : 0.18,
        shadowRadius: 22,
        elevation: 10,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: isDarkMode ? theme.colors.border : 'rgba(24, 41, 88, 0.15)',
    },
    accent: {
        position: 'absolute',
        top: 20,
        left: 0,
        bottom: 20,
        width: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    inner: {
        padding: spacing.md,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginRight: 6,
    },
    categoryText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    dateText: {
        fontSize: 10,
        color: isDarkMode ? '#94A3B8' : '#8E8E93',
        fontWeight: '700',
    },
    title: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: 22,
        marginBottom: 16,
        letterSpacing: -0.3,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        paddingTop: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    viewsText: {
        fontSize: 11,
        color: isDarkMode ? '#94A3B8' : '#8E8E93',
        fontWeight: '700',
    },
});

export const AnnouncementCard = memo(AnnouncementCardComponent);

