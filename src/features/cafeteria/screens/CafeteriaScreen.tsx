import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { MOCK_WEEKLY_MENU } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import Animated, { 
    useSharedValue, 
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    SharedValue
} from 'react-native-reanimated';
import { styles } from './CafeteriaScreen.styles';
import { MealCard } from '../components/MealCard';
import { DailyMenu as MenuItem } from '@/shared/types/models';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PaginationDots = ({ data, scrollX }: { data: any[], scrollX: SharedValue<number> }) => {
    return (
        <View style={paginationStyles.container}>
            {data.map((_, index) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                    const width = interpolate(
                        scrollX.value,
                        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                        [8, 24, 8],
                        Extrapolate.CLAMP
                    );
                    const opacity = interpolate(
                        scrollX.value,
                        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                        [0.4, 1, 0.4],
                        Extrapolate.CLAMP
                    );
                    return { width, opacity };
                });

                return (
                    <Animated.View 
                        key={index} 
                        style={[paginationStyles.dot, animatedDotStyle, { backgroundColor: '#182958' }]} 
                    />
                );
            })}
        </View>
    );
};

export const CafeteriaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, insets);

    const weeklyMenu = useMemo(() => MOCK_WEEKLY_MENU(t), [t]);

    const today = new Date();
    const dayOfWeek = today.getDay();
    const initialIndex = useMemo(() => {
        if (dayOfWeek === 0 || dayOfWeek === 6) return 0;
        return dayOfWeek - 1;
    }, [dayOfWeek]);

    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const flatListRef = useRef<Animated.FlatList<any>>(null);
    const scrollX = useSharedValue(initialIndex * SCREEN_WIDTH);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const transitionTo = useCallback((nextIndex: number) => {
        if (nextIndex < 0 || nextIndex >= weeklyMenu.length) return;
        setSelectedIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });
    }, [weeklyMenu.length]);

    const renderMealItem = ({ item, index }: { item: MenuItem, index: number }) => {
        const isItemToday = (dayOfWeek !== 0 && dayOfWeek !== 6) && (index === dayOfWeek - 1);
        
        return (
            <MealCard
                item={item}
                index={index}
                isItemToday={isItemToday}
                onPrevious={() => transitionTo(index - 1)}
                onNext={() => transitionTo(index + 1)}
                isFirst={index === 0}
                isLast={index === weeklyMenu.length - 1}
                t={t}
                theme={theme}
                scrollX={scrollX}
            />
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" translucent />
            
            <View style={s.meshBackground}>
                <View style={[s.bgGlow, { top: '10%', right: '-10%', width: 300, height: 300, backgroundColor: 'rgba(59, 130, 246, 0.05)' }]} />
                <View style={[s.bgGlow, { bottom: '20%', left: '-20%', width: 400, height: 400, backgroundColor: 'rgba(99, 102, 241, 0.03)' }]} />
            </View>

            <View style={s.mainContent}>
                <View style={{ flex: 1 }}>
                    <Animated.FlatList
                        ref={flatListRef as any}
                        data={weeklyMenu}
                        renderItem={renderMealItem}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={initialIndex}
                        onScroll={onScroll}
                        getItemLayout={(_, index) => ({
                            length: SCREEN_WIDTH,
                            offset: SCREEN_WIDTH * index,
                            index,
                        })}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                            setSelectedIndex(newIndex);
                        }}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        snapToInterval={SCREEN_WIDTH}
                        snapToAlignment="center"
                        keyExtractor={(item) => item.date}
                    />
                    
                    <PaginationDots data={weeklyMenu} scrollX={scrollX} />
                </View>

                <View style={s.bottomInfo}>
                    <Icon name="information-circle-outline" size={24} color="#EF4444" />
                    <Text style={s.infoText}>
                        {t('cafeteria.weeklyInfo')}
                    </Text>
                </View>
            </View>

            {selectedIndex !== initialIndex && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={s.todayFab}
                    onPress={() => transitionTo(initialIndex)}
                >
                    <LinearGradient colors={['#182958', '#101D42']} style={s.fabGradient}>
                        <Icon name="calendar-outline" size={24} color="#FFFFFF" />
                        <Text style={s.todayFabText}>{t('common.today')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </View>
    );
};

const paginationStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    }
});

export default CafeteriaScreen;
