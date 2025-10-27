import { PostCard } from '@/components/cards/PostCard';
import { CategoryFilter } from '@/components/common/CategoryFilter';
import { Header } from '@/components/common/Header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [activeCategory, setActiveCategory] = useState('All');
    const { posts, groups, loading, error } = useFirebaseData();

    const categories = ['All', 'Events', 'Jobs', 'Articles', 'Photos'];

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="The Minneapolis Feed" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading feed...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="The Minneapolis Feed" />
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: colors.text }]}>Error loading feed: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const headerRightActions = (
        <>
            <IconSymbol name="message.fill" size={24} color={colors.text} />
            <IconSymbol name="questionmark.circle.fill" size={24} color={colors.text} />
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <View style={[styles.profilePic, { backgroundColor: colors.tint }]} />
            </TouchableOpacity>
        </>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="The Minneapolis Feed" rightActions={headerRightActions} />

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryPress={setActiveCategory}
            />

            <ScrollView style={styles.feedContainer}>
                {/* Group Highlights */}
                {groups.map((group) => (
                    <TouchableOpacity key={group.id} style={[styles.groupCard, { backgroundColor: '#8B5CF6' }]}>
                        <View style={styles.groupIcon}>
                            <IconSymbol name="person.3.fill" size={20} color="white" />
                        </View>
                        <View style={styles.groupContent}>
                            <Text style={styles.groupTitle}>{group.name}</Text>
                            <Text style={styles.groupSubtitle}>
                                {group.memberCount} members - {group.newMessages} New Messages
                            </Text>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color="white" />
                    </TouchableOpacity>
                ))}

                {/* Posts */}
                {posts.map((post: any) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onLike={() => console.log('Like post', post.id)}
                        onComment={() => console.log('Comment on post', post.id)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    feedContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    groupCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    groupIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    groupContent: {
        flex: 1,
    },
    groupTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    groupSubtitle: {
        color: 'white',
        fontSize: 14,
        opacity: 0.8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
