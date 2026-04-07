import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../TranscriptScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { SemesterData } from '../types';
import { CourseRow } from './CourseRow';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    semester: SemesterData;
}

export const SemesterCard: React.FC<Props> = ({ semester }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.semesterCard}>
            {/* Semester Header */}
            <LinearGradient
                colors={['#F8FAFC', '#F1F5F9']}
                style={s.semesterHeader}
            >
                <View style={s.semesterTitleWrapper}>
                    <View style={s.semesterBlueIndicator} />
                    <View>
                        <Text style={s.semesterTitleText}>{semester.semester}</Text>
                        <Text style={s.semesterSubtitleText}>{semester.subTitle}</Text>
                    </View>
                </View>

                <View style={s.semesterGpaBadge}>
                    <Text style={s.semesterGpaLabel}>Dönem Ort.</Text>
                    <Text style={s.semesterGpaValue}>{semester.gpa}</Text>
                </View>
            </LinearGradient>

            {/* Table Header */}
            <View style={s.tableHeader}>
                <Text style={[s.columnLabel, { flex: 2.2 }]}>DERS BİLGİSİ</Text>
                <View style={s.tableHeaderStats}>
                    <Text style={[s.columnLabel, s.statCol]}>KRD</Text>
                    <Text style={[s.columnLabel, s.statCol]}>AKTS</Text>
                    <Text style={[s.columnLabel, s.gradeCol]}>NOT</Text>
                </View>
            </View>

            {/* Course List */}
            <View style={s.courseList}>
                {semester.courses.map((course, index) => (
                    <CourseRow
                        key={course.id}
                        course={course}
                        isLast={index === semester.courses.length - 1}
                        isAlternate={index % 2 === 1}
                    />
                ))}
            </View>

            {/* Footer Summary */}
            <View style={s.semesterFooter}>
                <View style={s.footerLeft}>
                    <Icon name="information-circle-outline" size={14} color="#94A3B8" />
                    <Text style={s.footerInfoText}>Dönem Sonu Başarı Özeti</Text>
                </View>
                <View style={s.footerStats}>
                    <Text style={s.footerSummaryText}>Toplam AKTS</Text>
                    <Text style={s.footerSummaryValue}>{semester.totalAkts}</Text>
                </View>
            </View>
        </View>
    );
};

