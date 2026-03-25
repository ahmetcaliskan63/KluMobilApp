import React, { memo } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { News } from '@/shared/types/models';
import { moderateScale } from '@/shared/utils/responsive';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme } from '@/core/theme/theme';
import { useTranslation } from 'react-i18next';

interface NewsCardProps {
    item: News;
    onPress: () => void;
}

const NewsCardComponent: React.FC<NewsCardProps> = ({ item, onPress }) => {
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);
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
        <Animated.View style={[s.container, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={s.card}
            >
                <Image source={{ uri: item.image }} style={s.image} resizeMode="cover" />
                <View style={s.overlay}>
                    <View style={s.contentBottom}>
                        <Text style={s.title} numberOfLines={2}>{item.title}</Text>
                        <View style={s.metaRow}>
                            <View style={s.metaItem}>
                                <Icon name="eye-outline" size={14} color="rgba(255,255,255,0.8)" />
                                <Text style={s.metaText}>{item.views} {t('dashboard.views')}</Text>
                            </View>
                            <View style={s.divider} />
                            <View style={s.metaItem}>
                                <Icon name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                                <Text style={s.metaText}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = (_theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        marginBottom: 25,
        borderRadius: 32,
        backgroundColor: 'transparent',
        shadowColor: isDarkMode ? '#000' : '#101D42',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: isDarkMode ? 0.4 : 0.28,
        shadowRadius: 22,
        elevation: 12,
    },
    card: {
        height: 300,
        borderRadius: 32,
        backgroundColor: '#000',
        overflow: 'hidden',
        borderWidth: isDarkMode ? 1 : 2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(24, 41, 88, 0.35)',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: isDarkMode ? 0.8 : 0.95,
    },
    overlay: {
        flex: 1,
        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.25)',
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

