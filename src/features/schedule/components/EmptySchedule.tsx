import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface EmptyScheduleProps {
    message: string;
    theme: Theme;
    isDarkMode: boolean;
}

export const EmptySchedule: React.FC<EmptyScheduleProps> = ({
    message,
    theme,
    isDarkMode
}) => {
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.emptyState}>
            <View style={s.emptyIconContainer}>
                <Icon name="calendar-outline" size={64} color="#CBD5E1" />
            </View>
            <Text style={[s.emptyText, { color: theme.colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
};

const styles = (_theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: isDarkMode ? 0.3 : 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    emptyText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 22,
    },
});
