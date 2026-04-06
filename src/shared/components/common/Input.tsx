/**
 * Custom Input Component
 */

import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { Theme } from '@/app/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    ...props
}) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={[s.container, containerStyle]}>
            {label && <Text style={s.label}>{label}</Text>}
            <View style={[
                s.inputContainer,
                error ? s.inputError : null,
                (props as TextInputProps).multiline ? s.textArea : null
            ]}>
                <TextInput
                    style={s.input}
                    placeholderTextColor={theme.colors.textLight}
                    {...props}
                />
            </View>
            {error && <Text style={s.errorText}>{error}</Text>}
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginBottom: verticalScale(6),
    },
    inputContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: moderateScale(12),
        minHeight: verticalScale(50),
        justifyContent: 'center',
    },
    textArea: {
        minHeight: verticalScale(100),
        alignItems: 'flex-start',
        paddingVertical: verticalScale(10),
    },
    input: {
        fontSize: moderateScale(16),
        color: theme.colors.text,
        padding: 0,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    errorText: {
        fontSize: moderateScale(12),
        color: theme.colors.error,
        marginTop: verticalScale(4),
    },
});

