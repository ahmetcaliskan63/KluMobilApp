import React from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, verticalScale, scale } from '@/shared/utils/responsive';
import { User } from '@/shared/types/models';

const DEFAULT_AVATAR = require('@/shared/assets/avatar.png');

interface ProfileHeaderProps {
    user: User | null;
    totalHeaderHeight: number;
    headerTranslateY: Animated.AnimatedInterpolation<number>;
    headerOpacity: Animated.AnimatedInterpolation<number>;
    topInset: number;
    t: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    user,
    totalHeaderHeight,
    headerTranslateY,
    headerOpacity,
    topInset,
    t
}) => {
    return (
        <Animated.View style={[
            styles.animatedHeader,
            {
                height: totalHeaderHeight,
                transform: [{ translateY: headerTranslateY }],
                opacity: headerOpacity,
                zIndex: 40
            }
        ]}>
            <LinearGradient
                colors={['#182958', '#0F172A']}
                style={[StyleSheet.absoluteFill, styles.headerGradient]}
            >
                <View style={styles.meshCircle1} />
                <View style={styles.meshCircle2} />

                <View style={[styles.profileOverview, { marginTop: topInset + verticalScale(60) }]}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.3)', 'transparent']}
                            style={styles.avatarHalo}
                        />
                        <View style={styles.avatar}>
                            <Image
                                source={user?.profileImage ? { uri: user.profileImage } : DEFAULT_AVATAR}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    <Text style={styles.profileName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.profileSub}>
                        {user?.studentNumber?.includes('@')
                            ? user.studentNumber.split('@')[0]
                            : user?.studentNumber} • {t('profile.systemSource')}
                    </Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerGradient: {
        borderBottomLeftRadius: moderateScale(40),
        borderBottomRightRadius: moderateScale(40),
        overflow: 'hidden',
    },
    meshCircle1: {
        position: 'absolute',
        top: -scale(40),
        right: -scale(20),
        width: scale(190),
        height: scale(190),
        borderRadius: scale(95),
        backgroundColor: '#4F46E5',
        opacity: 0.12,
    },
    meshCircle2: {
        position: 'absolute',
        bottom: -scale(30),
        left: -scale(10),
        width: scale(150),
        height: scale(150),
        borderRadius: scale(75),
        backgroundColor: '#10B981',
        opacity: 0.1,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: verticalScale(10),
    },
    avatarHalo: {
        position: 'absolute',
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        borderRadius: moderateScale(50),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    avatar: {
        width: scale(80),
        height: scale(80),
        borderRadius: moderateScale(40),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    profileOverview: {
        alignItems: 'center',
    },
    profileName: {
        fontSize: moderateScale(23),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.6,
    },
    profileSub: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.45)',
        marginTop: 2,
    },
});
