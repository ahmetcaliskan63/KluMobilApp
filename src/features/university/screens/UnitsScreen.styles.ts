import { StyleSheet } from 'react-native';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    sectionHeader: {
        marginTop: moderateScale(24),
        marginBottom: moderateScale(12),
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sectionTitleText: {
        fontSize: moderateScale(12),
        fontWeight: '900',
        color: isDarkMode ? theme.colors.primary : '#182958',
        letterSpacing: 2,
    },
    sectionDivider: {
        flex: 1,
        height: 1.2,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#CBD5E1',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: moderateScale(15),
        color: theme.colors.textSecondary,
        fontWeight: '600',
        marginTop: 12,
    }
});
