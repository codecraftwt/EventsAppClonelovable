import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
}

export function SearchBar({ placeholder, value, onChangeText, onSubmitEditing }: SearchBarProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: '#F5F5F5' }]}>
                <IconSymbol name="magnifyingglass" size={20} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    placeholderTextColor="#666"
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
});

