import { DatingCard } from '@/components/cards/DatingCard';
import { Header } from '@/components/common/Header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockUsers } from '@/constants/dataLoader';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DatesScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    const currentUser = mockUsers[currentUserIndex];

    const handleLike = () => {
        console.log('Liked user:', currentUser.id);
        // Move to next user
        setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length);
    };

    const handlePass = () => {
        console.log('Passed user:', currentUser.id);
        // Move to next user
        setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length);
    };

    const headerRightActions = (
        <TouchableOpacity style={styles.heartButton}>
            <IconSymbol name="heart.fill" size={24} color="#FF69B4" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Minneapolis Dating" rightActions={headerRightActions} />

            <DatingCard
                user={currentUser}
                onLike={handleLike}
                onPass={handlePass}
            />

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
                <Text style={[styles.infoText, { color: colors.text }]}>
                    Swipe right to like, left to pass
                </Text>
                <Text style={[styles.subInfoText, { color: colors.text }]}>
                    Find meaningful connections through shared causes
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heartButton: {
        padding: 8,
    },
    bottomInfo: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    subInfoText: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.7,
    },
});
