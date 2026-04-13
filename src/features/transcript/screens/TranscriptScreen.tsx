import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { styles } from './TranscriptScreen.styles';
import { TRANSCRIPT_DATA, ACADEMIC_SUMMARY } from './constants';

// Sub-components
import { TranscriptHeader } from './components/TranscriptHeader';
import { AcademicSummary } from './components/AcademicSummary';
import { SemesterCard } from './components/SemesterCard';

/**
 * TranscriptScreen
 * Senior-level modularized screen for viewing academic performance.
 */
export const TranscriptScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const s = styles(theme);

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
                <AcademicSummary data={ACADEMIC_SUMMARY} />

                {TRANSCRIPT_DATA.map((semester, index) => (
                    <SemesterCard key={index} semester={semester} />
                ))}
            </ScrollView>
        </View>
    );
};
