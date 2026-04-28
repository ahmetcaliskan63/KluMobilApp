import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StatusBar, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useTranslation } from 'react-i18next';
import { MOCK_ATTENDANCE } from '@/shared/services/mockData';
import { styles } from './AttendanceScreen.styles';
import { Attendance } from '@/shared/types/models';
import { spacing } from '@/core/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SimpleProgressBar = ({ percentage, color }: { percentage: number, color: string }) => {
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: percentage,
            duration: 800,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    const width = animValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={{ height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <Animated.View style={{ height: '100%', width, backgroundColor: color, borderRadius: 3 }} />
        </View>
    );
};

export const AttendanceScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const s = styles(theme);

    const attendanceData = useMemo(() => MOCK_ATTENDANCE(t), [t]);

    const getRiskColor = (risk: Attendance['risk']) => {
        switch (risk) {
            case 'high': return theme.colors.error;
            case 'medium': return theme.colors.warning;
            case 'low': return theme.colors.success;
            default: return theme.colors.textLight;
        }
    };

    const headerColor = theme.colors.primary === '#3B82F6' ? '#182958' : theme.colors.primary;

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor={headerColor} translucent={false} />
            
            <View style={[s.header, { paddingTop: insets.top + spacing.md }]}>
                <View style={s.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>{t('courses.attendanceStatus')}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.listContent} showsVerticalScrollIndicator={false}>
                {attendanceData.map((item) => {
                    const percentage = Math.round((item.attended / item.total) * 100);
                    const color = getRiskColor(item.risk);

                    return (
                        <View key={item.courseCode} style={s.card}>
                            <View style={s.cardHeader}>
                                <View style={s.courseInfo}>
                                    <Text style={s.courseCode}>{item.courseCode}</Text>
                                    <Text style={s.courseName}>{item.courseName}</Text>
                                </View>
                                <View style={[s.riskBadge, { backgroundColor: color + '15' }]}>
                                    <Text style={[s.riskText, { color }]}>
                                        {t(`courses.riskLevels.${item.risk}`)}
                                    </Text>
                                </View>
                            </View>

                            <View style={s.progressSection}>
                                <View style={s.progressInfo}>
                                    <Text style={s.progressText}>{item.attended} / {item.total}</Text>
                                    <Text style={s.progressPercent}>{percentage}%</Text>
                                </View>
                                <SimpleProgressBar percentage={percentage} color={color} />
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default AttendanceScreen;
