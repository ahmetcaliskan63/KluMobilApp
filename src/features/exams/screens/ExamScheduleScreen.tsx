import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';
import { useTranslation } from 'react-i18next';
import { MOCK_EXAM_SCHEDULE } from '@/shared/services/mockData';
import { ExamsHeader } from '../components/ExamsHeader';
import { ExamCard } from '../components/ExamCard';

export const ExamScheduleScreen: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useAppTheme();
    const s = styles(theme);

    const examSchedule = useMemo(() => MOCK_EXAM_SCHEDULE(t), [t]);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ExamsHeader title={t('exams.scheduleTitle')} />

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {examSchedule.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} />
                ))}

                <View style={s.footerContainer}>
                    <Text style={s.footerInfo}>{t('academic.institution')} • {t('academic.itDepartment')}</Text>
                    <Text style={s.successWish}>{t('exams.wishSuccess')}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    footerContainer: {
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
    },
    footerInfo: {
        fontSize: moderateScale(11),
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    successWish: {
        fontSize: moderateScale(12),
        color: '#64748B',
        fontWeight: '800',
        fontStyle: 'italic',
        marginTop: 4,
    }
});

export default ExamScheduleScreen;
