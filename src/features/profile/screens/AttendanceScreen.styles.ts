import { StyleSheet } from 'react-native';
import { Theme, spacing, borderRadius, shadows } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.lg,
        backgroundColor: theme.colors.primary === '#3B82F6' ? '#182958' : theme.colors.primary,
        borderBottomLeftRadius: borderRadius.xxl,
        borderBottomRightRadius: borderRadius.xxl,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center title
        width: '100%',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: borderRadius.lg,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerTitle: {
        ...theme.typography.h3,
        color: '#FFFFFF',
        fontWeight: '800',
        textAlign: 'center',
    },
    listContent: {
        padding: spacing.lg,
        paddingBottom: verticalScale(100),
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...shadows.small,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    courseInfo: {
        flex: 1,
    },
    courseCode: {
        ...theme.typography.small,
        color: theme.colors.primary,
        fontWeight: '700',
    },
    courseName: {
        ...theme.typography.bodyMedium,
        color: theme.colors.text,
        fontWeight: '700',
        marginTop: 2,
    },
    riskBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    riskText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    progressSection: {
        marginTop: spacing.sm,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressText: {
        ...theme.typography.small,
        color: theme.colors.textSecondary,
    },
    progressPercent: {
        ...theme.typography.small,
        color: theme.colors.text,
        fontWeight: '700',
    }
});
