import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import { useAppTheme } from '../../hooks/useAppTheme';

type AnnouncementDetailRouteProp = RouteProp<RootStackParamList, 'AnnouncementDetail'>;

export const AnnouncementDetailScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute<AnnouncementDetailRouteProp>();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);
    const { announcementId } = route.params;

    const announcement = MOCK_ANNOUNCEMENTS.find(a => a.id === announcementId);

    if (!announcement) {
        return (
            <View style={s.errorContainer}>
                <Text style={{ color: theme.colors.text }}>Duyuru bulunamadı.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: theme.colors.primary, marginTop: 10 }}>Geri Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${announcement.title}\n\n${announcement.snippet}\n\nKLU Mobil üzerinden paylaşıldı.`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" />

            {/* Custom Header */}
            <View style={[s.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <View style={s.headerTop}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.headerButton}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle} numberOfLines={1}>Duyuru Detayı</Text>
                    <TouchableOpacity
                        onPress={handleShare}
                        style={s.headerButton}
                    >
                        <Icon name="share-social-outline" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={s.scrollView}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.categoryBadgeWrapper}>
                    <View style={[
                        s.categoryBadge,
                        { backgroundColor: theme.colors.primary + (isDarkMode ? '30' : '15') }
                    ]}>
                        <Text style={[s.categoryText, { color: theme.colors.primary }]}>
                            {announcement.category}
                        </Text>
                    </View>
                    <View style={s.dateWrapper}>
                        <Icon name="calendar-outline" size={14} color={theme.colors.textLight} />
                        <Text style={s.dateText}>{announcement.date}</Text>
                    </View>
                </View>

                <Text style={s.title}>{announcement.title}</Text>

                <View style={s.divider} />

                <Text style={s.content}>{announcement.content}</Text>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    categoryBadgeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 13,
        color: theme.colors.textLight,
        fontWeight: '500',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: 32,
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.divider,
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        lineHeight: 26,
        textAlign: 'justify',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    }
});
