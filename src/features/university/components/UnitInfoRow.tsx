import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface UnitInfoRowProps {
    config: {
        icon: any;
        label: string;
        color: string;
        bg: string;
    };
    value: string;
    isLink?: boolean;
    onPress?: () => void;
    theme: Theme;
    isDarkMode: boolean;
}

export const UnitInfoRow: React.FC<UnitInfoRowProps> = ({ config, value, isLink, onPress, theme, isDarkMode }) => {
    return (
        <TouchableOpacity
            style={styles(theme, isDarkMode).infoRow}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={[styles(theme, isDarkMode).rowIconContainer, { backgroundColor: isDarkMode ? config.color + '20' : config.bg }]}>
                <Icon name={config.icon} size={20} color={config.color} />
            </View>
            <View style={styles(theme, isDarkMode).rowTextContent}>
                <Text style={styles(theme, isDarkMode).rowLabelText}>{config.label}</Text>
                <Text style={[styles(theme, isDarkMode).rowValueText, isLink && styles(theme, isDarkMode).linkTextDecoration]} numberOfLines={2}>
                    {value}
                </Text>
            </View>
            {onPress && <Icon name="chevron-forward" size={18} color={isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1'} />}
        </TouchableOpacity>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
    },
    rowIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rowTextContent: {
        flex: 1,
        gap: 2,
    },
    rowLabelText: {
        fontSize: moderateScale(9),
        fontWeight: '800',
        color: theme.colors.textSecondary,
        letterSpacing: 1,
    },
    rowValueText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: theme.colors.text,
        lineHeight: 20,
    },
    linkTextDecoration: {
        color: isDarkMode ? theme.colors.primary : '#182958',
        textDecorationLine: 'underline',
    },
});
