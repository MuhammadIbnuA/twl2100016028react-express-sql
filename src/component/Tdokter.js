import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tdokter = () => {
    const [dokters, setDokters] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        fetchDokters();
    }, []);

    const fetchDokters = async () => {
        try {
            const response = await axios.get('http://localhost:3001/test');
            setDokters(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddDokter = async () => {
        try {
            if (formData.id) {
                // Update existing dokter
                const response = await axios.put(`http://localhost:3001/test/${formData.id}`, formData);
                if (response.status === 200) {
                    fetchDokters();
                    setFormData({}); // Reset formData after successful update
                }
            } else {
                // Add new dokter
                const response = await axios.post('http://localhost:3001/test', formData);
                if (response.status === 201) {
                    fetchDokters();
                    setFormData({}); // Reset formData after successful addition
                }
            }
        } 
        catch (error) {
            console.error(error);
        }
    };
    const handleEditDokter = (dokterId) => {
        const selectedDokter = dokters.find((dokter) => dokter.dokter_id === dokterId);
        setFormData({ ...selectedDokter, id: dokterId });
    };



    const handleDeleteDokter = async (dokterId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/test/${dokterId}`);
            if (response.status === 200) {
                fetchDokters();
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container" style={{ fontFamily: 'Arial', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Dokter Database</h1>
  
        <h2>Add Dokter</h2>
        <form>
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="spesialisasi"
            placeholder="Spesialisasi"
            value={formData.spesialisasi || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <button type="button" onClick={handleAddDokter} style={{ backgroundColor: 'blue', color: 'white' }}>
            Add
          </button>
        </form>
  
        <h2 style={{ color: 'blue', textAlign: 'center' }}>Data Dokter</h2>
        <table style={{ width: '100%', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'lightgray', padding: '5px' }}>ID</th>
              <th style={{ backgroundColor: 'lightgray', padding: '5px' }}>Nama</th>
              <th style={{ backgroundColor: 'lightgray', padding: '5px' }}>Spesialisasi</th>
              <th style={{ backgroundColor: 'lightgray', padding: '5px' }}>Alamat</th>
              <th style={{ backgroundColor: 'lightgray', padding: '5px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dokters.map((dokter) => (
              <tr key={dokter.dokter_id}>
                <td style={{ border: '1px solid black', padding: '5px' }}>{dokter.dokter_id}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{dokter.nama}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{dokter.spesialisasi}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{dokter.alamat}</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => handleEditDokter(dokter.dokter_id)}>Edit</button>
                    <button onClick={() => handleDeleteDokter(dokter.dokter_id)}>Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
}

export default Tdokter;