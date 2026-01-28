// JavaScript principal para Edward' Tours Cartagena - Versión standalone
// Funciona directamente abriendo index.html (sin servidor ni módulos)

// Variables globales
let currentSlide = 0;
let autoplayInterval = null;
let isMenuOpen = false;

// Constantes
const APP_NAME = "Edward Tours Cartagena";
const API_WHATSAPP = 'https://wa.me/573122355675';
const AUTOPLAY_DELAY = 5000;

// Función principal de inicialización
function initializeApp() {
  try {
    console.log('Iniciando Edward Tours...');
    
    // Inicializar componentes
    initializeCarousel();
    initializeNavigation();
    initializeBooking();
    
    // Configurar comportamiento adicional
    setupSmoothScrolling();
    setupScrollAnimations();
    setupHeaderScroll();
    
    console.log('✅ Edward Tours inicializado correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar:', error);
    showErrorMessage('Hubo un problema al cargar el sitio. Por favor, recarga la página.');
  }
}

// ==================== CARRUSEL ====================
function initializeCarousel() {
  const slides = document.querySelectorAll('.hero__slide');
  const prevBtn = document.querySelector('.hero__control--prev');
  const nextBtn = document.querySelector('.hero__control--next');
  
  console.log('📸 Carrusel: Encontrados', slides.length, 'slides');
  
  if (slides.length === 0) {
    console.warn('⚠️ No se encontraron slides para el carrusel');
    return;
  }
  
  // Crear indicadores
  createCarouselIndicators(slides.length);
  
  // Configurar controles
  if (prevBtn) prevBtn.onclick = () => previousSlide(slides);
  if (nextBtn) nextBtn.onclick = () => nextSlide(slides);
  
  // Configurar teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousSlide(slides);
    else if (e.key === 'ArrowRight') nextSlide(slides);
  });
  
  // Configurar touch
  setupTouchEvents(slides);
  
  // Iniciar autoplay
  setTimeout(() => startAutoplay(slides), 1000);
}

function createCarouselIndicators(slideCount) {
  const indicatorsContainer = document.querySelector('.hero__indicators');
  if (!indicatorsContainer) return;
  
  indicatorsContainer.innerHTML = '';
  
  for (let i = 0; i < slideCount; i++) {
    const indicator = document.createElement('button');
    indicator.className = `hero__indicator ${i === 0 ? 'hero__indicator--active' : ''}`;
    indicator.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    indicator.onclick = () => goToSlide(i, slideCount);
    indicatorsContainer.appendChild(indicator);
  }
}

function goToSlide(slideIndex, slides) {
  if (slideIndex < 0 || slideIndex >= slides.length) {
    console.log('❌ Índice inválido:', slideIndex, 'Total slides:', slides.length);
    return;
  }
  
  console.log('🔄 goToSlide: de', currentSlide, 'a', slideIndex);
  
  // Remover clase activa del slide actual
  if (slides[currentSlide]) {
    slides[currentSlide].classList.remove('hero__slide--active');
    console.log('✅ Removida clase del slide anterior:', currentSlide);
  }
  
  // Actualizar indicador
  const indicators = document.querySelectorAll('.hero__indicator');
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.remove('hero__indicator--active');
  }
  
  // Actualizar slide actual
  currentSlide = slideIndex;
  
  // Agregar clase activa al nuevo slide
  if (slides[currentSlide]) {
    slides[currentSlide].classList.add('hero__slide--active');
    console.log('✅ Agregada clase al nuevo slide:', currentSlide);
    
    // Verificar que realmente se agregó la clase
    const hasClass = slides[currentSlide].classList.contains('hero__slide--active');
    console.log('🔍 El slide', currentSlide, 'tiene la clase activa:', hasClass);
  }
  
  // Actualizar indicador
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add('hero__indicator--active');
  }
  
  console.log('🎠 Slide actual ahora es:', currentSlide);
}

function nextSlide(slides) {
  const nextIndex = (currentSlide + 1) % slides.length;
  console.log('➡️ nextSlide: currentSlide =', currentSlide, '+ 1 %', slides.length, '=', nextIndex);
  goToSlide(nextIndex, slides);
}

function previousSlide(slides) {
  const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  goToSlide(prevIndex, slides);
}

function startAutoplay(slides) {
  stopAutoplay(); // Limpiar intervalo existente
  
  console.log('🎬 Iniciando autoplay con', AUTOPLAY_DELAY, 'ms de delay (5 segundos)');
  console.log('📊 Slides disponibles:', slides.length);
  
  autoplayInterval = setInterval(() => {
    console.log('⏭️ Intervalo ejecutado - cambiando al siguiente slide...');
    nextSlide(slides);
  }, AUTOPLAY_DELAY);
  
  console.log('▶️ Autoplay iniciado. Interval ID:', autoplayInterval);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    console.log('⏸️ Autoplay detenido');
  }
}

function setupTouchEvents(slides) {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX, slides);
  });
}

function handleSwipe(startX, endX, slides) {
  const threshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide(slides); // Swipe left
    } else {
      previousSlide(slides); // Swipe right
    }
  }
}

// ==================== NAVEGACIÓN ====================
function initializeNavigation() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const links = document.querySelectorAll('.nav__link');
  const header = document.querySelector('.header');
  
  if (!toggle || !menu) return;
  
  // Toggle menú móvil
  toggle.onclick = toggleMenu;
  
  // Cerrar menú al hacer click en links
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) closeMenu();
    });
  });
  
  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !header.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) closeMenu();
  });
  
  setupActiveNavigation();
}

function toggleMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  isMenuOpen = true;
  toggle.classList.add('nav__toggle--active');
  menu.classList.add('nav__menu--active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  isMenuOpen = false;
  toggle.classList.remove('nav__toggle--active');
  menu.classList.remove('nav__menu--active');
  document.body.style.overflow = '';
}

function setupActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__link');
  
  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        links.forEach(link => link.classList.remove('nav__link--active'));
        
        const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('nav__link--active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavigation);
  window.addEventListener('load', updateActiveNavigation);
}

// ==================== BOOKING ====================
function initializeBooking() {
  const form = document.getElementById('booking-form');
  const tourButtons = document.querySelectorAll('.tour-card__cta');
  
  if (!form) return;
  
  // Submit del formulario
  form.onsubmit = handleFormSubmit;
  
  // Botones de tours
  tourButtons.forEach(button => {
    button.onclick = () => {
      const tourName = button.getAttribute('data-tour');
      selectTour(tourName);
      scrollToForm();
    };
  });
  
  // Validación en tiempo real
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.onblur = () => validateField(input);
    input.oninput = () => clearFieldError(input);
  });
  
  setupBookingStyles();
}

function selectTour(tourName) {
  const tourSelect = document.getElementById('tour');
  if (!tourSelect) return;
  
  tourSelect.value = tourName;
  
  // Resaltar botón seleccionado
  const tourButtons = document.querySelectorAll('.tour-card__cta');
  tourButtons.forEach(button => {
    button.classList.remove('tour-card__cta--selected');
    if (button.getAttribute('data-tour') === tourName) {
      button.classList.add('tour-card__cta--selected');
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function scrollToForm() {
  const formSection = document.getElementById('contact');
  if (!formSection) return;
  
  const headerOffset = 80;
  const elementPosition = formSection.offsetTop;
  const offsetPosition = elementPosition - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    const firstInput = document.querySelector('#booking-form input');
    if (firstInput) firstInput.focus();
  }, 800);
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !validators.required(value)) {
    isValid = false;
    errorMessage = 'Este campo es obligatorio';
  }
  
  switch (fieldName) {
    case 'email':
      if (value && !validators.email(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
      }
      break;
      
    case 'phone':
      if (value && !validators.phone(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un número de teléfono válido';
      }
      break;
      
    case 'tour':
      if (!value) {
        isValid = false;
        errorMessage = 'Por favor, selecciona un tour';
      }
      break;
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }
  
  return isValid;
}

function showFieldError(field, message) {
  clearFieldError(field);
  
  field.classList.add('contact-form__input--error');
  
  const errorElement = document.createElement('div');
  errorElement.className = 'contact-form__error-message';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  `;
  
  field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
  field.classList.remove('contact-form__input--error');
  
  const errorElement = field.parentNode.querySelector('.contact-form__error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

function setupBookingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .contact-form__input--error {
      border-color: #dc3545 !important;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
    
    .tour-card__cta--selected {
      background: linear-gradient(135deg, #28a745, #20c997) !important;
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showErrorMessage('Por favor, completa todos los campos requeridos correctamente');
    return;
  }
  
  const formData = new FormData(form);
  const bookingData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    tour: formData.get('tour'),
    date: formData.get('date'),
    message: formData.get('message')
  };
  
  sendToWhatsApp(bookingData);
  showBookingSuccess(bookingData);
  
  form.reset();
}

function sendToWhatsApp(bookingData) {
  const message = createWhatsAppMessage(bookingData);
  const whatsappUrl = `https://wa.me/573122355675?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
}

function showBookingSuccess(bookingData) {
  const successMessage = "¡Solicitud de reserva enviada con éxito! " +
    "Te contactaremos pronto para confirmar tu tour: \"" + bookingData.tour + "\"";
  
  showSuccessMessage(successMessage);
}

// ==================== UTILIDADES ====================
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        if (isMenuOpen) closeMenu();
      }
    });
  });
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Solo animar tour-cards, dejar about__content y features visibles por defecto
  const animatedElements = document.querySelectorAll('.tour-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
  });
  
  // Asegurar que about__content y features siempre sean visibles
  const aboutElements = document.querySelectorAll('.about__content, .feature');
  aboutElements.forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
}

function setupHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

function showSuccessMessage(message) {
  showMessage(message, 'success');
}

function showErrorMessage(message) {
  showMessage(message, 'error');
}

function showMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `message message--${type}`;
  messageElement.textContent = message;
  
  Object.assign(messageElement.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '600',
    zIndex: '10000',
    maxWidth: '300px',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  });
  
  if (type === 'success') {
    messageElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
  } else {
    messageElement.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
  }
  
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    messageElement.style.opacity = '1';
    messageElement.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }
    }, 300);
  }, 4000);
}

const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },
  
  required: (value) => {
    return value && value.trim().length > 0;
  }
};

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function createWhatsAppMessage(bookingData) {
  const { name, email, phone, tour, date, message } = bookingData;
  
  let whatsappMessage = "🌟 *Nueva Solicitud de Reserva - Edward Tours Cartagena* 🌟\n\n";
  whatsappMessage += "👤 *Nombre:* " + name + "\n";
  whatsappMessage += "📧 *Email:* " + email + "\n";
  whatsappMessage += "📱 *Teléfono/WhatsApp:* " + phone + "\n";
  whatsappMessage += "🎯 *Tour de Interés:* " + tour + "\n";
  
  if (date) {
    whatsappMessage += "📅 *Fecha Deseada:* " + formatDate(date) + "\n";
  }
  
  if (message && message.trim()) {
    whatsappMessage += "💬 *Mensaje Adicional:* " + message + "\n";
  }
  
  whatsappMessage += "\n✨ *¡Cartagena te espera... y nosotros te llevamos a vivirla!* ✨";
  
  return encodeURIComponent(whatsappMessage);
}

// ==================== INICIALIZACIÓN ====================
// Funciones globales para debugging
window.EdwardTours = {
  showSuccessMessage,
  showErrorMessage,
  validators,
  formatDate,
  createWhatsAppMessage
};



// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

console.log('📜 Script cargado - esperando inicialización...');