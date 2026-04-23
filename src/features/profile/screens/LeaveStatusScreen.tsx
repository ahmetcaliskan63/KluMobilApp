import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { Theme, spacing } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useAuthStore } from '@/shared/store/authStore';
import { useTranslation } from 'react-i18next';

export const LeaveStatusScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const s = styles(theme);

    const balances = user?.leaveBalances || [];
    const requests = user?.leaveRequests || [];
    const annualBalance = balances.find(b => b.type === 'annual' || b.type === 'Yıllık');
    const totalRemaining = annualBalance?.remaining || 0;

    const StatusBadge = ({ status }: { status: string }) => {
        let bgColor = '#F1F5F9';
        let textColor = '#64748B';
        let label = status;

        if (status === 'approved' || status === 'Onaylandı') {
            bgColor = '#DCFCE7';
            textColor = '#15803D';
            label = t('leave.approved');
        } else if (status === 'pending' || status === 'Beklemede') {
            bgColor = '#FEF3C7';
            textColor = '#B45309';
            label = t('leave.pending');
        } else if (status === 'rejected' || status === 'Reddedildi') {
            bgColor = '#FEE2E2';
            textColor = '#B91C1C';
            label = t('leave.rejected');
        }

        return (
            <View style={[s.badge, { backgroundColor: bgColor }]}>
                <Text style={[s.badgeText, { color: textColor }]}>{label}</Text>
            </View>
        );
    };

    const getLeaveTypeLabel = (type: string) => {
        const lowerType = type.toLowerCase();
        if (lowerType === 'annual' || lowerType === 'yıllık') return t('leave.annual');
        if (lowerType === 'sick' || lowerType === 'hastalık') return t('leave.sick');
        if (lowerType === 'excuse' || lowerType === 'mazeret') return t('leave.excuse');
        return type;
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            
            {/* Header */}
            <LinearGradient colors={['#182958', '#0F172A']} style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={s.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>{t('leave.title')}</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Main Balance Card */}
                <View style={s.mainBalanceContainer}>
                    <Text style={s.mainBalanceLabel}>{t('leave.annualRemaining')}</Text>
                    <View style={s.mainBalanceRow}>
                        <Text style={s.mainBalanceValue}>{totalRemaining}</Text>
                        <Text style={s.mainBalanceUnit}>{t('common.days').toUpperCase()}</Text>
                    </View>
                    <View style={s.progressBarBg}>
                        <View style={[s.progressBarFill, { width: `${(totalRemaining / 30) * 100}%` }]} />
                    </View>
                    <Text style={s.progressText}>{t('leave.totalCredit', { count: 30 })}</Text>
                </View>
            </LinearGradient>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            >
                {/* Secondary Balances */}
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitle}>{t('leave.distribution')}</Text>
                </View>
                
                <View style={s.balanceGrid}>
                    {balances.map((b, index) => (
                        <View key={index} style={s.statCard}>
                            <View style={[s.statIconCircle, { backgroundColor: b.color + '15' }]}>
                                <Icon name="calendar" size={18} color={b.color} />
                            </View>
                            <Text style={s.statType} numberOfLines={1}>{getLeaveTypeLabel(b.type)}</Text>
                            <Text style={[s.statValue, { color: b.color }]}>{b.remaining} {t('common.days')}</Text>
                        </View>
                    ))}
                </View>

                {/* History */}
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitle}>{t('leave.history')}</Text>
                    <TouchableOpacity>
                        <Text style={s.seeAllText}>{t('common.seeAll')}</Text>
                    </TouchableOpacity>
                </View>

                {requests.map((r) => (
                    <View key={r.id} style={s.requestCard}>
                        <View style={s.requestCardHeader}>
                            <View style={s.requestTypeWrapper}>
                                <View style={s.requestTypeIndicator} />
                                <Text style={s.requestType}>{getLeaveTypeLabel(r.type)}</Text>
                            </View>
                            <StatusBadge status={r.status} />
                        </View>
                        
                        <View style={s.requestDetails}>
                            <View style={s.detailItem}>
                                <Icon name="time-outline" size={14} color="#64748B" />
                                <Text style={s.detailText}>{r.startDate} - {r.endDate}</Text>
                            </View>
                            <View style={s.detailItem}>
                                <Icon name="calendar-outline" size={14} color="#64748B" />
                                <Text style={s.detailText}>{r.days} {t('common.days')}</Text>
                            </View>
                        </View>

                        <View style={s.reasonBox}>
                            <Text style={s.reasonLabel}>{t('leave.reason')}:</Text>
                            <Text style={s.reasonText} numberOfLines={1}>{r.reason}</Text>
                        </View>
                    </View>
                ))}

                {/* Info Text */}
                <View style={s.infoBox}>
                    <Icon name="information-circle-outline" size={20} color="#1E293B" />
                    <Text style={s.infoText}>
                        {t('leave.automationInfo')}
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={s.fab}>
                <LinearGradient
                    colors={['#10B981', '#059669']}
                    style={s.fabGradient}
                >
                    <Icon name="add" size={28} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = (_theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingBottom: verticalScale(30),
        borderBottomLeftRadius: moderateScale(32),
        borderBottomRightRadius: moderateScale(32),
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        height: verticalScale(50),
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    mainBalanceContainer: {
        alignItems: 'center',
        marginTop: verticalScale(20),
        paddingHorizontal: spacing.xl,
    },
    mainBalanceLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: moderateScale(12),
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    mainBalanceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: verticalScale(5),
    },
    mainBalanceValue: {
        color: '#FFFFFF',
        fontSize: moderateScale(52),
        fontWeight: '900',
    },
    mainBalanceUnit: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '700',
        marginLeft: spacing.xs,
        opacity: 0.8,
    },
    progressBarBg: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        marginTop: verticalScale(15),
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#10B981',
        borderRadius: 4,
    },
    progressText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: moderateScale(10),
        fontWeight: '600',
        marginTop: 8,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
    sectionTitle: {
        fontSize: moderateScale(12),
        fontWeight: '800',
        color: '#1E293B',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    seeAllText: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: '#3B82F6',
    },
    balanceGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    statCard: {
        width: '31%',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(18),
        padding: spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    statIconCircle: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statType: {
        fontSize: moderateScale(9),
        color: '#64748B',
        fontWeight: '800',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: moderateScale(12),
        fontWeight: '800',
    },
    requestCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    requestCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    requestTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    requestTypeIndicator: {
        width: 4,
        height: 16,
        backgroundColor: '#1E293B',
        borderRadius: 2,
        marginRight: 8,
    },
    requestType: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: '#1E293B',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    requestDetails: {
        flexDirection: 'row',
        gap: spacing.lg,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        fontSize: moderateScale(12),
        color: '#64748B',
        fontWeight: '600',
    },
    reasonBox: {
        marginTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 8,
        borderRadius: 10,
    },
    reasonLabel: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: '#94A3B8',
        marginRight: 6,
    },
    reasonText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: '#475569',
        flex: 1,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        padding: spacing.md,
        borderRadius: 15,
        alignItems: 'center',
        gap: spacing.sm,
        marginTop: spacing.lg,
    },
    infoText: {
        fontSize: moderateScale(11),
        color: '#475569',
        fontWeight: '600',
        flex: 1,
        lineHeight: 16,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.xl + 20,
        right: spacing.lg,
        width: 56,
        height: 56,
        borderRadius: 28,
        elevation: 8,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
