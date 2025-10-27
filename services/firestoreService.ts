import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../constants/firebase';
import { Comment, Event, Group, Post, Resource, User } from '../types';

// Collection names
const COLLECTIONS = {
    USERS: 'users',
    EVENTS: 'events',
    POSTS: 'posts',
    COMMENTS: 'comments',
    RESOURCES: 'resources',
    GROUPS: 'groups'
};

// User Service
export class UserService {
    static async getUsers(): Promise<User[]> {
        try {
            const usersSnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
            return usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async getUserById(id: string): Promise<User | null> {
        try {
            const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, id));
            if (userDoc.exists()) {
                return { id: userDoc.id, ...userDoc.data() } as User;
            }
            return null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    static async createUser(userData: Omit<User, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.USERS), userData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async updateUser(id: string, userData: Partial<User>): Promise<void> {
        try {
            await updateDoc(doc(db, COLLECTIONS.USERS, id), userData);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static subscribeToUsers(callback: (users: User[]) => void): () => void {
        return onSnapshot(collection(db, COLLECTIONS.USERS), (snapshot) => {
            const users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            callback(users);
        });
    }
}

// Event Service
export class EventService {
    static async getEvents(): Promise<Event[]> {
        try {
            const eventsSnapshot = await getDocs(collection(db, COLLECTIONS.EVENTS));
            const events = [];

            for (const eventDoc of eventsSnapshot.docs) {
                const eventData = eventDoc.data();
                // Fetch organizer data
                if (eventData.organizerId) {
                    const organizer = await UserService.getUserById(eventData.organizerId);
                    events.push({
                        id: eventDoc.id,
                        ...eventData,
                        organizer: organizer || eventData.organizer
                    });
                } else {
                    events.push({
                        id: eventDoc.id,
                        ...eventData
                    });
                }
            }

            return events as Event[];
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    static async getEventById(id: string): Promise<Event | null> {
        try {
            const eventDoc = await getDoc(doc(db, COLLECTIONS.EVENTS, id));
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                // Fetch organizer data
                if (eventData.organizerId) {
                    const organizer = await UserService.getUserById(eventData.organizerId);
                    return {
                        id: eventDoc.id,
                        ...eventData,
                        organizer: organizer || eventData.organizer
                    } as Event;
                }
                return { id: eventDoc.id, ...eventData } as Event;
            }
            return null;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }

    static async getEventsByCategory(category: string): Promise<Event[]> {
        try {
            const q = query(
                collection(db, COLLECTIONS.EVENTS),
                where('category', '==', category)
            );
            const eventsSnapshot = await getDocs(q);
            const events = [];

            for (const eventDoc of eventsSnapshot.docs) {
                const eventData = eventDoc.data();
                if (eventData.organizerId) {
                    const organizer = await UserService.getUserById(eventData.organizerId);
                    events.push({
                        id: eventDoc.id,
                        ...eventData,
                        organizer: organizer || eventData.organizer
                    });
                } else {
                    events.push({
                        id: eventDoc.id,
                        ...eventData
                    });
                }
            }

            return events as Event[];
        } catch (error) {
            console.error('Error fetching events by category:', error);
            throw error;
        }
    }

    static async createEvent(eventData: Omit<Event, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.EVENTS), eventData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    static async updateEvent(id: string, eventData: Partial<Event>): Promise<void> {
        try {
            await updateDoc(doc(db, COLLECTIONS.EVENTS, id), eventData);
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    static subscribeToEvents(callback: (events: Event[]) => void): () => void {
        return onSnapshot(collection(db, COLLECTIONS.EVENTS), async (snapshot) => {
            const events = [];

            for (const eventDoc of snapshot.docs) {
                const eventData = eventDoc.data();
                if (eventData.organizerId) {
                    const organizer = await UserService.getUserById(eventData.organizerId);
                    events.push({
                        id: eventDoc.id,
                        ...eventData,
                        organizer: organizer || eventData.organizer
                    });
                } else {
                    events.push({
                        id: eventDoc.id,
                        ...eventData
                    });
                }
            }

            callback(events as Event[]);
        });
    }
}

// Post Service
export class PostService {
    static async getPosts(): Promise<Post[]> {
        try {
            const postsSnapshot = await getDocs(collection(db, COLLECTIONS.POSTS));
            const posts = [];

            for (const postDoc of postsSnapshot.docs) {
                const postData = postDoc.data();
                // Fetch author data
                if (postData.authorId) {
                    const author = await UserService.getUserById(postData.authorId);
                    // Fetch comments
                    const comments = await this.getCommentsByPostId(postDoc.id);
                    // Fetch event if exists
                    let event = null;
                    if (postData.eventId) {
                        event = await EventService.getEventById(postData.eventId);
                    }

                    posts.push({
                        id: postDoc.id,
                        ...postData,
                        author: author || postData.author,
                        comments,
                        event
                    });
                } else {
                    posts.push({
                        id: postDoc.id,
                        ...postData
                    });
                }
            }

            return posts as Post[];
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    static async getPostById(id: string): Promise<Post | null> {
        try {
            const postDoc = await getDoc(doc(db, COLLECTIONS.POSTS, id));
            if (postDoc.exists()) {
                const postData = postDoc.data();
                // Fetch author data
                if (postData.authorId) {
                    const author = await UserService.getUserById(postData.authorId);
                    const comments = await this.getCommentsByPostId(postDoc.id);
                    let event = null;
                    if (postData.eventId) {
                        event = await EventService.getEventById(postData.eventId);
                    }

                    return {
                        id: postDoc.id,
                        ...postData,
                        author: author || postData.author,
                        comments,
                        event
                    } as Post;
                }
                return { id: postDoc.id, ...postData } as Post;
            }
            return null;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }

    static async createPost(postData: Omit<Post, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.POSTS), postData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    static async updatePost(id: string, postData: Partial<Post>): Promise<void> {
        try {
            await updateDoc(doc(db, COLLECTIONS.POSTS, id), postData);
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    static subscribeToPosts(callback: (posts: Post[]) => void): () => void {
        return onSnapshot(collection(db, COLLECTIONS.POSTS), async (snapshot) => {
            const posts = [];

            for (const postDoc of snapshot.docs) {
                const postData = postDoc.data();
                if (postData.authorId) {
                    const author = await UserService.getUserById(postData.authorId);
                    const comments = await this.getCommentsByPostId(postDoc.id);
                    let event = null;
                    if (postData.eventId) {
                        event = await EventService.getEventById(postData.eventId);
                    }

                    posts.push({
                        id: postDoc.id,
                        ...postData,
                        author: author || postData.author,
                        comments,
                        event
                    });
                } else {
                    posts.push({
                        id: postDoc.id,
                        ...postData
                    });
                }
            }

            callback(posts as Post[]);
        });
    }
}

// Comment Service
export class CommentService {
    static async getCommentsByPostId(postId: string): Promise<Comment[]> {
        try {
            const q = query(
                collection(db, COLLECTIONS.COMMENTS),
                where('postId', '==', postId),
                orderBy('timestamp', 'desc')
            );
            const commentsSnapshot = await getDocs(q);
            const comments = [];

            for (const commentDoc of commentsSnapshot.docs) {
                const commentData = commentDoc.data();
                if (commentData.authorId) {
                    const author = await UserService.getUserById(commentData.authorId);
                    comments.push({
                        id: commentDoc.id,
                        ...commentData,
                        author: author || commentData.author
                    });
                } else {
                    comments.push({
                        id: commentDoc.id,
                        ...commentData
                    });
                }
            }

            return comments as Comment[];
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }

    static async createComment(commentData: Omit<Comment, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.COMMENTS), commentData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    static async updateComment(id: string, commentData: Partial<Comment>): Promise<void> {
        try {
            await updateDoc(doc(db, COLLECTIONS.COMMENTS, id), commentData);
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    }

    static async deleteComment(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, COLLECTIONS.COMMENTS, id));
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
}

// Resource Service
export class ResourceService {
    static async getResources(): Promise<Resource[]> {
        try {
            const resourcesSnapshot = await getDocs(collection(db, COLLECTIONS.RESOURCES));
            return resourcesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Resource[];
        } catch (error) {
            console.error('Error fetching resources:', error);
            throw error;
        }
    }

    static async getResourcesByCategory(category: string): Promise<Resource[]> {
        try {
            const q = query(
                collection(db, COLLECTIONS.RESOURCES),
                where('category', '==', category)
            );
            const resourcesSnapshot = await getDocs(q);
            return resourcesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Resource[];
        } catch (error) {
            console.error('Error fetching resources by category:', error);
            throw error;
        }
    }

    static async createResource(resourceData: Omit<Resource, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.RESOURCES), resourceData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating resource:', error);
            throw error;
        }
    }

    static subscribeToResources(callback: (resources: Resource[]) => void): () => void {
        return onSnapshot(collection(db, COLLECTIONS.RESOURCES), (snapshot) => {
            const resources = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Resource[];
            callback(resources);
        });
    }
}

// Group Service
export class GroupService {
    static async getGroups(): Promise<Group[]> {
        try {
            const groupsSnapshot = await getDocs(collection(db, COLLECTIONS.GROUPS));
            return groupsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Group[];
        } catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    }

    static async createGroup(groupData: Omit<Group, 'id'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.GROUPS), groupData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    static subscribeToGroups(callback: (groups: Group[]) => void): () => void {
        return onSnapshot(collection(db, COLLECTIONS.GROUPS), (snapshot) => {
            const groups = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Group[];
            callback(groups);
        });
    }
}
