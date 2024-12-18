import React from 'react';
import './css/App.css';
import Register from './Auth/Register';

function RegisterApp() {
    return (
        <div className="App">
            <h1>Authentication System</h1>
            <Register />
        </div>
    );
}

export default RegisterApp;
