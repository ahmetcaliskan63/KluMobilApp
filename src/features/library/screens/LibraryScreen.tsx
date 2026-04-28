import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing, borderRadius } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

import { MOCK_LIBRARY_SERVICES } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';

export const LibraryScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);

    const getAdjustedColor = (color: string) => {
        if (!isDarkMode) return color;
        const lighteningMap: { [key: string]: string } = {
            '#1976D2': '#42A5F5',
            '#388E3C': '#66BB6A',
            '#F57C00': '#FFA726',
            '#D32F2F': '#EF5350',
            '#7B1FA2': '#AB47BC',
            '#0288D1': '#29B6F6',
            '#00796B': '#26A69A',
            '#C2185B': '#EC407A',
            '#455A64': '#78909C',
        };
        return lighteningMap[color] || color;
    };

    const handlePress = async (url: string) => {
        if (!url) return;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    const libraryServices = MOCK_LIBRARY_SERVICES(t);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />

            {/* Header Hero Image */}
            <View style={s.heroContainer}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Premium Library Stock
                    style={s.heroBackground}
                    imageStyle={s.heroImage}
                >
                    <LinearGradient
                        colors={['rgba(16, 29, 66, 0.1)', 'rgba(16, 29, 66, 0.95)']}
                        style={s.heroOverlay}
                    >
                        <View style={s.heroTextContainer}>
                            <Text style={s.heroTitle}>{t('library.title')}</Text>
                            <Text style={s.heroSubtitle}>{t('library.subtitle')}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* Grid Services */}
            <ScrollView
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
            >
                <View style={s.servicesContainer}>
                    <View style={s.servicesGrid}>
                        {libraryServices.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                style={s.serviceCard}
                                activeOpacity={0.8}
                                onPress={() => handlePress(service.url)}
                            >
                                <View style={[s.iconWrapper, { backgroundColor: `${getAdjustedColor(service.color)}20` }]}>
                                    <Icon name={service.icon as any} size={28} color={getAdjustedColor(service.color)} />
                                </View>
                                <Text style={s.serviceTitle}>{service.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    heroContainer: {
        width: '100%',
        height: 240,
        backgroundColor: '#101D42',
    },
    heroBackground: {
        width: '100%',
        height: '100%',
    },
    heroImage: {
        opacity: isDarkMode ? 0.6 : 0.8,
    },
    heroOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: spacing.lg,
    },
    heroTextContainer: {
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    scrollContent: {
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    servicesContainer: {
        marginTop: 0,
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceCard: {
        width: '31%',
        aspectRatio: 0.85,
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: isDarkMode ? 1 : 1.5,
        borderColor: isDarkMode ? theme.colors.border : 'rgba(0,0,0,0.1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 6,
        elevation: isDarkMode ? 4 : 8,
    },
    iconWrapper: {
        width: 54,
        height: 54,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    serviceTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: theme.colors.text,
        textAlign: 'center',
        lineHeight: 14,
        opacity: isDarkMode ? 0.9 : 1,
    },
});
