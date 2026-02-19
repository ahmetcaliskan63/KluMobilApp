/**
 * Card Component
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale } from '../../utils/responsive';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    elevation?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    elevation = 'small',
}) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={[s.card, theme.shadows[elevation], style]}>
            {children}
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(16),
        padding: moderateScale(16),
    },
});
