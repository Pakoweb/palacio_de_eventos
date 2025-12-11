// ============================================
// SERVIDOR PRINCIPAL - Node.js + Express
// ============================================

// Cargar variables de entorno desde archivo .env
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');

// Importar rutas
const eventosRoutes = require('./src/routes/Eventos.routes');
const authRoutes = require('./src/routes/Auth.routes');

// Importar middlewares personalizados
const { logPeticiones } = require('./src/middlewares/Auth.middleware');

// Inicializar la aplicación Express
const app = express();
// Puerto del servidor (toma el del .env o usa 3000 por defecto)
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

// CORS: Permite que el frontend Angular se comunique con el backend
// Por defecto permite peticiones desde http://localhost:4200
// CORS: Permite múltiples orígenes para desarrollo
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));

// Middleware para procesar JSON en las peticiones
// Permite recibir datos en formato JSON desde el frontend
app.use(express.json());

// Middleware para procesar datos de formularios
// Permite recibir datos enviados mediante formularios HTML
app.use(express.urlencoded({ extended: true }));

// Middleware personalizado para logging de peticiones
app.use(logPeticiones);

// ============================================
// RUTAS PRINCIPALES
// ============================================

// Ruta raíz - Verifica que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({
        message: 'Servidor Node.js funcionando correctamente',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Ruta de prueba de la API
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API REST funcionando',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Ejemplo de ruta POST (para crear datos)
app.post('/api/ejemplo', (req, res) => {
    // req.body contiene los datos enviados desde el frontend
    const datos = req.body;
    
    res.json({
        message: 'Datos recibidos correctamente',
        datosRecibidos: datos
    });
});

// ============================================
// RUTAS DE LA API
// ============================================

// Rutas de autenticación - /api/auth/*
app.use('/api/auth', authRoutes);

// Rutas de eventos - Todas las rutas empiezan con /api/eventos
app.use('/api/eventos', eventosRoutes);

// Aquí puedes agregar más rutas para otras entidades
// Ejemplo:
// app.use('/api/salones', salonesRoutes);
// app.use('/api/usuarios', usuariosRoutes);

// ============================================
// MANEJO DE ERRORES
// ============================================

// Captura rutas que no existen (404)
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
});

// Captura errores generales del servidor (500)
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// Exportar la aplicación (útil para testing)
module.exports = app;