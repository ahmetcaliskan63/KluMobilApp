import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme, spacing } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';
import { useTranslation } from 'react-i18next';
import { MOCK_EXAM_RESULTS } from '@/shared/services/mockData';
import { ExamsHeader } from '../components/ExamsHeader';
import { ResultCard } from '../components/ResultCard';

export const ExamResultsScreen: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useAppTheme();
    const s = styles(theme);

    // Memoize results to prevent unnecessary re-renders
    const examResults = useMemo(() => MOCK_EXAM_RESULTS(t), [t]);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ExamsHeader title={t('exams.resultsTitle')} />

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {examResults.map((item) => (
                    <ResultCard key={item.id} item={item} />
                ))}

                <View style={s.footerContainer}>
                    <Text style={s.footerInfo}>{t('academic.institution')} • {t('academic.itDepartment')}</Text>
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
    }
});

export default ExamResultsScreen;
