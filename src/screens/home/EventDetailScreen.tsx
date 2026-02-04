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
import { MOCK_EVENTS } from '../../data/mockData';

const { width, height } = Dimensions.get('window');

type EventDetailRouteProp = RouteProp<HomeStackParamList, 'EventDetail'>;

export const EventDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<EventDetailRouteProp>();
    const { theme } = useAppTheme();
    const s = styles(theme);
    const { eventId } = route.params;
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const event = MOCK_EVENTS.find(e => e.id === eventId);

    if (!event) return null;

    const headerHeight = height * 0.4;

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
                bounces={false}
            >
                {/* Image Header */}
                <View style={s.imageHeader}>
                    <Image source={{ uri: event.image }} style={s.image} />
                </View>

                <View style={s.content}>
                    <View style={s.badge}>
                        <Text style={s.badgeText}>{event.type}</Text>
                    </View>
                    <Text style={s.title}>{event.title}</Text>

                    {/* Info Grid */}
                    <View style={s.infoGrid}>
                        <View style={s.infoCard}>
                            <View style={[s.iconBg, { backgroundColor: '#E3F2FD' }]}>
                                <Icon name="calendar" size={22} color="#1976D2" />
                            </View>
                            <View>
                                <Text style={s.infoLabel}>Tarih</Text>
                                <Text style={s.infoValue}>{event.date}</Text>
                            </View>
                        </View>
                        <View style={s.infoCard}>
                            <View style={[s.iconBg, { backgroundColor: '#F3E5F5' }]}>
                                <Icon name="time" size={22} color="#7B1FA2" />
                            </View>
                            <View>
                                <Text style={s.infoLabel}>Saat</Text>
                                <Text style={s.infoValue}>{event.time}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={s.locationCard}>
                        <View style={[s.iconBg, { backgroundColor: '#E8F5E9' }]}>
                            <Icon name="location" size={22} color="#2E7D32" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.infoLabel}>Konum / Yer</Text>
                            <Text style={s.infoValue}>{event.location}</Text>
                        </View>
                    </View>

                    <Text style={s.sectionTitle}>Etkinlik Hakkında</Text>
                    <Text style={s.description}>
                        Bu etkinlik, Kırklareli Üniversitesi tarafından düzenlenen akademik ve sosyal gelişim odaklı bir organizasyondur. Katılımcıların alanında uzman isimlerle bir araya gelmesi ve güncel konularda bilgi sahibi olması hedeflenmektedir.{"\n\n"}
                        Tüm öğrencilerimiz ve personelimiz davetlidir. Katılım için herhangi bir ön başvuru gerekmemektedir. Detaylar ve olası program değişiklikleri için sayfamızı takipte kalabilirsiniz.
                    </Text>

                    <View style={{ height: 100 }} />
                </View>
            </Animated.ScrollView>

            <Animated.View style={[s.dynamicHeader, { height: insets.top + 60, opacity: headerOpacity, paddingTop: insets.top }]}>
                <Text style={s.dynamicTitle} numberOfLines={1}>{event.title}</Text>
            </Animated.View>

            <Animated.View style={[s.backButtonContainer, { top: insets.top + 10, transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => navigation.goBack()}
                    style={s.backButton}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backButtonBg, borderRadius: 22.5 }]} />
                    <Icon name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>

            <View style={[s.footer, { paddingBottom: insets.bottom + 10 }]}>
                <TouchableOpacity style={s.mainButton}>
                    <Text style={s.mainButtonText}>Takvime Ekle</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    imageHeader: {
        width: width,
        height: height * 0.4,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
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
    content: {
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#18295810',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginBottom: 15,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#182958',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1C1C1E',
        lineHeight: 34,
        marginBottom: 25,
    },
    infoGrid: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15,
    },
    infoCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 20,
        gap: 12,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 20,
        gap: 12,
        marginBottom: 30,
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#3A3A3C',
        lineHeight: 26,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F2F2F7',
    },
    mainButton: {
        backgroundColor: '#182958',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows?.medium,
    },
    mainButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
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
