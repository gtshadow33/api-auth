const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const authMiddleware = require('../middleware/auth');

/* =========================
   OBTENER MI INFORMACIÓN
   GET /api/users/me
========================= */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

/* =========================
   ACTUALIZAR MI USUARIO
   PUT /api/users/me
========================= */
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select('-password');

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
});

/* =========================
   ELIMINAR MI USUARIO
   DELETE /api/usesr/me
========================= */
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar usuario' });
  }
});

module.exports = router;
