import React from 'react';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";

function BlogPosts({blogs})
{
    const navigate = useNavigate();

    const handleClick = (event, index) => {
        const blogId = blogs[index]._id;
        // console.log(blogId);
        navigate(`details/${blogId}`);
    };

    const blogPosts = blogs.map((blog, index) => (
        <HoverCard style={cardStyles} key={index} onClick={(e) => handleClick(e, index)}>
            <Card.Img style={cardImgStyles} variant='top' src={blog.imageUrl}/>
            <Card.Body style={cardBodyStyles}>
                <Card.Subtitle style={cardSubtitleStyles}>{blog.category}</Card.Subtitle>
                <Card.Title style={cardTitleStyles}>{blog.title}</Card.Title>
                <Card.Text style={cardTextStyles}>Author: {blog.author}</Card.Text>
                <Card.Text style={cardContentStyles}>{blog.content}</Card.Text>
            </Card.Body>
        </HoverCard>
    ));

    return (
        <Container>
            {blogPosts}
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
    gap: 1rem;
    /* padding: 1rem; */
`;

const HoverCard = styled(Card)`
    &:hover
    {
        box-shadow: 0 5px 15px rgba(0,0,0,0.3); // This one is the honoured one
        /* box-shadow: 0 2px 10px rgba(0,0,0,0.1); */
        /* box-shadow: 0 8px 20px rgba(0,0,0,0.4); */
    }
`;

const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
    overflow: 'hidden',
    // height: '100%',
    height: "40vh",
    // backgroundColor: "red",
    border: '1px solid lightgray',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease-in-out',
};

const cardImgStyles = {
    // height: '10rem',
    // height: '7rem',
    height: '18vh',
    width: "100%"
    // objectFit: 'cover',
    // objectFit: 'contain'
};

const cardBodyStyles = {
    height: '22vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 1rem 1rem',
    // padding: '1rem',
};

const cardSubtitleStyles = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
};

const cardTitleStyles = {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
};

const cardTextStyles = {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
};

const cardContentStyles = {
    textAlign: 'center',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Number of lines to show before truncating
    WebkitBoxOrient: 'vertical',
    maxHeight: '4.5em', // Adjust based on font size and line height
};

// const styles = {
//     height: "20rem",
//     width: "20vw",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "0.2rem",
//     borderRadius: "1rem",
//     // overflow: 'hidden',
//     // justifyContent: "center",
//     backgroundColor: "red"
// };

// function BlogPosts({blogs})
// {
//     const blogPosts = blogs.map((blog, index) => {
//         return <Card style={styles} key={index}>
//             <Card.Img style={{height: "10rem", width: "auto"}} variant='top' src={blog.imageUrl}/>
//             <Card.Subtitle>{blog.category}</Card.Subtitle>
//             <Card.Title>{blog.title}</Card.Title>
//             <Card.Text>Author: {blog.author}</Card.Text>
//             <Card.Text>{blog.content}</Card.Text>
//         </Card>
//     });

//     return (
//         <Container>
//             {blogPosts}
//         </Container>
//     );
// }

// const Container = styled.div`
//     display: grid;
//     grid-template-columns: auto auto auto auto;
// `;

export default BlogPosts;