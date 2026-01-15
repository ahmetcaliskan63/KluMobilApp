/**
 * Card Component
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../../config/theme';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    elevation?: 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    elevation = 'small',
}) => {
    return (
        <View style={[styles.card, theme.shadows[elevation], style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
    },
});
