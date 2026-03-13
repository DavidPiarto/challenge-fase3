import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { createPost } from '../services/posts';

export function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage('');

        if (!title.trim() || !content.trim() || !author.trim()) {
            setErrorMessage('Preencha título, conteúdo e autor.');
            return;
        }

        try {
            setLoading(true);

            const createdPost = await createPost({
                title: title.trim(),
                content: content.trim(),
                author: author.trim(),
            });

            const createdId = createdPost.id ?? createdPost._id;

            if (createdId) {
                navigate(`/posts/${createdId}`);
                return;
            }

            navigate('/');
        } catch {
            setErrorMessage('Não foi possível criar o post.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Criar post</h1>
                    <p style={{ color: '#4b5563' }}>
                        Preencha os campos abaixo para cadastrar um novo post.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '1.5rem',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="title">Título</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Digite o título do post"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="author">Autor</label>
                        <input
                            id="author"
                            type="text"
                            placeholder="Digite o nome do autor"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="content">Conteúdo</label>
                        <textarea
                            id="content"
                            placeholder="Digite o conteúdo do post"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={8}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                resize: 'vertical',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.85rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {loading ? 'Salvando...' : 'Criar post'}
                    </button>

                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </section>
        </Layout>
    );
}