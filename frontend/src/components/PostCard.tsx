import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import type { Post } from '../types/post';

type PostCardProps = {
    post: Post;
};

const Card = styled.article`
    border-radius: 16px;
    padding: 1.25rem;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
`;

const Title = styled.h2`
    font-size: 1.25rem;
    line-height: 1.4;
    color: #111827;
`;

const Excerpt = styled.p`
    color: #4b5563;
    line-height: 1.6;
    flex: 1;
`;

const Meta = styled.div`
    font-size: 0.9rem;
    color: #6b7280;
`;

const ReadMoreLink = styled(Link)`
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 1rem;
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

export function PostCard({ post }: PostCardProps) {
    const postId = post.id ?? post._id;

    return (
        <Card>
            <Title>{post.title}</Title>

            <Excerpt>
                {post.content.length > 140
                    ? `${post.content.slice(0, 140)}...`
                    : post.content}
            </Excerpt>

            <Meta>
                {post.author ? `Autor: ${post.author}` : 'Autor não informado'}
            </Meta>

            {postId && (
                <ReadMoreLink to={`/posts/${postId}`}>
                    Ler post completo
                    <FiArrowRight />
                </ReadMoreLink>
            )}
        </Card>
    );
}