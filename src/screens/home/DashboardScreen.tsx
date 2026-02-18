import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    StatusBar,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing, borderRadius } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { viewport, moderateScale, scale, verticalScale } from '../../utils/responsive';
import { useNavigation, useRoute, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
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


// Senior Refactoring: Cards moved to src/components/home

export const DashboardScreen: React.FC = () => {
    const { user } = useAuthStore();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<DashboardNavigationProp>();
    const { theme } = useAppTheme();
    const s = styles(theme);
    const [activeTab, setActiveTab] = React.useState<'Duyurular' | 'Haberler' | 'Etkinlikler'>('Haberler');
    // Dynamic tab width calculation based on viewport to ensure responsiveness
    const tabWidth = (viewport.width - moderateScale(48)) / 3;
    const translateX = React.useRef(new Animated.Value(tabWidth)).current;

    const handleTabPress = (tab: 'Duyurular' | 'Haberler' | 'Etkinlikler', index: number) => {
        setActiveTab(tab);
        Animated.spring(translateX, {
            toValue: index * ((viewport.width - 48) / 3),
            useNativeDriver: true,
            bounciness: 4,
            speed: 12,
        }).start();
    };

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
                    {(['Duyurular', 'Haberler', 'Etkinlikler'] as const).map((tab, index) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={s.segmentButton}
                                onPress={() => handleTabPress(tab, index)}
                                activeOpacity={0.7}
                            >
                                <View style={s.tabContentWrapper}>
                                    <View style={s.textIndicatorWrapper}>
                                        <Text style={[
                                            s.segmentText,
                                            isActive && s.segmentTextActive
                                        ]}>
                                            {tab}
                                        </Text>
                                        {isActive && (
                                            <Animated.View
                                                style={[
                                                    s.activeIndicatorLine,
                                                    { width: index === 0 ? moderateScale(30) : index === 1 ? moderateScale(40) : moderateScale(35) }
                                                ]}
                                            />
                                        )}
                                    </View>
                                </View>
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
        paddingTop: 5,
    },
    fixedTabContainer: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: spacing.md,
        paddingTop: 0,
        paddingBottom: 2,
        zIndex: 100,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: borderRadius.lg,
        padding: 4,
        position: 'relative',
        height: 40,
        alignItems: 'center',
    },
    segmentButton: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    tabContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: '100%',
    },
    segmentText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    segmentTextActive: {
        color: theme.colors.primary,
        fontWeight: '700',
        fontSize: moderateScale(14.5),
    },
    textIndicatorWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    activeIndicatorLine: {
        height: verticalScale(2.5),
        backgroundColor: theme.colors.primary,
        borderRadius: borderRadius.sm,
        marginTop: verticalScale(4),
        position: 'absolute',
        bottom: verticalScale(2),
    },
    contentList: {
        paddingTop: 10,
    },
});
