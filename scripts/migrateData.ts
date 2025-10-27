import { mockComments, mockEvents, mockGroups, mockPosts, mockResources, mockUsers } from '../constants/mockData';
import { CommentService, EventService, GroupService, PostService, ResourceService, UserService } from '../services/firestoreService';

// Migration script to populate Firebase Firestore with mock data
export class DataMigrationService {
    static async migrateAllData(): Promise<void> {
        try {
            console.log('Starting data migration to Firebase...');

            // Migrate users first (other collections depend on them)
            await this.migrateUsers();

            // Migrate other collections
            await this.migrateEvents();
            await this.migrateComments();
            await this.migratePosts();
            await this.migrateResources();
            await this.migrateGroups();

            console.log('Data migration completed successfully!');
        } catch (error) {
            console.error('Error during data migration:', error);
            throw error;
        }
    }

    static async migrateUsers(): Promise<void> {
        console.log('Migrating users...');
        for (const user of mockUsers) {
            try {
                await UserService.createUser({
                    name: user.name,
                    age: user.age,
                    location: user.location,
                    occupation: user.occupation,
                    profileImage: user.profileImage,
                    bio: user.bio,
                    interests: user.interests,
                    verified: user.verified
                });
                console.log(`Created user: ${user.name}`);
            } catch (error) {
                console.error(`Error creating user ${user.name}:`, error);
            }
        }
    }

    static async migrateEvents(): Promise<void> {
        console.log('Migrating events...');
        for (const event of mockEvents) {
            try {
                await EventService.createEvent({
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    category: event.category,
                    image: event.image,
                    attendees: event.attendees,
                    organizer: event.organizer,
                    tags: event.tags
                });
                console.log(`Created event: ${event.title}`);
            } catch (error) {
                console.error(`Error creating event ${event.title}:`, error);
            }
        }
    }

    static async migrateComments(): Promise<void> {
        console.log('Migrating comments...');
        for (const comment of mockComments) {
            try {
                await CommentService.createComment({
                    author: comment.author,
                    content: comment.content,
                    timestamp: comment.timestamp,
                    likes: comment.likes
                });
                console.log(`Created comment by: ${comment.author.name}`);
            } catch (error) {
                console.error(`Error creating comment by ${comment.author.name}:`, error);
            }
        }
    }

    static async migratePosts(): Promise<void> {
        console.log('Migrating posts...');
        for (const post of mockPosts) {
            try {
                await PostService.createPost({
                    author: post.author,
                    content: post.content,
                    image: post.image,
                    timestamp: post.timestamp,
                    likes: post.likes,
                    comments: post.comments,
                    event: post.event
                });
                console.log(`Created post by: ${post.author.name}`);
            } catch (error) {
                console.error(`Error creating post by ${post.author.name}:`, error);
            }
        }
    }

    static async migrateResources(): Promise<void> {
        console.log('Migrating resources...');
        for (const resource of mockResources) {
            try {
                await ResourceService.createResource({
                    title: resource.title,
                    type: resource.type,
                    duration: resource.duration,
                    category: resource.category,
                    description: resource.description
                });
                console.log(`Created resource: ${resource.title}`);
            } catch (error) {
                console.error(`Error creating resource ${resource.title}:`, error);
            }
        }
    }

    static async migrateGroups(): Promise<void> {
        console.log('Migrating groups...');
        for (const group of mockGroups) {
            try {
                await GroupService.createGroup({
                    name: group.name,
                    description: group.description,
                    memberCount: group.memberCount,
                    newMessages: group.newMessages,
                    image: group.image,
                    category: group.category
                });
                console.log(`Created group: ${group.name}`);
            } catch (error) {
                console.error(`Error creating group ${group.name}:`, error);
            }
        }
    }

    // Method to clear all data (useful for testing)
    static async clearAllData(): Promise<void> {
        console.log('Clearing all data from Firebase...');
        // Note: This would require implementing delete methods in the services
        // For now, this is a placeholder
        console.log('Data clearing not implemented yet');
    }
}

// Export for use in other files
export default DataMigrationService;
