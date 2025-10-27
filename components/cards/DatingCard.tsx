import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useRef } from 'react';
import { Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../types';

interface DatingCardProps {
    user: User;
    onLike?: () => void;
    onPass?: () => void;
}

export function DatingCard({ user, onLike, onPass }: DatingCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const pan = useRef(new Animated.ValueXY()).current;
    const rotate = pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-10deg', '0deg', '10deg'],
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > 120) {
                    // Swipe right - Like
                    Animated.spring(pan, {
                        toValue: { x: 500, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        onLike?.();
                        pan.setValue({ x: 0, y: 0 });
                    });
                } else if (gesture.dx < -120) {
                    // Swipe left - Pass
                    Animated.spring(pan, {
                        toValue: { x: -500, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        onPass?.();
                        pan.setValue({ x: 0, y: 0 });
                    });
                } else {
                    // Return to center
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={styles.cardContainer}>
            <Animated.View
                style={[
                    styles.datingCard,
                    {
                        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.profileImageContainer}>
                    {user.profileImage ? (
                        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileImageText}>Profile Photo</Text>
                        </View>
                    )}
                </View>

                {/* Profile Info Overlay */}
                <View style={styles.profileInfoOverlay}>
                    <Text style={styles.profileName}>
                        {user.name}{user.age && `, ${user.age}`}
                    </Text>
                    <View style={styles.profileDetail}>
                        <IconSymbol name="location.fill" size={16} color="white" />
                        <Text style={styles.profileDetailText}>{user.location}</Text>
                    </View>
                    {user.occupation && (
                        <View style={styles.profileDetail}>
                            <IconSymbol name="briefcase.fill" size={16} color="white" />
                            <Text style={styles.profileDetailText}>{user.occupation}</Text>
                        </View>
                    )}
                </View>

                {/* Swipe Indicators */}
                <Animated.View
                    style={[
                        styles.likeIndicator,
                        {
                            opacity: pan.x.interpolate({
                                inputRange: [0, 120],
                                outputRange: [0, 1],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}
                >
                    <Text style={styles.likeText}>LIKE</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.passIndicator,
                        {
                            opacity: pan.x.interpolate({
                                inputRange: [-120, 0],
                                outputRange: [1, 0],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}
                >
                    <Text style={styles.passText}>PASS</Text>
                </Animated.View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.passButton} onPress={onPass}>
                        <IconSymbol name="xmark" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.likeButton} onPress={onLike}>
                        <IconSymbol name="heart.fill" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    datingCard: {
        width: '100%',
        height: 500,
        backgroundColor: '#2C2C2C',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    profileImageContainer: {
        flex: 1,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileImagePlaceholder: {
        flex: 1,
        backgroundColor: '#404040',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        color: '#999',
        fontSize: 16,
    },
    profileInfoOverlay: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
    },
    profileName: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    profileDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
    },
    profileDetailText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    actionButtons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        gap: 12,
    },
    passButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeIndicator: {
        position: 'absolute',
        top: 50,
        right: 50,
        borderWidth: 4,
        borderColor: '#4CAF50',
        borderRadius: 8,
        padding: 12,
        transform: [{ rotate: '20deg' }],
    },
    likeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    passIndicator: {
        position: 'absolute',
        top: 50,
        left: 50,
        borderWidth: 4,
        borderColor: '#FF3B30',
        borderRadius: 8,
        padding: 12,
        transform: [{ rotate: '-20deg' }],
    },
    passText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF3B30',
    },
});
