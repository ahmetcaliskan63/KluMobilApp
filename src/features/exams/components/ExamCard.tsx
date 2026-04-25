import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { ExamSchedule } from '@/shared/types/models';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

interface ExamCardProps {
    exam: ExamSchedule;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={s.examCard}
        >
            <View style={[s.cardAccent, { backgroundColor: exam.color }]} />

            <View style={s.cardContent}>
                <View style={s.cardTop}>
                    <View style={s.typeWrapper}>
                        <Text style={[s.examType, { color: exam.color }]}>{exam.type}</Text>
                        <View style={s.dotSeparator} />
                        <Text style={s.statusText}>{exam.status}</Text>
                    </View>
                    <View style={s.locationBadge}>
                        <Icon name="location" size={12} color="#64748B" />
                        <Text style={s.locationText}>{exam.location}</Text>
                    </View>
                </View>

                <Text style={s.courseName} numberOfLines={1}>{exam.courseName}</Text>

                <View style={s.detailsRow}>
                    <View style={s.detailItem}>
                        <Icon name="calendar-outline" size={14} color="#64748B" />
                        <Text style={s.detailValue}>{exam.date} • {exam.day}</Text>
                    </View>

                    <View style={s.detailItem}>
                        <Icon name="time-outline" size={14} color="#64748B" />
                        <Text style={s.detailValue}>{exam.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    examCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        marginBottom: verticalScale(14),
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkMode ? 0.3 : 0.12,
        shadowRadius: 12,
    },
    cardAccent: {
        width: 4,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: spacing.lg,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    examType: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    dotSeparator: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#CBD5E1',
        marginHorizontal: 8,
    },
    statusText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#64748B',
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    locationText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: isDarkMode ? theme.colors.textSecondary : '#475569',
    },
    courseName: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xl,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailValue: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: theme.colors.textSecondary,
    },
});
