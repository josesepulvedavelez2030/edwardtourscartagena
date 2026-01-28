// Módulo de Reservas y Formularios
export const initializeBooking = () => {
  const booking = {
    form: null,
    tourButtons: null,
    selectedTour: null
  };

  // Inicializar elementos de reserva
  const initializeElements = () => {
    booking.form = document.getElementById('booking-form');
    booking.tourButtons = document.querySelectorAll('.tour-card__cta');
    
    if (!booking.form) {
      console.warn('No se encontró el formulario de reserva');
      return false;
    }
    
    setupEventListeners();
    setupFormValidation();
    
    return true;
  };

  // Configurar event listeners
  const setupEventListeners = () => {
    // Submit del formulario
    booking.form.addEventListener('submit', handleFormSubmit);
    
    // Botones de tours
    booking.tourButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tourName = button.getAttribute('data-tour');
        selectTour(tourName);
        scrollToForm();
      });
    });
    
    // Validación en tiempo real
    const inputs = booking.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });
  };

  // Seleccionar tour específico
  const selectTour = (tourName) => {
    const tourSelect = document.getElementById('tour');
    if (tourSelect) {
      tourSelect.value = tourName;
      booking.selectedTour = tourName;
      
      // Resaltar opción seleccionada
      highlightSelectedTour(tourName);
    }
  };

  // Resaltar tour seleccionado
  const highlightSelectedTour = (tourName) => {
    booking.tourButtons.forEach(button => {
      button.classList.remove('tour-card__cta--selected');
      if (button.getAttribute('data-tour') === tourName) {
        button.classList.add('tour-card__cta--selected');
        
        // Hacer scroll al botón
        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  // Hacer scroll al formulario
  const scrollToForm = () => {
    const formSection = document.getElementById('contact');
    if (formSection) {
      const headerOffset = 80;
      const elementPosition = formSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Focus en el primer campo del formulario
      setTimeout(() => {
        const firstInput = booking.form.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  // Validar campo individual
  const validateField = (field) => {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validación de campos requeridos
    if (field.hasAttribute('required') && !window.EdwardTours.validators.required(value)) {
      isValid = false;
      errorMessage = 'Este campo es obligatorio';
    }
    
    // Validaciones específicas
    switch (fieldName) {
      case 'email':
        if (value && !window.EdwardTours.validators.email(value)) {
          isValid = false;
          errorMessage = 'Por favor, ingresa un email válido';
        }
        break;
        
      case 'phone':
        if (value && !window.EdwardTours.validators.phone(value)) {
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
    
    // Mostrar u ocultar error
    if (!isValid) {
      showFieldError(field, errorMessage);
    } else {
      clearFieldError(field);
    }
    
    return isValid;
  };

  // Mostrar error de campo
  const showFieldError = (field, message) => {
    clearFieldError(field); // Limpiar errores previos
    
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
  };

  // Limpiar error de campo
  const clearFieldError = (field) => {
    field.classList.remove('contact-form__input--error');
    
    const errorElement = field.parentNode.querySelector('.contact-form__error-message');
    if (errorElement) {
      errorElement.remove();
    }
  };

  // Configurar validación del formulario
  const setupFormValidation = () => {
    // Estilos para campos con error
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
  };

  // Manejar submit del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    const inputs = booking.form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      window.EdwardTours.showErrorMessage('Por favor, completa todos los campos requeridos correctamente');
      return;
    }
    
    // Recopilar datos del formulario
    const formData = new FormData(booking.form);
    const bookingData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      tour: formData.get('tour'),
      date: formData.get('date'),
      message: formData.get('message')
    };
    
    // Enviar a WhatsApp
    sendToWhatsApp(bookingData);
    
    // Mostrar mensaje de éxito
    showBookingSuccess(bookingData);
    
    // Resetear formulario
    booking.form.reset();
  };

  // Enviar datos a WhatsApp
  const sendToWhatsApp = (bookingData) => {
    const message = window.EdwardTours.createWhatsAppMessage(bookingData);
    const whatsappUrl = `https://wa.me/573122355675?text=${message}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappUrl, '_blank');
  };

  // Mostrar mensaje de éxito
  const showBookingSuccess = (bookingData) => {
    const successMessage = `
      ¡Solicitud de reserva enviada con éxito! 
      Te contactaremos pronto para confirmar tu tour: "${bookingData.tour}"
    `;
    
    window.EdwardTours.showSuccessMessage(successMessage);
    
    // Opcional: Mostrar confirmación detallada
    showBookingConfirmation(bookingData);
  };

  // Mostrar confirmación detallada
  const showBookingConfirmation = (bookingData) => {
    const confirmationModal = createConfirmationModal(bookingData);
    document.body.appendChild(confirmationModal);
    
    // Animar entrada
    setTimeout(() => {
      confirmationModal.style.opacity = '1';
      confirmationModal.style.pointerEvents = 'auto';
    }, 100);
  };

  // Crear modal de confirmación
  const createConfirmationModal = (bookingData) => {
    const modal = document.createElement('div');
    modal.className = 'booking-confirmation-modal';
    
    const tourNames = {
      'city-tour': 'City Tour Histórico',
      'islas-rosario': 'Tour Islas del Rosario',
      'chiva-rumbera': 'Chiva Rumbera Nocturna',
      'tour-gastronomico': 'Tour Gastronómico',
      'getsemani': 'Tour Getsemaní Cultural',
      'playa-blanca': 'Tour Playa Blanca – Barú',
      'tour-privado': 'Tour Privado Personalizado'
    };
    
    modal.innerHTML = `
      <div class="booking-confirmation__content">
        <div class="booking-confirmation__header">
          <h3>✅ ¡Solicitud Enviada!</h3>
          <button class="booking-confirmation__close">&times;</button>
        </div>
        <div class="booking-confirmation__body">
          <p>Tu solicitud de reserva ha sido enviada correctamente:</p>
          <ul>
            <li><strong>Nombre:</strong> ${bookingData.name}</li>
            <li><strong>Tour:</strong> ${tourNames[bookingData.tour] || bookingData.tour}</li>
            ${bookingData.date ? `<li><strong>Fecha:</strong> ${window.EdwardTours.formatDate(bookingData.date)}</li>` : ''}
            <li><strong>Teléfono:</strong> ${bookingData.phone}</li>
          </ul>
          <p>Te contactaremos pronto para confirmar los detalles.</p>
        </div>
      </div>
    `;
    
    // Estilos del modal
    Object.assign(modal.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease'
    });
    
    // Event listeners del modal
    const closeBtn = modal.querySelector('.booking-confirmation__close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    
    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => closeModal(modal), 5000);
    
    return modal;
  };

  // Cerrar modal
  const closeModal = (modal) => {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  };

  // Inicializar módulo de reservas
  if (initializeElements()) {
    console.log('Módulo de reservas inicializado correctamente');
    
    // Exponer funciones globales para debugging
    window.bookingAPI = {
      selectTour,
      validateField,
      sendToWhatsApp
    };
  }
};