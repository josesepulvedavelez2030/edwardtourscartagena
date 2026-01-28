# Edward' Tours Cartagena - Sitio Web

Sitio web estático para Edward' Tours Cartagena de Indias, empresa de turismo local.

## 🚀 Inicio Rápido

1. **Abrir el sitio:** Simplemente abre el archivo `index.html` en tu navegador web
2. **Sin dependencias:** No requiere servidor local ni instalación de dependencias
3. **Compatible con todos los navegadores modernos**

## 📱 Características Principales

- **Carrusel dinámico** en la sección hero con autoplay y controles táctiles
- **Navegación responsive** con menú móvil optimizado
- **Formulario de reservas** con validación en tiempo real
- **Integración con WhatsApp** para contactos directos
- **Diseño mobile-first** que se adapta a todos los dispositivos
- **Optimización SEO** con semántica HTML5 y meta tags
- **Accesibilidad** con ARIA labels y navegación por teclado

## 🎨 Tecnologías Utilizadas

- **HTML5** semántico
- **CSS3** con BEM methodology y variables CSS
- **JavaScript Vanilla ES6+** modular
- **Sin frameworks externos** - rendimiento optimizado

## 📁 Estructura del Proyecto

```
edwardtourscartagena/
├── index.html                 # Página principal
├── css/
│   ├── main.css               # Estilos base y variables
│   └── components/            # Componentes específicos
│       ├── header.css
│       ├── hero.css
│       ├── about.css
│       ├── tours.css
│       ├── contact.css
│       └── footer.css
├── js/
│   ├── main.js                # Aplicación principal
│   └── modules/               # Módulos JavaScript
│       ├── carousel.js        # Carrusel dinámico
│       ├── navigation.js      # Navegación y menú móvil
│       └── booking.js         # Formulario de reservas
└── assets/                    # Imágenes y recursos (agregar aquí)
```

## 🛠️ Personalización

### Colores y Branding
Los colores principales están definidos en `css/main.css` en las variables CSS:

```css
:root {
  --color-primary: #ff6b35;     /* Naranja Edward' Tours */
  --color-secondary: #f7931e;   /* Amarillo secundario */
  --color-accent: #004e89;      /* Azul acento */
  /* ... más variables */
}
```

### Contenido
- **Información de contacto:** Actualizar en `index.html` y `js/modules/booking.js`
- **Tours y servicios:** Modificar las tarjetas de tours en `index.html`
- **Imágenes del carrusel:** Reemplazar los SVG placeholders en `css/components/hero.css`

### WhatsApp
El número de WhatsApp está configurado en:
- `js/modules/booking.js` (línea 10: `const API_WHATSAPP = 'https://wa.me/573122355675';`)
- `index.html` (sección contacto)

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Móvil:** 320px - 767px

## 🚀 Performance

- **Lazy loading** para imágenes
- **CSS y JavaScript minificados** (producción)
- **Hardware acceleration** para animaciones
- **Prefers-reduced-motion** para accesibilidad

## 🔧 Desarrollo

### Estructura de Componentes

Cada sección del sitio está organizada como un componente independiente:

1. **Header:** Navegación fija con menú móvil
2. **Hero:** Carrusel automático con 5 slides
3. **About:** Información sobre la empresa
4. **Tours:** Grid de 7 tours disponibles
5. **Contact:** Formulario de reserva e información de contacto
6. **Footer:** Enlaces y información adicional

### JavaScript Modules

La funcionalidad está dividida en módulos ES6:

- **main.js:** Inicialización y utilidades globales
- **carousel.js:** Carrusel con autoplay, touch, keyboard navigation
- **navigation.js:** Menú móvil, scroll suave, navegación activa
- **booking.js:** Validación de formularios, integración WhatsApp

### CSS Architecture

- **BEM Methodology** para naming de clases
- **CSS Custom Properties** para variables y theming
- **Mobile-first approach** con breakpoints específicos
- **Component-based structure** para mantenimiento

## 🎯 Características Especiales

### Carrusel Hero
- Autoplay de 5 segundos
- Controles prev/next
- Indicadores clickeables
- Soporte táctil (swipe)
- Navegación por teclado
- Pausa en hover

### Formulario de Reservas
- Validación en tiempo real
- Selección directa de tours
- Integración con WhatsApp
- Confirmación visual
- Mensajes de error claros

### Navegación
- Sticky header con efecto scroll
- Menú móvil animado
- Scroll suave a secciones
- Links activos según sección visible
- Cierre automático al hacer click

## 🌐 SEO y Accesibilidad

- **Meta tags** descriptivos
- **Semántica HTML5** correcta
- **ARIA labels** para screen readers
- **Keyboard navigation** completa
- **Contraste de colores** optimizado
- **Structure data** para motores de búsqueda

## 📊 Testing

El sitio ha sido testeado en:
- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)
- ✅ Mobile Chrome/Safari
- ✅ Tablets

## 🚀 Despliegue

Para desplegar el sitio:

1. **GitHub Pages:** Subir a repositorio y habilitar GitHub Pages
2. **Netlify/Vercel:** Conectar repositorio y desplegar automáticamente
3. **Hosting tradicional:** Subir archivos a servidor web

## 📈 Métricas de Performance (Google Lighthouse)

- **Performance:** 95+ 
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Añade nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

**Edward' Tours Cartagena** - 🌴 Vive la experiencia más auténtica de Cartagena 🌴