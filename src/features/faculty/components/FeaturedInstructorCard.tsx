import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface FeaturedInstructorCardProps {
    profile: any;
    label: string;
    onEmailPress: (email: string) => void;
}

export const FeaturedInstructorCard: React.FC<FeaturedInstructorCardProps> = ({ profile, label, onEmailPress }) => {
    if (!profile) return null;

    return (
        <View style={styles.featuredWrapper}>
            <LinearGradient colors={profile.color} style={styles.featuredCard}>
                <View style={[styles.featuredGlow, { backgroundColor: profile.accent }]} />
                <View style={styles.featuredHeader}>
                    <View style={[styles.featuredAvatarBorder, { borderColor: profile.accent }]}>
                        <View style={styles.featuredAvatar}>
                            <Text style={styles.featuredAvatarText}>{profile.avatar}</Text>
                        </View>
                    </View>
                    <View style={styles.featuredText}>
                        <View style={styles.labelBadge}>
                            <Text style={[styles.labelText, { color: profile.accent }]}>{label}</Text>
                        </View>
                        <Text style={styles.featuredName}>{profile.name}</Text>
                        <Text style={styles.featuredTitle}>{profile.role}</Text>
                    </View>
                </View>
                <View style={styles.featuredDivider} />
                <View style={styles.featuredActions}>
                    <TouchableOpacity
                        style={styles.featuredActionItem}
                        onPress={() => onEmailPress(profile.email)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.actionIconWrapper, { backgroundColor: profile.accent + '20' }]}>
                            <Icon name="mail" size={14} color={profile.accent} />
                        </View>
                        <Text style={styles.featuredActionText}>{profile.email}</Text>
                    </TouchableOpacity>
                    <View style={styles.featuredActionItem}>
                        <View style={[styles.actionIconWrapper, { backgroundColor: profile.accent + '20' }]}>
                            <Icon name="location" size={14} color={profile.accent} />
                        </View>
                        <Text style={styles.featuredActionText}>{profile.office}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    featuredWrapper: {
        marginBottom: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
    },
    featuredCard: {
        borderRadius: 24,
        padding: spacing.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    featuredGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        opacity: 0.15,
    },
    featuredHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    featuredAvatarBorder: {
        padding: 2,
        borderRadius: 18,
        borderWidth: 1.5,
    },
    featuredAvatar: {
        width: 54,
        height: 54,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredAvatarText: {
        color: '#FFF',
        fontSize: moderateScale(18),
        fontWeight: '900',
    },
    featuredText: {
        flex: 1,
    },
    labelBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    labelText: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    featuredName: {
        color: '#FFF',
        fontSize: moderateScale(18),
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    featuredTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: moderateScale(11),
        fontWeight: '600',
        marginTop: 1,
    },
    featuredDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: spacing.md,
    },
    featuredActions: {
        gap: 10,
    },
    featuredActionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    actionIconWrapper: {
        width: 26,
        height: 26,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    featuredActionText: {
        color: '#FFFFFF',
        fontSize: moderateScale(12),
        fontWeight: '700',
    },
});
