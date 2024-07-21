import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getSingleBlogRoute, updateBlogRoute} from '../utils/APIroutes';

const categories = ['Select a Category', 'All', 'Music', 'Movies', 'Sports', 'Tech', 'Fashion'];

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
};

function UpdateBlog()
{
    const navigate = useNavigate();
    const {blogId} = useParams();
    const [blog, setBlog] = useState(undefined);
    // const [user, setUser] = useState(() => {
    //     return JSON.parse(localStorage.getItem('blog-user'));
    // }); 
    // const [blog, setBlog] = useState({
    //     title: "",
    //     category: "Select a Category",
    //     author: user.username,
    //     content: "",
    //     imageUrl: BlogPost,
    //     createdBy: user.userId,
    // });

    useEffect(() => {
        const fetchBlog = async () => {
            // const user = JSON.parse(localStorage.getItem('blog-user'));
            // setCurrentUser(user);
            const {data} = await axios(`${getSingleBlogRoute}/${blogId}`);
            // console.log(data);
            if(data.status)
            {
                // return data.blog;
                setBlog(data.blog);
            }
            else
            {
                toast.error(data.msg, toastOptions);
                navigate('/');
            }
        };
        fetchBlog();
    }, [blogId, navigate]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setBlog({...blog, [name]: value});
    };

    const handleClick = async () => {
        if(handleValidation())
        {
            // console.log('Validation done');
            const {data} = await axios.patch(`${updateBlogRoute}/${blogId}`, blog);
            if(data.status)
            {
                // console.log(data.user);
                // localStorage.setItem('blog-user', JSON.stringify(data.user));
                navigate(`/details/${blogId}`);
            }
            else
            {
                toast.error(`${data.msg}`, toastOptions);
            }
        }
    };

    function handleValidation()
    {
        if(!blog.title || !blog.content)
        {
            toast.error('Title and content fields are required to be filled', toastOptions);
            return false;
        }
        else if(blog.category === "Select a Category")
        {
            toast.error('Select a category for the blog', toastOptions);
            return false;
        }
        return true;
    }

    const categoryOptions = categories.map((category, index) => {
        return <option key={index}>{category}</option>
    });

    return (
        <>
            {blog && <>
                <Section>
                    <img src={blog.imageUrl} alt='Blog'/>
                    <div className="input-fields">
                        <div className="input-1">
                            <input name='title' value={blog.title} placeholder='Title' onChange={(e) => handleChange(e)} spellCheck='true'/>
                            <select name="category" value={blog.category} onChange={(e) => handleChange(e)}>
                                {categoryOptions}
                            </select>
                            <button onClick={handleClick}>UPDATE</button>
                        </div>
                        <textarea name="content" value={blog.content} placeholder='Tell your story...' onChange={(e) => handleChange(e)} spellCheck='true'/>
                    </div>
                </Section>
                <ToastContainer/>
            </>}
        </>
    );
}

const Section = styled.section`
    /* background-color: red; */
    height: 100vh;
    width: 80vw;
    margin: 0 auto;
    /* padding: 2rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    img
    {
        height: 60vh;
        width: 100%;
    }
    .input-fields
    {
        /* background-color: black; */
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
        .input-1
        {
            display: flex;
            height: 2rem;
            gap: 1rem;
            input
            {
                width: 100%;
                font-size: 1.2rem;
                border: none;
                &:focus
                {
                    outline: none;
                }
            }
            button
            {
                padding: 0.5rem;
                color: white;
                margin-left: auto;
                background-color: steelblue;
                cursor: pointer;
                &:hover
                {
                    background-color: #3a6d97;
                }
            }
        }
        select
        {
            width: 10rem;
            cursor: pointer;
        }
        textarea
        {
            font-size: 1.2rem;
            border: none;
            &:focus
            {
                outline: none;
            }
        }
    }
`;

export default UpdateBlog;