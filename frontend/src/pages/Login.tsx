import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';

export function Login() {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            await signIn(email, password);
            navigate('/admin');
        } catch {
            setErrorMessage('E-mail ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <h1>Login</h1>

            <p>Use o acesso do professor para gerenciar as postagens.</p>
            <p><strong>E-mail:</strong> professor@fiap.com</p>
            <p><strong>Senha:</strong> 123456</p>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxWidth: '400px',
                }}
            >
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </Layout>
    );
}