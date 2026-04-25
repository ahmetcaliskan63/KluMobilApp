import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    SharedValue
} from 'react-native-reanimated';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { DailyMenu as MenuItem } from '@/shared/types/models';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MealCardProps {
    item: MenuItem;
    index: number;
    isItemToday: boolean;
    onPrevious: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
    t: any;
    theme: Theme;
    scrollX: SharedValue<number>;
}

const MEAL_ICONS = ['restaurant', 'pizza', 'nutrition', 'ice-cream'];

export const MealCard: React.FC<MealCardProps> = ({
    item,
    index,
    isItemToday,
    onPrevious,
    onNext,
    isFirst,
    isLast,
    t,
    scrollX
}) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
        ];

        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <Animated.View style={[styles.mealCardContainer, animatedStyle]}>
            <LinearGradient
                colors={isItemToday ? ['#182958', '#101D42', '#080F26'] : ['#2A458F', '#1F346E', '#162857']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={isItemToday ? styles.todayCard : styles.otherDayCard}
            >
                {/* Decorative Glow Circles */}
                <View style={[styles.glowCircle, { top: -50, right: -50, backgroundColor: isItemToday ? '#3B82F6' : '#60A5FA', opacity: isItemToday ? 0.2 : 0.15 }]} />
                <View style={[styles.glowCircle, { bottom: -20, left: -40, backgroundColor: isItemToday ? '#6366F1' : '#818CF8', opacity: isItemToday ? 0.15 : 0.1 }]} />

                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.dayTitle}>{item.day}</Text>
                        <Text style={styles.dateSub}>{item.date}</Text>
                    </View>
                    {isItemToday && (
                        <View style={styles.premiumBadge}>
                            <Icon name="sparkles" size={14} color="#FFD700" />
                            <Text style={styles.premiumBadgeText}>{t('cafeteria.todaysMenu')}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.divider} />

                <View style={styles.menuList}>
                    {item.items.map((menuItem, idx) => (
                        <View key={idx} style={styles.menuPill}>
                            <View style={styles.iconContainer}>
                                <Icon
                                    name={((MEAL_ICONS[idx % MEAL_ICONS.length] || 'restaurant-outline') + '-outline') as any}
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </View>
                            <Text style={styles.itemText}>{menuItem}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.navButtons}>
                        <TouchableOpacity
                            disabled={isFirst}
                            onPress={onPrevious}
                            style={[styles.navBtn, isFirst && styles.navBtnDisabled]}
                        >
                            <Icon
                                name="chevron-back"
                                size={22}
                                color={isFirst ? 'rgba(255,255,255,0.2)' : '#FFFFFF'}
                            />
                            <Text style={[styles.navBtnText, isFirst && { opacity: 0.3 }]}>{t('common.previous')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={isLast}
                            onPress={onNext}
                            style={[styles.navBtn, isLast && styles.navBtnDisabled]}
                        >
                            <Text style={[styles.navBtnText, isLast && { opacity: 0.3 }]}>{t('common.next')}</Text>
                            <Icon
                                name="chevron-forward"
                                size={22}
                                color={isLast ? 'rgba(255,255,255,0.2)' : '#FFFFFF'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    mealCardContainer: {
        width: SCREEN_WIDTH,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    todayCard: {
        borderRadius: moderateScale(40),
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
        height: verticalScale(500),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.3,
                shadowRadius: 30,
            },
            android: {
                elevation: 12,
            }
        }),
    },
    otherDayCard: {
        borderRadius: moderateScale(40),
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
        height: verticalScale(500),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.9,
    },
    glowCircle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        zIndex: -1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginBottom: 15,
    },
    dayTitle: {
        fontSize: moderateScale(28),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    dateSub: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '600',
        marginTop: 2,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 14,
        gap: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    premiumBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    menuList: {
        gap: 12,
    },
    menuPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 22,
        padding: 12,
        paddingRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 15,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
    },
    cardFooter: {
        marginTop: 'auto',
        paddingTop: 20,
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    navBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 18,
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    navBtnDisabled: {
        opacity: 0.4,
    },
    navBtnText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
    },
});
