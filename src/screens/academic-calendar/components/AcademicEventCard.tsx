import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../AcademicCalendarScreen.styles';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { AcademicEvent } from '../types';
import { EVENT_THEMES } from '../constants';

interface Props {
    event: AcademicEvent;
    isCurrent?: boolean;
}

export const AcademicEventCard: React.FC<Props> = ({ event, isCurrent }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);
    const themeInfo = EVENT_THEMES[event.type];

    return (
        <View style={s.eventCard}>
            {isCurrent && (
                <View style={[s.currentIndicator, { backgroundColor: themeInfo.color }]} />
            )}

            <View style={s.eventHeader}>
                <View style={[s.iconBox, { backgroundColor: themeInfo.color + '15' }]}>
                    <Icon name={themeInfo.icon} size={22} color={themeInfo.color} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={[s.eventBadge, { backgroundColor: themeInfo.color + '10' }]}>
                        <Text style={[s.eventBadgeText, { color: themeInfo.color }]}>
                            {themeInfo.label}
                        </Text>
                    </View>
                    <Text style={s.eventTitle}>{event.title}</Text>
                </View>
            </View>

            <View style={s.eventDivider} />

            <View style={s.dateRow}>
                <Icon name="calendar-outline" size={16} color="#64748B" />
                <Text style={s.dateLabel}>TARİH:</Text>
                <Text style={s.dateValue}>
                    {event.startDate}
                    {event.endDate ? ` - ${event.endDate}` : ''}
                </Text>
            </View>
        </View>
    );
};
