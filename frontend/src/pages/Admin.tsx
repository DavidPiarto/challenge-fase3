import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Layout } from '../components/layout/Layout';
import { deletePost, getPosts } from '../services/posts';
import type { Post } from '../types/post';

function getPostIdentifier(post: Post) {
    return post.id ?? post._id ?? '';
}

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
`;

const NewPostLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.75rem 1rem;
    border: 1px solid #a7f3d0;
    border-radius: 8px;
    background: #ecfdf5;
    color: #047857;
    font-weight: 700;

    &:hover {
        background: #d1fae5;
        border-color: #6ee7b7;
    }
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 720px;
`;

const Th = styled.th`
    text-align: left;
    padding: 1rem 0.75rem;
    background: #f1f5f9;
    color: #374151;
    font-size: 0.95rem;
`;

const Td = styled.td`
    padding: 0.95rem 0.75rem;
    border-top: 1px solid #e5e7eb;
    vertical-align: middle;
`;

const Actions = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const EditLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.9rem;
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
    gap: 0.4rem;
    padding: 0.6rem 0.9rem;
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

export function Admin() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function loadPosts() {
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
        loadPosts();
    }, []);

    async function handleDelete(post: Post) {
        const postId = getPostIdentifier(post);

        if (!postId) {
            setErrorMessage('Post inválido para exclusão.');
            return;
        }

        const confirmed = window.confirm('Deseja realmente excluir esta postagem?');

        if (!confirmed) return;

        try {
            await deletePost(postId);
            await loadPosts();
        } catch {
            setErrorMessage('Não foi possível excluir o post.');
        }
    }

    return (
        <Layout>
            <TopBar>
                <h1>Página administrativa</h1>
                <NewPostLink to="/posts/new">
                    <FiPlus />
                    Novo post
                </NewPostLink>
            </TopBar>

            {loading && <p>Carregando posts...</p>}
            {errorMessage && <p>{errorMessage}</p>}

            {!loading && !errorMessage && (
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Título</Th>
                                <Th>Autor</Th>
                                <Th>Data</Th>
                                <Th>Ações</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => {
                                const postId = getPostIdentifier(post);

                                return (
                                    <tr key={postId || post.title}>
                                        <Td>{post.title}</Td>
                                        <Td>{post.author || 'Não informado'}</Td>
                                        <Td>
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString('pt-BR')
                                                : '-'}
                                        </Td>
                                        <Td>
                                            {postId && (
                                                <Actions>
                                                    <EditLink to={`/posts/${postId}/edit`}>
                                                        <FiEdit />
                                                        Editar
                                                    </EditLink>

                                                    <DeleteButton
                                                        type="button"
                                                        onClick={() => handleDelete(post)}
                                                    >
                                                        <FiTrash2 />
                                                        Excluir
                                                    </DeleteButton>
                                                </Actions>
                                            )}
                                        </Td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </TableWrapper>
            )}
        </Layout>
    );
}