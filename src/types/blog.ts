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

export interface Comment {
    id: string;
    content: string;
    user: {
        email: string;
    };
    createdAt: string; // Add this line
}
