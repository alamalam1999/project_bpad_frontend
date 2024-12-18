import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatedAsns() {
    const { id } = useParams(); // Get the book ID from the URL
    const [formData, setFormData] = useState({
        nama_asn: '',
        nip: '',
        atribut: '',
    });
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


     // Handle logout
     const handleLogout = () => {
        // Clear the token and timestamp from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenLastUsed');
        
        // Redirect to login page
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/dashboard');
    }

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

    // Fetch existing book data when the component mounts
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/dataasn/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Populate the form with the existing book data
                } else {
                    setMessage('Failed to fetch book data.');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setMessage('An error occurred. Please try again.');
            }
        };

        fetchBook();
    }, [id, token]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/updateasn/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Book updated successfully!');
                navigate('/asn'); // Redirect after successful update
            } else {
                setMessage('Failed to update the book.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container-fluid">
            <div className="row">

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

                <div className="col-md-10">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Dashboard Kendaraan</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='mt-3'>
                <h1>Update Book</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nama Asn</label>
                        <input type="text" name='nama_asn' value={formData.nama_asn} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nip</label>
                        <input type="text" name='nip' value={formData.nip} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Atribut</label>
                        <input type="text" name='atribut' value={formData.atribut} onChange={handleChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Book</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            </div>
            </div>
        </div>
    );
}

export default UpdatedAsns;
