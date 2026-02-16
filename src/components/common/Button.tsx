/**
 * Custom Button Component
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, verticalScale } from '../../utils/responsive';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    const buttonStyle = [
        s.button,
        s[variant],
        s[size],
        disabled && s.disabled,
        style,
    ];

    const textStyles = [
        s.text,
        s[`${variant}Text` as keyof typeof s],
        s[`${size}Text` as keyof typeof s],
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? theme.colors.primary : theme.colors.textOnPrimary}
                />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    button: {
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },

    // Sizes
    small: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        minHeight: verticalScale(34),
    },
    medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        minHeight: verticalScale(48),
    },
    large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: verticalScale(56),
    },

    // Text styles
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: theme.colors.textOnPrimary,
        fontSize: moderateScale(16),
    },
    secondaryText: {
        color: theme.colors.textOnPrimary,
        fontSize: moderateScale(16),
    },
    outlineText: {
        color: theme.colors.primary,
        fontSize: moderateScale(16),
    },
    smallText: {
        fontSize: moderateScale(13),
    },
    mediumText: {
        fontSize: moderateScale(15),
    },
    largeText: {
        fontSize: moderateScale(17),
    },

    disabled: {
        opacity: 0.5,
    },
});
