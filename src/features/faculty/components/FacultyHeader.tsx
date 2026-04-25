import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from '@/shared/utils/responsive';
import { spacing } from '@/core/theme/theme';

interface FacultyHeaderProps {
    title: string;
}

export const FacultyHeader: React.FC<FacultyHeaderProps> = ({ title }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient 
            colors={['#0f172a', '#1e293b']} 
            style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
        >
            <View style={styles.headerRow}>
                <TouchableOpacity 
                    style={styles.backBtn} 
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Icon name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={{ width: 40 }} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: spacing.md,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
});
