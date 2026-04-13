import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';

interface DigitalPassportCardProps {
    user: any;
}

export const DigitalPassportCard: React.FC<DigitalPassportCardProps> = ({ user }) => {
    return (
        <View style={styles.container}>
            {/* ??? Core Card Structure with Metallic Edge */}
            <View style={styles.cardFrame}>
                {/* Metallic Border Gradient */}
                <LinearGradient
                    colors={['#C0C0C0', '#4A4A4A', '#E8E8E8', '#4A4A4A', '#C0C0C0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.metallicBorder}
                />

                {/* Internal Card Surface */}
                <View style={styles.cardContentWrapper}>
                    {/* ?? Deep Mesh Gradient Background */}
                    <LinearGradient
                        colors={['#0F172A', '#1E293B', '#0F172A']}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* ??? Fine Noise Texture Overlay */}
                    <View style={[StyleSheet.absoluteFill, { opacity: 0.05, backgroundColor: '#000' }]} />

                    {/* ??? University Seal Watermark */}
                    <View style={styles.sealContainer}>
                        <Image
                            source={require('@/shared/assets/logo.png')}
                            style={styles.sealLogo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* ? Advanced Multi-Layer Hologram */}
                    <LinearGradient
                        colors={['transparent', 'rgba(120, 150, 255, 0.15)', 'rgba(255, 120, 255, 0.15)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.hologramLayer}
                    />

                    {/* ?? Card Content Layout */}
                    <View style={styles.mainLayout}>
                        {/* Header Section */}
                        <View style={styles.header}>
                            <View style={styles.brandInfo}>
                                <View style={styles.logoBox}>
                                    <Image
                                        source={require('@/shared/assets/logo.png')}
                                        style={styles.cardLogo}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.uniTitle}>KIRKLAREL NVERSTES</Text>
                                    <Text style={styles.brandSubtitle}>RENC PASAPORTU</Text>
                                </View>
                            </View>
                            <View style={styles.activePulseContainer}>
                                <View style={styles.activePulse} />
                                <Text style={styles.activeLabel}>AKTF</Text>
                            </View>
                        </View>

                        {/* Mid Section: Identity Details */}
                        <View style={styles.identityContainer}>
                            <View style={styles.photoArea}>
                                <View style={styles.photoRim}>
                                    <View style={styles.photoBox}>
                                        <Text style={styles.initials}>
                                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                        </Text>
                                    </View>
                                </View>
                                {/* Validity moved under photo per user request */}
                                <View style={styles.validityInfo}>
                                    <Text style={styles.dateLabel}>GEERLLK TARH</Text>
                                    <Text style={styles.dateValue}>06 / 2026</Text>
                                </View>
                            </View>

                            <View style={styles.detailsArea}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.fieldLabel}>AD SOYAD</Text>
                                    <Text style={styles.fieldValue}>{user?.firstName} {user?.lastName}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.fieldLabel}>BLM</Text>
                                    <Text style={styles.fieldValueSmall} numberOfLines={1}>{user?.department}</Text>
                                </View>
                                <View style={styles.gridInfo}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.fieldLabel}>RENC NO</Text>
                                        <Text style={styles.fieldValueSmall}>{user?.studentNumber?.split('@')[0]}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.fieldLabel}>DNEM</Text>
                                        <Text style={styles.fieldValueSmall}>2025 - Bahar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Footer Section: Security & Verification */}
                        <View style={styles.footer}>
                            <View style={styles.securityGroup}>
                                {/* Gold Chip and Signature removed per user request */}
                            </View>

                            <View style={styles.qrSide}>
                                {/* Validity Info moved under Photo Area */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* ?? Shadow Casting */}
            <View style={styles.bottomGlow} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: scale(15),
        marginTop: verticalScale(5), // Daraltld
        alignItems: 'center',
    },
    cardFrame: {
        width: '100%',
        height: verticalScale(180), // erik geri eklendii iin optimize edildi
        borderRadius: moderateScale(22),
        padding: 1.5,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1E293B',
    },
    metallicBorder: {
        ...StyleSheet.absoluteFillObject,
    },
    cardContentWrapper: {
        flex: 1,
        borderRadius: moderateScale(21),
        overflow: 'hidden',
        position: 'relative',
    },
    sealContainer: {
        position: 'absolute',
        right: -scale(30),
        bottom: -verticalScale(30),
        opacity: 0.1,
    },
    sealLogo: {
        width: scale(180),
        height: scale(180),
    },
    hologramLayer: {
        position: 'absolute',
        top: -100,
        left: -100,
        right: -100,
        bottom: -100,
        transform: [{ rotate: '35deg' }],
    },
    mainLayout: {
        flex: 1,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(12),
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(5), // Alt boluk eklendi
    },
    brandInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(12),
    },
    logoBox: {
        width: scale(32), // Hafif kltld
        height: scale(32),
        backgroundColor: '#FFFFFF',
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(2), // Beyaz alan (padding) minimize edildi
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    cardLogo: {
        width: '100%',
        height: '100%',
    },
    uniTitle: {
        fontSize: moderateScale(9), // Yaz kltld
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1.2,
    },
    brandSubtitle: {
        fontSize: moderateScale(8), // Yaz kltld
        fontWeight: '500',
        color: 'rgba(255,255,255,0.4)',
        marginTop: 1,
    },
    identityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(16),
        marginTop: verticalScale(6), // Boluk azaltld
    },
    photoArea: {
        alignItems: 'center',
        gap: 6,
    },
    photoRim: {
        padding: 2,
        borderRadius: moderateScale(22),
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    photoBox: {
        width: scale(74), // Hafif kltld
        height: scale(74),
        borderRadius: moderateScale(18),
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    initials: {
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        color: '#FFFFFF',
        opacity: 0.9,
    },
    activePulseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
        borderRadius: 10,
    },
    activePulse: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22C55E',
    },
    activeLabel: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: '#22C55E',
    },
    detailsArea: {
        flex: 1,
        gap: verticalScale(8),
    },
    infoRow: {
        gap: 2,
    },
    gridInfo: {
        flexDirection: 'row',
        gap: 12,
    },
    fieldLabel: {
        fontSize: moderateScale(8),
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 1,
    },
    fieldValue: {
        fontSize: moderateScale(15),
        fontWeight: '800',
        color: '#FFFFFF',
    },
    fieldValueSmall: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: 'rgba(255,255,255,0.9)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    securityGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: scale(15),
    },
    goldChip: {
        width: scale(42),
        height: verticalScale(28),
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    chipCuts: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 2,
        borderRadius: 4,
    },
    signaturePad: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
        paddingBottom: 2,
        minWidth: scale(100),
    },
    signatureText: {
        fontSize: moderateScale(16),
        color: 'rgba(255,255,255,0.7)',
        fontStyle: 'italic', // Fallback for signature font
        letterSpacing: 0.5,
    },
    signLabel: {
        fontSize: moderateScale(7),
        fontWeight: '800',
        color: 'rgba(255,255,255,0.2)',
        marginTop: 2,
    },
    qrSide: {
        alignItems: 'flex-end',
        gap: 8,
    },
    qrFrame: {
        width: scale(48),
        height: scale(48),
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    validityInfo: {
        alignItems: 'center',
        marginTop: verticalScale(4),
    },
    dateLabel: {
        fontSize: moderateScale(7),
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
    },
    dateValue: {
        fontSize: moderateScale(10),
        fontWeight: '800',
        color: '#FFFFFF',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -25,
        width: '70%',
        height: verticalScale(50),
        backgroundColor: '#0F172A',
        opacity: 0.4,
        borderRadius: 100,
        zIndex: -1,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 35 },
            android: { elevation: 25 }
        })
    }
});

