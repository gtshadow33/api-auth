require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta protegida con JWT
app.get('/api/protegida', authMiddleware, (req, res) => {
  res.json({ msg: `Hola usuario ${req.user.id}, estás autorizado!` });
});

// Inicia el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
