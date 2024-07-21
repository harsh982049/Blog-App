import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";

const categories = ['All Categories', 'Music', 'Movies', 'Sports', 'Tech', 'Fashion'];

function BlogCategories({setCategory})
{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create');
    };

    const categoryContent = categories.map((category) => {
        return <div className='category' key={category} onClick={(e) => setCategory(category)}>{category}</div>
    });

    return (
        <Container>
            <button onClick={handleClick}>CREATE BLOG</button>
            <div className='category-section'>{categoryContent}</div>
        </Container>
    );
}

const Container = styled.div`
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    gap: 2rem;
    /* width: 0.7fr; */
    button
    {
        width: 80%;
        background-color: #47b2f9;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        &:hover
        {
            background-color: #3f3bc6;
        }
    }
    .category-section
    {
        width: 95%;
        align-self: flex-start;
        /* padding: 2rem 1rem; */
        /* border: 1px solid black; */
        /* display: flex;
        flex-direction: column; */
        /* background-color: blue; */
        .category
        {
            padding: 1rem 1rem;
            border: 1px solid lightgray;
            cursor: pointer;
            &:hover
            {
                background-color: lightgray;
            }
        }
    }
`;

export default BlogCategories;