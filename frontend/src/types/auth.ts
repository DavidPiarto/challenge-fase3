export type UserRole = 'professor';

export interface User {
    name: string;
    email: string;
    role: UserRole;
}

export interface AuthContextData {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}