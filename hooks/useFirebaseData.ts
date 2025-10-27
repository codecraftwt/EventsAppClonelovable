import { useEffect, useState } from 'react';
import { EventService, GroupService, PostService, ResourceService, UserService } from '../services/firestoreService';
import { Event, Group, Post, Resource, User } from '../types';

// Custom hook for managing Firebase data
export const useFirebaseData = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [usersData, eventsData, postsData, resourcesData, groupsData] = await Promise.all([
                    UserService.getUsers(),
                    EventService.getEvents(),
                    PostService.getPosts(),
                    ResourceService.getResources(),
                    GroupService.getGroups()
                ]);

                setUsers(usersData);
                setEvents(eventsData);
                setPosts(postsData);
                setResources(resourcesData);
                setGroups(groupsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
                console.error('Error loading Firebase data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Subscribe to real-time updates
    useEffect(() => {
        const unsubscribeUsers = UserService.subscribeToUsers(setUsers);
        const unsubscribeEvents = EventService.subscribeToEvents(setEvents);
        const unsubscribePosts = PostService.subscribeToPosts(setPosts);
        const unsubscribeResources = ResourceService.subscribeToResources(setResources);
        const unsubscribeGroups = GroupService.subscribeToGroups(setGroups);

        return () => {
            unsubscribeUsers();
            unsubscribeEvents();
            unsubscribePosts();
            unsubscribeResources();
            unsubscribeGroups();
        };
    }, []);

    return {
        users,
        events,
        posts,
        resources,
        groups,
        loading,
        error,
        // Helper methods
        getUserById: (id: string) => users.find(user => user.id === id),
        getEventById: (id: string) => events.find(event => event.id === id),
        getPostById: (id: string) => posts.find(post => post.id === id),
        getResourceById: (id: string) => resources.find(resource => resource.id === id),
        getGroupById: (id: string) => groups.find(group => group.id === id),
        getEventsByCategory: (category: string) => events.filter(event => event.category === category),
        getResourcesByCategory: (category: string) => resources.filter(resource => resource.category === category),
        getPostsByAuthor: (authorId: string) => posts.filter(post => post.author.id === authorId)
    };
};

// Individual hooks for specific data types
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                const usersData = await UserService.getUsers();
                setUsers(usersData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
        const unsubscribe = UserService.subscribeToUsers(setUsers);
        return unsubscribe;
    }, []);

    return { users, loading, error };
};

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const eventsData = await EventService.getEvents();
                setEvents(eventsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
        const unsubscribe = EventService.subscribeToEvents(setEvents);
        return unsubscribe;
    }, []);

    return { events, loading, error };
};

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const postsData = await PostService.getPosts();
                setPosts(postsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
        const unsubscribe = PostService.subscribeToPosts(setPosts);
        return unsubscribe;
    }, []);

    return { posts, loading, error };
};

export const useResources = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResources = async () => {
            try {
                setLoading(true);
                setError(null);
                const resourcesData = await ResourceService.getResources();
                setResources(resourcesData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load resources');
            } finally {
                setLoading(false);
            }
        };

        loadResources();
        const unsubscribe = ResourceService.subscribeToResources(setResources);
        return unsubscribe;
    }, []);

    return { resources, loading, error };
};

export const useGroups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                setLoading(true);
                setError(null);
                const groupsData = await GroupService.getGroups();
                setGroups(groupsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load groups');
            } finally {
                setLoading(false);
            }
        };

        loadGroups();
        const unsubscribe = GroupService.subscribeToGroups(setGroups);
        return unsubscribe;
    }, []);

    return { groups, loading, error };
};
