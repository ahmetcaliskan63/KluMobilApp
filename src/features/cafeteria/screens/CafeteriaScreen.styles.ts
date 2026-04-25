import { StyleSheet, Platform } from 'react-native';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme, insets: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    meshBackground: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    bgGlow: {
        position: 'absolute',
        borderRadius: 200,
    },
    mainContent: {
        flex: 1,
        paddingVertical: spacing.lg,
        paddingBottom: Math.max(insets.bottom, 20) + 70,
        justifyContent: 'space-between',
    },
    bottomInfo: {
        flexDirection: 'row',
        marginHorizontal: spacing.lg,
        padding: moderateScale(20),
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(24),
        gap: moderateScale(14),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    infoText: {
        flex: 1,
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
        lineHeight: 20,
        fontWeight: '500',
    },
    todayFab: {
        position: 'absolute',
        bottom: Math.max(insets.bottom, 20) + 100,
        alignSelf: 'center',
    },
    fabGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 32,
        gap: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#182958',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
            },
            android: {
                elevation: 8,
            }
        }),
    },
    todayFabText: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 15,
        letterSpacing: 0.5,
    },
});
