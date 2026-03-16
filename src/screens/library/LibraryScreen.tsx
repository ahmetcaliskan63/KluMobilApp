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
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';

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
                    source={{ uri: 'https://kutuphane.klu.edu.tr/dosyalar/kutuphane/resimler/KLU_Kutuphane.jpg' }} // Optional real background or fallback color
                    style={s.heroBackground}
                    imageStyle={s.heroImage}
                >
                    <View style={s.heroOverlay}>
                        <Text style={s.heroTitle}>Kütüphane Tanıtımı</Text>
                        <Text style={s.heroSubtitle}>Bilgiye Açılan Kapınız</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* Grid Services */}
            <ScrollView 
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 100 }]} 
                showsVerticalScrollIndicator={false}
            >
                <View style={s.servicesGrid}>
                    {LIBRARY_SERVICES.map((service) => (
                        <TouchableOpacity 
                            key={service.id} 
                            style={s.serviceCard}
                            activeOpacity={0.7}
                            onPress={() => handlePress(service.link)}
                        >
                            <View style={[s.iconWrapper, { backgroundColor: `${service.color}15` }]}>
                                <Icon name={service.icon} size={28} color={service.color} />
                            </View>
                            <Text style={s.serviceTitle}>{service.title}</Text>
                        </TouchableOpacity>
                    ))}
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
        height: 200,
        backgroundColor: '#101D42',
    },
    heroBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    heroImage: {
        opacity: 0.6,
    },
    heroOverlay: {
        padding: 20,
        backgroundColor: 'rgba(16, 29, 66, 0.4)',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    heroSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
    },
    scrollContent: {
        padding: 16,
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
    serviceCard: {
        width: '31%', // 3 columns
        aspectRatio: 0.85,
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    iconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    serviceTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text,
        textAlign: 'center',
        lineHeight: 16,
    },
});
