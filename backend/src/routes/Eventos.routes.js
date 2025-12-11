// ============================================
// RUTAS DE EVENTOS
// ============================================
// Define todos los endpoints relacionados con eventos

const express = require('express');
const router = express.Router();

// Importar el controlador de eventos
const eventosController = require('../controllers/Eventos.controller');

// ============================================
// DEFINICIÓN DE RUTAS
// ============================================

// GET /api/eventos - Obtener todos los eventos
router.get('/', eventosController.getAllEventos);

// GET /api/eventos/:id - Obtener un evento específico por ID
router.get('/:id', eventosController.getEventoById);

// POST /api/eventos - Crear un nuevo evento
router.post('/', eventosController.createEvento);

// PUT /api/eventos/:id - Actualizar un evento existente
router.put('/:id', eventosController.updateEvento);

// DELETE /api/eventos/:id - Eliminar un evento
router.delete('/:id', eventosController.deleteEvento);

// Exportar el router para usarlo en server.js
module.exports = router;