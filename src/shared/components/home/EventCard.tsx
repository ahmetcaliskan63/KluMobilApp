import React, { memo } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet, Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Event as EventType } from '@/shared/types/models';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface EventCardProps {
    item: EventType;
    theme: Theme;
    onPress: () => void;
}

const EventCardComponent: React.FC<EventCardProps> = ({ item, theme, onPress }) => {
    const scale = React.useRef(new Animated.Value(1)).current;
    const handlePressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, tension: 100, friction: 10 }).start();
    const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 100, friction: 10 }).start();

    const [day, monthName, year] = item.date.split(' ');

    const turkishMonths: { [key: string]: number } = {
        'Ocak': 0, 'ubat': 1, 'Mart': 2, 'Nisan': 3, 'Mays': 4, 'Haziran': 5,
        'Temmuz': 6, 'Austos': 7, 'Eyll': 8, 'Ekim': 9, 'Kasm': 10, 'Aralk': 11
    };

    const eventDate = new Date(
        parseInt(year),
        turkishMonths[monthName] || 0,
        parseInt(day)
    );

    const now = new Date();
    // Normalize dates to midnight for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

    const isFuture = eventDay > today;
    const isPast = eventDay < today;
    const isToday = eventDay.getTime() === today.getTime();

    // Use green for future, red for past or today (based on user request: "stndeki tarih kart yapldysa veya gemi bir tarihteyse krmz olsun")
    const pillColor = isFuture ? '#10B981' : '#EF4444';

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={styles.card}
            >
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.overlay} />

                <View style={[styles.datePill, { backgroundColor: pillColor }]}>
                    <Text style={[styles.dayText, { color: '#FFFFFF' }]}>{day}</Text>
                    <Text style={[styles.monthText, { color: '#FFFFFF' }]}>{monthName?.substring(0, 3)}</Text>
                </View>

                <View style={styles.infoBlock}>
                    <View style={styles.glassBg} />
                    <View style={styles.infoInner}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Icon name="time-outline" size={14} color="#FFFFFF" style={{ opacity: 0.9 }} />
                                <Text style={styles.metaText}>{item.time}</Text>
                            </View>
                            <View style={styles.metaDivider} />
                            <View style={styles.metaItem}>
                                <Icon name="location-outline" size={14} color="#FFFFFF" style={{ opacity: 0.9 }} />
                                <Text style={styles.metaText}>Kamps</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actionIcon}>
                        <Icon name="arrow-forward" size={18} color="#FFFFFF" />
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
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.2,
        shadowRadius: 22,
        elevation: 12,
    },
    card: {
        height: 200,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#101D42',
        borderWidth: 2,
        borderColor: 'rgba(24, 41, 88, 0.5)',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    datePill: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        borderWidth: 1.5,
        borderColor: '#182958',
        // Simple shadow for pill
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dayText: {
        fontSize: moderateScale(16),
        fontWeight: '900',
        color: '#101D42',
        lineHeight: 20,
    },
    monthText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        color: '#101D42',
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
        backgroundColor: 'rgba(16, 29, 66, 0.85)',
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

