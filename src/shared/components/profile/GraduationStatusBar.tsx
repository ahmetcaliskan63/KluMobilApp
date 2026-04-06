import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@/app/theme/theme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { GraduationProgress } from '@/shared/types/models';

interface GraduationStatusBarProps {
    progress: GraduationProgress;
    theme: Theme;
}

export const GraduationStatusBar: React.FC<GraduationStatusBarProps> = ({ progress, theme }) => {
    const percentage = (progress.completedCredits / progress.totalRequiredCredits) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.topInfo}>
                <View>
                    <Text style={styles.label}>GRADUATION PROGRESS</Text>
                    <Text style={styles.mainTitle}>Mezuniyet Yolculuğu</Text>
                </View>
                <View style={styles.percentBadge}>
                    <Text style={[styles.percentText, { color: theme.colors.primary }]}>
                        %{Math.round(percentage)}
                    </Text>
                </View>
            </View>

            <View style={styles.progressArea}>
                <View style={styles.barContainer}>
                    <View style={[styles.barBg, { backgroundColor: '#F2F2F7' }]} />
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${percentage}%`,
                                backgroundColor: theme.colors.primary
                            }
                        ]}
                    />
                </View>
                <View style={styles.points}>
                    <View style={[styles.point, styles.startPoint, { backgroundColor: theme.colors.primary }]} />
                    <View style={[styles.point, styles.endPoint, { backgroundColor: '#E5E5EA' }]} />
                </View>
            </View>

            <View style={styles.footerRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{progress.completedCredits}</Text>
                    <Text style={styles.statSub}>BİTEN AKTS</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{progress.totalRequiredCredits - progress.completedCredits}</Text>
                    <Text style={styles.statSub}>KALAN AKTS</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: theme.colors.secondary }]}>{progress.gpaTarget.toFixed(2)}</Text>
                    <Text style={styles.statSub}>HEDEF GANO</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: scale(20),
        marginTop: verticalScale(20),
        padding: scale(22),
        borderRadius: moderateScale(24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    topInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(20),
    },
    label: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#AEAEB2',
        letterSpacing: 1,
        marginBottom: 4,
    },
    mainTitle: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.3,
    },
    percentBadge: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(10),
    },
    percentText: {
        fontSize: moderateScale(13),
        fontWeight: '900',
    },
    progressArea: {
        height: verticalScale(10),
        justifyContent: 'center',
        marginBottom: verticalScale(24),
    },
    barContainer: {
        height: verticalScale(4),
        width: '100%',
        position: 'relative',
    },
    barBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 2,
    },
    barFill: {
        position: 'absolute',
        height: '100%',
        borderRadius: 2,
    },
    points: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    point: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    startPoint: {},
    endPoint: {},
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    statSub: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: '#C7C7CC',
        letterSpacing: 0.5,
    }
});

