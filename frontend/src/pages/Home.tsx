import { useEffect, useState, type FormEvent } from 'react';
import { Layout } from '../components/layout/Layout';
import { PostCard } from '../components/PostCard';
import { getPosts, searchPosts } from '../services/posts';
import type { Post } from '../types/post';

export function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function loadAllPosts() {
        try {
            setLoading(true);
            setErrorMessage('');
            const data = await getPosts();
            setPosts(data);
        } catch {
            setErrorMessage('Não foi possível carregar os posts.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAllPosts();
    }, []);

    async function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedTerm = searchTerm.trim();

        if (!trimmedTerm) {
            loadAllPosts();
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');

            const data = await searchPosts(trimmedTerm);
            setPosts(data);
        } catch {
            setPosts([]);
            setErrorMessage('Nenhum post encontrado para a busca informada.');
        } finally {
            setLoading(false);
        }
    }

    async function handleClearSearch() {
        setSearchTerm('');
        await loadAllPosts();
    }

    return (
        <Layout>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Blog</h1>
                    <p style={{ color: '#4b5563' }}>Lista pública de posts</p>
                </div>

                <form
                    onSubmit={handleSearch}
                    style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '1rem',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Busque por título ou conteúdo"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        style={{
                            flex: 1,
                            minWidth: '240px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                        }}
                    >
                        Buscar
                    </button>

                    <button
                        type="button"
                        onClick={handleClearSearch}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                        }}
                    >
                        Limpar
                    </button>
                </form>

                {loading && <p>Carregando posts...</p>}

                {errorMessage && <p>{errorMessage}</p>}

                {!loading && !errorMessage && posts.length === 0 && (
                    <p>Nenhum post encontrado.</p>
                )}

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1rem',
                    }}
                >
                    {posts.map((post) => {
                        const key = post.id ?? post._id ?? post.title;
                        return <PostCard key={key} post={post} />;
                    })}
                </div>
            </section>
        </Layout>
    );
}