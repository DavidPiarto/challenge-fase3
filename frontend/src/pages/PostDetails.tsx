import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { deletePost, getPostById } from '../services/posts';
import type { Post } from '../types/post';

const Article = styled.article`
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #f8fafc;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
`;

const ActionRow = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const EditButtonLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #bfdbfe;
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 600;

    &:hover {
        background: #dbeafe;
        border-color: #93c5fd;
    }
`;

const DeleteButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #fecaca;
    background: #fef2f2;
    color: #dc2626;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #fee2e2;
        border-color: #fca5a5;
    }
`;

export function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isProfessor = isAuthenticated && user?.role === 'professor';

    useEffect(() => {
        async function loadPost() {
            if (!id) {
                setErrorMessage('Post inválido.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setErrorMessage('');
                const data = await getPostById(id);
                setPost(data);
            } catch {
                setErrorMessage('Não foi possível carregar o post.');
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    async function handleDelete() {
        if (!id || !isProfessor) return;

        const confirmed = window.confirm('Tem certeza que deseja excluir este post?');

        if (!confirmed) return;

        try {
            setDeleting(true);
            await deletePost(id);
            navigate('/');
        } catch {
            setErrorMessage('Não foi possível excluir o post.');
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link to="/">← Voltar</Link>

                {loading && <p>Carregando post...</p>}
                {errorMessage && <p>{errorMessage}</p>}

                {!loading && !errorMessage && post && (
                    <Article>
                        <h1 style={{ fontSize: '2rem' }}>{post.title}</h1>

                        <div style={{ color: '#6b7280' }}>
                            {post.author && <p>Autor: {post.author}</p>}
                            {(post.id ?? post._id) && <p>ID: {post.id ?? post._id}</p>}
                        </div>

                        <p style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                            {post.content}
                        </p>

                        {isProfessor && (
                            <ActionRow>
                                <EditButtonLink to={`/posts/${post.id ?? post._id}/edit`}>
                                    <FiEdit />
                                    Editar post
                                </EditButtonLink>

                                <DeleteButton
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    <FiTrash2 />
                                    {deleting ? 'Excluindo...' : 'Excluir post'}
                                </DeleteButton>
                            </ActionRow>
                        )}
                    </Article>
                )}
            </div>
        </Layout>
    );
}