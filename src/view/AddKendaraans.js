import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AddKendaraans() {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        nopol: '',
        jenis_roda: '',
        merk: '',
        jenis_kendaraan: '',
        tahun_kendaraan: '',
        atribut: '',
    });

    const token = localStorage.getItem('token');


    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/insertkendaraan', {
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
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='mt-3'>
                <div>
                    <h1>Add Asn</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Nopol</label>
                        <input type="text" name='nopol' value={formData.nopol} onChange={handleChange} className="form-control" id="nama_asn" aria-describedby="nama_asn" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Jenis Roda</label>
                        <input type="text" name='jenis_roda' value={formData.jenis_roda} onChange={handleChange} className="form-control" id="nip" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Merk</label>
                        <input type="text" name='merk' value={formData.merk} onChange={handleChange} className="form-control" id="atribut" />
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Jenis Kendaraan</label>
                        <input type="text" name='jenis_kendaraan' value={formData.jenis_kendaraan} onChange={handleChange} className="form-control" id="atribut" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Tahun Kendaraan</label>
                        <input type="text" name='tahun_kendaraan' value={formData.tahun_kendaraan} onChange={handleChange} className="form-control" id="atribut" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Atribut</label>
                        <input type="text" name='atribut' value={formData.atribut} onChange={handleChange} className="form-control" id="atribut" />
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

export default AddKendaraans;