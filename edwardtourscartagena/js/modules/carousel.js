// Módulo de Carrusel para Hero Section
export const initializeCarousel = () => {
  const carousel = {
    currentSlide: 0,
    slides: null,
    indicators: [],
    controls: {
      prev: null,
      next: null
    },
    autoplay: null,
    config: {
      autoplayDelay: 3000,
      transitionSpeed: 500
    }
  };

  // Inicializar elementos del carrusel
  const initializeElements = () => {
    carousel.slides = document.querySelectorAll('.hero__slide');
    carousel.controls.prev = document.querySelector('.hero__control--prev');
    carousel.controls.next = document.querySelector('.hero__control--next');
    
    if (carousel.slides.length === 0) {
      console.warn('No se encontraron slides para el carrusel');
      return false;
    }
    
    createIndicators();
    setupEventListeners();
    startAutoplay();
    
    return true;
  };

  // Crear indicadores dinámicamente
  const createIndicators = () => {
    const indicatorsContainer = document.querySelector('.hero__indicators');
    
    if (!indicatorsContainer) {
      console.warn('No se encontró el contenedor de indicadores');
      return;
    }
    
    indicatorsContainer.innerHTML = '';
    carousel.indicators = [];
    
    carousel.slides.forEach((slide, index) => {
      const indicator = document.createElement('button');
      indicator.className = `hero__indicator ${index === 0 ? 'hero__indicator--active' : ''}`;
      indicator.setAttribute('aria-label', `Ir a slide ${index + 1}`);
      indicator.setAttribute('data-slide', index);
      
      indicator.addEventListener('click', () => goToSlide(index));
      
      indicatorsContainer.appendChild(indicator);
      carousel.indicators.push(indicator);
    });
    
    console.log(`Creados ${carousel.slides.length} indicadores para el carrusel`);
  };

  // Configurar event listeners
  const setupEventListeners = () => {
    // Controles de navegación
    if (carousel.controls.prev) {
      carousel.controls.prev.addEventListener('click', previousSlide);
    }
    
    if (carousel.controls.next) {
      carousel.controls.next.addEventListener('click', nextSlide);
    }
    
    // Pausar autoplay en hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoplay);
      heroSection.addEventListener('mouseleave', startAutoplay);
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
    
    // Navegación con swipe/touch para móviles
    setupTouchEvents();
  };

  // Configurar eventos táctiles
  const setupTouchEvents = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left
        } else {
          previousSlide(); // Swipe right
        }
      }
    };
  };

  // Ir a un slide específico
  const goToSlide = (slideIndex) => {
    if (slideIndex < 0 || slideIndex >= carousel.slides.length) return;
    
    // Remover clase activa del slide actual
    carousel.slides[carousel.currentSlide].classList.remove('hero__slide--active');
    carousel.indicators[carousel.currentSlide].classList.remove('hero__indicator--active');
    
    // Actualizar slide actual
    carousel.currentSlide = slideIndex;
    
    // Agregar clase activa al nuevo slide
    carousel.slides[carousel.currentSlide].classList.add('hero__slide--active');
    carousel.indicators[carousel.currentSlide].classList.add('hero__indicator--active');
    
    // Reiniciar autoplay
    stopAutoplay();
    startAutoplay();
  };

  // Siguiente slide
  const nextSlide = () => {
    const nextIndex = (carousel.currentSlide + 1) % carousel.slides.length;
    goToSlide(nextIndex);
  };

  // Slide anterior
  const previousSlide = () => {
    const prevIndex = carousel.currentSlide === 0 
      ? carousel.slides.length - 1 
      : carousel.currentSlide - 1;
    goToSlide(prevIndex);
  };

  // Iniciar autoplay
  const startAutoplay = () => {
    if (carousel.autoplay) return;
    
    carousel.autoplay = setInterval(() => {
      nextSlide();
    }, carousel.config.autoplayDelay);
  };

  // Detener autoplay
  const stopAutoplay = () => {
    if (carousel.autoplay) {
      clearInterval(carousel.autoplay);
      carousel.autoplay = null;
    }
  };

  // Configurar visibilidad API para pausar autoplay cuando la pestaña no está visible
  const setupVisibilityChange = () => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  };

  // Inicializar carrusel
  if (initializeElements()) {
    setupVisibilityChange();
    console.log('Carrusel inicializado correctamente con autoplay de 3 segundos');
    
    // Exponer funciones globales para debugging
    window.carouselAPI = {
      nextSlide,
      previousSlide,
      goToSlide,
      startAutoplay,
      stopAutoplay
    };
  }
};