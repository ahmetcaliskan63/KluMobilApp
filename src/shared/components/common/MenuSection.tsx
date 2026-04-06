import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '@/shared/utils/responsive';
import { Theme } from '@/app/theme/theme';

interface MenuSectionProps {
    title: string;
    children: React.ReactNode;
    theme: Theme;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, children, theme }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.textLight }]}>{title}</Text>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(24),
        paddingHorizontal: scale(20),
    },
    title: {
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: verticalScale(12),
        letterSpacing: 1,
    },
    content: {
        gap: 0, // Gaps handled by inner items
    },
});

