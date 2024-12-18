import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AddBooks() {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        content: '',
        visuals: '',
        book_cover: '',
        layout_formating: '',
        genres: '',
        physical_attributes: '',
        interactive_elements: '',
    });

    const token = localStorage.getItem('token');


    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/dashboard');
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/insertbuku', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
                body: JSON.stringify(formData),
            });

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (response.ok) {
                // Check if response is JSON
                try {
                    const data = JSON.parse(responseText);
                    console.log('Response data:', data);
                    console.log('data access =' + data.token);
                    if (data.message) {
                        setMessage('Successful!');

                    } else {
                        setMessage('Tidak Berhasil!');
                    }
                    setMessage('Successful Insert');

                } catch (error) {
                    // Handle the case where response is not JSON
                    console.log('Response is not JSON:', responseText);
                    setMessage('successful but no JSON response.');
                }
            } else {
                setMessage('failed. Check your credentials.');
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setMessage('An error occured. Please try again.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-2 bg-light vh-100">
                    <nav className="navbar navbar-light flex-column align-items-start">
                        <a className="navbar-brand" href="#">Dashboard Kendaraan</a>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#" onClick={handleHome}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-warning" href="#">About</a>
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
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='mt-3'>
                <div>
                    <h1>Add Book</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Content</label>
                        <input type="text" name='content' value={formData.content} onChange={handleChange} className="form-control" id="content" aria-describedby="content" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Visuals</label>
                        <input type="text" name='visuals' value={formData.visuals} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Book Cover</label>
                        <input type="text" name='book_cover' value={formData.book_cover} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Layout Formating</label>
                        <input type="text" name='layout_formating' value={formData.layout_formating} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Genres</label>
                        <input type="text" name='genres' value={formData.genres} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Physical attributes</label>
                        <input type="text" name='physical_attributes' value={formData.physical_attributes} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Interactive Element</label>
                        <input type="text" name='interactive_elements' value={formData.interactive_elements} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            </div>
            </div>
        </div>
    );
}

export default AddBooks;