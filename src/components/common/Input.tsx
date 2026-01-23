/**
 * Custom Input Component
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    Dimensions,
} from 'react-native';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

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
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={[s.container, containerStyle]}>
            {label && <Text style={s.label}>{label}</Text>}
            <TextInput
                style={[
                    s.input,
                    isFocused && s.inputFocused,
                    error && s.inputError,
                ]}
                placeholderTextColor={theme.colors.textLight}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text style={s.errorText}>{error}</Text>}
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        marginBottom: verticalScale(10),
    },
    label: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: theme.colors.text,
        marginBottom: verticalScale(6),
        alignSelf: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(24, 41, 88, 0.5)',
        borderRadius: moderateScale(10),
        paddingHorizontal: horizontalScale(15),
        paddingVertical: verticalScale(12),
        fontSize: moderateScale(15),
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
        minHeight: verticalScale(50),
    },
    inputFocused: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    errorText: {
        fontSize: moderateScale(11),
        color: theme.colors.error,
        marginTop: verticalScale(4),
    },
});
