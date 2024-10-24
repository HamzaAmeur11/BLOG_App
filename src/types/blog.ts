export interface FormData {
    title: string;
    content: string;
}

export interface Post {
    user: any;
    id: string;
    title: string;
    content: string | null;
    authorEmail: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    // Add other user properties as needed
}

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    postId: string;
    authorEmail: string;
    user: User; // Ensure user property is included
}