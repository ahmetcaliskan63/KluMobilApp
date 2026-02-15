import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabBarIconProps {
    name: string;
    focused: boolean;
    color: string;
    isCenter?: boolean;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused, color, isCenter }) => {
    if (isCenter) {
        return (
            <View style={[
                styles.centerIconContainer,
                { backgroundColor: focused ? '#FFFFFF' : '#101D42', borderColor: focused ? '#101D42' : '#FFFFFF' }
            ]}>
                <View style={[
                    styles.centerIconInner,
                    { backgroundColor: focused ? '#101D42' : '#FFFFFF', borderColor: focused ? '#FFFFFF' : '#101D42' }
                ]}>
                    <Icon name="home" size={28} color={focused ? '#FFFFFF' : '#101D42'} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.iconWrapper}>
            <Icon name={name} size={24} color={color} />
            {focused && <View style={styles.activeDot} />}
        </View>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        marginTop: 4,
    },
    centerIconContainer: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 1.5,
    },
    centerIconInner: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
});
