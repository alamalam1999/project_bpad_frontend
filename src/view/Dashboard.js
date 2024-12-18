import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListBook from '../Books/ListBook';

function Dashboard() {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        // Clear the token and timestamp from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenLastUsed');
        
        // Redirect to login page
        navigate('/login');
    };

    const handleAsn = () => {
        navigate('/asn');
    }

    const handleKendaraan = () => {
        navigate('/kendaraan');
    }

    const handleInstansi = () => {
        navigate('/instansi');
    }

    const handleAbout = () => {
        navigate('/about');
    }

    const goToAddBooks = (e) => {
        e.preventDefault();
        navigate('/addbook');
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tokenLastUsed = localStorage.getItem('tokenLastUsed');
            const token = localStorage.getItem('token');
            
            // Check if token or timestamp exists
            if (!token || !tokenLastUsed) {
                handleLogout();
                return;
            }

            const now = new Date().getTime();
            
            // If more than 60 seconds (60000ms) have passed, log out
            if (now - tokenLastUsed > (60000 * 5)) {
                handleLogout();
            }
        }, 1000); // Check every second

        return () => clearInterval(intervalId);
    }, [navigate]); // Dependency array includes navigate to avoid unnecessary re-renders

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 bg-light vh-100">
                    <nav className="navbar navbar-light flex-column align-items-start">
                        <a className="navbar-brand" href="#">Dashboard Kendaraan</a>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#" onClick={handleAsn}>ASN</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#" onClick={handleKendaraan}>Kendaraan</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#" onClick={handleInstansi}>Instansi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#" onClick={handleAbout}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-danger" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="col-md-10">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand" href="#">Dashboard Kendaraan</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className='mt-3'>
                        <h1>Welcome to the Dashboard</h1>
                        <h4>Daftar Check</h4>
                        <button className='btn btn-primary' onClick={goToAddBooks}>Add Books</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Instansi</th>
                                    <th scope="col">Jenis Roda</th>
                                    <th scope="col">Jumlah</th>
                                    <th scope="col">Jumlah ASN Penanggung Jawab</th>

                                </tr>
                            </thead>
                            {/* <ListBook /> */}

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
