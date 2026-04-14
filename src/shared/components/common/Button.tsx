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
    StyleProp,
} from 'react-native';
import { Theme } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    themeOverride?: Theme;
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
    themeOverride,
}) => {
    const { theme: globalTheme } = useAppTheme();
    const theme = themeOverride || globalTheme;
    const s = styles(theme);

    const buttonStyle: StyleProp<ViewStyle> = [
        s.button,
        s[variant as keyof typeof s] as ViewStyle,
        s[size as keyof typeof s] as ViewStyle,
        disabled && s.disabled,
        style,
    ];

    const textStyles: StyleProp<TextStyle> = [
        s.text,
        s[`${variant}Text` as keyof typeof s] as TextStyle,
        s[`${size}Text` as keyof typeof s] as TextStyle,
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
    } as ViewStyle,

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
    } as ViewStyle,
    secondary: {
        backgroundColor: theme.colors.secondary,
    } as ViewStyle,
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    } as ViewStyle,

    // Sizes
    small: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        minHeight: verticalScale(34),
    } as ViewStyle,
    medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        minHeight: verticalScale(48),
    } as ViewStyle,
    large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: verticalScale(56),
    } as ViewStyle,

    // Text styles
    text: {
        fontWeight: '600',
    } as TextStyle,
    primaryText: {
        color: theme.colors.textOnPrimary,
        fontSize: moderateScale(16),
    } as TextStyle,
    secondaryText: {
        color: theme.colors.textOnPrimary,
        fontSize: moderateScale(16),
    } as TextStyle,
    outlineText: {
        color: theme.colors.primary,
        fontSize: moderateScale(16),
    } as TextStyle,
    smallText: {
        fontSize: moderateScale(13),
    } as TextStyle,
    mediumText: {
        fontSize: moderateScale(15),
    } as TextStyle,
    largeText: {
        fontSize: moderateScale(17),
    } as TextStyle,

    disabled: {
        opacity: 0.5,
    } as ViewStyle,
});
