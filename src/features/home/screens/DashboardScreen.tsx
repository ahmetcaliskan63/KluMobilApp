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
import { Theme, spacing, borderRadius, shadows } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { viewport, moderateScale, verticalScale } from '@/shared/utils/responsive';
import { useNavigation, CompositeNavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, HomeStackParamList } from '@/shared/types/navigation';
import {
    MOCK_ANNOUNCEMENTS,
    MOCK_NEWS,
    MOCK_EVENTS,
} from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';
import { News, Announcement, Event as EventType } from '@/shared/types/models';
import { NewsCard } from '@/shared/components/home/NewsCard';
import { AnnouncementCard } from '@/shared/components/home/AnnouncementCard';
import { EventCard } from '@/shared/components/home/EventCard';

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
    const { t } = useTranslation();
    const s = styles(theme);
    
    // Internal keys for tabs
    const TABS = {
        ANNOUNCEMENTS: 'announcements',
        NEWS: 'news',
        EVENTS: 'events'
    } as const;

    type TabKey = typeof TABS[keyof typeof TABS];

    const [activeTab, setActiveTab] = React.useState<TabKey>(TABS.NEWS);
    
    // Segmented control metrics
    const SEGMENT_PADDING = 4;
    const SEGMENT_WIDTH = (viewport.width - spacing.md * 2 - SEGMENT_PADDING * 2) / 3;
    const translateX = React.useRef(new Animated.Value(SEGMENT_WIDTH)).current;

    const handleTabPress = React.useCallback((tab: TabKey, index: number) => {
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
            handleTabPress(TABS.NEWS, 1);
        }
    }, [route.params?.resetToNews, handleTabPress]);

    const renderNewsCard = React.useCallback((item: News) => (
        <NewsCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
        />
    ), [navigation]);

    const renderAnnouncementCard = React.useCallback((item: Announcement) => (
        <AnnouncementCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
        />
    ), [navigation]);

    const renderEventCard = React.useCallback((item: EventType) => (
        <EventCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
        />
    ), [navigation]);

    const tabsData = [
        { key: TABS.ANNOUNCEMENTS, label: t('dashboard.announcements') },
        { key: TABS.NEWS, label: t('dashboard.news') },
        { key: TABS.EVENTS, label: t('dashboard.events') },
    ];

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" translucent={false} />

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
                    {tabsData.map((tab, index) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={s.segmentButton}
                                onPress={() => handleTabPress(tab.key, index)}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    s.segmentText,
                                    isActive && s.segmentTextActive
                                ]}>
                                    {tab.label}
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
                    {activeTab === TABS.ANNOUNCEMENTS && MOCK_ANNOUNCEMENTS(t).map(renderAnnouncementCard)}
                    {activeTab === TABS.NEWS && MOCK_NEWS(t).map(renderNewsCard)}
                    {activeTab === TABS.EVENTS && MOCK_EVENTS(t).map(renderEventCard)}
                </View>

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
        paddingTop: spacing.md,
        paddingBottom: verticalScale(120), // Increased bottom padding
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
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.full,
        padding: 4,
        position: 'relative',
        height: verticalScale(46),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
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
