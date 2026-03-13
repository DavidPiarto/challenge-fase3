import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiLogIn, FiPlus, FiShield, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const HeaderWrapper = styled.header`
    background: #f8fafc;
`;

const HeaderContent = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const Nav = styled.nav`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const NavButtonLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #ffffff;
    color: #111827;
    font-weight: 600;
    transition: 0.2s;

    &:hover {
        background: #f9fafb;
        border-color: #9ca3af;
    }
`;

const AdminLink = styled(NavButtonLink)`
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1d4ed8;

    &:hover {
        background: #dbeafe;
        border-color: #93c5fd;
    }
`;

const NewPostLink = styled(NavButtonLink)`
    background: #ecfdf5;
    border-color: #a7f3d0;
    color: #047857;

    &:hover {
        background: #d1fae5;
        border-color: #6ee7b7;
    }
`;

const LogoutButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid #fecaca;
    background: #fef2f2;
    color: #dc2626;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: #fee2e2;
        border-color: #fca5a5;
    }
`;

export function Header() {
    const { isAuthenticated, user, signOut } = useAuth();

    const isProfessor = isAuthenticated && user?.role === 'professor';

    return (
        <HeaderWrapper>
            <HeaderContent>
                <Nav>
                    <NavButtonLink to="/">
                        <FiHome />
                        Home
                    </NavButtonLink>

                    {!isAuthenticated && (
                        <NavButtonLink to="/login">
                            <FiLogIn />
                            Login
                        </NavButtonLink>
                    )}

                    {isAuthenticated && (
                        <NewPostLink to="/posts/new">
                            <FiPlus />
                            Novo post
                        </NewPostLink>
                    )}

                    {isProfessor && (
                        <AdminLink to="/admin">
                            <FiShield />
                            Admin
                        </AdminLink>
                    )}
                </Nav>

                {isAuthenticated && (
                    <LogoutButton onClick={signOut} type="button">
                        <FiLogOut />
                        Sair
                    </LogoutButton>
                )}
            </HeaderContent>
        </HeaderWrapper>
    );
}