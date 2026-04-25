import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
    Platform,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@/shared/types/navigation';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme } from '@/core/theme/theme';
import { MOCK_ANNOUNCEMENTS } from '@/shared/services/mockData';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { useTranslation } from 'react-i18next';

type AnnouncementDetailRouteProp = RouteProp<HomeStackParamList, 'AnnouncementDetail'>;

/**
 * AnnouncementDetailScreen - Ultra-Premium Corporate Final
 * Saf, minimalist ve yüksek prestijli kurumsal tasarım.
 */
export const AnnouncementDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<AnnouncementDetailRouteProp>();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const { announcementId } = route.params;
    const [imageError, setImageError] = React.useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const announcement = MOCK_ANNOUNCEMENTS(t).find(a => a.id === announcementId);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    if (!announcement) return null;

    const activeColor = isDarkMode ? theme.colors.primary : '#182958';
    const s = styles(theme, activeColor, isDarkMode);

    const headerHeight = verticalScale(300);

    const imageTranslate = scrollY.interpolate({
        inputRange: [-headerHeight, 0, headerHeight],
        outputRange: [headerHeight / 2, 0, -headerHeight / 2],
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-headerHeight, 0],
        outputRange: [2, 1],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [headerHeight - 100, headerHeight - 40],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const backButtonBg = scrollY.interpolate({
        inputRange: [0, headerHeight - 100],
        outputRange: ['rgba(0,0,0,0.35)', isDarkMode ? theme.colors.background : activeColor],
        extrapolate: 'clamp',
    });

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Back Button - Floating */}
            <Animated.View style={[s.backButtonContainer, { top: insets.top + 10 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={s.backButton}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backButtonBg, borderRadius: 22.5 }]} />
                    <Icon name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[s.dynamicHeader, { height: insets.top + 60, opacity: headerOpacity, paddingTop: insets.top, backgroundColor: isDarkMode ? theme.colors.background : activeColor }]}>
                <Text style={s.headerNavTitle} numberOfLines={1}>{announcement.title}</Text>
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
                style={{ opacity: fadeAnim }}
            >
                {/* Visual Header - New image addition */}
                <View style={s.imageWrapper}>
                    <Animated.Image
                        source={{
                            uri: imageError
                                ? (announcement.category === t('dashboard.categories.academic')
                                    ? 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop'
                                    : 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop')
                                : (announcement.image || (announcement.category === t('dashboard.categories.academic')
                                    ? 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop'
                                    : 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop'))
                        }}
                        onError={() => setImageError(true)}
                        style={[
                            s.mainImage,
                            {
                                transform: [
                                    { translateY: imageTranslate },
                                    { scale: imageScale }
                                ]
                            }
                        ]}
                        resizeMode="cover"
                    />
                    <View style={s.imageOverlay} />
                </View>

                {/* Ultra-Clean Title Section */}
                <View style={s.titleSection}>
                    <View style={s.badgeRow}>
                        <View style={s.categoryBadge}>
                            <Text style={s.categoryText}>{announcement.category}</Text>
                        </View>
                        <View style={s.metaItem}>
                            <Icon name="calendar-outline" size={moderateScale(14)} color={theme.colors.textSecondary} />
                            <Text style={s.metaText}>{announcement.date}</Text>
                        </View>
                    </View>

                    <Text style={s.mainTitle}>{announcement.title}</Text>

                    <View style={s.viewCount}>
                        <Icon name="eye-outline" size={moderateScale(13)} color={theme.colors.textSecondary} />
                        <Text style={s.viewText}>{announcement.views} {t('dashboard.views')}</Text>
                    </View>
                </View>

                {/* Content Section - Focused & High Readability */}
                <View style={s.contentContainer}>
                    <Text style={s.contentText}>
                        {announcement.content}
                        {"\n\n"}
                        {t('dashboard.announcementSummary')}
                        {"\n\n"}
                        {t('dashboard.announcementBody')}
                    </Text>
                </View>

                {/* Minimalist Bottom Decoration */}
                <View style={s.bottomAccent}>
                    <View style={[s.accentLine, { backgroundColor: activeColor }]} />
                </View>

                <View style={{ height: verticalScale(100) }} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme, activeColor: string, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 10,
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(12),
        height: verticalScale(56),
    },
    headerButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNavTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
        letterSpacing: 0.3,
        paddingHorizontal: scale(8),
    },
    scrollContent: {
        paddingTop: verticalScale(0),
    },
    imageWrapper: {
        width: '100%',
        height: verticalScale(300),
        backgroundColor: theme.colors.card,
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    backButtonContainer: {
        position: 'absolute',
        left: scale(20),
        zIndex: 101,
    },
    backButton: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(22.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    dynamicHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(70),
        borderBottomWidth: isDarkMode ? 1 : 0,
        borderBottomColor: theme.colors.border,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    titleSection: {
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(24),
        marginBottom: verticalScale(28),
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(16),
    },
    categoryBadge: {
        backgroundColor: isDarkMode ? `${activeColor}15` : '#F8F9FB',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(4),
        borderLeftWidth: 3,
        borderLeftColor: activeColor,
    },
    categoryText: {
        fontSize: moderateScale(11),
        fontWeight: '800',
        color: activeColor,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
    },
    metaText: {
        fontSize: moderateScale(13),
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    mainTitle: {
        fontSize: moderateScale(22),
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: moderateScale(30),
        marginBottom: verticalScale(16),
    },
    viewCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
    },
    viewText: {
        fontSize: moderateScale(12),
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    contentContainer: {
        paddingHorizontal: scale(24),
    },
    contentText: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(28),
        color: theme.colors.textSecondary,
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0.1,
    },
    bottomAccent: {
        marginTop: verticalScale(40),
        alignItems: 'center',
    },
    accentLine: {
        width: scale(40),
        height: verticalScale(3),
        borderRadius: moderateScale(2),
        opacity: 0.3,
    },
});
