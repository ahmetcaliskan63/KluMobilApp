import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

interface QuickAccessItemProps {
    id: string;
    title: string;
    icon: string;
    color: string;
    theme: Theme;
    isDarkMode: boolean;
    onPress: () => void;
}

export const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
    title,
    icon,
    color,
    theme,
    isDarkMode,
    onPress
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const s = styles(theme, isDarkMode);

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
                style={s.quickListItemWrapper}
                activeOpacity={1}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
            >
                <LinearGradient
                    colors={isDarkMode ? [theme.colors.card, theme.colors.surface] : ['#F8FAFC', '#F1F5F9']}
                    style={s.quickListItemGradient}
                >
                    <View style={s.quickListItemContent}>
                        <View style={[s.quickIconCircle, { backgroundColor: isDarkMode ? color + '25' : color + '15' }]}>
                            <Icon name={icon as any} size={20} color={color} />
                        </View>

                        <View style={s.quickListItemTextWrapper}>
                            <Text style={[s.quickListItemTitle, { color: theme.colors.text }]}>{title}</Text>
                        </View>

                        <Icon name="chevron-forward" size={14} color="#CBD5E1" />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    quickListItemWrapper: {
        width: '100%',
        borderRadius: moderateScale(22),
        backgroundColor: theme.colors.card,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.3 : 0.12,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#CBD5E1',
    },
    quickListItemGradient: {
        borderRadius: moderateScale(22),
        overflow: 'hidden',
    },
    quickListItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20, // spacing.lg is usually 20
        paddingVertical: verticalScale(12),
        gap: 20,
    },
    quickIconCircle: {
        width: moderateScale(46),
        height: moderateScale(46),
        borderRadius: moderateScale(14),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    quickListItemTextWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    quickListItemTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        letterSpacing: -0.3,
    },
});
