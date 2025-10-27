import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataMigrationService } from '../../scripts/migrateData';

interface MigrationComponentProps {
    onMigrationComplete?: () => void;
}

export const DataMigrationComponent: React.FC<MigrationComponentProps> = ({
    onMigrationComplete
}) => {
    const [isMigrating, setIsMigrating] = useState(false);
    const [migrationStatus, setMigrationStatus] = useState<string>('');

    const handleMigration = async () => {
        try {
            setIsMigrating(true);
            setMigrationStatus('Starting migration...');

            await DataMigrationService.migrateAllData();

            setMigrationStatus('Migration completed successfully!');
            Alert.alert(
                'Success',
                'Data has been successfully migrated to Firebase!',
                [{ text: 'OK', onPress: onMigrationComplete }]
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Migration failed';
            setMigrationStatus(`Migration failed: ${errorMessage}`);
            Alert.alert('Error', `Migration failed: ${errorMessage}`);
        } finally {
            setIsMigrating(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Firebase Data Migration</Text>
            <Text style={styles.description}>
                This will migrate all mock data to Firebase Firestore.
                Make sure you have a stable internet connection.
            </Text>

            <TouchableOpacity
                style={[styles.button, isMigrating && styles.buttonDisabled]}
                onPress={handleMigration}
                disabled={isMigrating}
            >
                <Text style={styles.buttonText}>
                    {isMigrating ? 'Migrating...' : 'Start Migration'}
                </Text>
            </TouchableOpacity>

            {migrationStatus ? (
                <Text style={styles.status}>{migrationStatus}</Text>
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
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default DataMigrationComponent;
