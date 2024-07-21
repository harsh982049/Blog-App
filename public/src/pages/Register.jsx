import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerRoute} from '../utils/APIroutes';
import BlogLogo from "../assets/BlogLogo.svg";


const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
};

function Register()
{
    const navigate = useNavigate();
    const [credentials, setCredentials] = React.useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if(localStorage.getItem('blog-user'))
        {
            navigate('/');
        }
    }, []);

    const handleClick = () => {
        navigate('/login');
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation())
        {
            const {username, password, confirmPassword} = credentials;
            console.log(username, password);
            const {data} = await axios.post(registerRoute, {username, password});
            if(data.status)
            {
                localStorage.setItem('blog-user', JSON.stringify(data.user));
                navigate('/');
            }
            else
            {
                toast.error(`${data.msg}`, toastOptions);
            }
        }
    };

    function handleValidation()
    {
        const {username, password, confirmPassword} = credentials;
        if(!username || !password || !confirmPassword)
        {
            toast.error('All fields are mandatory to be filled', toastOptions);
            return false;
        }
        else if(username.length < 3)
        {
            toast.error('Username should be minimum 3 characters long', toastOptions);
            return false;
        }
        else if(username.length > 20)
        {
            toast.error('Username should not be more than 20 characters long', toastOptions);
            return false;
        }
        else if(password.length < 8)
        {
            toast.error('Password should be minimum 8 characters long', toastOptions);
            return false;
        }
        else if(password.length > 30)
        {
            toast.error('Password should not be more than 30 characters long', toastOptions);
            return false;
        }
        else if(password !== confirmPassword)
        {
            toast.error('Password and Confirm Password fields do not match', toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <Container>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <img src={BlogLogo} alt="Blog Logo"/>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={credentials.username}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={credentials.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={credentials.confirmPassword}
                        onChange={(e) => handleChange(e)}
                    />
                    <button className='register-btn' type='submit'>Register</button>
                    <strong>OR</strong>
                    <button className='login-btn' onClick={handleClick}>Already have an account?</button>
                </form>
            </Container>
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    /* background-color: #131324; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img
    {
        width: 5rem;
        /* background-color: red; */
    }
    form
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        width: 30%;
        min-width: 20rem;
        /* background-color: #3dc5a3; */
        /* background-color: #3aec3a; */
        /* border-radius: 2rem; */
        padding: 3rem 2.5rem;
        box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.493);
        input
        {
            /* color: white; */
            font-size: 1rem;
            /* background-color: black; */
            width: 90%;
            padding: 0.5rem;
            border: none;
            /* border-radius: 0.5rem; */
            border-bottom: 2px solid black;
            /* border: 0.1rem solid #7504ff; */
            &:focus
            {
                /* border: 0.1rem solid yellow; */
                outline: none;
                border-bottom: 2px solid black;
                background-color: #b9f9ff;
            }
        }
        strong
        {
            color: gray;
        }
        .register-btn
        {
            width: 90%;
            background-color: orange;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 0.8rem;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover
            {
                background-color: steelblue;
            }
        }
        .login-btn
        {
            background-color: white;
            color: #00aaff;
            width: 90%;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            font-size: 0.8rem;
            text-transform: uppercase;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            &:hover
            {
                background-color: #cfcfcff5;
            }
        }
    }
`;

export default Register;