import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
    Share,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation';
import { useAppTheme } from '../../hooks/useAppTheme';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import { Card } from '../../components/common';

type AnnouncementDetailRouteProp = RouteProp<HomeStackParamList, 'AnnouncementDetail'>;

export const AnnouncementDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<AnnouncementDetailRouteProp>();
    const { theme } = useAppTheme();
    const { announcementId } = route.params;
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const announcement = MOCK_ANNOUNCEMENTS.find(a => a.id === announcementId);

    if (!announcement) return null;

    const isAcademic = announcement.category === 'AKADEMİK';
    const accentColor = isAcademic ? '#0A84FF' : '#101D42';

    const headerOpacity = scrollY.interpolate({
        inputRange: [30, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const scaleAnimBack = React.useRef(new Animated.Value(1)).current;
    const scaleAnimShare = React.useRef(new Animated.Value(1)).current;

    const createSpring = (anim: Animated.Value, toValue: number) => {
        Animated.spring(anim, { toValue, useNativeDriver: true, friction: 8, tension: 40 }).start();
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${announcement.title}\n\nKırklareli Üniversitesi Duyuru Sistemi`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Static Header with Dynamic Elements */}
            <View style={[s.header, { paddingTop: insets.top + 10 }]}>
                <Animated.View style={{ transform: [{ scale: scaleAnimBack }] }}>
                    <TouchableOpacity
                        onPressIn={() => createSpring(scaleAnimBack, 0.9)}
                        onPressOut={() => createSpring(scaleAnimBack, 1)}
                        onPress={() => navigation.goBack()}
                        style={s.headerButton}
                    >
                        <Icon name="arrow-back" size={24} color="#1C1C1E" />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[s.dynamicHeaderTitleBox, { opacity: headerOpacity }]}>
                    <Text style={s.headerTitle} numberOfLines={1}>{announcement.title}</Text>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: scaleAnimShare }] }}>
                    <TouchableOpacity
                        onPressIn={() => createSpring(scaleAnimShare, 0.9)}
                        onPressOut={() => createSpring(scaleAnimShare, 1)}
                        onPress={handleShare}
                        style={s.headerButton}
                    >
                        <Icon name="share-outline" size={24} color="#1C1C1E" />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                {/* Badge and Title */}
                <View style={s.titleContainer}>
                    <View style={[s.categoryBadge, { backgroundColor: `${accentColor}10` }]}>
                        <Text style={[s.categoryText, { color: accentColor }]}>{announcement.category}</Text>
                    </View>
                    <Text style={s.title}>{announcement.title}</Text>

                    <View style={s.metaRow}>
                        <View style={s.metaItem}>
                            <Icon name="calendar-outline" size={16} color="#8E8E93" />
                            <Text style={s.metaText}>{announcement.date}</Text>
                        </View>
                        <View style={s.dot} />
                        <View style={s.metaItem}>
                            <Icon name="eye-outline" size={16} color="#8E8E93" />
                            <Text style={s.metaText}>{announcement.views} görüntülenme</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <Card style={s.contentCard}>
                    <Text style={s.body}>
                        {announcement.content}
                        {"\n\n"}
                        Kırklareli Üniversitesi Rektörlüğü tarafından yayımlanan bu duyuru, ilgili tüm birimler ve öğrencilerimiz için geçerlidir.{"\n\n"}
                        Duyuru kapsamında belirtilen hususlara uyulması, akademik takvim ve uygulama süreçleri açısından büyük önem arz etmektedir. Detaylı bilgi için ilgili bölüm sekreterliklerine başvurulabilir veya üniversitemizin resmi web sitesi ziyaret edilebilir.
                    </Text>
                </Card>

                {/* Attachments Section */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Ek Dosyalar ve Bağlantılar</Text>
                    <TouchableOpacity style={s.attachmentItem} activeOpacity={0.7}>
                        <View style={[s.fileIconWrapper, { backgroundColor: `${accentColor}10` }]}>
                            <Icon name="document-text" size={24} color={accentColor} />
                        </View>
                        <View style={s.fileInfo}>
                            <Text style={s.fileName}>Duyuru_Detay_Belgesi.pdf</Text>
                            <Text style={s.fileSize}>1.2 MB • PDF Belgesi</Text>
                        </View>
                        <View style={s.downloadCircle}>
                            <Icon name="download-outline" size={20} color={accentColor} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </Animated.ScrollView>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    dynamicHeaderTitleBox: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 25,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
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
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#C7C7CC',
        marginHorizontal: 12,
    },
    contentCard: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginBottom: 30,
    },
    body: {
        fontSize: 16,
        lineHeight: 26,
        color: '#3A3A3C',
        fontWeight: '400',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 15,
    },
    attachmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    fileIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    fileInfo: {
        flex: 1,
    },
    fileName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    fileSize: {
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '500',
    },
    downloadCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
