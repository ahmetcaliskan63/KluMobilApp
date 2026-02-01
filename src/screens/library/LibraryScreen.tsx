import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MOCK_BORROWED_BOOKS } from '../../data/mockData';

export const LibraryScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#101D42" />

            {/* Search integrated into content */}
            <View style={s.searchWrapper}>
                <View style={s.searchContainer}>
                    <Icon name="search" size={20} color={theme.colors.textLight} />
                    <TextInput
                        placeholder="Kitap, yazar veya konu ara..."
                        placeholderTextColor={theme.colors.textLight}
                        style={s.searchInput}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Stats */}
                <View style={s.statsGrid}>
                    <TouchableOpacity style={s.statBox}>
                        <Icon name="book" size={24} color={theme.colors.primary} />
                        <Text style={s.statCount}>2</Text>
                        <Text style={s.statLabel}>Ödünç</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.statBox}>
                        <Icon name="time" size={24} color={theme.colors.warning} />
                        <Text style={s.statCount}>0</Text>
                        <Text style={s.statLabel}>Geciken</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.statBox}>
                        <Icon name="bookmark" size={24} color={theme.colors.info} />
                        <Text style={s.statCount}>5</Text>
                        <Text style={s.statLabel}>Kaydedilen</Text>
                    </TouchableOpacity>
                </View>

                {/* Borrowed Books */}
                <Text style={s.sectionTitle}>Üzerimdeki Kitaplar</Text>
                {MOCK_BORROWED_BOOKS.map((book) => (
                    <Card key={book.id} style={s.bookCard} elevation="small">
                        <View style={s.bookInfo}>
                            <View style={s.bookIcon}>
                                <Icon name="journal" size={24} color={theme.colors.primary} />
                            </View>
                            <View style={s.bookDetails}>
                                <Text style={s.bookTitle}>{book.title}</Text>
                                <Text style={s.bookAuthor}>{book.author}</Text>
                                <View style={s.dueDateRow}>
                                    <Icon name="calendar-outline" size={14} color={theme.colors.textLight} />
                                    <Text style={s.dueDateText}>İade: {book.dueDate}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={s.extendButton}>
                            <Text style={s.extendText}>Süre Uzat</Text>
                        </TouchableOpacity>
                    </Card>
                ))}

                {/* Quick Actions */}
                <Text style={s.sectionTitle}>Hızlı İşlemler</Text>
                <View style={s.actionsGrid}>
                    <TouchableOpacity style={s.actionCard}>
                        <View style={[s.actionIcon, { backgroundColor: isDarkMode ? 'rgba(25, 118, 210, 0.1)' : '#E3F2FD' }]}>
                            <Icon name="calendar-outline" size={24} color="#1976D2" />
                        </View>
                        <Text style={s.actionLabel}>Çalışma Odası Rezervasyonu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.actionCard}>
                        <View style={[s.actionIcon, { backgroundColor: isDarkMode ? 'rgba(123, 31, 162, 0.1)' : '#F3E5F5' }]}>
                            <Icon name="print-outline" size={24} color="#7B1FA2" />
                        </View>
                        <Text style={s.actionLabel}>E-Yayın Talebi</Text>
                    </TouchableOpacity>
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
    searchWrapper: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        paddingHorizontal: 16,
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
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
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
        backgroundColor: theme.colors.primary + '15',
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
        borderTopColor: theme.colors.border,
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
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
