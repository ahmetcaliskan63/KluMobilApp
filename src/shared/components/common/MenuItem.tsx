import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ColorValue } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme } from '@/core/theme/theme';
import { moderateScale, scale } from '@/shared/utils/responsive';

interface MenuItemProps {
    icon: string;
    title: string;
    subtitle?: string;
    color?: ColorValue;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    theme: Theme;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({
    icon,
    title,
    subtitle,
    color,
    onPress,
    rightElement,
    theme
}) => {
    const iconColor = color || theme.colors.text;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.left}>
                <View style={[styles.iconBg, { backgroundColor: `${String(iconColor)}15` }]}>
                    <Icon name={icon} size={22} color={iconColor} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
            <View style={styles.right}>
                {rightElement || <Icon name="chevron-forward" size={20} color={theme.colors.textLight} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF', // Default card color, should be dynamic if needed
        padding: scale(12),
        borderRadius: moderateScale(15),
        marginBottom: moderateScale(10),
        // Simple shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(12),
        flex: 1,
    },
    iconBg: {
        width: scale(38),
        height: scale(38),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: moderateScale(15),
        fontWeight: '600',
    },
    subtitle: {
        fontSize: moderateScale(12),
        color: '#8E8E93',
        marginTop: 2,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export const MenuItem = memo(MenuItemComponent);

