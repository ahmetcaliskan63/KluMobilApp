import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ViewToken } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { OnboardingItem } from '@/shared/components/common/OnboardingItem';
import { OnboardingFooter } from '@/shared/components/common/OnboardingFooter';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useAppStore } from '@/shared/store/appStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { useTranslation } from 'react-i18next';

import { MOCK_ONBOARDING_SLIDES } from '@/shared/services/mockData';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const slides = MOCK_ONBOARDING_SLIDES(t);
    const navigation = useNavigation<OnboardingNavigationProp>();
    const setCompletedOnboarding = useAppStore(state => state.setCompletedOnboarding);

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    }).current;

    const handleNext = useCallback(() => {
        if (activeIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: activeIndex + 1,
                animated: true,
            });
        } else {
            handleComplete();
        }
    }, [activeIndex]);

    const handleSkip = useCallback(() => {
        handleComplete();
    }, []);

    const handleComplete = () => {
        setCompletedOnboarding(true);
        // Navigate to Auth or Main depending on your app flow
        navigation.replace('Auth' as any);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <Animated.FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                renderItem={({ item, index }) => (
                    <OnboardingItem
                        item={item}
                        index={index}
                        scrollX={scrollX}
                        theme={theme}
                    />
                )}
            />

            <OnboardingFooter
                data={slides}
                scrollX={scrollX}
                activeIndex={activeIndex}
                onNextPress={handleNext}
                onSkipPress={handleSkip}
                theme={theme}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

