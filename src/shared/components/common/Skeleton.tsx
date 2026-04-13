import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ViewStyle,
    DimensionValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale } from '@/shared/utils/responsive';

interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    variant?: 'circle' | 'rect' | 'rounded';
    style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    variant = 'rect',
    style,
}) => {
    const { theme } = useAppTheme();
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        animation.start();
        return () => animation.stop();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-moderateScale(150), moderateScale(150)],
    });

    const borderRadius =
        variant === 'circle' ? moderateScale(999) :
            variant === 'rounded' ? moderateScale(12) : 0;

    return (
        <View
            style={[
                styles.container,
                {
                    width: width as any,
                    height: height as any,
                    borderRadius,
                    backgroundColor: theme.colors.background === '#FFFFFF'
                        ? 'rgba(0, 0, 0, 0.05)'
                        : 'rgba(255, 255, 255, 0.05)',
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={[
                        'transparent',
                        theme.colors.background === '#FFFFFF'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(255, 255, 255, 0.08)',
                        'transparent',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
});

