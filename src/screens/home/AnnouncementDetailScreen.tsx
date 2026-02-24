import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Theme } from '../../config/theme';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';

type AnnouncementDetailRouteProp = RouteProp<HomeStackParamList, 'AnnouncementDetail'>;

/**
 * AnnouncementDetailScreen - Ultra-Premium Corporate Final
 * Saf, minimalist ve yüksek prestijli kurumsal tasarım.
 */
export const AnnouncementDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<AnnouncementDetailRouteProp>();
    const { theme } = useAppTheme();
    const { announcementId } = route.params;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;

    const announcement = MOCK_ANNOUNCEMENTS.find(a => a.id === announcementId);
    const [imageError, setImageError] = React.useState(false);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    if (!announcement) return null;

    const corporateColor = '#182958'; // KLU Kurumsal Lacivert

    const s = styles(theme, corporateColor);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor={corporateColor} />

            {/* Premium Corporate Header - Ultra Minimalist */}
            <View style={[s.header, { paddingTop: insets.top, backgroundColor: corporateColor }]}>
                <View style={s.headerNav}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.headerButton}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Animated.Text
                        style={[
                            s.headerNavTitle,
                            {
                                opacity: scrollY.interpolate({
                                    inputRange: [40, 80],
                                    outputRange: [0, 1],
                                    extrapolate: 'clamp',
                                })
                            }
                        ]}
                        numberOfLines={1}
                    >
                        {announcement.title}
                    </Animated.Text>

                    {/* Placeholder for symmetry */}
                    <View style={s.headerButton} />
                </View>
            </View>

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
                {(announcement.image || imageError) && (
                    <View style={s.imageWrapper}>
                        <Image
                            source={{
                                uri: imageError
                                    ? (announcement.category === 'Akademik'
                                        ? 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop'
                                        : 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop')
                                    : (announcement.image || (announcement.category === 'Akademik'
                                        ? 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop'
                                        : 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop'))
                            }}
                            onError={() => setImageError(true)}
                            style={s.mainImage}
                            resizeMode="cover"
                        />
                    </View>
                )}

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
                        <Icon name="eye-outline" size={moderateScale(13)} color={theme.colors.textLight} />
                        <Text style={s.viewText}>{announcement.views} görüntülenme</Text>
                    </View>
                </View>

                {/* Content Section - Focused & High Readability */}
                <View style={s.contentContainer}>
                    <Text style={s.contentText}>
                        {announcement.content}
                        {"\n\n"}
                        Kırklareli Üniversitesi Rektörlüğü tarafından yayımlanan bu duyuru, ilgili tüm birimler ve öğrencilerimiz için geçerlidir.
                        {"\n\n"}
                        Duyuru kapsamında belirtilen hususlara uyulması, akademik takvim ve uygulama süreçleri açısından büyük önem arz etmektedir.
                        {"\n\n"}
                        Detaylı bilgi için ilgili birimlere başvurulabilir veya üniversitemizin resmi web sitesi ziyaret edilebilir.
                    </Text>
                </View>

                {/* Minimalist Bottom Decoration */}
                <View style={s.bottomAccent}>
                    <View style={[s.accentLine, { backgroundColor: corporateColor }]} />
                </View>

                <View style={{ height: verticalScale(100) }} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = (theme: Theme, corporateColor: string) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingTop: verticalScale(0), // Removed padding to let image start from top if needed, or keep minimal
    },
    imageWrapper: {
        width: '100%',
        height: verticalScale(220),
        backgroundColor: '#F3F4F6',
        marginBottom: verticalScale(24),
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    titleSection: {
        paddingHorizontal: scale(24),
        marginBottom: verticalScale(28),
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(16),
    },
    categoryBadge: {
        backgroundColor: '#F8F9FB',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(4),
        borderLeftWidth: 3,
        borderLeftColor: corporateColor,
    },
    categoryText: {
        fontSize: moderateScale(11),
        fontWeight: '800',
        color: corporateColor,
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
        color: '#111827',
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
        color: theme.colors.textLight,
        fontWeight: '500',
    },
    contentContainer: {
        paddingHorizontal: scale(24),
    },
    contentText: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(28),
        color: '#374151',
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
