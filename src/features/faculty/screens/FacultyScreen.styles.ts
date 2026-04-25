import { StyleSheet } from 'react-native';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: spacing.md,
    },
    sectionHeader: {
        fontSize: moderateScale(14),
        fontWeight: '900',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: spacing.xs,
        marginTop: spacing.md,
        marginLeft: 4,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    termBadge: {
        backgroundColor: theme.colors.primary + '15',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    termBadgeText: {
        color: theme.colors.primary,
        fontSize: moderateScale(10),
        fontWeight: '800',
    },
    termList: {
        marginBottom: spacing.md,
    },
});
