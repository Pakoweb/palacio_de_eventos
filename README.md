# palacio_de_eventos# Palacio de Eventos - Proyecto Web

## Estructura del proyecto

Este proyecto contiene 9 archivos HTML y 1 archivo CSS:

### Archivos HTML:
1. **index.html** - Página principal con presentación del palacio y enlaces a las salas
2. **sala-jardin.html** - Página de la Sala Jardín (capacidad: 450 personas)
3. **sala-real.html** - Página de la Sala Real (capacidad: 450-800 personas)
4. **sala-modernista.html** - Página de la Sala Modernista (capacidad: 200 personas)
5. **sala-escenica.html** - Página de la Sala Escénica (capacidad: 50 personas)
6. **galeria.html** - Galería de eventos realizados
7. **informacion-general.html** - Información sobre el palacio
8. **reservas.html** - Formulario de reservas
9. **login.html** - Página de inicio de sesión

### Archivo CSS:
- **styles.css** - Hoja de estilos con todos los diseños

## Colores utilizados (según la presentación):

- **Verde oscuro (#145214)**: Color principal del header y textos destacados
- **Verde claro (#A8D5BA)**: Color secundario para navegación y formularios
- **Blanco (#FFFFFF)**: Fondo principal y textos del header
- **Gris (#c0c0c0)**: Footer

## Características del diseño:

✅ Sin uso de variables CSS (`:root`)
✅ Archivo CSS separado
✅ Diseño responsive
✅ Tipografía: Open Sans (12px base)
✅ Navegación sticky
✅ Footer con información de contacto
✅ Formularios con inputs redondeados
✅ Botones con efectos hover

## Cómo usar:

1. Todos los archivos deben estar en la misma carpeta
2. Abrir `index.html` en un navegador
3. La navegación funciona entre todas las páginas
4. Las imágenes utilizan placeholders SVG (deberás reemplazarlas con imágenes reales)

## Nota sobre las imágenes:

He usado placeholders SVG en lugar de imágenes reales. Para el proyecto final, deberás:
- Reemplazar los `src` de las imágenes con las rutas de tus imágenes reales
- Crear una carpeta `images/` y colocar allí todas las imágenes
- Actualizar las rutas en el HTML

## Estructura de navegación:

```
index.html (Página Principal)
├── sala-jardin.html
├── sala-real.html
├── sala-modernista.html
├── sala-escenica.html
├── informacion-general.html
├── reservas.html
├── galeria.html
└── login.html
```

## Desarrollo futuro sugerido:

- Integrar JavaScript para validación de formularios
- Conectar con backend (Node.js/PHP como sugiere la presentación)
- Implementar base de datos MySQL para reservas
- Añadir sistema de autenticación real
- Incorporar calendario interactivo para reservas
- Añadir galería de imágenes real con lightbox

---

**Proyecto desarrollado para:** Campus Cámara de Comercio de Sevilla
**Asignatura:** Diseño de Interfaces Web
**Autores:** Fernando Collantes de Terán Gómez, Francisco García Partida, Eva Rodríguez Delgado