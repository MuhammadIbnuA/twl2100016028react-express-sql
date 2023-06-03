// app.js (or server.js)

const express = require('express');
const app = express();
const pool = require('./db');
const PORT = 3001;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors());

// Define your API endpoints here
app.get('/test', (req, res) => {
    pool.query('SELECT * FROM dokter1', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });


app.get('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    pool.query(`SELECT * FROM dokter1 WHERE dokter_id = ${dokterId}`, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

app.post('/test', (req, res) => {
    const { nama, spesialisasi, alamat } = req.body;
    pool.query(
        `INSERT INTO dokter1 (nama, spesialisasi, alamat) VALUES ('${nama}', '${spesialisasi}', '${alamat}')`,
    //   [nama, spesialisasi, alamat],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Dokter added successfully' });
        }
      }
    );
  });
  
  app.put('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    const { nama, spesialisasi, alamat } = req.body;
    pool.query(
      `UPDATE dokter1 SET nama = "${nama}", spesialisasi = "${spesialisasi}", alamat = "${alamat}" WHERE dokter_id = ${dokterId}`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Dokter updated successfully' });
        }
      }
    );
  });
  
app.delete('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    pool.query(
        `DELETE FROM dokter1 WHERE dokter_id = ${dokterId}`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Dokter deleted successfully' });
        }
      }
    );
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/pasien', (req, res) => {
    pool.query('SELECT * FROM pasien', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.post('/pasien', (req, res) => {
    const { nama, umur, jenis_kelamin, medicalrecordNO } = req.body;
  
    // let mrid = `MRN-${uuidv4()}`
    pool.query(
      `INSERT INTO pasien (nama, umur, jenis_kelamin, medicalrecordNO) VALUES ('${nama}', '${umur}', '${jenis_kelamin}', '${medicalrecordNO}')`,
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  

    app.delete('/pasien/:pasien_id', (req, res) => {
        const pasien_id = req.params.pasien_id;
        pool.query(
            `DELETE FROM pasien WHERE pasien_id = ${pasien_id}`,
          (error) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              res.status(200).json({ message: 'Dokter deleted successfully' });
            }
          }
        );
      });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/pemeriksaan', (req, res) => {
    pool.query('SELECT * FROM pemeriksaan', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/obat', (req, res) => {
    pool.query('SELECT * FROM obat_id', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
