import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tpemeriksaan = () => {
  
    const [PemeriksaanData, setPemeriksaanData] = useState([]);
    useEffect(() => {
      fetchPemeriksaanData();
    }, []);

    const fetchPemeriksaanData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/pemeriksaan');
          const data = response.data;
    
          if (Array.isArray(data)) {
            setPemeriksaanData(data);
          } else {
            console.error('Response data is not an array:', data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      return (

    
        <div className="container"style={{ fontFamily: 'Arial', padding: '20px' }}>
    <h1 style={{ textAlign: 'center' }}>Dokter Database</h1>
          <table style={{ width: '100%', border: '1px solid black' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'lightgray' }}>Medical Record No</th>
                <th style={{ backgroundColor: 'lightgray' }}>Dokter ID</th>
                <th style={{ backgroundColor: 'lightgray' }}>Date</th>
                <th style={{ backgroundColor: 'lightgray' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {PemeriksaanData.map((pemeriksaan) => (
                <tr key={pemeriksaan.pemeriksaan_id}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.medicalrecordNO}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.dokter_id}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.date}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)


}
export default Tpemeriksaan;