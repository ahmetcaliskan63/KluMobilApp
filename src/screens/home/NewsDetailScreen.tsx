import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    Animated,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MOCK_NEWS } from '../../data/mockData';

const { width, height } = Dimensions.get('window');

type NewsDetailRouteProp = RouteProp<HomeStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<NewsDetailRouteProp>();
    const { theme } = useAppTheme();
    const { newsId } = route.params;
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const news = MOCK_NEWS.find(n => n.id === newsId);

    if (!news) return null;

    const headerHeight = 400;

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
                        source={{ uri: news.image }}
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
                        Üniversitemiz tarafından düzenlenen bu önemli gelişme, akademik ve yerel topluluklar için büyük önem taşımaktadır.
                    </Text>
                    <Text style={s.body}>
                        {news.content}
                        {"\n\n"}
                        Ziyaret kapsamında iki üniversite arasında akademik iş birliği, ortak projeler ve bölgesel kalkınma odaklı strategic çalışmalar ele alındı. Rektörümüz, nazik ziyaretlerinden dolayı konuk heyete teşekkürlerini ileterek, bölgemizin eğitim kalitesini artırmak için dayanışma içerisinde çalışmaya devam edeceklerini belirtti.{"\n\n"}
                        Görüşmede ayrıca üniversite kampüslerinin geliştirilmesi, öğrenci değişim programlarının kapsamının genişletilmesi ve teknolojik altyapı paylaşımı gibi konular üzerinde fikir alışverişinde bulunuldu. Ziyaret, karşılıklı hediye takdimi ve günün anısına çekilen hatıra fotoğrafı ile sona erdi.
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

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        height: 400,
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
        bottom: 40,
        left: 20,
        right: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1C1C1E',
        lineHeight: 32,
        marginBottom: 15,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: '#8E8E93',
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: 14,
        backgroundColor: '#E5E5EA',
    },
    contentDivider: {
        height: 1,
        backgroundColor: '#F2F2F7',
        marginVertical: 20,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        minHeight: height - 370,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E5E5EA',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 25,
    },
    summary: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        lineHeight: 26,
        marginBottom: 20,
    },
    body: {
        fontSize: 16,
        color: '#3A3A3C',
        lineHeight: 28,
        fontWeight: '400',
    },
    backButtonContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 101,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
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
        paddingHorizontal: 70,
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
        fontSize: 16,
        fontWeight: '700',
    },
});
