// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================
// Define los endpoints para login, registro, etc.

const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación
const authController = require('../controllers/Auth.controller');

// ============================================
// DEFINICIÓN DE RUTAS
// ============================================

// POST /api/auth/login - Iniciar sesión
router.post('/login', authController.login);

// POST /api/auth/registro - Registrar nuevo usuario
router.post('/registro', authController.registro);

// GET /api/auth/verificar - Verificar si el token es válido
router.get('/verificar', authController.verificarToken);

// GET /api/auth/perfil - Obtener perfil del usuario
router.get('/perfil', authController.getPerfil);

// Exportar el router
module.exports = router;