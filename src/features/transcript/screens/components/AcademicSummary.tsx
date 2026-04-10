import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { styles } from '../TranscriptScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { AcademicSummary as AcademicSummaryType } from '../types';

interface Props {
    data: AcademicSummaryType;
}

export const AcademicSummary: React.FC<Props> = ({ data }) => {
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme, isDarkMode);

    return (
        <View style={s.summarySection}>
            <View style={s.semesterCard}>
                {/* Unified Header */}
                <LinearGradient
                    colors={isDarkMode ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'] : ['#F8FAFC', '#F1F5F9']}
                    style={s.semesterHeader}
                >
                    <View style={s.semesterTitleWrapper}>
                        <View style={[s.semesterBlueIndicator, { backgroundColor: isDarkMode ? theme.colors.primary : '#182958' }]} />
                        <View>
                            <Text style={s.semesterTitleText}>GENEL AKADEMİK BİLGİLER</Text>
                            <Text style={s.semesterSubtitleText}>Öğrenim Durumu Özeti</Text>
                        </View>
                    </View>
                    <Icon name="stats-chart" size={20} color={isDarkMode ? theme.colors.primary : '#182958'} />
                </LinearGradient>

                {/* Content Area */}
                <View style={localStyles.contentGrid}>
                    <View style={s.summaryItem}>
                        <Text style={s.summaryLabel}>GENEL ORTALAMA</Text>
                        <Text style={s.summaryValue}>{data.overallGpa}</Text>
                    </View>

                    <View style={s.summaryDivider} />

                    <View style={s.summaryItem}>
                        <Text style={s.summaryLabel}>TAMAMLANAN AKTS</Text>
                        <Text style={s.summaryValue}>{data.totalCompletedAkts}</Text>
                    </View>

                    <View style={s.summaryDivider} />

                    <View style={s.summaryItem}>
                        <Text style={s.summaryLabel}>AKTF YARIYIL</Text>
                        <Text style={s.summaryValue}>{data.activeSemester}</Text>
                    </View>
                </View>

                {/* Optional Footer for Consistency */}
                <View style={s.semesterFooter}>
                    <View style={s.footerLeft}>
                        <Icon name="shield-checkmark-outline" size={14} color="#94A3B8" />
                        <Text style={s.footerInfoText}>Resmi Veri Onayl</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    contentGrid: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    }
});

