import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { AcademicCalendarEvent } from '@/shared/types/models';
import { EVENT_THEMES } from './constants';
import { useTranslation } from 'react-i18next';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface AcademicEventCardProps {
    event: AcademicCalendarEvent;
    isCurrent?: boolean;
}

export const AcademicEventCard: React.FC<AcademicEventCardProps> = ({ event, isCurrent }) => {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme);
    const themeInfo = EVENT_THEMES(t)[event.type];

    return (
        <View style={s.eventCard}>
            {isCurrent && (
                <View style={[s.currentIndicator, { backgroundColor: themeInfo.color }]} />
            )}

            <View style={s.eventHeader}>
                <View style={[s.iconBox, { backgroundColor: themeInfo.color + '15' }]}>
                    <Icon name={themeInfo.icon as any} size={24} color={themeInfo.color} />
                </View>
                <View style={s.eventInfo}>
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
                <Text style={s.dateLabel}>{t('common.date').toUpperCase()}:</Text>
                <Text style={s.dateValue}>
                    {event.startDate}
                    {event.endDate ? ` - ${event.endDate}` : ''}
                </Text>
            </View>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    eventCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    currentIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4,
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    eventInfo: {
        flex: 1,
    },
    eventBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 4,
    },
    eventBadgeText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    eventTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: theme.colors.text,
    },
    eventDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginVertical: 12,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateLabel: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        color: '#64748B',
    },
    dateValue: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
});
