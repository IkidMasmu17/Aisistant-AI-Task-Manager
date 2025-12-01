export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date | null;
    priority: 'low' | 'medium' | 'high';
    category: string;
    status: 'pending' | 'completed';
    userId: string;
    createdAt: Date;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    userId: string;
}

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}
