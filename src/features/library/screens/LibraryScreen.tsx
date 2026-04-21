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
import { Theme } from '@/core/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

// The items defined from the old web design screenshot
const LIBRARY_SERVICES = [
    { id: '1', title: 'Ödünç Verme', icon: 'book', color: '#1976D2', link: 'https://kutuphane.klu.edu.tr' },
    { id: '2', title: 'Veri Tabanı\nUzaktan Erişim', icon: 'cloud-done', color: '#388E3C', link: 'https://kutuphane.klu.edu.tr' },
    { id: '3', title: 'Merkez Kütüphane\nKataloğu', icon: 'library', color: '#F57C00', link: 'https://kutuphane.klu.edu.tr' },
    { id: '4', title: 'Kütüphane\nÜye Girişi', icon: 'person', color: '#D32F2F', link: 'https://kutuphane.klu.edu.tr' },
    { id: '5', title: 'Formlar', icon: 'document-text', color: '#7B1FA2', link: 'https://kutuphane.klu.edu.tr' },
    { id: '6', title: 'Kurumsal Arşiv\nAçık Erişim', icon: 'folder-open', color: '#0288D1', link: 'https://kutuphane.klu.edu.tr' },
    { id: '7', title: 'Cep\nKütüphanem', icon: 'phone-portrait', color: '#00796B', link: 'https://kutuphane.klu.edu.tr' },
    { id: '8', title: 'Duyurular', icon: 'megaphone', color: '#C2185B', link: 'https://kutuphane.klu.edu.tr' },
    { id: '9', title: 'Soru, İstek\nve Önerileriniz', icon: 'chatbubbles', color: '#455A64', link: 'https://kutuphane.klu.edu.tr' },
];

export const LibraryScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme);

    const handlePress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#101D42" />

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
                            <Text style={s.heroTitle}>Kütüphane</Text>
                            <Text style={s.heroSubtitle}>Sınırları aşan bilgi ağınız</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* Grid Services */}
            <ScrollView 
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 100 }]} 
                showsVerticalScrollIndicator={false}
            >
                <View style={s.servicesContainer}>
                    <View style={s.servicesGrid}>
                        {LIBRARY_SERVICES.map((service) => (
                            <TouchableOpacity 
                                key={service.id} 
                                style={s.serviceCard}
                                activeOpacity={0.8}
                                onPress={() => handlePress(service.link)}
                            >
                                <View style={[s.iconWrapper, { backgroundColor: `${service.color}15` }]}>
                                    <Icon name={service.icon} size={28} color={service.color} />
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

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
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
        opacity: 0.8,
    },
    heroOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
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
        paddingTop: 24,
        paddingHorizontal: 20,
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
        width: '31%', // Fits 3 comfortably
        aspectRatio: 0.85,
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.12)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 8,
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
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 16,
    },
});
