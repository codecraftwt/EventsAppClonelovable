import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../constants/firebase';

export const FirebaseTestComponent: React.FC = () => {
    const [isTesting, setIsTesting] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<string>('');

    const testFirebaseConnection = async () => {
        try {
            setIsTesting(true);
            setConnectionStatus('Testing connection...');

            // Try to read from a collection (this will create it if it doesn't exist)
            const testRef = collection(db, 'test');
            const snapshot = await getDocs(testRef);

            setConnectionStatus('✅ Firebase connection successful!');
            Alert.alert('Success', 'Firebase connection is working properly!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setConnectionStatus(`❌ Connection failed: ${errorMessage}`);
            Alert.alert('Error', `Firebase connection failed: ${errorMessage}`);
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Firebase Connection Test</Text>
            <Text style={styles.description}>
                Test your Firebase connection before setting up collections.
            </Text>

            <TouchableOpacity
                style={[styles.button, isTesting && styles.buttonDisabled]}
                onPress={testFirebaseConnection}
                disabled={isTesting}
            >
                <Text style={styles.buttonText}>
                    {isTesting ? 'Testing...' : 'Test Connection'}
                </Text>
            </TouchableOpacity>

            {connectionStatus ? (
                <Text style={styles.status}>{connectionStatus}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 32,
        color: '#666',
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    status: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        color: '#333',
    },
});

export default FirebaseTestComponent;
