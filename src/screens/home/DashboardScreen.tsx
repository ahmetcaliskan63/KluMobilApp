import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { Theme, spacing, borderRadius, shadows } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { viewport, moderateScale, verticalScale } from '../../utils/responsive';
import { useNavigation, CompositeNavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, HomeStackParamList } from '../../types/navigation';
import {
    MOCK_ANNOUNCEMENTS,
    MOCK_NEWS,
    MOCK_EVENTS,
} from '../../data/mockData';
import { NewsCard } from '../../components/home/NewsCard';
import { AnnouncementCard } from '../../components/home/AnnouncementCard';
import { EventCard } from '../../components/home/EventCard';
import { News, Announcement, Event as EventType } from '../../types/data';

type DashboardNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>,
    BottomTabNavigationProp<MainTabParamList>
>;

type DashboardRouteProp = RouteProp<HomeStackParamList, 'Dashboard'>;

// Senior Refactoring: Cards moved to src/components/home

export const DashboardScreen: React.FC = () => {
    const navigation = useNavigation<DashboardNavigationProp>();
    const route = useRoute<DashboardRouteProp>();
    const { theme } = useAppTheme();
    const s = styles(theme);
    const [activeTab, setActiveTab] = React.useState<'Duyurular' | 'Haberler' | 'Etkinlikler'>('Haberler');
    // Segmented control metrics
    const SEGMENT_PADDING = 4;
    const SEGMENT_WIDTH = (viewport.width - spacing.md * 2 - SEGMENT_PADDING * 2) / 3;
    const translateX = React.useRef(new Animated.Value(SEGMENT_WIDTH)).current;

    const handleTabPress = React.useCallback((tab: 'Duyurular' | 'Haberler' | 'Etkinlikler', index: number) => {
        setActiveTab(tab);
        Animated.spring(translateX, {
            toValue: index * SEGMENT_WIDTH,
            useNativeDriver: true,
            bounciness: 2,
            speed: 14,
        }).start();
    }, [SEGMENT_WIDTH, translateX]);

    // Listen for tab reset parameter from navigation
    React.useEffect(() => {
        if (route.params?.resetToNews) {
            handleTabPress('Haberler', 1);
        }
    }, [route.params?.resetToNews, handleTabPress]);

    const renderNewsCard = React.useCallback((item: News) => (
        <NewsCard
            key={item.id}
            item={item}
            theme={theme}
            onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
        />
    ), [navigation, theme]);

    const renderAnnouncementCard = React.useCallback((item: Announcement) => (
        <AnnouncementCard
            key={item.id}
            item={item}
            theme={theme}
            onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
        />
    ), [navigation, theme]);

    const renderEventCard = React.useCallback((item: EventType) => (
        <EventCard
            key={item.id}
            item={item}
            theme={theme}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
        />
    ), [navigation, theme]);

    return (
        <View style={s.container}>
            <StatusBar barStyle={theme.colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />

            <View style={s.fixedTabContainer}>
                <View style={s.segmentedControl}>
                    <Animated.View
                        style={[
                            s.activeBackground,
                            {
                                width: SEGMENT_WIDTH,
                                transform: [{ translateX }]
                            }
                        ]}
                    />
                    {(['Duyurular', 'Haberler', 'Etkinlikler'] as const).map((tab, index) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={s.segmentButton}
                                onPress={() => handleTabPress(tab, index)}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    s.segmentText,
                                    isActive && s.segmentTextActive
                                ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.contentList}>
                    {activeTab === 'Duyurular' && MOCK_ANNOUNCEMENTS.map(renderAnnouncementCard)}
                    {activeTab === 'Haberler' && MOCK_NEWS.map(renderNewsCard)}
                    {activeTab === 'Etkinlikler' && MOCK_EVENTS.map(renderEventCard)}
                </View>

                <View style={{ height: spacing.xl }} />
            </ScrollView>
        </View >
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.md,
        paddingTop: 0,
    },
    fixedTabContainer: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xs,
        zIndex: 100,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: theme.colors.accent,
        borderRadius: borderRadius.full,
        padding: 4,
        position: 'relative',
        height: verticalScale(46),
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
    },
    activeBackground: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: borderRadius.full,
        ...shadows.small,
    },
    segmentButton: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    segmentText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        fontWeight: '600',
        fontSize: moderateScale(14),
    },
    segmentTextActive: {
        color: theme.colors.textOnPrimary,
        fontWeight: '700',
    },
    contentList: {
        paddingTop: 0,
    },
});
