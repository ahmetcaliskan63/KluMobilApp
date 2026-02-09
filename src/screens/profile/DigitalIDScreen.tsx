import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DigitalPassportCard } from '../../components/profile/DigitalPassportCard';
import { useAuthStore } from '../../store/authStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

export const DigitalIDScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuthStore();
    const { theme } = useAppTheme();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Lüks Arkaplan Deep Gradient */}
            <LinearGradient
                colors={['#0F172A', '#1E293B', '#0F172A']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safeArea}>
                {/* Header Control */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="close" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>DİJİTAL KİMLİK</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Centered Masterpiece Card */}
                <View style={styles.content}>
                    <View style={styles.cardContainer}>
                        <DigitalPassportCard user={user} theme={theme} />
                    </View>

                    <View style={styles.infoBox}>
                        <Icon name="information-circle-outline" size={20} color="rgba(255,255,255,0.4)" />
                        <Text style={styles.infoText}>
                            Bu kimlik kartı resmi Kırklareli Üniversitesi dijital öğrenci belgesi hükmündedir.
                        </Text>
                    </View>
                </View>

                {/* Bottom Actions (Optional) */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="share-outline" size={22} color="#FFFFFF" />
                        <Text style={styles.actionText}>Paylaş</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="download-outline" size={22} color="#FFFFFF" />
                        <Text style={styles.actionText}>İndir</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(10),
        height: verticalScale(60),
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(20),
    },
    cardContainer: {
        width: '100%',
        transform: [{ scale: 1.05 }], // Slightly zoomed in for focus
    },
    infoBox: {
        marginTop: verticalScale(40),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: scale(30),
        opacity: 0.8,
    },
    infoText: {
        fontSize: moderateScale(11),
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 18,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(30),
        paddingBottom: verticalScale(40),
    },
    actionButton: {
        alignItems: 'center',
        gap: 8,
    },
    actionText: {
        fontSize: moderateScale(12),
        color: '#FFFFFF',
        fontWeight: '600',
    }
});
