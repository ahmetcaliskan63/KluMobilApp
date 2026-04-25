import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useTranslation } from 'react-i18next';

interface InstructorCardProps {
    item: any;
    onEmailPress: (email: string) => void;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ item, onEmailPress }) => {
    const { t } = useTranslation();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    return (
        <TouchableOpacity
            key={item.id}
            style={s.memberCard}
            activeOpacity={0.8}
        >
            <View style={s.memberCardInner}>
                <View style={[s.avatarCircle, { backgroundColor: item.color + '15', borderColor: item.color + '30' }]}>
                    <Text style={[s.avatarInitial, { color: item.color }]}>{item.avatar}</Text>
                </View>
                <View style={s.memberInfo}>
                    <Text style={s.memberName}>{item.name}</Text>
                    <Text style={s.memberDept}>{item.dept}</Text>
                </View>
                <TouchableOpacity
                    style={[s.cardActionBtn, { backgroundColor: theme.colors.primary + '10' }]}
                    onPress={() => onEmailPress(item.email)}
                >
                    <Icon name="mail" size={14} color={theme.colors.primary} />
                    <Text style={s.actionBtnText}>{t('profile.email')}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    memberCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        marginBottom: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.2 : 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    memberCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    avatarCircle: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: moderateScale(16),
        fontWeight: '900',
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: theme.colors.text,
        letterSpacing: -0.3,
    },
    memberDept: {
        fontSize: moderateScale(11),
        color: theme.colors.textSecondary,
        fontWeight: '600',
        marginTop: 2,
    },
    cardActionBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderColor: theme.colors.primary + '30',
        elevation: 2,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionBtnText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: theme.colors.primary,
    },
});
