import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    interpolate, 
    Extrapolate,
    SharedValue
} from 'react-native-reanimated';
import { Theme, spacing, borderRadius, shadows } from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface OnboardingFooterProps {
    data: any[];
    scrollX: SharedValue<number>;
    activeIndex: number;
    onNextPress: () => void;
    onSkipPress: () => void;
    theme: Theme;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({ 
    data, 
    scrollX, 
    activeIndex, 
    onNextPress, 
    onSkipPress, 
    theme 
}) => {
    const s = styles(theme);

    const isLastSlide = activeIndex === data.length - 1;

    return (
        <View style={s.container}>
            {/* Pagination Dots */}
            <View style={s.indicatorContainer}>
                {data.map((_, i) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        const dotWidth = interpolate(
                            scrollX.value,
                            [(i - 1) * width, i * width, (i + 1) * width],
                            [8, 20, 8],
                            Extrapolate.CLAMP
                        );

                        const opacity = interpolate(
                            scrollX.value,
                            [(i - 1) * width, i * width, (i + 1) * width],
                            [0.3, 1, 0.3],
                            Extrapolate.CLAMP
                        );

                        return {
                            width: dotWidth,
                            opacity,
                        };
                    });

                    return <Animated.View key={i} style={[s.dot, animatedStyle]} />;
                })}
            </View>

            {/* Buttons */}
            <View style={s.buttonContainer}>
                {!isLastSlide && (
                    <TouchableOpacity 
                        onPress={onSkipPress} 
                        style={s.skipButton}
                        activeOpacity={0.7}
                    >
                        <Text style={s.skipText}>Atla</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    onPress={onNextPress} 
                    style={[s.nextButton, isLastSlide && s.fullButton]}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[theme.colors.primary, theme.colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={s.gradient}
                    >
                        <Text style={s.nextText}>
                            {isLastSlide ? 'Hadi Başlayalım' : 'Sonraki'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxl,
        alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: spacing.md,
    },
    skipButton: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    skipText: {
        ...theme.typography.bodyMedium,
        color: theme.colors.textSecondary,
    },
    nextButton: {
        flex: 1,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        ...shadows.medium,
    },
    fullButton: {
        width: '100%',
    },
    gradient: {
        paddingVertical: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextText: {
        ...theme.typography.h4,
        color: theme.colors.textOnPrimary,
        fontWeight: 'bold',
    },
});
