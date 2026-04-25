import { StyleSheet } from 'react-native';
import { Theme, spacing } from '@/core/theme/theme';
import { verticalScale, moderateScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: verticalScale(100),
        paddingHorizontal: spacing.xl,
    },
    decorativeCircle: {
        position: 'absolute',
        top: -verticalScale(50),
        right: -moderateScale(30),
        width: moderateScale(200),
        height: moderateScale(200),
        borderRadius: moderateScale(100),
        backgroundColor: theme.colors.primary,
        opacity: 0.03,
    },
    quickAccessSection: {
        width: '100%',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(10),
    },
    quickStack: {
        flexDirection: 'column',
        gap: verticalScale(12),
    },
});
