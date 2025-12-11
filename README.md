# 🏛️ Palacio de Eventos - Sistema de Gestión Integral

Sistema web completo para la gestión de reservas y eventos del Palacio de Eventos, desarrollado con Angular 16 (frontend) y Node.js + Express (backend).

## 👥 Autores

- Fernando Collantes de Terán Gómez
- Francisco García Partida
- Eva Rodríguez Delgado

**Institución:** Campus Cámara de Comercio de Sevilla  
**Asignatura:** Diseño de Interfaces Web

---

## 📋 Descripción del Proyecto

El Palacio de Eventos cuenta con 4 salas principales:
- **Sala Jardín** - Capacidad: 450 personas
- **Sala Real** - Capacidad: 450-800 personas
- **Sala Modernista** - Capacidad: 200 personas
- **Sala Escénica** - Capacidad: 50 personas

Este sistema permite gestionar reservas, visualizar disponibilidad, administrar eventos y consultar información general del palacio.

---

## 🏗️ Arquitectura del Proyecto

```
palacio_de_eventos/
├── frontend/               # Aplicación Angular 16
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   └── package.json
│
├── backend/               # API REST Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio
│   │   ├── routes/        # Definición de endpoints
│   │   ├── middlewares/   # Autenticación, validaciones
│   │   ├── models/        # Modelos de datos
│   │   ├── config/        # Configuraciones
│   │   └── utils/         # Funciones auxiliares
│   ├── server.js          # Punto de entrada
│   ├── .env               # Variables de entorno
│   └── package.json
│
└── [archivos HTML legacy]  # Versión estática original
    ├── index.html
    ├── sala-jardin.html
    ├── sala-real.html
    ├── sala-modernista.html
    ├── sala-escenica.html
    ├── galeria.html
    ├── informacion-general.html
    ├── reservas.html
    ├── login.html
    └── styles.css
```

---

## 🎨 Diseño Visual

### Paleta de Colores

- **Verde Oscuro** `#145214` - Color principal (header, textos destacados)
- **Verde Claro** `#A8D5BA` - Color secundario (navegación, formularios)
- **Blanco** `#FFFFFF` - Fondo principal y textos del header
- **Gris** `#c0c0c0` - Footer

### Características del Diseño

✅ Diseño responsive  
✅ Tipografía: Open Sans (12px base)  
✅ Navegación sticky  
✅ Footer con información de contacto  
✅ Formularios con inputs redondeados  
✅ Botones con efectos hover  
✅ Componentes Angular con SCSS

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 16.14 o superior
- npm o yarn
- Angular CLI 16
- MySQL/MariaDB o MongoDB (para producción)

### 1️⃣ Instalación del Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copia y edita el archivo .env con tus configuraciones
```

**Archivo .env (backend):**
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200

# Base de datos (configurar según tu elección)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=palacio_eventos

# JWT para autenticación
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=24h
```

**Iniciar el servidor backend:**
```bash
# Modo desarrollo (con auto-reinicio)
npm run dev

# Modo producción
npm start
```

El backend estará disponible en: `http://localhost:3000`

---

### 2️⃣ Instalación del Frontend

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

---

## 🔌 API Endpoints

### Endpoints Generales

- `GET /` - Verificar estado del servidor
- `GET /api/test` - Prueba de API

### Eventos

- `GET /api/eventos` - Obtener todos los eventos
- `GET /api/eventos/:id` - Obtener evento por ID
- `POST /api/eventos` - Crear nuevo evento
- `PUT /api/eventos/:id` - Actualizar evento
- `DELETE /api/eventos/:id` - Eliminar evento

### Próximamente

- `/api/salas` - Gestión de salas
- `/api/reservas` - Sistema de reservas
- `/api/usuarios` - Gestión de usuarios
- `/api/auth` - Autenticación y autorización

---

## 🧪 Pruebas de API (Ejemplo con Postman)

### Crear un evento

```http
POST http://localhost:3000/api/eventos
Content-Type: application/json

{
  "nombre": "Boda de Juan y María",
  "fecha": "2025-12-25",
  "salon": "Sala Real",
  "invitados": 450,
  "tipo": "boda"
}
```

### Obtener todos los eventos

```http
GET http://localhost:3000/api/eventos
```

---

## 📦 Dependencias Principales

### Backend

- **express** `^4.18.0` - Framework web
- **cors** `^2.8.5` - Manejo de CORS
- **dotenv** `^16.0.0` - Variables de entorno
- **nodemon** `^3.0.0` (dev) - Auto-reinicio del servidor

### Frontend

- **@angular/core** `^16.0.0` - Framework Angular
- **@angular/router** `^16.0.0` - Enrutamiento
- **@angular/forms** `^16.0.0` - Formularios reactivos
- **rxjs** `^7.8.0` - Programación reactiva

---

## 🗄️ Base de Datos

### Esquema Sugerido (MySQL)

```sql
-- Tabla de Salas
CREATE TABLE salas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    capacidad_min INT,
    capacidad_max INT,
    descripcion TEXT,
    precio_base DECIMAL(10,2),
    imagen_url VARCHAR(255)
);

-- Tabla de Eventos/Reservas
CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    sala_id INT,
    num_invitados INT,
    tipo_evento VARCHAR(50),
    estado ENUM('pendiente', 'confirmado', 'cancelado'),
    cliente_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sala_id) REFERENCES salas(id)
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    telefono VARCHAR(20),
    rol ENUM('cliente', 'admin'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Seguridad (Implementación Futura)

- [ ] Autenticación JWT
- [ ] Encriptación de contraseñas (bcrypt)
- [ ] Validación de datos (express-validator)
- [ ] Rate limiting
- [ ] Helmet para headers de seguridad
- [ ] HTTPS en producción
- [ ] Variables de entorno seguras

---

## 📱 Páginas del Sistema

### Versión HTML Estática (Legacy)
1. **index.html** - Página principal
2. **sala-jardin.html** - Información Sala Jardín
3. **sala-real.html** - Información Sala Real
4. **sala-modernista.html** - Información Sala Modernista
5. **sala-escenica.html** - Información Sala Escénica
6. **galeria.html** - Galería de eventos
7. **informacion-general.html** - Información del palacio
8. **reservas.html** - Formulario de reservas
9. **login.html** - Inicio de sesión

### Nueva Aplicación Angular (En Desarrollo)
- Dashboard de administración
- Sistema de reservas interactivo
- Calendario de disponibilidad
- Gestión de usuarios
- Galería de eventos dinámica
- Panel de cliente

---

## 🚧 Roadmap de Desarrollo

### Fase 1: Backend API ✅
- [x] Estructura de carpetas
- [x] Servidor Express básico
- [x] Sistema de rutas
- [x] Controladores de ejemplo
- [x] Middlewares de autenticación
- [ ] Conexión a base de datos
- [ ] CRUD completo de salas
- [ ] CRUD completo de reservas
- [ ] Sistema de autenticación JWT

### Fase 2: Frontend Angular 🔄
- [x] Instalación de Angular 16
- [ ] Migración de diseño HTML a componentes
- [ ] Servicios HTTP para consumir API
- [ ] Guards de autenticación
- [ ] Formularios reactivos
- [ ] Enrutamiento completo
- [ ] Interceptores HTTP

### Fase 3: Integración 📋
- [ ] Conectar frontend con backend
- [ ] Sistema de reservas funcional
- [ ] Dashboard administrativo
- [ ] Sistema de notificaciones
- [ ] Validaciones completas
- [ ] Manejo de errores

### Fase 4: Producción 🚀
- [ ] Testing (Jest/Jasmine)
- [ ] Optimización de rendimiento
- [ ] SEO
- [ ] Deploy en servidor
- [ ] Configuración de dominio
- [ ] Certificado SSL
- [ ] Monitoreo y logs

---

## 📝 Notas Importantes

### Imágenes
Los archivos HTML legacy usan placeholders SVG. Para producción:
- Crear carpeta `frontend/src/assets/images/`
- Agregar imágenes reales de las salas
- Actualizar rutas en los componentes Angular

### Estilos
- Los estilos CSS legacy se migrarán a SCSS modular en Angular
- Se mantendrá la paleta de colores original
- Se implementarán variables SCSS para mejor mantenimiento

### Datos de Prueba
El backend actualmente retorna datos simulados (mock). Se reemplazarán por datos reales de base de datos en la siguiente fase.

---

## 🤝 Contribución

Este es un proyecto académico. Para contribuir:
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

## 📄 Licencia

ISC License - Proyecto Académico

---

## 📞 Contacto

Para consultas sobre el proyecto:
- **Institución:** Campus Cámara de Comercio de Sevilla
- **Asignatura:** Diseño de Interfaces Web

---

## 🔧 Solución de Problemas

### El backend no arranca
```bash
# Verificar que las dependencias estén instaladas
cd backend
npm install

# Verificar que el puerto 3000 no esté en uso
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Mac/Linux
```

### El frontend no arranca
```bash
# Verificar versión de Angular CLI
ng version

# Reinstalar dependencias
cd frontend
rm -rf node_modules
npm install
```

### Error de CORS
Verificar que en `backend/.env` esté configurado:
```env
FRONTEND_URL=http://localhost:4200
```

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** En desarrollo activo 🚧