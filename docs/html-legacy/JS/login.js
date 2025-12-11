// ============================================
// LOGIN.JS - Funcionalidad de Inicio de Sesión
// ============================================

// URL del backend API
const API_URL = 'http://localhost:3000/api/auth';

// ============================================
// FUNCIÓN: Manejar el envío del formulario
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario
    const loginForm = document.querySelector('.login-form');
    
    // Escuchar el evento de submit (envío)
    loginForm.addEventListener('submit', async function(event) {
        // Prevenir que el formulario se envíe de forma tradicional
        event.preventDefault();
        
        // Obtener los valores de los campos
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validar que no estén vacíos
        if (!email || !password) {
            mostrarMensaje('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Validar formato de email básico
        if (!validarEmail(email)) {
            mostrarMensaje('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Mostrar mensaje de carga
        mostrarMensaje('Iniciando sesión...', 'info');
        
        // Intentar hacer login
        await realizarLogin(email, password);
    });
});

// ============================================
// FUNCIÓN: Realizar Login (conectar con backend)
// ============================================
async function realizarLogin(email, password) {
    try {
        // Hacer petición POST al backend
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        // Convertir la respuesta a JSON
        const data = await response.json();
        
        // Verificar si el login fue exitoso
        if (data.success) {
            // Login exitoso
            mostrarMensaje('¡Login exitoso! Bienvenido ' + data.data.usuario.nombre, 'success');
            
            // Guardar token en localStorage (para mantener la sesión)
            localStorage.setItem('token', data.data.token);
            
            // Guardar datos del usuario
            localStorage.setItem('usuario', JSON.stringify(data.data.usuario));
            
            // Esperar 2 segundos y redirigir
            setTimeout(function() {
                // Redirigir según el rol
                if (data.data.usuario.rol === 'admin') {
                    window.location.href = '../index.html'; // Panel de admin
                } else {
                    window.location.href = '../index.html'; // Página principal
                }
            }, 2000);
            
        } else {
            // Login fallido
            mostrarMensaje(data.message || 'Email o contraseña incorrectos', 'error');
        }
        
    } catch (error) {
        // Error de conexión
        console.error('Error:', error);
        mostrarMensaje('Error de conexión. Verifica que el servidor esté funcionando.', 'error');
    }
}

// ============================================
// FUNCIÓN: Validar formato de email
// ============================================
function validarEmail(email) {
    // Expresión regular para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// FUNCIÓN: Mostrar mensajes al usuario
// ============================================
function mostrarMensaje(mensaje, tipo) {
    // Buscar si ya existe un mensaje
    let mensajeDiv = document.getElementById('mensaje-login');
    
    // Si no existe, crearlo
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje-login';
        
        // Insertar antes del formulario
        const loginContainer = document.querySelector('.login-container');
        const formulario = document.querySelector('.login-form');
        loginContainer.insertBefore(mensajeDiv, formulario);
    }
    
    // Limpiar clases anteriores
    mensajeDiv.className = 'mensaje-login';
    
    // Agregar clase según el tipo
    if (tipo === 'error') {
        mensajeDiv.classList.add('mensaje-error');
    } else if (tipo === 'success') {
        mensajeDiv.classList.add('mensaje-success');
    } else if (tipo === 'info') {
        mensajeDiv.classList.add('mensaje-info');
    }
    
    // Establecer el mensaje
    mensajeDiv.textContent = mensaje;
    
    // Hacer visible
    mensajeDiv.style.display = 'block';
    
    // Auto-ocultar después de 5 segundos (excepto para success)
    if (tipo !== 'success') {
        setTimeout(function() {
            mensajeDiv.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// FUNCIÓN: Verificar si ya hay sesión activa
// ============================================
function verificarSesion() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    
    if (token && usuario) {
        // Ya hay sesión activa, redirigir
        window.location.href = '../index.html';
    }
}

// Verificar sesión al cargar la página
verificarSesion();