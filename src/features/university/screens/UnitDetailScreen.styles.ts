import { StyleSheet } from 'react-native';
import { Theme } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        height: verticalScale(110),
    },
    headerGradient: {
        flex: 1,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingHorizontal: 20,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerMainTitle: {
        fontSize: moderateScale(18),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    scrollContent: {
        marginTop: verticalScale(15),
        paddingHorizontal: 20,
    },
    identityCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: isDarkMode ? 0.3 : 0.15,
        shadowRadius: 15,
        marginBottom: 16,
        borderWidth: 1.2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
    },
    unitIconHousing: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: 24,
        padding: 3,
        backgroundColor: theme.colors.card,
        marginTop: verticalScale(-35),
        elevation: 8,
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#E2E8F0',
    },
    iconInner: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    identityInfo: {
        alignItems: 'center',
        marginTop: 12,
    },
    unitFullName: {
        fontSize: moderateScale(19),
        fontWeight: '900',
        color: theme.colors.text,
        textAlign: 'center',
        lineHeight: 26,
    },
    dataBox: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        padding: 10,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: isDarkMode ? 0.2 : 0.1,
        shadowRadius: 12,
        borderWidth: 1.2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    loaderText: {
        color: isDarkMode ? theme.colors.textSecondary : '#1E293B',
        fontSize: moderateScale(15),
        fontWeight: '600',
        letterSpacing: 0.5,
    }
});
