import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();


const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta protegida con JWT de prueba
app.get('/api/protegida', authMiddleware, (req, res) => {
  res.json({ msg: `Hola usuario ${req.user.id}, estás autorizado!` });
});

// Inicia el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
