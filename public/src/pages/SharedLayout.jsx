import React, {useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import styled from "styled-components";

function SharedLayout()
{
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('blog-user'))
        {
            navigate('/login');
        }
    }, [navigate]); 

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <>
            <Header>
                <StyledLink to="/">HOME</StyledLink>
                <StyledLink to="/about">ABOUT</StyledLink>
                <StyledLink to="/contact">CONTACT</StyledLink>
                <StyledLink to='/login' onClick={handleLogout}>LOGOUT</StyledLink>
            </Header>
            <Content>
                <Outlet/>
            </Content>
        </>
    );
}

const Header = styled.header`
    height: 10vh;
    width: 100vw;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:hover
    {
        color: steelblue;
    }
`;

const Content = styled.div`
    margin-top: 10vh; /* Adjust this value based on the height of the header */
    /* padding: 1rem; */
    height: calc(90vh);
    overflow-y: auto;
`;

export default SharedLayout;