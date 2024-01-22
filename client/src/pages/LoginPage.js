import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';




export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = React.useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        try {
            // grab response from the fetch request
            const response = await fetch('http://localhost:5000/login', {
                // fetch request to the Login endpoint
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // this will send cookies
            });

            // if response is not ok, throw an error
            if (response.ok) {
                alert('Login successful!');
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                });
            } else{
                alert('Login failed!');
                throw new Error(`HTTP error! Status: ${response.status}`);

            }
            // Handle the successful response here if needed
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    // if redirect is true, redirect to the homepage
    if(redirect){
        return <Navigate to='/' />
    }

    return (
            <form className='login' onSubmit={login}>
                <h1>Login</h1>
                <input type='text' placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button>Login</button>
            </form>
    );
    }
