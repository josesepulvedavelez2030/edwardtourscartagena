// Módulo de Navegación
export const initializeNavigation = () => {
  const navigation = {
    toggle: null,
    menu: null,
    links: null,
    header: null,
    isMenuOpen: false
  };

  // Inicializar elementos de navegación
  const initializeElements = () => {
    navigation.toggle = document.querySelector('.nav__toggle');
    navigation.menu = document.querySelector('.nav__menu');
    navigation.links = document.querySelectorAll('.nav__link');
    navigation.header = document.querySelector('.header');
    
    if (!navigation.toggle || !navigation.menu) {
      console.warn('No se encontraron elementos de navegación');
      return false;
    }
    
    setupEventListeners();
    setupActiveNavigation();
    
    return true;
  };

  // Configurar event listeners
  const setupEventListeners = () => {
    // Toggle del menú móvil
    navigation.toggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer click en enlaces
    navigation.links.forEach(link => {
      link.addEventListener('click', () => {
        if (navigation.isMenuOpen) {
          closeMenu();
        }
      });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (navigation.isMenuOpen && 
          !navigation.header.contains(e.target) &&
          !navigation.menu.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Prevenir scroll cuando menú está abierto en móvil
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navigation.isMenuOpen) {
        closeMenu();
      }
    });
  };

  // Toggle del menú móvil
  const toggleMenu = () => {
    if (navigation.isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Abrir menú
  const openMenu = () => {
    navigation.isMenuOpen = true;
    navigation.toggle.classList.add('nav__toggle--active');
    navigation.menu.classList.add('nav__menu--active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    
    // Focus management para accesibilidad
    const firstLink = navigation.menu.querySelector('.nav__link');
    if (firstLink) {
      firstLink.focus();
    }
  };

  // Cerrar menú
  const closeMenu = () => {
    navigation.isMenuOpen = false;
    navigation.toggle.classList.remove('nav__toggle--active');
    navigation.menu.classList.remove('nav__menu--active');
    document.body.style.overflow = ''; // Restaurar scroll
  };

  // Configurar navegación activa según scroll
  const setupActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNavigation = () => {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
          
          // Remover clase activa de todos los enlaces
          navigation.links.forEach(link => {
            link.classList.remove('nav__link--active');
          });
          
          // Agregar clase activa al enlace correspondiente
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('nav__link--active');
          }
        }
      });
    };
    
    // Actualizar en scroll y carga
    window.addEventListener('scroll', updateActiveNavigation);
    window.addEventListener('load', updateActiveNavigation);
  };

  // Efecto de parallax para header (opcional)
  const setupParallaxEffect = () => {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero__slide-content');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  };

  // Inicializar navegación
  if (initializeElements()) {
    console.log('Navegación inicializada correctamente');
    
    // Exponer funciones globales para debugging
    window.navigationAPI = {
      openMenu,
      closeMenu,
      toggleMenu
    };
  }
};