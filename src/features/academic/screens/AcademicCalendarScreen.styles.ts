import { StyleSheet } from 'react-native';
import { Theme, spacing } from '@/core/theme/theme';

export const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    meshBackground: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    bgGlow: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.5,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: 100,
    },
});
