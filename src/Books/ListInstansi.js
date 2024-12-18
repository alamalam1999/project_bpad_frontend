import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import handleDelete from './DeleteInstansi'; // Import the delete function

function ListInstansi() {
    const navigate = useNavigate();
    const [instansis, setInstansis] = useState([]); // State to store book data
    const [message, setMessage] = useState('');

    // Fetch the token from localStorage
    const token = localStorage.getItem('token');


    // Fetch the list of books when the component mounts
    useEffect(() => {
        const fetchAsns = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/datainstansi', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response
                    setInstansis(data); // Set the fetched books in the state
                } else {
                    setMessage('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setMessage('An error occurred. Please try again.');
            }
        };

        fetchAsns(); // Call the function
    }, [token]); // Empty dependency array to ensure this only runs on component mount


    const handleEdit = (id) => {
        navigate(`/updateinstansi/${id}`); // Navigate to the edit page with the book ID as a URL parameter
    };

    const deleteBook = async (id) => {
        const result = await handleDelete(id, token, setInstansis, instansis);
        if (result) {
            setMessage(result);
        }
    };

    return (
        <tbody>
            {instansis.length > 0 ? (
                instansis.map((instansi, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{instansi.nama_instansi}</td>
                        <td>
                            <button onClick={() => handleEdit(instansi.id)} className="btn btn-primary">
                                Edit
                            </button>
                            <button onClick={() => deleteBook(instansi.id)} className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center">No books available</td>
                </tr>
            )}
        </tbody>
    );
}

export default ListInstansi;
