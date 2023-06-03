import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tpasien = () => {
const [pasienData, setPasienData] = useState([]);
const [formData, setFormData] = useState({});
  useEffect(() => {
    fetchPasienData();
    },[]);

const fetchPasienData = async () => {
        try {
          const response = await fetch('http://localhost:3001/pasien');
          const data = await response.json();
          setPasienData(data);
        } catch (error) {
          console.error(error);
        }
      };    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddPasien = async () => {
        try {
            if (formData.id) {
                const response = await axios.put(`http://localhost:3001/pasien/${formData.id}`, formData);
                if (response.status === 200) {
                    fetchPasienData();
                    setFormData({});
            } } else {
                const response = await axios.post('http://localhost:3001/pasien', formData);
                if (response.status === 201) {
                    fetchPasienData();
                    setFormData({}); // Reset formData after successful addition
                }
            }
        }
            catch (error) {
                console.error(error);} 
        }
    
    

    const handleEditPasien = (pasien_id) => {
        const selectedPasien = pasienData.find((pasien) => pasien.pasien_id === pasien_id);
        setFormData({ ...selectedPasien, id: pasien_id });
    };

    const handleDeletePasien = async (pasien_id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/pasien/${pasien_id}`);
            if (response.status === 200) {
                fetchPasienData();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
    <div className="container"style={{ fontFamily: 'Arial', padding: '20px' }}>
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
            name="umur"
            placeholder="umur"
            value={formData.umur || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="jenis_kelamin"
            placeholder="Jenis Kelamin"
            value={formData.jenis_kelamin || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            />
            <input
            type="text"
            name="medicalrecordNO"
            placeholder="medicalrecordNO"
            value={formData.medicalrecordNO || ''}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            />
          <button type="button" onClick={handleAddPasien} style={{ backgroundColor: 'blue', color: 'white' }}>
            Add
          </button>
        </form>
      <table style={{ width: '100%', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'lightgray' }}>Pasien ID</th>
            <th style={{ backgroundColor: 'lightgray' }}>Nama</th>
            <th style={{ backgroundColor: 'lightgray' }}>Umur</th>
            <th style={{ backgroundColor: 'lightgray' }}>Jenis Kelamin</th>
            <th style={{ backgroundColor: 'lightgray' }}>Medical Record No</th>
          </tr>
        </thead>
        <tbody>
          {pasienData.map((pasien) => (
            <tr key={pasien.pasien_id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.pasien_id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.nama}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.umur}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.jenis_kelamin}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.medicalrecordNO}</td>
              <td>  <button onClick={() => handleEditPasien(pasien.pasien_id)}>Edit</button>
                    <button onClick={() => handleDeletePasien(pasien.pasien_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )

          }
export default Tpasien;

