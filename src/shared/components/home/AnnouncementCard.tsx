import React, { memo } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme, spacing, borderRadius, shadows } from '@/app/theme/theme';
import { Announcement } from '@/shared/types/models';
import LinearGradient from 'react-native-linear-gradient';

interface AnnouncementCardProps {
    item: Announcement;
    theme: Theme;
    onPress: () => void;
}

const AnnouncementCardComponent: React.FC<AnnouncementCardProps> = ({ item, theme, onPress }) => {
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
    const categoryColor = isAcademic ? '#0A84FF' : '#182958';

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }], opacity }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={styles.card}
            >
                <View style={styles.gradientBg} />
                <View style={[styles.accent, { backgroundColor: categoryColor }]} />

                <View style={styles.inner}>
                    <View style={styles.topRow}>
                        <View style={[styles.tag, { backgroundColor: `${categoryColor}12` }]}>
                            <View style={[styles.dot, { backgroundColor: categoryColor }]} />
                            <Text style={[styles.categoryText, { color: categoryColor }]}>{item.category}</Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>

                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

                    <View style={styles.bottomRow}>
                        <View style={styles.metaItem}>
                            <Icon name="eye-outline" size={12} color="#8E8E93" />
                            <Text style={styles.viewsText}>{item.views}</Text>
                        </View>
                        <Icon name="chevron-forward-circle" size={20} color={categoryColor} />
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 28,
        backgroundColor: 'transparent',
        shadowColor: '#101D42',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.18,
        shadowRadius: 22,
        elevation: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(24, 41, 88, 0.3)',
    },
    gradientBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFF',
        opacity: 0.98,
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
        padding: 20,
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
        color: '#8E8E93',
        fontWeight: '700',
    },
    title: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1C1C1E',
        lineHeight: 22,
        marginBottom: 16,
        letterSpacing: -0.3,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.02)',
        paddingTop: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    viewsText: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '700',
    },
});

export const AnnouncementCard = memo(AnnouncementCardComponent);

