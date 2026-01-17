import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme } from '../../config/theme';
import { MOCK_BORROWED_BOOKS } from '../../data/mockData';

export const LibraryScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <Text style={styles.headerTitle}>Kütüphane</Text>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color={theme.colors.textLight} />
                    <TextInput
                        placeholder="Kitap, yazar veya konu ara..."
                        placeholderTextColor={theme.colors.textLight}
                        style={styles.searchInput}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Stats */}
                <View style={styles.statsGrid}>
                    <TouchableOpacity style={styles.statBox}>
                        <Icon name="book" size={24} color={theme.colors.primary} />
                        <Text style={styles.statCount}>2</Text>
                        <Text style={styles.statLabel}>Ödünç</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statBox}>
                        <Icon name="time" size={24} color={theme.colors.warning} />
                        <Text style={styles.statCount}>0</Text>
                        <Text style={styles.statLabel}>Geciken</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statBox}>
                        <Icon name="bookmark" size={24} color={theme.colors.info} />
                        <Text style={styles.statCount}>5</Text>
                        <Text style={styles.statLabel}>Kaydedilen</Text>
                    </TouchableOpacity>
                </View>

                {/* Borrowed Books */}
                <Text style={styles.sectionTitle}>Üzerimdeki Kitaplar</Text>
                {MOCK_BORROWED_BOOKS.map((book) => (
                    <Card key={book.id} style={styles.bookCard} elevation="small">
                        <View style={styles.bookInfo}>
                            <View style={styles.bookIcon}>
                                <Icon name="journal" size={24} color={theme.colors.primary} />
                            </View>
                            <View style={styles.bookDetails}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                                <View style={styles.dueDateRow}>
                                    <Icon name="calendar-outline" size={14} color={theme.colors.textLight} />
                                    <Text style={styles.dueDateText}>İade: {book.dueDate}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.extendButton}>
                            <Text style={styles.extendText}>Süre Uzat</Text>
                        </TouchableOpacity>
                    </Card>
                ))}

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                            <Icon name="calendar-outline" size={24} color="#1976D2" />
                        </View>
                        <Text style={styles.actionLabel}>Çalışma Odası Rezervasyonu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                            <Icon name="print-outline" size={24} color="#7B1FA2" />
                        </View>
                        <Text style={styles.actionLabel}>E-Yayın Talebi</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 16,
        alignItems: 'center',
        height: 50,
        ...theme.shadows.small,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: theme.colors.text,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        ...theme.shadows.small,
    },
    statCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 8,
    },
    statLabel: {
        fontSize: 11,
        color: theme.colors.textLight,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    bookCard: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
    bookInfo: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    bookIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: theme.colors.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookDetails: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    bookAuthor: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    dueDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
    },
    dueDateText: {
        fontSize: 12,
        color: theme.colors.textLight,
    },
    extendButton: {
        borderTopWidth: 1,
        borderTopColor: '#F0F2F5',
        paddingTop: 12,
        alignItems: 'center',
    },
    extendText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    actionsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        ...theme.shadows.small,
    },
    actionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.text,
        lineHeight: 18,
    },
});
