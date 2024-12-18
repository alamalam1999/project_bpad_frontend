import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Registration successful!');
        } else {
            setMessage(`Registration failed: ${data.message}`);
        }
    };

    return (
        <div className='container mt-5'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" id="name" className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input type="email" name="email" placeholder="Email" id="email" className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input type="password" name="password" placeholder="Password" id="password" className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
