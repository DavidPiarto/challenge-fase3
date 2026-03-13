import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { getPostById, updatePost } from '../services/posts';

export function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function loadPost() {
            if (!id) {
                setErrorMessage('Post inválido.');
                setLoading(false);
                return;
            }

            try {
                setErrorMessage('');
                const post = await getPostById(id);

                setTitle(post.title ?? '');
                setContent(post.content ?? '');
                setAuthor(post.author ?? '');
            } catch {
                setErrorMessage('Não foi possível carregar o post para edição.');
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!id) {
            setErrorMessage('Post inválido.');
            return;
        }

        if (!title.trim() || !content.trim() || !author.trim()) {
            setErrorMessage('Preencha título, conteúdo e autor.');
            return;
        }

        try {
            setSaving(true);
            setErrorMessage('');

            const updatedPost = await updatePost(id, {
                title: title.trim(),
                content: content.trim(),
                author: author.trim(),
            });

            const updatedId = updatedPost.id ?? updatedPost._id ?? id;
            navigate(`/posts/${updatedId}`);
        } catch {
            setErrorMessage('Não foi possível atualizar o post.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Layout>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Editar post</h1>
                    <p style={{ color: '#4b5563' }}>
                        Atualize os dados do post selecionado.
                    </p>
                </div>

                {loading ? (
                    <p>Carregando dados do post...</p>
                ) : (
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
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="content">Conteúdo</label>
                            <textarea
                                id="content"
                                rows={8}
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
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
                            disabled={saving}
                            style={{
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {saving ? 'Salvando...' : 'Salvar alterações'}
                        </button>

                        {errorMessage && <p>{errorMessage}</p>}
                    </form>
                )}
            </section>
        </Layout>
    );
}