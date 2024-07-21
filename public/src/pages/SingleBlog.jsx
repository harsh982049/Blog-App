import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import {MdEdit, MdDelete} from "react-icons/md";
import Comments from '../components/Comments';
import {getSingleBlogRoute, deleteBlogRoute, updateBlogRoute, deleteCommentRoute} from '../utils/APIroutes';

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
};

function SingleBlog()
{
    const navigate = useNavigate();
    const {blogId} = useParams();
    const [blog, setBlog] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('blog-user'));
        setCurrentUser(user);
    }, []);
    
    useEffect(() => {
        const fetchSingleBlog = async () => {
            const user = JSON.parse(localStorage.getItem('blog-user'));
            setCurrentUser(user);
            const {data} = await axios(`${getSingleBlogRoute}/${blogId}`);
            // console.log(data);
            if(data.status)
            {
                setBlog(data.blog);
            }
            else
            {
                toast.error(data.msg, toastOptions);
                navigate('/');
            }
        };
        fetchSingleBlog();
    }, [navigate, blogId]);

    const deleteComment = async (index) => {
        const commentId = blog.comments[index]._id;
        // console.log(commentId);
        const {data} = await axios.delete(`${deleteCommentRoute}/${blogId}/comments/${commentId}`);
        if(data.status)
        {
            setBlog(data.blog);
        }
        else
        {
            toast.error(data.msg, toastOptions);
        }
    };

    const handleCommentsChange = async (newComments) => {
        // console.log(newComments);
        const {data} = await axios.patch(`${updateBlogRoute}/${blogId}`, {comments: newComments});
        if(data.status)
        {
            setBlog({...blog, comments: data.blog.comments});
        }
        else
        {
            toast.error(data.msg, toastOptions);
        }
    };

    const handleEdit = () => {
        navigate(`/update/${blogId}`);
    };

    const handleDelete = async () => {
        const {data} = await axios.delete(`${deleteBlogRoute}/${blogId}`);
        console.log(data);
        navigate('/');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            {blog && <>
                <Section>
                    <img src={blog.imageUrl} alt='Blog'/>
                    {blog.createdBy === currentUser.userId && <div className="blog-edit">
                        <div className='icons' onClick={handleEdit}>
                            <MdEdit style={editStyle}/>
                        </div>
                        <div className='icons' onClick={handleDelete}>
                            <MdDelete style={deleteStyle}/>
                        </div>
                    </div>}
                    <h1>{blog.title}</h1>
                    <div className="blog-info">
                        <p>Author: <span className='author'>{blog.author}</span></p>
                        <p className='date'>{formatDate(blog.createdAt)}</p>
                    </div>
                    <p className='content'>{blog.content}</p>
                    <Comments blogId={blogId} user={currentUser} createdBy={blog.createdBy} author={blog.author} comments={blog.comments} handleCommentsChange={handleCommentsChange} deleteComment={deleteComment}/>
                </Section>
                <ToastContainer/>
            </>}
        </>
    );
}

const editStyle = {
    color: "steelblue"
};

const deleteStyle = {
    color: "red"
};

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
    .blog-edit
    {
        display: flex;
        gap: 0.5rem;
        margin-left: auto;
        .icons
        {
            /* background-color: yellow; */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.1rem;
            font-size: 1.5rem;
            border: 1px solid gray;
            border-radius: 0.4rem;
            cursor: pointer;
            &:hover
            {
                background-color: lightgray;
            }
        }
    }
    h1
    {
        font-size: 2rem;
        text-decoration: underline;
    }
    .blog-info
    {
        /* background-color: red; */
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 1.1rem;
        color: gray;
        display: flex;
        .author
        {
            font-weight: bold;
        }
        .date
        {
            margin-left: auto;
        }
    }
    .content
    {
        font-size: 1.2rem;
        align-self: flex-start;
    }
`;

export default SingleBlog;