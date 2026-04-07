import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Theme } from '@/app/theme/theme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

interface GPASimulatorCardProps {
    currentGPA: number;
    theme: Theme;
}

export const GPASimulatorCard: React.FC<GPASimulatorCardProps> = ({ currentGPA, theme }) => {
    const [targetGrade, setTargetGrade] = useState('4.00');
    const [simulatedGPA, setSimulatedGPA] = useState<number | null>(null);

    const calculateSim = () => {
        const val = parseFloat(targetGrade);
        if (!isNaN(val)) {
            const result = (currentGPA * 0.75) + (val * 0.25);
            setSimulatedGPA(parseFloat(result.toFixed(2)));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleInfo}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Academic Forecast</Text>
                    <Text style={styles.subtitle}>Gelecekteki başarını bugün planla</Text>
                </View>
                <Icon name="stats-chart" size={20} color={theme.colors.primary} style={styles.statsIcon} />
            </View>

            <View style={styles.content}>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>TARGET SEMESTER GRADE</Text>
                    <View style={styles.controlRow}>
                        <View style={styles.inputField}>
                            <TextInput
                                style={styles.textInput}
                                value={targetGrade}
                                onChangeText={setTargetGrade}
                                keyboardType="numeric"
                                placeholder="0.00"
                                placeholderTextColor="#C7C7CC"
                            />
                            <View style={styles.inputDecoration} />
                        </View>
                        <TouchableOpacity
                            onPress={calculateSim}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[theme.colors.primary, '#4466B8']}
                                style={styles.actionButton}
                            >
                                <Icon name="flash" size={18} color="#FFFFFF" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.displaySection}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>CURRENT</Text>
                        <Text style={styles.metricValue}>{currentGPA.toFixed(2)}</Text>
                    </View>

                    <View style={styles.connectionLine}>
                        <View style={styles.dot} />
                        <Icon name="chevron-forward" size={12} color="#D1D1D6" />
                        <View style={styles.dot} />
                    </View>

                    <View style={[styles.metricCard, simulatedGPA ? styles.activeMetric : null]}>
                        <Text style={[styles.metricLabel, simulatedGPA ? { color: theme.colors.primary } : null]}>FORECAST</Text>
                        <Text style={[styles.metricValue, simulatedGPA ? { color: theme.colors.primary } : { color: '#E5E5EA' }]}>
                            {simulatedGPA ? simulatedGPA.toFixed(2) : '?.??'}
                        </Text>
                    </View>
                </View>

                {simulatedGPA && (
                    <View style={[styles.feedbackContainer, { backgroundColor: 'rgba(0,0,0,0.02)' }]}>
                        <Text style={styles.feedbackText}>
                            Hedefine ulaşmak için {targetGrade} ortalama yapmalısın.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: scale(20),
        marginTop: verticalScale(24),
        borderRadius: moderateScale(24),
        padding: scale(24),
        // Premium shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(24),
    },
    titleInfo: {
        flex: 1,
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: moderateScale(12),
        color: '#8E8E93',
        marginTop: 2,
    },
    statsIcon: {
        opacity: 0.8,
    },
    content: {
        gap: verticalScale(24),
    },
    inputSection: {
        gap: verticalScale(10),
    },
    inputLabel: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#8E8E93',
        letterSpacing: 1,
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    inputField: {
        flex: 1,
        height: verticalScale(50),
        justifyContent: 'center',
    },
    textInput: {
        fontSize: moderateScale(22),
        fontWeight: '800',
        color: '#1C1C1E',
        padding: 0,
    },
    inputDecoration: {
        height: 2,
        backgroundColor: '#F2F2F7',
        marginTop: 4,
        borderRadius: 1,
    },
    actionButton: {
        width: verticalScale(50),
        height: verticalScale(50),
        borderRadius: moderateScale(16),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1A2B5F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    displaySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9F9FB',
        padding: scale(20),
        borderRadius: moderateScale(20),
    },
    metricCard: {
        alignItems: 'center',
        flex: 1,
    },
    activeMetric: {
        // Special highlighting if needed
    },
    metricLabel: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#AEAEB2',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    metricValue: {
        fontSize: moderateScale(24),
        fontWeight: '900',
        letterSpacing: -1,
    },
    connectionLine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E5EA',
    },
    feedbackContainer: {
        padding: scale(12),
        borderRadius: moderateScale(12),
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: '#636366',
        textAlign: 'center',
    }
});

