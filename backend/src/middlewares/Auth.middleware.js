// ============================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================
// Verifica que el usuario esté autenticado antes de acceder a rutas protegidas

// Middleware para verificar token (ejemplo básico)
const verificarAuth = (req, res, next) => {
    // Obtener el token del header Authorization
    const token = req.headers.authorization;

    // Verificar si existe el token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó token de autenticación'
        });
    }

    // Aquí validarías el token (JWT por ejemplo)
    // Por ahora solo verificamos que exista
    
    // Si todo está bien, continuar con la siguiente función
    next();
};

// Middleware para verificar rol de administrador
const verificarAdmin = (req, res, next) => {
    // Aquí verificarías si el usuario es administrador
    // Por ahora es un ejemplo básico
    
    const esAdmin = true; // Simulación

    if (!esAdmin) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos de administrador'
        });
    }

    next();
};

// Middleware para logging de peticiones
const logPeticiones = (req, res, next) => {
    // Registrar información de la petición
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Continuar con la siguiente función
    next();
};

// Exportar los middlewares
module.exports = {
    verificarAuth,
    verificarAdmin,
    logPeticiones
};