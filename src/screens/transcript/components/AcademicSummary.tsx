import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../TranscriptScreen.styles';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { AcademicSummary as AcademicSummaryType } from '../types';
import { moderateScale } from '../../../utils/responsive';

interface Props {
    data: AcademicSummaryType;
}

export const AcademicSummary: React.FC<Props> = ({ data }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.summarySection}>
            <View style={s.semesterCard}>
                {/* Unified Header */}
                <LinearGradient
                    colors={['#F8FAFC', '#F1F5F9']}
                    style={s.semesterHeader}
                >
                    <View style={s.semesterTitleWrapper}>
                        <View style={[s.semesterBlueIndicator, { backgroundColor: '#182958' }]} />
                        <View>
                            <Text style={s.semesterTitleText}>GENEL AKADEMİK BİLGİLER</Text>
                            <Text style={s.semesterSubtitleText}>Öğrenim Durumu Özeti</Text>
                        </View>
                    </View>
                    <Icon name="stats-chart" size={20} color="#182958" />
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
                        <Text style={s.summaryLabel}>AKTİF YARIYIL</Text>
                        <Text style={s.summaryValue}>{data.activeSemester}</Text>
                    </View>
                </View>

                {/* Optional Footer for Consistency */}
                <View style={s.semesterFooter}>
                    <View style={s.footerLeft}>
                        <Icon name="shield-checkmark-outline" size={14} color="#94A3B8" />
                        <Text style={s.footerInfoText}>Resmi Veri Onaylı</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    contentGrid: {
        flexDirection: 'row',
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    }
});
