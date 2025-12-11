// ============================================
// CONTROLADOR DE EVENTOS
// ============================================
// Aquí va toda la lógica de negocio relacionada con eventos

// Obtener todos los eventos
const getAllEventos = (req, res) => {
    // Simulación de datos (más adelante conectarás con base de datos)
    const eventos = [
        {
            id: 1,
            nombre: 'Boda de Juan y María',
            fecha: '2025-12-25',
            salon: 'Salón Principal',
            invitados: 150
        },
        {
            id: 2,
            nombre: 'Cumpleaños de Pedro',
            fecha: '2025-12-31',
            salon: 'Salón VIP',
            invitados: 80
        }
    ];

    // Responder con los datos
    res.status(200).json({
        success: true,
        message: 'Eventos obtenidos correctamente',
        data: eventos
    });
};

// Obtener un evento por ID
const getEventoById = (req, res) => {
    // Obtener el ID desde los parámetros de la URL
    const { id } = req.params;

    // Simulación de búsqueda (más adelante buscarás en base de datos)
    const evento = {
        id: id,
        nombre: 'Boda de Juan y María',
        fecha: '2025-12-25',
        salon: 'Salón Principal',
        invitados: 150,
        detalles: 'Evento especial con decoración temática'
    };

    res.status(200).json({
        success: true,
        message: 'Evento encontrado',
        data: evento
    });
};

// Crear un nuevo evento
const createEvento = (req, res) => {
    // Obtener los datos enviados desde el frontend
    const { nombre, fecha, salon, invitados } = req.body;

    // Validación básica
    if (!nombre || !fecha || !salon) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos obligatorios (nombre, fecha, salon)'
        });
    }

    // Simulación de creación (más adelante guardarás en base de datos)
    const nuevoEvento = {
        id: Date.now(), // ID temporal simulado
        nombre,
        fecha,
        salon,
        invitados: invitados || 0,
        createdAt: new Date().toISOString()
    };

    res.status(201).json({
        success: true,
        message: 'Evento creado correctamente',
        data: nuevoEvento
    });
};

// Actualizar un evento existente
const updateEvento = (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    // Simulación de actualización
    const eventoActualizado = {
        id,
        ...datosActualizados,
        updatedAt: new Date().toISOString()
    };

    res.status(200).json({
        success: true,
        message: 'Evento actualizado correctamente',
        data: eventoActualizado
    });
};

// Eliminar un evento
const deleteEvento = (req, res) => {
    const { id } = req.params;

    // Simulación de eliminación
    res.status(200).json({
        success: true,
        message: `Evento con ID ${id} eliminado correctamente`
    });
};

// Exportar todas las funciones para usarlas en las rutas
module.exports = {
    getAllEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento
};