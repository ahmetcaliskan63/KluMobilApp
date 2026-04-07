import { StyleSheet } from 'react-native';
import { Theme } from '@/app/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

export const styles = (_theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F6F9',
    },
    header: {
        height: verticalScale(110),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: moderateScale(19),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerRight: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 60,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 16,
        padding: 5,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleBtnActive: {
        backgroundColor: '#182958',
    },
    toggleText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#64748B',
    },
    toggleTextActive: {
        color: '#FFFFFF',
    },
    eventCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    eventBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    eventBadgeText: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    eventTitle: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: '#1E293B',
        flex: 1,
    },
    eventDivider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 12,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateLabel: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: '#64748B',
    },
    dateValue: {
        fontSize: moderateScale(13),
        fontWeight: '800',
        color: '#1E293B',
    },
    currentIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4,
        borderTopLeftRadius: 22,
        borderBottomLeftRadius: 22,
    }
});

