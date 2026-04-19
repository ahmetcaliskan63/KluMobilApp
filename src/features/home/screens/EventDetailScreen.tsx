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
import { MOCK_EVENTS } from '@/shared/services/mockData';
import { viewport, moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { Theme } from '@/core/theme/theme';

type EventDetailRouteProp = RouteProp<HomeStackParamList, 'EventDetail'>;

/**
 * EventDetailScreen - Modern & Organized Highlights Redesign
 * Bilgi alanları (Konum, Düzenleyen vb.) ultra-premium ve düzenli bir yapıda.
 */
export const EventDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<EventDetailRouteProp>();
    const { theme, isDarkMode } = useAppTheme();
    const { eventId } = route.params;

    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const event = MOCK_EVENTS.find(e => e.id === eventId);
    const [imageError, setImageError] = React.useState(false);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    if (!event) return null;

    const headerHeight = viewport.height * 0.45;
    const corporateColor = '#182958';

    // Animations
    const imageTranslate = scrollY.interpolate({
        inputRange: [-100, 0, headerHeight],
        outputRange: [50, 0, -headerHeight / 1.5],
        extrapolate: 'clamp',
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-headerHeight, 0],
        outputRange: [2.5, 1],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [headerHeight - 120, headerHeight - 60],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const backButtonBg = scrollY.interpolate({
        inputRange: [0, headerHeight - 100],
        outputRange: ['rgba(0,0,0,0.35)', isDarkMode ? theme.colors.background : corporateColor],
        extrapolate: 'clamp',
    });

    const s = styles(theme, corporateColor, headerHeight);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Dynamic Sticky Header */}
            <Animated.View style={[s.stickyHeader, { height: insets.top + verticalScale(56), opacity: headerOpacity, paddingTop: insets.top }]}>
                <Text style={s.stickyTitle} numberOfLines={1}>{event.title}</Text>
            </Animated.View>

            {/* Floating Back Button */}
            <Animated.View style={[s.backButtonContainer, { top: insets.top + verticalScale(10) }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={s.backButton}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backButtonBg, borderRadius: moderateScale(22.5) }]} />
                    <Icon name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={{ opacity: fadeAnim }}
            >
                {/* Hero Image Section */}
                <View style={s.heroContainer}>
                    <Animated.Image
                        source={{ uri: imageError ? 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop' : (event.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop') }}
                        onError={() => setImageError(true)}
                        style={[
                            s.heroImage,
                            {
                                transform: [
                                    { translateY: imageTranslate },
                                    { scale: imageScale }
                                ]
                            }
                        ]}
                    />
                    <View style={s.heroOverlay} />

                    {/* Bottom Info Area */}
                    <View style={s.heroBottomContent}>
                        <View style={s.typeBadge}>
                            <Text style={s.typeText}>{event.type}</Text>
                        </View>
                        <Text style={s.heroTitle}>{event.title}</Text>
                    </View>
                </View>

                {/* Content Area */}
                <View style={s.mainContent}>

                    <View style={s.highlightsWrapper}>
                        <View style={s.highlightsRow}>
                            <View style={s.highlightCard}>
                                <View style={[s.iconCircle, { backgroundColor: isDarkMode ? 'rgba(0, 102, 255, 0.1)' : '#F0F7FF' }]}>
                                    <Icon name="calendar-outline" size={moderateScale(18)} color={isDarkMode ? '#66A3FF' : '#0066FF'} />
                                </View>
                                <View style={s.highlightInfo}>
                                    <Text style={s.highlightLabel}>TARİH</Text>
                                    <Text style={s.highlightValue}>{event.date}</Text>
                                </View>
                            </View>

                            <View style={s.highlightCard}>
                                <View style={[s.iconCircle, { backgroundColor: isDarkMode ? 'rgba(255, 102, 0, 0.1)' : '#FFF5F0' }]}>
                                    <Icon name="time-outline" size={moderateScale(18)} color={isDarkMode ? '#FF944D' : '#FF6600'} />
                                </View>
                                <View style={s.highlightInfo}>
                                    <Text style={s.highlightLabel}>SAAT</Text>
                                    <Text style={s.highlightValue}>{event.time}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={s.locationHighlight}>
                            <View style={[s.iconBox, { backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : '#F3FBF5' }]}>
                                <Icon name="location-outline" size={moderateScale(20)} color={isDarkMode ? '#34D399' : '#10B981'} />
                            </View>
                            <View style={s.highlightInfo}>
                                <Text style={s.highlightLabel}>ETKİNLİK KONUMU</Text>
                                <Text style={s.highlightValue} numberOfLines={2}>{event.location}</Text>
                            </View>
                        </View>

                        <View style={s.organizerHighlight}>
                            <View style={s.organizerLeft}>
                                <View style={[s.iconCircle, { backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : '#F1F5F9' }]}>
                                    <Icon name="business-outline" size={moderateScale(18)} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                                </View>
                                <View style={s.highlightInfo}>
                                    <Text style={s.highlightLabel}>DÜZENLEYEN BİRİM</Text>
                                    <Text style={s.organizerText}>{event.organizer}</Text>
                                </View>
                            </View>
                            <View style={s.verifiedBadge}>
                                <Icon name="checkmark-circle" size={moderateScale(16)} color="#0066FF" />
                            </View>
                        </View>
                    </View>

                    <View style={s.contentDivider} />

                    {/* Description Section */}
                    <View style={s.sectionHeader}>
                        <View style={s.sectionIndicator} />
                        <Text style={s.sectionTitle}>Etkinlik Hakkında</Text>
                    </View>

                    <Text style={s.description}>
                        Kırklareli Üniversitesi'nin vizyonu doğrultusunda düzenlenen bu etkinlik, akademik paylaşımı teşvik etmek ve sosyal etkileşimi artırmak amacıyla planlanmıştır.
                        {"\n\n"}
                        Gerekli tüm teknik altyapı ve hazırlıklar ilgili birimler tarafından tamamlanmış olup, tüm dış paydaşlarımız ve öğrencilerimizin katılımı beklenmektedir.
                        {"\n\n"}
                        Program akışında oluşabilecek güncellemeler mobil uygulamamız üzerinden anlık olarak bildirilecektir. Kayıt gerektirmeyen bu etkinlikte sizleri de aramızda görmekten mutluluk duyarız.
                    </Text>

                    <View style={{ height: verticalScale(100) }} />
                </View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme, corporateColor: string, headerHeight: number) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: corporateColor,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(60),
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
    stickyTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '700',
    },
    backButtonContainer: {
        position: 'absolute',
        left: scale(20),
        zIndex: 101,
    },
    backButton: {
        width: moderateScale(45),
        height: moderateScale(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContainer: {
        height: headerHeight,
        overflow: 'hidden',
        backgroundColor: corporateColor,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    heroBottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: scale(24),
        paddingBottom: verticalScale(32),
    },
    typeBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        marginBottom: verticalScale(12),
    },
    typeText: {
        color: '#FFFFFF',
        fontSize: moderateScale(11),
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    heroTitle: {
        fontSize: moderateScale(30),
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: moderateScale(38),
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
    mainContent: {
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(32),
        backgroundColor: theme.colors.background,
        marginTop: verticalScale(-25),
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
    },
    highlightsWrapper: {
        gap: verticalScale(14),
        marginBottom: verticalScale(32),
    },
    highlightsRow: {
        flexDirection: 'row',
        gap: scale(14),
    },
    highlightCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(22),
        padding: scale(14),
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    locationHighlight: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(22),
        padding: scale(16),
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    organizerHighlight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(22),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(14),
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
    },
    organizerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(14),
        flex: 1,
    },
    iconCircle: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(19),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(14),
    },
    highlightInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    highlightLabel: {
        fontSize: moderateScale(10),
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 3,
    },
    highlightValue: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: moderateScale(20),
    },
    organizerText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: theme.colors.textSecondary,
    },
    verifiedBadge: {
        marginLeft: scale(8),
    },
    contentDivider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginBottom: verticalScale(32),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(18),
    },
    sectionIndicator: {
        width: scale(4),
        height: verticalScale(20),
        backgroundColor: corporateColor,
        borderRadius: 2,
        marginRight: scale(12),
    },
    sectionTitle: {
        fontSize: moderateScale(19),
        fontWeight: '900',
        color: theme.colors.text,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(28),
        color: theme.colors.textSecondary,
        fontWeight: '400',
    },
});
