import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

export const NavigationHeaderLeft: React.FC = () => (
    <View style={styles.headerLeftContainer}>
        <View style={styles.logoWrapper}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    </View>
);

export const NavigationHeaderRight: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Announcements')}
            style={styles.headerRightContainer}
        >
            <View style={styles.iconWrapper}>
                <Icon name="notifications" size={20} color="#FFFFFF" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerLeftContainer: {
        marginLeft: 16,
    },
    logoWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    logo: {
        width: 38,
        height: 38,
    },
    headerRightContainer: {
        marginRight: 16,
    },
    iconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
});
