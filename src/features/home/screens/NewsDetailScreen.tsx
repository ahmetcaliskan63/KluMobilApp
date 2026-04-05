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
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@/shared/types/navigation';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { News } from '@/shared/types/models';
import { useFetch } from '@/shared/hooks/useFetch';
import { viewport, moderateScale, scale, verticalScale } from '@/shared/utils/responsive';

type NewsDetailRouteProp = RouteProp<HomeStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<NewsDetailRouteProp>();
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const { newsId } = route.params;
    const [imageError, setImageError] = React.useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const buttonScale = React.useRef(new Animated.Value(1)).current;

    const { data: news, loading, error } = useFetch<News>(`/news/${newsId}`);

    if (loading && !news) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.primary }}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error || !news) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Haber bulunamadı.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: theme.colors.primary }}>Geri Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

    const textOpacity = scrollY.interpolate({
        inputRange: [0, headerHeight / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [headerHeight - 80, headerHeight - 30],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const backButtonBg = scrollY.interpolate({
        inputRange: [0, headerHeight - 100],
        outputRange: ['rgba(0,0,0,0.3)', 'rgba(255,255,255,0.1)'],
        extrapolate: 'clamp',
    });

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
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
                    <Animated.Text style={[s.title, { opacity: textOpacity }]}>{news.title}</Animated.Text>
                    <View style={s.metaRow}>
                        <View style={s.metaItem}>
                            <Icon name="eye-outline" size={16} color="#8E8E93" />
                            <Text style={s.metaText}>{news.views}</Text>
                        </View>
                        <View style={s.divider} />
                        <View style={s.metaItem}>
                            <Icon name="calendar-outline" size={16} color="#8E8E93" />
                            <Text style={s.metaText}>{news.date}</Text>
                        </View>
                    </View>

                    <View style={s.contentDivider} />
                    <Text style={s.summary}>
                        {t('news.placeholder_snippet')}
                    </Text>
                    <Text style={s.body}>
                        {news.content || t('news.placeholder_body')}
                    </Text>
                </View>
                <View style={{ height: 100 }} />
            </Animated.ScrollView>

            <Animated.View style={[s.dynamicHeader, { height: insets.top + 60, opacity: headerOpacity, paddingTop: insets.top }]}>
                <Text style={s.dynamicTitle} numberOfLines={1}>{news.title}</Text>
            </Animated.View>

            <Animated.View style={[s.backButtonContainer, { top: insets.top + 10, transform: [{ scale: buttonScale }] }]}>
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

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        color: '#1C1C1E',
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
        color: '#8E8E93',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: verticalScale(14),
        backgroundColor: '#E5E5EA',
    },
    contentDivider: {
        height: 1,
        backgroundColor: '#F2F2F7',
        marginVertical: verticalScale(20),
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        padding: scale(24),
        minHeight: viewport.height - verticalScale(370),
    },
    indicator: {
        width: scale(40),
        height: verticalScale(5),
        backgroundColor: '#E5E5EA',
        borderRadius: moderateScale(2.5),
        alignSelf: 'center',
        marginBottom: verticalScale(25),
    },
    summary: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1C1C1E',
        lineHeight: moderateScale(26),
        marginBottom: verticalScale(20),
    },
    body: {
        fontSize: moderateScale(16),
        color: '#3A3A3C',
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
        backgroundColor: '#182958',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(70),
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

