import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './Header';

type LayoutProps = {
    children: ReactNode;
};

const Main = styled.main`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
}