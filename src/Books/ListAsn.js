import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import handleDelete from './DeleteAsn'; // Import the delete function

function ListAsn() {
    const navigate = useNavigate();
    const [asns, setAsns] = useState([]); // State to store book data
    const [message, setMessage] = useState('');

    // Fetch the token from localStorage
    const token = localStorage.getItem('token');


    // Fetch the list of books when the component mounts
    useEffect(() => {
        const fetchAsns = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/dataasn', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response
                    setAsns(data); // Set the fetched books in the state
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
        navigate(`/updateasns/${id}`); // Navigate to the edit page with the book ID as a URL parameter
    };

    const deleteAsn = async (id) => {
        const result = await handleDelete(id, token, setAsns, asns);
        if (result) {
            setMessage(result);
        }
    };

    return (
        <tbody>
            {asns.length > 0 ? (
                asns.map((asn, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{asn.nama_asn}</td>
                        <td>{asn.nip}</td>
                        <td>{asn.atribut}</td>
                        <td>
                            <button onClick={() => handleEdit(asn.id)} className="btn btn-primary">
                                Edit
                            </button>
                            <button onClick={() => deleteAsn(asn.id)} className="btn btn-danger">
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

export default ListAsn;
