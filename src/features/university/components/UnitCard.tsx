import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';
import { Unit } from '@/shared/types/models';

interface UnitCardProps {
    item: Unit;
    index: number;
    onPress: () => void;
    theme: Theme;
    isDarkMode: boolean;
    categoryStyle: { color: string; icon: any; bg: string };
}

export const UnitCard: React.FC<UnitCardProps> = ({ item, index, onPress, theme, isDarkMode, categoryStyle }) => {
    const translateY = useRef(new Animated.Value(20)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 400,
                delay: Math.min(index * 30, 600), // Cap the delay for long lists
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                delay: Math.min(index * 30, 600),
                useNativeDriver: true,
            })
        ]).start();
    }, [index, translateY, opacity]);

    return (
        <Animated.View style={{ transform: [{ translateY }], opacity }}>
            <TouchableOpacity
                style={styles(theme, isDarkMode).cardContainer}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <View style={[styles(theme, isDarkMode).typeIndicator, { backgroundColor: categoryStyle.color }]} />
                
                <View style={styles(theme, isDarkMode).cardInner}>
                    <View style={[styles(theme, isDarkMode).iconBox, { backgroundColor: isDarkMode ? categoryStyle.color + '15' : categoryStyle.bg }]}>
                        <Icon name={categoryStyle.icon} size={20} color={categoryStyle.color} />
                    </View>
                    
                    <View style={styles(theme, isDarkMode).textContainer}>
                        <Text style={styles(theme, isDarkMode).unitNameText} numberOfLines={2}>{item.name}</Text>
                    </View>

                    <View style={styles(theme, isDarkMode).chevronBox}>
                        <Icon name="chevron-forward" size={16} color={isDarkMode ? theme.colors.textSecondary : '#94A3B8'} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        marginBottom: moderateScale(10),
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.2 : 0.08,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0', 
    },
    typeIndicator: {
        width: 4,
        height: '100%',
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    iconBox: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    unitNameText: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: 18,
    },
    chevronBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
