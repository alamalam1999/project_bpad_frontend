import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Log response before parsing
            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (response.ok) {
                // Check if response is JSON
                try {
                    const data = JSON.parse(responseText);
                    console.log('Response data:', data);
                    console.log('data access =' + data.token);
                    if (data.token) {
                        setMessage('Login successful!');

                        localStorage.setItem('token', data.token); // Save token to localStorage

                        localStorage.setItem('tokenLastUsed', new Date().getTime());
                        // Redirect to the dashboard (or any other route)
                        navigate('/dashboard'); // This will redirect to the "/dashboard" route
                    }
                    setMessage('Login successful!');

                } catch (error) {
                    // Handle the case where response is not JSON
                    console.log('Response is not JSON:', responseText);
                    setMessage('Login successful but no JSON response.');
                }
            } else {
                setMessage('Login failed. Check your credentials.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const goToRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" id="email" className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" id="password" className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <p>{message}</p>}

            <div className="mt-3">
                Don't have an account? <a href="/register" onClick={goToRegister}>Register</a>
            </div>

        </div>
    );
}

export default Login;
