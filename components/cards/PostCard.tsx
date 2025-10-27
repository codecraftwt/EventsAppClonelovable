import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostCardProps {
    post: any; // Using any for now since we're loading from JSON
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={[styles.postCard, { backgroundColor: colors.background }]}>
            <View style={styles.postHeader}>
                {post.author?.profileImage ? (
                    <Image source={{ uri: post.author.profileImage }} style={styles.postAuthorPic} />
                ) : (
                    <View style={[styles.postAuthorPic, { backgroundColor: colors.tint }]} />
                )}
                <View style={styles.postAuthorInfo}>
                    <Text style={[styles.postAuthorName, { color: colors.text }]}>{post.author?.name || 'Unknown User'}</Text>
                    <Text style={[styles.postTime, { color: colors.text }]}>{post.timestamp}</Text>
                </View>
            </View>

            <Text style={[styles.postText, { color: colors.text }]}>{post.content}</Text>

            {post.image && (
                <View style={styles.postImageContainer}>
                    <Image source={{ uri: post.image }} style={styles.postImage} />
                </View>
            )}

            {post.event && (
                <View style={[styles.eventCard, { backgroundColor: '#F8F9FA' }]}>
                    <View style={styles.eventCardHeader}>
                        <IconSymbol name="calendar" size={20} color={colors.tint} />
                        <Text style={[styles.eventCardTitle, { color: colors.text }]}>{post.event.title}</Text>
                    </View>
                    <Text style={[styles.eventCardDescription, { color: colors.text }]}>
                        {post.event.description.substring(0, 100)}...
                    </Text>
                    <TouchableOpacity style={styles.learnMoreButton}>
                        <Text style={[styles.learnMoreText, { color: colors.tint }]}>Learn more</Text>
                        <IconSymbol name="arrow.up.right" size={16} color={colors.tint} />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.postEngagement}>
                <TouchableOpacity style={styles.engagementButton} onPress={onLike}>
                    <IconSymbol name="heart.fill" size={20} color="#FF9500" />
                    <Text style={[styles.engagementText, { color: colors.text }]}>{post.likes} Thanks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.engagementButton} onPress={onComment}>
                    <IconSymbol name="bubble.left" size={20} color="#8B5CF6" />
                    <Text style={[styles.engagementText, { color: colors.text }]}>{post.comments.length} Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.engagementButton} onPress={onShare}>
                    <IconSymbol name="square.and.arrow.up" size={20} color="#4CAF50" />
                    <Text style={[styles.engagementText, { color: colors.text }]}>Share</Text>
                </TouchableOpacity>
            </View>

            {post.comments && post.comments.length > 0 && (
                <View style={styles.commentsSection}>
                    {post.comments.slice(0, 3).map((comment) => (
                        <View key={comment.id} style={styles.comment}>
                            {comment.author?.profileImage ? (
                                <Image source={{ uri: comment.author.profileImage }} style={styles.commentAuthorPic} />
                            ) : (
                                <View style={[styles.commentAuthorPic, { backgroundColor: colors.tint }]} />
                            )}
                            <View style={styles.commentContent}>
                                <Text style={[styles.commentAuthorName, { color: colors.text }]}>{comment.author?.name || 'Unknown User'}</Text>
                                <Text style={[styles.commentText, { color: colors.text }]}>{comment.content}</Text>
                                <View style={styles.commentMeta}>
                                    <Text style={[styles.commentTime, { color: colors.text }]}>{comment.timestamp}</Text>
                                    <Text style={[styles.commentThanks, { color: colors.text }]}>{comment.likes} Thanks</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    postCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    postAuthorPic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    postAuthorInfo: {
        flex: 1,
    },
    postAuthorName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    postTime: {
        fontSize: 14,
        opacity: 0.7,
    },
    postText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 12,
    },
    postImageContainer: {
        marginBottom: 12,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    eventCard: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    eventCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    eventCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    eventCardDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
    },
    learnMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    learnMoreText: {
        fontSize: 14,
        fontWeight: '500',
    },
    postEngagement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        marginBottom: 12,
    },
    engagementButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    engagementText: {
        fontSize: 14,
        fontWeight: '500',
    },
    commentsSection: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 12,
    },
    comment: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    commentAuthorPic: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    commentContent: {
        flex: 1,
    },
    commentAuthorName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 4,
    },
    commentMeta: {
        flexDirection: 'row',
        gap: 12,
    },
    commentTime: {
        fontSize: 12,
        opacity: 0.7,
    },
    commentThanks: {
        fontSize: 12,
        opacity: 0.7,
    },
});
