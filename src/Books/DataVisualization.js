import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualization = () => {
    const [data, setData] = useState([]);

    const [dataRekaps, setDataRekaps] = useState([]); // State to store book data
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
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
    }, [token]);

    return (
        <div>
            <h2>Data Visualization</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataRekaps}>
                    <XAxis dataKey="instansi" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="jumlah_Kendaraan" fill="#8884d8" name="Jumlah Kendaraan" />
                    <Bar dataKey="jumlah_asn" fill="#82ca9d" name="Jumlah ASN" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataVisualization;
