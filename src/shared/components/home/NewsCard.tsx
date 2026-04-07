import React, { memo } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { News } from '@/shared/types/models';
import { Theme } from '@/app/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface NewsCardProps {
    item: News;
    theme: Theme;
    onPress: () => void;
}

const NewsCardComponent: React.FC<NewsCardProps> = ({ item, theme, onPress }) => {
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.98,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={styles.card}
            >
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.overlay}>
                    <View style={styles.contentBottom}>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Icon name="eye-outline" size={14} color="rgba(255,255,255,0.8)" />
                                <Text style={styles.metaText}>{item.views}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.metaItem}>
                                <Icon name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                                <Text style={styles.metaText}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
        borderRadius: 32,
        backgroundColor: 'transparent',
        // Shadow wrapper to prevent clipping
        shadowColor: '#101D42',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.28,
        shadowRadius: 22,
        elevation: 12,
    },
    card: {
        height: 300,
        borderRadius: 32,
        backgroundColor: '#000',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(24, 41, 88, 0.35)',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.95,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-end',
        padding: 24,
    },
    contentBottom: {
        gap: 12,
    },
    title: {
        fontSize: moderateScale(18),
        color: '#FFFFFF',
        fontWeight: '800',
        lineHeight: 26,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
});

export const NewsCard = memo(NewsCardComponent);

