import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    title: string;
    showLocationIcon?: boolean;
    rightActions?: React.ReactNode;
}

export function Header({ title, showLocationIcon = true, rightActions }: HeaderProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {showLocationIcon && (
                    <IconSymbol name="location.fill" size={20} color="#FF69B4" />
                )}
                <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
            </View>
            {rightActions && (
                <View style={styles.headerRight}>
                    {rightActions}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
});






