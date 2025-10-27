// Types for the Minneapolis Connect App

export interface User {
    id: string;
    name: string;
    age?: number;
    location: string;
    occupation?: string;
    profileImage?: string;
    bio?: string;
    interests: string[];
    verified: boolean;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: EventCategory;
    image?: string;
    attendees: number;
    maxAttendees?: number;
    organizer: User;
    tags: string[];
}

export interface Post {
    id: string;
    author: User;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    event?: Event;
}

export interface Comment {
    id: string;
    author: User;
    content: string;
    timestamp: string;
    likes: number;
}

export interface Resource {
    id: string;
    title: string;
    type: ResourceType;
    duration: string;
    category: string;
    description?: string;
    url?: string;
}

export interface Group {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    newMessages: number;
    image?: string;
    category: string;
}

export type EventCategory =
    | 'Community'
    | 'Volunteering'
    | 'Small Business'
    | 'Social Dinners'
    | 'Networking'
    | 'Fundraising'
    | 'Environmental'
    | 'Social Justice';

export type ResourceType = 'Article' | 'Video' | 'Podcast' | 'Guide' | 'Toolkit';

export type TabName = 'Home' | 'Events' | 'Dates' | 'Library';

