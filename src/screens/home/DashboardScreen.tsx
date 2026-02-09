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
import { Theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { viewport, moderateScale } from '../../utils/responsive';
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
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const [activeTab, setActiveTab] = React.useState<'Duyurular' | 'Haberler' | 'Etkinlikler'>('Haberler');
    const route = useRoute<RouteProp<HomeStackParamList, 'Dashboard'>>();
    const tabWidth = (viewport.width - 48) / 3;
    const translateX = React.useRef(new Animated.Value(tabWidth)).current;

    // Reset to News when 'resetToNews' param changes (triggered by tab bar re-press)
    React.useEffect(() => {
        const resetToNews = route.params?.resetToNews;
        if (resetToNews) {
            handleTabPress('Haberler', 1);
            // Clear the param after handling to avoid double trigger
            navigation.setParams({ resetToNews: undefined } as any);
        }
    }, [route.params?.resetToNews]);

    // Removed useFocusEffect to preserve tab state when returning from detail screens

    const handleTabPress = (tab: 'Duyurular' | 'Haberler' | 'Etkinlikler', index: number) => {
        setActiveTab(tab);
        Animated.spring(translateX, {
            toValue: index * ((viewport.width - 48) / 3), // 48 = padding 20*2 + control padding 4*2
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
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Fixed Premium Segmented Control (Sticky Header) */}
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
                                                    { width: index === 0 ? 30 : index === 1 ? 40 : 35 }
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

                <View style={{ height: 40 }} />
            </ScrollView>
        </View >
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7', // Apple System Gray 6
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 5,
    },
    fixedTabContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 2, // Fine-tuned
        zIndex: 100,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)', // Extremely subtle line
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 18,
        padding: 4,
        position: 'relative',
        height: 40, // Reduced from 50
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
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#8E8E93',
        letterSpacing: 0.3,
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
        height: 2.5,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        marginTop: 4,
        position: 'absolute',
        bottom: 2,
    },
    contentList: {
        paddingTop: 10,
    },
});
