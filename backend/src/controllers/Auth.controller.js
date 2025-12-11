// ============================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================
// Maneja login, registro y validación de usuarios

const fs = require('fs');
const path = require('path');

// Ruta al archivo de usuarios simulado
const usuariosPath = path.join(__dirname, '../../data/usuarios.json');

// ============================================
// FUNCIÓN: Leer usuarios del archivo JSON
// ============================================
const leerUsuarios = () => {
    try {
        const data = fs.readFileSync(usuariosPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer usuarios:', error);
        return [];
    }
};

// ============================================
// FUNCIÓN: Guardar usuarios en el archivo JSON
// ============================================
const guardarUsuarios = (usuarios) => {
    try {
        fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error al guardar usuarios:', error);
        return false;
    }
};

// ============================================
// LOGIN - Iniciar sesión
// ============================================
const login = (req, res) => {
    // Obtener email y password del body de la petición
    const { email, password } = req.body;

    // Validar que se enviaron los datos necesarios
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email y contraseña son obligatorios'
        });
    }

    // Leer usuarios del archivo JSON
    const usuarios = leerUsuarios();

    // Buscar usuario por email
    const usuario = usuarios.find(u => u.email === email);

    // Verificar si el usuario existe
    if (!usuario) {
        return res.status(401).json({
            success: false,
            message: 'Email o contraseña incorrectos'
        });
    }

    // Verificar contraseña
    // NOTA: En producción NUNCA guardes contraseñas en texto plano
    // Deberías usar bcrypt para encriptar
    if (usuario.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Email o contraseña incorrectos'
        });
    }

    // Login exitoso - Generar token simulado
    // NOTA: En producción usarías JWT (jsonwebtoken)
    const token = `token_simulado_${usuario.id}_${Date.now()}`;

    // Responder con éxito (no enviar la contraseña)
    const { password: _, ...usuarioSinPassword } = usuario;

    res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
            usuario: usuarioSinPassword,
            token: token
        }
    });
};

// ============================================
// REGISTRO - Crear nuevo usuario
// ============================================
const registro = (req, res) => {
    // Obtener datos del body
    const { nombre, email, password, telefono } = req.body;

    // Validaciones
    if (!nombre || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Nombre, email y contraseña son obligatorios'
        });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Email no válido'
        });
    }

    // Leer usuarios existentes
    const usuarios = leerUsuarios();

    // Verificar si el email ya está registrado
    const emailExiste = usuarios.find(u => u.email === email);
    if (emailExiste) {
        return res.status(409).json({
            success: false,
            message: 'El email ya está registrado'
        });
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nombre,
        email,
        password, // En producción: usar bcrypt.hash(password, 10)
        telefono: telefono || '',
        rol: 'cliente',
        created_at: new Date().toISOString()
    };

    // Agregar usuario al array
    usuarios.push(nuevoUsuario);

    // Guardar en archivo JSON
    const guardado = guardarUsuarios(usuarios);

    if (!guardado) {
        return res.status(500).json({
            success: false,
            message: 'Error al guardar el usuario'
        });
    }

    // Responder con éxito (sin enviar la contraseña)
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
            usuario: usuarioSinPassword
        }
    });
};

// ============================================
// VERIFICAR TOKEN (simulado)
// ============================================
const verificarToken = (req, res) => {
    // Obtener token del header Authorization
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token no proporcionado'
        });
    }

    // Verificación simulada (en producción usarías jwt.verify)
    if (!token.startsWith('token_simulado_')) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Token válido'
    });
};

// ============================================
// OBTENER PERFIL DEL USUARIO
// ============================================
const getPerfil = (req, res) => {
    // En producción, extraerías el ID del usuario del token JWT
    // Por ahora lo simulamos
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario requerido'
        });
    }

    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.id === parseInt(userId));

    if (!usuario) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    // Responder sin la contraseña
    const { password: _, ...usuarioSinPassword } = usuario;

    res.status(200).json({
        success: true,
        data: usuarioSinPassword
    });
};

// Exportar todas las funciones
module.exports = {
    login,
    registro,
    verificarToken,
    getPerfil
};