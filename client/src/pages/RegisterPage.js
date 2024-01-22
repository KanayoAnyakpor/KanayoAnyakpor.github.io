import {useState} from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Handle the successful response here if needed
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    
    return (
        <form className='register' onSubmit={register}>
                <h1>Register</h1>
                <input type='text' 
                placeholder='username' 
                value={username} 
                onChange = {ev => setUsername(ev.target.value)}/>
                <input type='password' 
                placeholder='password' 
                value = {password}
                onChange={ev => setPassword(ev.target.value)}/>
                <button>Register</button>
        </form>
    )
}