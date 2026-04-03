import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    interpolate, 
    Extrapolate,
    SharedValue
} from 'react-native-reanimated';
import { Theme, spacing } from '../../config/theme';
import { viewport, moderateScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

interface OnboardingItemProps {
    item: {
        id: string;
        title: string;
        description: string;
        image: any;
    };
    index: number;
    scrollX: SharedValue<number>;
    theme: Theme;
}

export const OnboardingItem: React.FC<OnboardingItemProps> = ({ item, index, scrollX, theme }) => {
    const s = styles(theme);

    const animatedImageStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.8, 1, 0.8],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [100, 0, 100],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }],
            opacity,
        };
    });

    return (
        <View style={s.container}>
            <Animated.View style={[s.imageContainer, animatedImageStyle]}>
                <Image 
                    source={item.image} 
                    style={s.image} 
                    resizeMode="contain" 
                />
            </Animated.View>

            <Animated.View style={[s.textContainer, animatedTextStyle]}>
                <Text style={s.title}>{item.title}</Text>
                <Text style={s.description}>{item.description}</Text>
            </Animated.View>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    imageContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: viewport.width * 0.85,
        height: viewport.width * 0.85,
    },
    textContainer: {
        flex: 0.4,
        alignItems: 'center',
        paddingTop: spacing.md,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    description: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: moderateScale(24),
    },
});
