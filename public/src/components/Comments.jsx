import React, {useState}  from 'react';
import styled from "styled-components";
import {MdDelete} from "react-icons/md";
import AnonymousUser from "../assets/AnonymousUser.svg";

function Comments({blogId, user, createdBy, author, comments, handleCommentsChange, deleteComment})
{
    const [comment, setComment] = useState('');

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

    const handleAddComment = async () => {
        if(comment)
        {
            const {username, userId} = user;
            const commentObject = {
                author: username,
                userId,
                content: comment,
            };
            const array = [...comments, commentObject];
            handleCommentsChange(array);
            setComment('');
        }
    };

    // const handleDeleteComment = async (event, index) => {
    //     const newComments = comments.filter((singleComment, commentIndex) => commentIndex !== index);
    //     handleCommentsChange(newComments);
    // };

    const allComments = comments.map((singleComment, index) => {
        return <div key={index} className='comment-body'>
            <div className='comments'>
                <h3>{singleComment.author}</h3>
                <p>{formatDate(singleComment.createdAt)}</p>
                {singleComment.userId === user.userId && <div onClick={(e) => deleteComment(index)}><MdDelete style={deleteButtonStyle}/></div>}
            </div>
            <p className='comment-text'>{singleComment.content}</p>
        </div>
    });

    return (
        <Section>
            <div className="comment-section">
                <img src={AnonymousUser} alt="Anonymous User"/>
                <textarea rows={6} name="comments" value={comment} placeholder="What's on your mind?" onChange={(e) => setComment(e.target.value)}/>
                <button onClick={handleAddComment}>POST</button>
            </div>
            <main>
                {allComments}
            </main>
        </Section>
    );
}

const deleteButtonStyle = {
    fontSize: "1.3rem",
};

const Section = styled.section`
    width: 100%;
    margin-top: 20vh;
    .comment-section
    {
        /* background-color: red; */
        display: flex;
        padding-top: 0.5rem;
        padding-bottom: 3rem;
        /* align-items: center; */
        justify-content: flex-start;
        /* justify-content: space-between; */
        gap: 1rem;
        img
        {
            /* align-self: flex-start; */
            /* margin-left: 0; */
            /* background-color: blue; */
            height: 7vh;
            /* width: 7vw; */
            width: auto;
        }
        textarea
        {
            /* margin-right: auto; */
            width: 87%;
            /* width: auto; */
            font-size: 1.2rem;
            border: 1px solid gray;
            &:focus
            {
                outline: none;
            }
        }
        button
        {
            height: 5vh;
            width: 5%;
            cursor: pointer;
        }
    }
    main
    {
        display: flex;
        flex-direction: column;
        /* gap: 2rem; */
    }
    .comment-body
    {
        width: 100%;
        padding: 0.5rem;
        background-color: lightgray;
        margin-bottom: 2rem;
        .comments
        {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0.5rem;
            div
            {
                display: flex;
                align-items: center;
                justify-content: center;
                /* background-color: red; */
                justify-self: flex-end;
                margin-left: auto;
                cursor: pointer;
            }
        }
        .comment-text
        {
            font-size: 1.2rem;
        }
    }
`;

export default Comments;