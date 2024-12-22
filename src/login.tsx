import { useState } from 'react';
import './login.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log('Username:', username); 
        console.log('Password:', password); 
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="username" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="password" 
                        required  
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="forget-pas">
                    <a href="">Forget password?</a>
                </div>
                <button type="submit" className="login-btn">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default App;
