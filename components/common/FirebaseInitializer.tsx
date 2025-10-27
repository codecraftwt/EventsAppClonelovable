import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { checkCollectionsExist, initializeFirebaseCollections } from '../../scripts/initializeFirebase';

export const FirebaseInitializer: React.FC = () => {
    const [isInitializing, setIsInitializing] = useState(false);
    const [collectionsStatus, setCollectionsStatus] = useState<any>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleInitialize = async () => {
        try {
            setIsInitializing(true);

            const success = await initializeFirebaseCollections();

            if (success) {
                Alert.alert(
                    'Success!',
                    'Firebase collections have been initialized successfully!',
                    [{ text: 'OK' }]
                );
                // Refresh collection status
                await handleCheckCollections();
            } else {
                Alert.alert('Error', 'Failed to initialize collections. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', `Failed to initialize: ${error}`);
        } finally {
            setIsInitializing(false);
        }
    };

    const handleCheckCollections = async () => {
        try {
            setIsChecking(true);
            const status = await checkCollectionsExist();
            setCollectionsStatus(status);
        } catch (error) {
            Alert.alert('Error', `Failed to check collections: ${error}`);
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Firebase Collections Setup</Text>
            <Text style={styles.description}>
                This will create the following collections in your Firebase Firestore:
            </Text>

            <View style={styles.collectionsList}>
                <Text style={styles.collectionItem}>• users - User profiles</Text>
                <Text style={styles.collectionItem}>• events - Community events</Text>
                <Text style={styles.collectionItem}>• posts - Social posts</Text>
                <Text style={styles.collectionItem}>• comments - Post comments</Text>
                <Text style={styles.collectionItem}>• resources - Educational resources</Text>
                <Text style={styles.collectionItem}>• groups - Community groups</Text>
            </View>

            <TouchableOpacity
                style={[styles.button, isInitializing && styles.buttonDisabled]}
                onPress={handleInitialize}
                disabled={isInitializing}
            >
                <Text style={styles.buttonText}>
                    {isInitializing ? 'Initializing...' : 'Initialize Collections'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton, isChecking && styles.buttonDisabled]}
                onPress={handleCheckCollections}
                disabled={isChecking}
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    {isChecking ? 'Checking...' : 'Check Collections Status'}
                </Text>
            </TouchableOpacity>

            {collectionsStatus && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusTitle}>Collection Status:</Text>
                    {Object.entries(collectionsStatus).map(([name, status]: [string, any]) => (
                        <View key={name} style={styles.statusItem}>
                            <Text style={styles.statusName}>{name}:</Text>
                            <Text style={[
                                styles.statusValue,
                                status.exists ? styles.statusSuccess : styles.statusError
                            ]}>
                                {status.exists ? `✅ ${status.count} documents` : `❌ ${status.error}`}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
        lineHeight: 24,
    },
    collectionsList: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    collectionItem: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#34C759',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: 'white',
    },
    statusContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    statusItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statusName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    statusValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    statusSuccess: {
        color: '#34C759',
    },
    statusError: {
        color: '#FF3B30',
    },
});

export default FirebaseInitializer;
