import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import BlogBG from "../assets/BlogBG.png";
import BlogCategories from "../components/BlogCategories";
import BlogPosts from "../components/BlogPosts";
import {getAllBlogsRoute} from '../utils/APIroutes';

function Blog()
{
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlogs = async () => {
            const {data} = await axios(getAllBlogsRoute);
            setBlogs(data.blogs);
        };
        getAllBlogs();
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('blog-user'))
        {
            navigate('/login');
        }
    }, [navigate]);

    const setCategory = async (category) => {
        let url = getAllBlogsRoute;
        if(category !== 'All Categories')
        {
            url += `?category=${category}`;
        }
        const {data} = await axios(url);
        setBlogs(data.blogs);
    };

    return (
        <Main>
            <img src={BlogBG} alt='Blog BG'/>
            <section>
                <BlogCategories setCategory={setCategory}/>
                <BlogPosts blogs={blogs}/>
            </section>
        </Main>
    );
}

const Main = styled.div`
    /* width: 100vw; */
    /* background-color: lightgreen; */
    img
    {
        height: 50vh;
        width: 100vw;
        margin-bottom: 1rem;
    }
    section
    {
        /* display: grid;
        grid-template-columns: 15% 85%; */
        display: grid;
        grid-template-columns: 0.7fr 3.3fr; /* Adjust these values for your desired layout */
        gap: 1rem;
        padding: 1rem;
    }
`;

export default Blog;