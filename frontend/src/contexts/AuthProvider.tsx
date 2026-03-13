import { useState, type ReactNode } from 'react';
import { AuthContext } from './auth-context';
import type { User } from '../types/auth';

type AuthProviderProps = {
    children: ReactNode;
};

const MOCK_CREDENTIALS = {
    email: 'professor@fiap.com',
    password: '123456',
};

const MOCK_USER: User = {
    name: 'Professor',
    email: 'professor@fiap.com',
    role: 'professor',
};

function getStoredAuth() {
    const storedToken = localStorage.getItem('@challenge:token');
    const storedUser = localStorage.getItem('@challenge:user');

    if (!storedToken || !storedUser) {
        return {
            token: null,
            user: null,
        };
    }

    try {
        return {
            token: storedToken,
            user: JSON.parse(storedUser) as User,
        };
    } catch {
        localStorage.removeItem('@challenge:token');
        localStorage.removeItem('@challenge:user');

        return {
            token: null,
            user: null,
        };
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState(() => getStoredAuth());

    async function signIn(email: string, password: string) {
        const isValid =
            email === MOCK_CREDENTIALS.email &&
            password === MOCK_CREDENTIALS.password;

        if (!isValid) {
            throw new Error('Credenciais inválidas');
        }

        const fakeToken = 'fake-jwt-token-professor';

        localStorage.setItem('@challenge:token', fakeToken);
        localStorage.setItem('@challenge:user', JSON.stringify(MOCK_USER));

        setAuth({
            token: fakeToken,
            user: MOCK_USER,
        });
    }

    function signOut() {
        localStorage.removeItem('@challenge:token');
        localStorage.removeItem('@challenge:user');

        setAuth({
            token: null,
            user: null,
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user: auth.user,
                token: auth.token,
                isAuthenticated: !!auth.token,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}