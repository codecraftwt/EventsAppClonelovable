import FirebaseInitializer from '@/components/common/FirebaseInitializer';
import FirebaseTestComponent from '@/components/common/FirebaseTestComponent';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FirebaseSetupScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [activeTab, setActiveTab] = useState<'test' | 'setup'>('test');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'test' && styles.activeTab]}
                    onPress={() => setActiveTab('test')}
                >
                    <Text style={[styles.tabText, activeTab === 'test' && styles.activeTabText]}>
                        Test Connection
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
                    onPress={() => setActiveTab('setup')}
                >
                    <Text style={[styles.tabText, activeTab === 'setup' && styles.activeTabText]}>
                        Setup Collections
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === 'test' ? <FirebaseTestComponent /> : <FirebaseInitializer />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        margin: 16,
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: 'white',
    },
    content: {
        flex: 1,
    },
});
