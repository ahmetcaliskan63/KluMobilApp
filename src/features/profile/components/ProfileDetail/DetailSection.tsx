import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';

interface InfoRowProps {
    label: string;
    value: string;
    isLast?: boolean;
    indicatorColor?: string;
    theme: Theme;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLast = false, indicatorColor, theme }) => (
    <View style={styles.rowWrapper}>
        <View style={styles.infoRow}>
            <View style={[styles.rowIndicator, { backgroundColor: indicatorColor || '#94A3B8' }]} />
            <View style={styles.rowTextContent}>
                <Text style={styles.labelText}>{label}</Text>
                <Text style={[styles.valueText, { color: theme.colors.text }]}>{value}</Text>
            </View>
        </View>
        {!isLast && <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />}
    </View>
);

interface DetailSectionProps {
    title: string;
    icon: React.ComponentProps<typeof Icon>['name'];
    colors: [string, string, ...string[]];
    children: React.ReactNode;
    theme: Theme;
    isDarkMode: boolean;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
    title,
    icon,
    colors,
    children,
    theme,
    isDarkMode
}) => {
    return (
        <View style={[
            styles.detailedCard, 
            { 
                borderColor: colors[0], 
                backgroundColor: theme.colors.card,
                shadowColor: isDarkMode ? '#000' : '#E2E8F0'
            }
        ]}>
            <View style={[
                styles.cardHeader,
                { 
                    borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.015)' : '#F8FAFC'
                }
            ]}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardHeaderIcon}
                >
                    <Icon name={icon} size={14} color="#FFFFFF" />
                </LinearGradient>
                <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>{title}</Text>
                <View style={[styles.activeDot, { backgroundColor: colors[0] }]} />
            </View>

            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
    );
};

export { InfoRow };

const styles = StyleSheet.create({
    detailedCard: {
        borderRadius: moderateScale(20),
        marginBottom: spacing.lg,
        borderWidth: 1.5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: verticalScale(11),
        borderBottomWidth: 1,
    },
    cardHeaderIcon: {
        width: moderateScale(26),
        height: moderateScale(26),
        borderRadius: moderateScale(7),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    cardHeaderTitle: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        letterSpacing: 1,
        flex: 1,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginRight: 4,
    },
    cardContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xs,
    },
    rowWrapper: {
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(8),
    },
    rowIndicator: {
        width: 3,
        height: moderateScale(14),
        borderRadius: 1.5,
        marginRight: spacing.md,
    },
    rowTextContent: {
        flex: 1,
    },
    labelText: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 0.8,
        marginBottom: 1,
    },
    valueText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    separator: {
        height: 1,
        marginLeft: spacing.md + 3,
    },
});
