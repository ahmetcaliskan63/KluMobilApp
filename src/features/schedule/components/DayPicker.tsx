import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface DayPickerProps {
    days: string[];
    selectedDay: string;
    onDaySelect: (day: string) => void;
    theme: Theme;
    isDarkMode: boolean;
}

export const DayPicker: React.FC<DayPickerProps> = ({
    days,
    selectedDay,
    onDaySelect,
    theme,
    isDarkMode
}) => {
    const s = styles(theme, isDarkMode);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.dayPicker}
        >
            {days.map((day) => (
                <TouchableOpacity
                    key={day}
                    onPress={() => onDaySelect(day)}
                    style={[
                        s.dayItem,
                        selectedDay === day && s.activeDayItem
                    ]}
                >
                    <Text style={[
                        s.dayText,
                        selectedDay === day && s.activeDayText
                    ]}>
                        {day}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    dayPicker: {
        paddingHorizontal: 10,
        gap: 6,
        minWidth: '100%',
        justifyContent: 'center',
    },
    dayItem: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeDayItem: {
        backgroundColor: isDarkMode ? theme.colors.primary : '#FFFFFF',
    },
    dayText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '700',
        fontSize: moderateScale(13),
    },
    activeDayText: {
        color: isDarkMode ? '#FFFFFF' : '#182958',
    },
});
