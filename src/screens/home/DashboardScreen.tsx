import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar,
    Animated,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';

const { width } = Dimensions.get('window');
const horizontalScale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, HomeStackParamList } from '../../types/navigation';
import {
    MOCK_ANNOUNCEMENTS,
    MOCK_NEWS,
    MOCK_EVENTS,
    MOCK_STATS,
    MOCK_WEEKLY_MENU,
} from '../../data/mockData';
import { Image } from 'react-native';

type DashboardNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>,
    BottomTabNavigationProp<MainTabParamList>
>;

export const DashboardScreen: React.FC = () => {
    const { user } = useAuthStore();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<DashboardNavigationProp>();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);

    const [activeTab, setActiveTab] = React.useState<'Haberler' | 'Duyurular' | 'Etkinlikler'>('Haberler');
    const translateX = React.useRef(new Animated.Value(0)).current;

    const handleTabPress = (tab: 'Haberler' | 'Duyurular' | 'Etkinlikler', index: number) => {
        setActiveTab(tab);
        Animated.spring(translateX, {
            toValue: index * ((width - 48) / 3), // 48 = padding 20*2 + control padding 4*2
            useNativeDriver: true,
            bounciness: 4,
            speed: 12,
        }).start();
    };

    const renderNewsCard = (item: any) => {
        const scale = React.useRef(new Animated.Value(1)).current;
        const handlePressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, tension: 100, friction: 10 }).start();
        const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 100, friction: 10 }).start();

        return (
            <Animated.View key={item.id} style={{ transform: [{ scale }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
                    style={s.premiumNewsCard}
                >
                    <Image source={{ uri: item.image }} style={s.premiumNewsImage} resizeMode="cover" />
                    <View style={s.premiumNewsOverlay}>
                        <View style={s.newsContentBottom}>
                            <Text style={s.premiumNewsTitle} numberOfLines={2}>{item.title}</Text>
                            <View style={s.newsMetaRow}>
                                <View style={s.newsMetaItem}>
                                    <Icon name="eye-outline" size={14} color="rgba(255,255,255,0.8)" />
                                    <Text style={s.newsMetaText}>{item.views}</Text>
                                </View>
                                <View style={s.newsDivider} />
                                <View style={s.newsMetaItem}>
                                    <Icon name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                                    <Text style={s.newsMetaText}>{item.date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        );
    };

    const renderAnnouncementCard = (item: any) => {
        const scale = React.useRef(new Animated.Value(1)).current;
        const handlePressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
        const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

        const isAcademic = item.category === 'AKADEMİK';
        const accentColor = isAcademic ? '#0A84FF' : '#101D42';

        return (
            <Animated.View key={item.id} style={{ transform: [{ scale }] }}>
                <View style={s.announcementCard}>
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
                        style={s.announcementInner}
                    >
                        <View style={[s.announcementIconWrapper, { backgroundColor: `${accentColor}10` }]}>
                            <Icon name="megaphone" size={20} color={accentColor} />
                        </View>
                        <View style={s.announcementInfo}>
                            <View style={s.announcementHeader}>
                                <Text style={[s.announcementTag, { color: accentColor }]}>{item.category}</Text>
                                <View style={s.dotSeparator} />
                                <Text style={s.announcementDateText}>{item.date}</Text>
                            </View>
                            <Text style={s.announcementTitle} numberOfLines={2}>{item.title}</Text>
                            <View style={s.announcementFooter}>
                                <View style={s.metaItem}>
                                    <Icon name="eye-outline" size={14} color="#8E8E93" />
                                    <Text style={s.metaTextLight}>{item.views} Görüntülenme</Text>
                                </View>
                                <Icon name="chevron-forward" size={16} color="#C7C7CC" />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Animated.View>
        );
    };

    const renderEventCard = (item: any) => {
        const scale = React.useRef(new Animated.Value(1)).current;
        const handlePressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
        const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

        return (
            <Animated.View key={item.id} style={{ transform: [{ scale }] }}>
                <Card style={s.eventCard} elevation="small">
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
                        style={s.eventInner}
                    >
                        <Image source={{ uri: item.image }} style={s.eventImage} resizeMode="cover" />
                        <View style={s.eventContent}>
                            <Text style={s.eventTitle} numberOfLines={2}>{item.title}</Text>
                            <View style={s.eventDetails}>
                                <View style={s.metaItem}>
                                    <Icon name="calendar-outline" size={14} color={theme.colors.textSecondary} />
                                    <Text style={s.eventDetailText}>{item.date}</Text>
                                </View>
                                <View style={s.metaItem}>
                                    <Icon name="time-outline" size={14} color={theme.colors.textSecondary} />
                                    <Text style={s.eventDetailText}>{item.time}</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </Card>
            </Animated.View>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Fixed Premium Segmented Control (Sticky Header) */}
            <View style={s.fixedTabContainer}>
                <View style={s.segmentedControl}>
                    {(['Haberler', 'Duyurular', 'Etkinlikler'] as const).map((tab, index) => {
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
                    {activeTab === 'Haberler' && MOCK_NEWS.map(renderNewsCard)}
                    {activeTab === 'Duyurular' && MOCK_ANNOUNCEMENTS.map(renderAnnouncementCard)}
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
    premiumNewsCard: {
        marginBottom: 25,
        height: 300, // Slightly taller for more impact
        borderRadius: 32, // More premium rounded corners
        backgroundColor: '#000',
        overflow: 'hidden',
        ...theme.shadows.large, // Stronger shadow
    },
    premiumNewsImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.95, // Let some black show through for depth
    },
    premiumNewsOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)', // Smooth subtle dimming
        justifyContent: 'flex-end', // Aligned to bottom
        padding: 24,
    },
    newsTagWrapper: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.12)', // Subtle glass effect
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
    },
    newsTagText: {
        color: '#FFFFFF',
        fontSize: moderateScale(10.5),
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.8, // More professional spacing
    },
    newsContentBottom: {
        gap: 12,
    },
    premiumNewsTitle: {
        fontSize: moderateScale(18),
        color: '#FFFFFF',
        fontWeight: '800',
        lineHeight: 26,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    newsMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    newsMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    newsMetaText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    newsDivider: {
        width: 1,
        height: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    announcementCard: {
        marginBottom: 16,
        borderRadius: 28, // Increased for a more modern, pill-like feel
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.08,
                shadowRadius: 16.5,
            },
            android: {
                elevation: 4,
            },
        }),
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)', // Subtle border for definition
    },
    announcementInner: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    announcementIconWrapper: {
        width: 48, // Slightly smaller
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1.5, // Added subtle outline for icon
    },
    announcementInfo: {
        flex: 1,
    },
    announcementHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    announcementTag: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    dotSeparator: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#C7C7CC',
        marginHorizontal: 8,
    },
    announcementDateText: {
        fontSize: moderateScale(11),
        color: '#8E8E93',
        fontWeight: '600',
    },
    announcementTitle: {
        fontSize: moderateScale(15), // Slightly larger
        fontWeight: '700',
        color: '#1C1C1E',
        lineHeight: 22,
        marginBottom: 12,
        letterSpacing: -0.3,
    },
    announcementFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F2F2F7',
        paddingTop: 10,
    },
    metaTextLight: {
        fontSize: moderateScale(11),
        color: '#8E8E93',
        fontWeight: '600',
        marginLeft: 4,
    },
    eventCard: {
        marginBottom: 20,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 12,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    eventInner: {
        height: 120,
        flexDirection: 'row',
    },
    eventImage: {
        width: 100,
        height: '100%',
    },
    eventOverlay: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    eventTypeBadge: {
        backgroundColor: '#101D42',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    eventTypeText: {
        color: '#FFFFFF',
        fontSize: moderateScale(10),
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    eventContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    eventTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
        lineHeight: 20,
        letterSpacing: -0.2,
    },
    eventDetails: {
        gap: 6,
    },
    eventDetailText: {
        fontSize: moderateScale(11.5),
        color: '#8E8E93',
        fontWeight: '600',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: moderateScale(12),
        color: '#8E8E93',
    },
});
