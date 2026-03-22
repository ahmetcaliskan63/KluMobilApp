import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Theme } from '../../config/theme';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import { Attendance } from '../../types/models';

interface AttendanceRiskCardProps {
    data: Attendance[];
    theme: Theme;
}

export const AttendanceRiskCard: React.FC<AttendanceRiskCardProps> = ({ data, theme }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.label}>ABSENCE CONTROL</Text>
                    <Text style={styles.title}>Devamsızlık Takibi</Text>
                </View>
                <TouchableOpacity style={styles.detailButton}>
                    <Text style={[styles.detailText, { color: theme.colors.primary }]}>Tümünü Gör</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {data.map((item, index) => {
                    const isHigh = item.risk === 'high';
                    const isMedium = item.risk === 'medium';

                    return (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.indicator, { backgroundColor: isHigh ? '#FF3B30' : isMedium ? '#FFCC00' : '#34C759' }]} />
                                <Text style={styles.courseCode}>{item.courseCode}</Text>
                            </View>

                            <Text style={styles.courseName} numberOfLines={1}>{item.courseName}</Text>

                            <View style={styles.valueRow}>
                                <Text style={styles.majorValue}>{item.total - item.attended}</Text>
                                <Text style={styles.unit}>SAAT</Text>
                            </View>

                            <View style={styles.limitBar}>
                                <View style={[styles.limitBg, { backgroundColor: '#F2F2F7' }]} />
                                <View
                                    style={[
                                        styles.limitFill,
                                        {
                                            width: `${((item.total - item.attended) / item.limit) * 100}%`,
                                            backgroundColor: isHigh ? '#FF3B30' : '#8E8E93'
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={styles.limitInfo}>LIMIT: {item.limit}s</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

// Add TouchableOpacity from react-native
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(30),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: scale(24),
        marginBottom: verticalScale(16),
    },
    label: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#AEAEB2',
        letterSpacing: 1,
        marginBottom: 2,
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.3,
    },
    detailButton: {
        padding: 4,
    },
    detailText: {
        fontSize: moderateScale(12),
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(10),
    },
    card: {
        width: scale(135),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(22),
        padding: scale(16),
        marginRight: scale(12),
        borderWidth: 1,
        borderColor: '#F2F2F7',
        // Subtle Apple Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: verticalScale(10),
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    courseCode: {
        fontSize: moderateScale(9),
        fontWeight: '900',
        color: '#AEAEB2',
    },
    courseName: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#3A3A3C',
        marginBottom: verticalScale(12),
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 3,
        marginBottom: verticalScale(12),
    },
    majorValue: {
        fontSize: moderateScale(22),
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -1,
    },
    unit: {
        fontSize: moderateScale(9),
        fontWeight: '800',
        color: '#AEAEB2',
    },
    limitBar: {
        height: verticalScale(4),
        width: '100%',
        position: 'relative',
        marginBottom: 6,
    },
    limitBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 2,
    },
    limitFill: {
        position: 'absolute',
        height: '100%',
        borderRadius: 2,
    },
    limitInfo: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: '#C7C7CC',
        textAlign: 'right',
    },
});
