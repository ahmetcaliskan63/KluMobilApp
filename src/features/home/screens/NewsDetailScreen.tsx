import React from 'react';
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
import { MOCK_NEWS } from '@/shared/services/mockData';
import { viewport, moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { Theme } from '@/core/theme/theme';
import { useTranslation } from 'react-i18next';

type NewsDetailRouteProp = RouteProp<HomeStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<NewsDetailRouteProp>();
    const { newsId } = route.params;
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);
    const [imageError, setImageError] = React.useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const news = MOCK_NEWS(t).find(n => n.id === newsId);

    if (!news) return null;

    const headerHeight = verticalScale(400);

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
        inputRange: [headerHeight - 80, headerHeight - 30],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const backButtonBg = scrollY.interpolate({
        inputRange: [0, headerHeight - 100],
        outputRange: ['rgba(0,0,0,0.35)', isDarkMode ? theme.colors.background : '#182958'],
        extrapolate: 'clamp',
    });

    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.imageContainer}>
                    <Animated.Image
                        source={{ uri: imageError ? 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop' : (news.image || 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop') }}
                        onError={() => setImageError(true)}
                        style={[
                            s.image,
                            {
                                transform: [
                                    { translateY: imageTranslate },
                                    { scale: imageScale }
                                ]
                            }
                        ]}
                    />
                </View>

                <View style={s.contentContainer}>
                    <View style={s.indicator} />
                    <Text style={s.title}>{news.title}</Text>
                    <View style={s.metaRow}>
                        <View style={s.metaItem}>
                            <Icon name="eye-outline" size={16} color={theme.colors.textSecondary} />
                            <Text style={s.metaText}>{news.views} {t('dashboard.views')}</Text>
                        </View>
                        <View style={s.divider} />
                        <View style={s.metaItem}>
                            <Icon name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                            <Text style={s.metaText}>{news.date}</Text>
                        </View>
                    </View>

                    <View style={s.contentDivider} />
                    <Text style={s.summary}>
                        {t('dashboard.newsSummary')}
                    </Text>
                    <Text style={s.body}>
                        {news.content}
                        {"\n\n"}
                        {t('dashboard.newsBody')}
                    </Text>
                </View>
                <View style={{ height: 100 }} />
            </Animated.ScrollView>

            <Animated.View style={[s.dynamicHeader, { height: insets.top + 60, opacity: headerOpacity, paddingTop: insets.top }]}>
                <Text style={s.dynamicTitle} numberOfLines={1}>{news.title}</Text>
            </Animated.View>

            <Animated.View style={[s.backButtonContainer, { top: insets.top + 10, transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => navigation.goBack()}
                    style={[s.backButton, { backgroundColor: 'transparent' }]}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backButtonBg, borderRadius: 22.5 }]} />
                    <Icon name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    imageContainer: {
        height: verticalScale(400),
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerContent: {
        position: 'absolute',
        bottom: verticalScale(40),
        left: scale(20),
        right: scale(20),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: moderateScale(32),
        marginBottom: verticalScale(15),
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(15),
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
    },
    metaText: {
        color: theme.colors.textSecondary,
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: verticalScale(14),
        backgroundColor: theme.colors.border,
    },
    contentDivider: {
        height: 1,
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F2F2F7',
        marginVertical: verticalScale(20),
    },
    contentContainer: {
        backgroundColor: theme.colors.background,
        padding: scale(24),
        minHeight: viewport.height - verticalScale(370),
    },
    indicator: {
        width: scale(40),
        height: verticalScale(5),
        backgroundColor: theme.colors.border,
        borderRadius: moderateScale(2.5),
        alignSelf: 'center',
        marginBottom: verticalScale(25),
    },
    summary: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: theme.colors.text,
        lineHeight: moderateScale(26),
        marginBottom: verticalScale(20),
    },
    body: {
        fontSize: moderateScale(16),
        color: theme.colors.textSecondary,
        lineHeight: moderateScale(28),
        fontWeight: '400',
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
        backgroundColor: isDarkMode ? theme.colors.background : theme.colors.primary,
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
    dynamicTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
});
