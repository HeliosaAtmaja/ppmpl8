const express = require('express');
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Data dummy untuk simulasi database
let data = [
  { id: 1, name: 'User One', age: 25 },
  { id: 2, name: 'User Two', age: 30 },
];

// Endpoint GET /
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Endpoint POST /data
app.post('/data', (req, res) => {
  const { name, age } = req.body;

  // Validasi input
  if (!name || !age) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  // Tambahkan data baru
  const newItem = {
    id: data.length + 1, // Auto-increment ID
    name,
    age,
  };
  data.push(newItem);

  res.status(201).json(newItem); // Kode 201 untuk "Created"
});

// Endpoint PUT /data/:id
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  // Cari data berdasarkan ID
  const item = data.find((d) => d.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Perbarui data
  if (name) item.name = name;
  if (age) item.age = age;

  res.status(200).json(item); // Kode 200 untuk "OK"
});

// Endpoint DELETE /data/:id
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;

  // Cari indeks data berdasarkan ID
  const index = data.findIndex((d) => d.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Hapus data
  data.splice(index, 1);

  res.status(204).send(); // Kode 204 untuk "No Content"
});

module.exports = app;
