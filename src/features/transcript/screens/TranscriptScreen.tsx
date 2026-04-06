import React from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { styles } from './TranscriptScreen.styles';

import { useFetch } from '@/shared/hooks/useFetch';
import { SemesterData, AcademicStats } from '@/shared/types/models';
import { TranscriptHeader } from './components/TranscriptHeader';
import { AcademicSummary } from './components/AcademicSummary';
import { SemesterCard } from './components/SemesterCard';

export const TranscriptScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { data: summary, loading: summaryLoading, error: summaryError } = useFetch<AcademicStats>('/transcript/summary');
    const { data: transcript, loading: transcriptLoading, error: transcriptError } = useFetch<SemesterData[]>('/transcript/details');
    const s = styles(theme);

    if (summaryLoading || transcriptLoading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text }}>Transkript yükleniyor...</Text>
            </View>
        );
    }

    if (summaryError || transcriptError) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Hata: {summaryError || transcriptError}</Text>
            </View>
        );
    }

    const academicSummary = summary || { gpa: '0.00', totalCredits: 0, currentSemester: '1' };
    const transcriptData = transcript || [];

    return (
        <View style={s.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <TranscriptHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <AcademicSummary data={{
                    overallGpa: academicSummary.gpa,
                    totalCompletedAkts: academicSummary.totalCredits.toString(),
                    activeSemester: academicSummary.currentSemester
                }} />

                {transcriptData.map((semester, index) => (
                    <SemesterCard key={index} semester={semester} />
                ))}
            </ScrollView>
        </View>
    );
};

