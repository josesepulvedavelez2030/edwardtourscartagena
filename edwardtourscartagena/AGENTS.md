# Edward' Tours Cartagena - Guías para Agentes de Desarrollo 
 
## 📋 Información del Proyecto 
 
**Nombre del proyecto:** Edward' Tours Cartagena de Indias 
**Tipo:** Sitio web estático para empresa de turismo 
**Stack tecnológico:** HTML5, CSS3, JavaScript Vanilla ES6+ 
**Build Tool:** Vite para desarrollo rápido 
**Objetivo principal:** Conversión de clientes, reservas y showcase de servicios turísticos 
**Audiencia:** Turistas nacionales e internacionales que visitan Cartagena 
**Idioma principal:** Español (Colombia) 

## 🚀 Comandos de Desarrollo
 
### Inicialización del Proyecto
```bash
npm init -y
npm install vite --save-dev
npm install --save-dev eslint eslint-config-standard
```

### Comandos Esenciales
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Linting de código
npm run lint

# Formatear código (si se usa Prettier)
npm run format

# Ejecutar pruebas (cuando se implementen)
npm test

# Ejecutar una sola prueba
npm test -- --testNamePattern="nombre_de_la_prueba"
```

### Configuración package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/ --ext .js,.html",
    "format": "prettier --write src/"
  }
}
```

## 🎨 Guías de Estilo y Convenciones

### HTML
- Usar HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Indentación con 2 espacios
- Atributos en orden: `class`, `id`, `data-*`, `src`, `alt`, `href`
- Tags auto-cerrantes en una línea: `<img />`, `<br />`, `<hr />`
- Commentarios en español: `<!-- Sección principal del sitio -->`

### CSS
- Usar BEM methodology para naming de clases
- Mobile-first approach
- Variables CSS para colores y espaciado
- Orden: propiedades lógicas → visuales → animación
```css
/* Bloque principal */
.hero {
  /* Posicionamiento */
  display: flex;
  position: relative;
  
  /* Modelo de caja */
  width: 100%;
  padding: 2rem;
  
  /* Tipografía */
  font-family: var(--font-primary);
  font-size: 1.2rem;
  
  /* Visuales */
  background: var(--color-primary);
  color: var(--color-white);
  
  /* Animación */
  transition: transform 0.3s ease;
}

/* Elemento */
.hero__title {
  font-size: 2.5rem;
  font-weight: 700;
}

/* Modificador */
.hero--dark {
  background: var(--color-dark);
}
```

### JavaScript Vanilla ES6+
- Usar `const` y `let`, nunca `var`
- Funciones arrow para callbacks y funciones anónimas
- Template literals para strings con variables
- Destructuring para objetos y arrays
- Async/await para operaciones asíncronas
```javascript
// Importaciones al inicio
import { initializeCarousel } from './modules/carousel.js';
import { validateForm } from './utils/validation.js';

// Constantes
const API_URL = 'https://api.edwardtours.com';
const MAX_TOURS_PER_PAGE = 6;

// Funciones principales
const initializeApp = async () => {
  try {
    const tours = await fetchTours();
    renderTours(tours);
    initializeCarousel();
  } catch (error) {
    console.error('Error initializing app:', error);
    showErrorMessage('No se pudo cargar el contenido');
  }
};

// Event listeners
document.addEventListener('DOMContentLoaded', initializeApp);
```

### Nomenclatura
- **Archivos:** kebab-case (`tour-card.js`, `hero-section.css`)
- **Clases CSS:** BEM methodology (`tour-card__title`, `tour-card--featured`)
- **Variables JavaScript:** camelCase (`const tourData = {};`)
- **Constantes:** UPPER_SNAKE_CASE (`const API_ENDPOINT = '...'`)
- **Funciones:** camelCase, verbos (`fetchTours()`, `validateContactForm()`)

### Manejo de Errores
- Siempre usar try-catch en operaciones asíncronas
- Mensajes de error en español para el usuario
- Logging detallado en consola para desarrollo
```javascript
const handleBookingSubmit = async (formData) => {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    showSuccessMessage('¡Reserva confirmada!');
  } catch (error) {
    console.error('Error en reserva:', error);
    showErrorMessage('Hubo un problema al procesar tu reserva. Intenta de nuevo.');
  }
};
```

### Optimización y Performance
- Lazy loading para imágenes fuera del viewport
- Debounce para eventos scroll y resize
- Mínimo de peticiones HTTP
- Imágenes optimizadas en formatos modernos (WebP, AVIF)

### SEO y Accesibilidad
- Meta tags descriptivos en español
- Alt text descriptivo para imágenes
- Semántica HTML5 correcta
- ARIA labels donde sea necesario
- Estructura de encabezados h1 → h6 jerárquica

### Internacionalización
- Todo el contenido en español (Colombia)
- Formato de fechas: DD/MM/YYYY
- Moneda: COP ($)
- Números con formato colombiano

### Git Workflow
- Commits en español, presente indicativo: `Añade carrusel principal`
- Branches: `feature/nombre-feature`, `fix/descripcion-fix`
- Pull requests con descripción detallada en español

## 🧪 Testing
```javascript
// Ejemplo de estructura de prueba (cuando se implemente)
describe('Tour Booking Form', () => {
  test('debe validar email correctamente', () => {
    const result = validateEmail('test@example.com');
    expect(result).toBe(true);
  });
  
  test('debe rechazar emails inválidos', () => {
    const result = validateEmail('email-invalido');
    expect(result).toBe(false);
  });
});
```

## 📦 Estructura de Carpetas Sugerida
```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
├── css/
│   ├── main.css
│   ├── components/
│   └── utilities/
├── js/
│   ├── main.js
│   ├── modules/
│   └── utils/
└── data/
    └── tours.json
```
