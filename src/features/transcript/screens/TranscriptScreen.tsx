import React, { useMemo } from 'react';
import { View, StatusBar } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { styles } from './TranscriptScreen.styles';
import { MOCK_TRANSCRIPT, MOCK_ACADEMIC_STATS } from '@/shared/services/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

// Sub-components
import { TranscriptHeader } from './components/TranscriptHeader';
import { AcademicSummary } from './components/AcademicSummary';
import { SemesterCard } from './components/SemesterCard';

import { useTranslation } from 'react-i18next';

export const TranscriptScreen: React.FC = () => {
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);
    const insets = useSafeAreaInsets();

    // 🏎️ Animation Logic
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const stats = useMemo(() => MOCK_ACADEMIC_STATS(t), [t]);
    const transcriptData = useMemo(() => MOCK_TRANSCRIPT(t), [t]);

    const bodyAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, 100],
            [0, -10],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ translateY }],
        };
    });

    return (
        <View style={s.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <TranscriptHeader scrollOffset={scrollY} />

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    s.scrollContent,
                    {
                        paddingTop: insets.top + 70, // Header height + padding
                        paddingBottom: insets.bottom + 40
                    }
                ]}
            >
                <Animated.View style={bodyAnimatedStyle}>
                    <AcademicSummary data={stats} />

                    {transcriptData.map((semester, index) => (
                        <SemesterCard key={index} semester={semester} />
                    ))}
                </Animated.View>
            </Animated.ScrollView>
        </View>
    );
};
