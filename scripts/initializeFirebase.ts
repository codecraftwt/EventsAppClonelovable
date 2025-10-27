import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { mockComments, mockEvents, mockGroups, mockPosts, mockResources, mockUsers } from '../constants/mockData';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-Z-63K0TVMnbYAtKMnbKV45DDPTVHrOE",
    authDomain: "test-app-1b89b.firebaseapp.com",
    projectId: "test-app-1b89b",
    storageBucket: "test-app-1b89b.firebasestorage.app",
    messagingSenderId: "854474821664",
    appId: "1:854474821664:web:706d2bc147932ec132ec45",
    measurementId: "G-E4G46YVD1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection names
const COLLECTIONS = {
    USERS: 'users',
    EVENTS: 'events',
    POSTS: 'posts',
    COMMENTS: 'comments',
    RESOURCES: 'resources',
    GROUPS: 'groups'
};

// Function to initialize collections with sample data
export async function initializeFirebaseCollections() {
    try {
        console.log('🚀 Initializing Firebase collections...');

        // Create collections by adding sample documents
        await createUsersCollection();
        await createEventsCollection();
        await createPostsCollection();
        await createCommentsCollection();
        await createResourcesCollection();
        await createGroupsCollection();

        console.log('✅ All collections initialized successfully!');
        return true;
    } catch (error) {
        console.error('❌ Error initializing collections:', error);
        return false;
    }
}

async function createUsersCollection() {
    console.log('📝 Creating users collection...');
    const usersRef = collection(db, COLLECTIONS.USERS);

    for (const user of mockUsers) {
        try {
            await addDoc(usersRef, {
                name: user.name,
                age: user.age,
                location: user.location,
                occupation: user.occupation,
                profileImage: user.profileImage,
                bio: user.bio,
                interests: user.interests,
                verified: user.verified,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added user: ${user.name}`);
        } catch (error) {
            console.error(`❌ Error adding user ${user.name}:`, error);
        }
    }
}

async function createEventsCollection() {
    console.log('📝 Creating events collection...');
    const eventsRef = collection(db, COLLECTIONS.EVENTS);

    for (const event of mockEvents) {
        try {
            await addDoc(eventsRef, {
                title: event.title,
                description: event.description,
                date: event.date,
                time: event.time,
                location: event.location,
                category: event.category,
                image: event.image,
                attendees: event.attendees,
                organizerId: event.organizer?.id || null,
                tags: event.tags,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added event: ${event.title}`);
        } catch (error) {
            console.error(`❌ Error adding event ${event.title}:`, error);
        }
    }
}

async function createPostsCollection() {
    console.log('📝 Creating posts collection...');
    const postsRef = collection(db, COLLECTIONS.POSTS);

    for (const post of mockPosts) {
        try {
            await addDoc(postsRef, {
                authorId: post.author?.id || null,
                content: post.content,
                image: post.image,
                timestamp: post.timestamp,
                likes: post.likes,
                eventId: post.event?.id || null,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added post by: ${post.author?.name}`);
        } catch (error) {
            console.error(`❌ Error adding post by ${post.author?.name}:`, error);
        }
    }
}

async function createCommentsCollection() {
    console.log('📝 Creating comments collection...');
    const commentsRef = collection(db, COLLECTIONS.COMMENTS);

    for (const comment of mockComments) {
        try {
            await addDoc(commentsRef, {
                authorId: comment.author?.id || null,
                content: comment.content,
                timestamp: comment.timestamp,
                likes: comment.likes,
                postId: '1', // Default post ID for now
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added comment by: ${comment.author?.name}`);
        } catch (error) {
            console.error(`❌ Error adding comment by ${comment.author?.name}:`, error);
        }
    }
}

async function createResourcesCollection() {
    console.log('📝 Creating resources collection...');
    const resourcesRef = collection(db, COLLECTIONS.RESOURCES);

    for (const resource of mockResources) {
        try {
            await addDoc(resourcesRef, {
                title: resource.title,
                type: resource.type,
                duration: resource.duration,
                category: resource.category,
                description: resource.description,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added resource: ${resource.title}`);
        } catch (error) {
            console.error(`❌ Error adding resource ${resource.title}:`, error);
        }
    }
}

async function createGroupsCollection() {
    console.log('📝 Creating groups collection...');
    const groupsRef = collection(db, COLLECTIONS.GROUPS);

    for (const group of mockGroups) {
        try {
            await addDoc(groupsRef, {
                name: group.name,
                description: group.description,
                memberCount: group.memberCount,
                newMessages: group.newMessages,
                image: group.image,
                category: group.category,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added group: ${group.name}`);
        } catch (error) {
            console.error(`❌ Error adding group ${group.name}:`, error);
        }
    }
}

// Function to check if collections exist
export async function checkCollectionsExist() {
    try {
        const collections = [
            COLLECTIONS.USERS,
            COLLECTIONS.EVENTS,
            COLLECTIONS.POSTS,
            COLLECTIONS.COMMENTS,
            COLLECTIONS.RESOURCES,
            COLLECTIONS.GROUPS
        ];

        const results: Record<string, { exists: boolean; count?: number; error?: string }> = {};

        for (const collectionName of collections) {
            try {
                const snapshot = await getDocs(collection(db, collectionName));
                results[collectionName] = {
                    exists: true,
                    count: snapshot.size
                };
                console.log(`✅ Collection '${collectionName}' exists with ${snapshot.size} documents`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                results[collectionName] = {
                    exists: false,
                    error: errorMessage
                };
                console.log(`❌ Collection '${collectionName}' does not exist or error: ${errorMessage}`);
            }
        }

        return results;
    } catch (error) {
        console.error('Error checking collections:', error);
        return null;
    }
}

export default app;
