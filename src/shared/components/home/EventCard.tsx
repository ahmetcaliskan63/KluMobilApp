import React, { memo } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Event as EventType } from '@/shared/types/models';
import { moderateScale } from '@/shared/utils/responsive';
import { Theme } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useTranslation } from 'react-i18next';

interface EventCardProps {
    item: EventType;
    onPress: () => void;
}

const EventCardComponent: React.FC<EventCardProps> = ({ item, onPress }) => {
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, tension: 100, friction: 10 }).start();
    const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 100, friction: 10 }).start();

    // ISO Date parsing (YYYY-MM-DD)
    const dateParts = item.date.split('-');
    const month = dateParts[1];
    const day = dateParts[2];

    const monthKeys: { [key: string]: string } = {
        '01': 'january', '02': 'february', '03': 'march', '04': 'april',
        '05': 'may', '06': 'june', '07': 'july', '08': 'august',
        '09': 'september', '10': 'october', '11': 'november', '12': 'december'
    };

    const getMonthName = () => {
        const key = monthKeys[month];
        if (!key) return month;
        return t(`common.months.${key}`).substring(0, 3).toUpperCase();
    };

    const isFuture = true; 
    const pillColor = isFuture ? '#10B981' : '#EF4444';

    return (
        <Animated.View style={[s.container, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={s.card}
            >
                <Image source={{ uri: item.image }} style={s.image} resizeMode="cover" />
                <View style={s.overlay} />

                <View style={[s.datePill, { backgroundColor: isDarkMode ? theme.colors.card : '#FFFFFF' }]}>
                    <Text style={[s.dayText, { color: pillColor }]}>{day}</Text>
                    <Text style={[s.monthText, { color: pillColor }]}>{getMonthName()}</Text>
                </View>

                <View style={s.infoBlock}>
                    <View style={s.glassBg} />
                    <View style={s.infoInner}>
                        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
                        <View style={s.metaRow}>
                            <View style={s.metaItem}>
                                <Icon name="time-outline" size={14} color="#FFFFFF" style={{ opacity: 0.9 }} />
                                <Text style={s.metaText}>{item.time}</Text>
                            </View>
                            <View style={s.metaDivider} />
                            <View style={s.metaItem}>
                                <Icon name="location-outline" size={14} color="#FFFFFF" style={{ opacity: 0.9 }} />
                                <Text style={s.metaText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={s.actionIcon}>
                        <Icon name="arrow-forward" size={18} color="#FFFFFF" />
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
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: isDarkMode ? 0.35 : 0.2,
        shadowRadius: 22,
        elevation: 12,
    },
    card: {
        height: 200,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: theme.colors.card,
        borderWidth: 1.5,
        borderColor: isDarkMode ? theme.colors.border : 'rgba(24, 41, 88, 0.25)',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.25)',
    },
    datePill: {
        position: 'absolute',
        top: 16,
        left: 16,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 55,
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(24, 41, 88, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dayText: {
        fontSize: moderateScale(16),
        fontWeight: '900',
        lineHeight: 20,
    },
    monthText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        textTransform: 'uppercase',
        opacity: 0.7,
        letterSpacing: 0.5,
    },
    infoBlock: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    glassBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(16, 29, 66, 0.85)',
    },
    infoInner: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: moderateScale(17),
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
        letterSpacing: -0.3,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: moderateScale(12),
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '600',
    },
    metaDivider: {
        width: 1,
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    actionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
});

export const EventCard = memo(EventCardComponent);
