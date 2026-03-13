import { api } from './api';
import type { Post } from '../types/post';

type CreatePostDTO = {
    title: string;
    content: string;
    author: string;
};

type UpdatePostDTO = {
    title: string;
    content: string;
    author: string;
};

export async function getPosts(): Promise<Post[]> {
    const response = await api.get('/posts');

    if (Array.isArray(response.data)) {
        return response.data;
    }

    if (Array.isArray(response.data?.posts)) {
        return response.data.posts;
    }

    return [];
}

export async function searchPosts(query: string): Promise<Post[]> {
    const response = await api.get('/posts/search', {
        params: { q: query },
    });

    if (Array.isArray(response.data)) {
        return response.data;
    }

    if (Array.isArray(response.data?.posts)) {
        return response.data.posts;
    }

    return [];
}

export async function getPostById(id: string): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data;
}

export async function updatePost(id: string, data: UpdatePostDTO): Promise<Post> {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
}

export async function deletePost(id: string) {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
}