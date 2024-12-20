import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import handleDelete from './DeleteAsn'; // Import the delete function

function ListDataRekapKendaraan() {
    const navigate = useNavigate();
    const [dataRekaps, setDataRekaps] = useState([]); // State to store book data
    const [message, setMessage] = useState('');

    // Fetch the token from localStorage
    const token = localStorage.getItem('token');


    // Fetch the list of books when the component mounts
    useEffect(() => {
        const fetchAsns = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/data_rekap', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response
                    setDataRekaps(data); // Set the fetched books in the state
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
        const result = await handleDelete(id, token, setDataRekaps, dataRekaps);
        if (result) {
            setMessage(result);
        }
    };

    return (
        <tbody>
            {dataRekaps.length > 0 ? (
                dataRekaps.map((dataRekap, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{dataRekap.instansi}</td>
                        <td>{dataRekap.jenis_Roda}</td>
                        <td>{dataRekap.jumlah_Kendaraan}</td>
                        <td>{dataRekap.jumlah_asn}</td>
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

export default ListDataRekapKendaraan;
