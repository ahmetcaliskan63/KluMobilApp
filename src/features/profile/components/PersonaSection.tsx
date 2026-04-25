import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, verticalScale, scale } from '@/shared/utils/responsive';
import { User } from '@/shared/types/models';

interface PersonaSectionProps {
    user: User | null;
    stats: any;
    theme: Theme;
    isDarkMode: boolean;
    onPress: () => void;
}

export const PersonaSection: React.FC<PersonaSectionProps> = ({
    user,
    stats,
    theme,
    isDarkMode,
    onPress
}) => {
    const s = styles(theme, isDarkMode);

    return (
        <TouchableOpacity
            style={s.personaInfoSection}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <LinearGradient
                colors={isDarkMode ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)', 'transparent'] : ['rgba(150, 150, 150, 0.12)', 'rgba(200, 200, 200, 0.03)', 'transparent']}
                style={s.personaGradientWrapper}
            >
                <View style={s.personaMain}>
                    {/* Top Floor: Identity */}
                    <View style={s.personaTopRow}>
                        <View style={s.avatarContainer}>
                            <LinearGradient
                                colors={['#3B82F6', '#2DD4BF']}
                                style={s.avatarGlow}
                            />
                            <View style={[s.avatarBox]}>
                                <Image
                                    source={{ uri: user?.profileImage || 'https://i.pravatar.cc/150?u=1' }}
                                    style={s.avatarImage}
                                />
                            </View>
                        </View>

                        <View style={s.textDetails}>
                            <Text style={[s.userName, { color: theme.colors.text }]}>
                                {user?.firstName} {user?.lastName}
                            </Text>
                            <View style={s.deptInfo}>
                                <Icon name="school" size={16} color={theme.colors.primary} />
                                <Text style={[s.deptName, { color: theme.colors.textSecondary }]}>
                                    {user?.department}
                                </Text>
                            </View>
                        </View>

                        <Icon 
                            name="chevron-forward" 
                            size={20} 
                            color={isDarkMode ? theme.colors.textSecondary : "#182958"} 
                            style={s.personaChevron} 
                        />
                    </View>

                    {/* Divider Line */}
                    <View style={s.personaDivider} />

                    {/* Bottom Floor: Role-Aware Academic Micro-Cards */}
                    <View style={s.personaStatsRow}>
                        <StatCard label={stats.stat1Label} value={stats.stat1Value} s={s} isDarkMode={isDarkMode} />
                        <StatCard label={stats.stat2Label} value={stats.stat2Value} s={s} isDarkMode={isDarkMode} />
                        <StatCard label={stats.stat3Label} value={stats.stat3Value} s={s} isDarkMode={isDarkMode} />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const StatCard = ({ label, value, s }: { label: string, value: string, s: any, isDarkMode: boolean }) => (
    <View style={s.personaStatCard}>
        <Text style={s.personaStatLabel}>{label}</Text>
        <Text style={s.personaStatValue}>{value}</Text>
    </View>
);

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    personaInfoSection: {
        width: '100%',
        marginTop: verticalScale(15),
        marginBottom: verticalScale(15),
    },
    personaGradientWrapper: {
        padding: 2,
        borderRadius: moderateScale(30),
        marginHorizontal: -10,
        opacity: 0.9,
    },
    personaMain: {
        flexDirection: 'column',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(28),
        borderWidth: 1.5,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(80, 80, 80, 0.12)',
        ...theme.shadows.medium,
        overflow: 'hidden',
    },
    personaTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: verticalScale(6),
    },
    personaDivider: {
        height: 1,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(80, 80, 80, 0.15)',
        marginHorizontal: spacing.lg,
    },
    personaStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: verticalScale(4),
        paddingBottom: verticalScale(12),
        gap: spacing.md,
    },
    personaStatCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(18),
        borderWidth: 0,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.05)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 6,
        elevation: 0,
    },
    personaStatLabel: {
        fontSize: moderateScale(9),
        fontWeight: '800',
        color: theme.colors.textSecondary,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    personaStatValue: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: isDarkMode ? '#FFFFFF' : '#1e293b',
        letterSpacing: -0.5,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: spacing.lg,
    },
    avatarGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: moderateScale(54),
        opacity: 0.15,
    },
    avatarBox: {
        width: scale(76),
        height: scale(76),
        borderRadius: moderateScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: isDarkMode ? theme.colors.primary : '#182958',
        backgroundColor: theme.colors.card,
        ...theme.shadows.small,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(38),
    },
    textDetails: {
        flex: 1,
        justifyContent: 'center',
        gap: 2,
    },
    userName: {
        fontSize: moderateScale(22),
        fontWeight: '900',
        letterSpacing: -0.6,
    },
    deptInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deptName: {
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    personaChevron: {
        marginLeft: spacing.sm,
    },
});
