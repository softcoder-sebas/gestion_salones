// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Simulate login process
                showLoading();
                
                setTimeout(() => {
                    hideLoading();
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                alert('Por favor, completa todos los campos');
            }
        });
    }
});

// Loading functionality
function showLoading() {
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        submitBtn.disabled = true;
    }
}

function hideLoading() {
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.innerHTML = 'Iniciar Sesión';
        submitBtn.disabled = false;
    }
}

// Notification management
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Local storage management for reservations
function saveReservation(reservation) {
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push({
        ...reservation,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

function getReservations() {
    return JSON.parse(localStorage.getItem('reservations') || '[]');
}

function updateReservationStatus(id, status) {
    let reservations = getReservations();
    reservations = reservations.map(reservation => 
        reservation.id === id ? { ...reservation, status } : reservation
    );
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Date and time utilities
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Mobile responsive utilities
function isMobile() {
    return window.innerWidth <= 768;
}

// Initialize app
function initApp() {
    // Set up event listeners
    document.addEventListener('click', function(e) {
        // Handle navigation
        if (e.target.matches('[data-navigate]')) {
            const url = e.target.getAttribute('data-navigate');
            window.location.href = url;
        }
    });
    
    // Handle back button
    window.addEventListener('popstate', function(e) {
        // Handle browser back button if needed
    });
}

// Call init when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Función para modificar reserva con confirmación
function modificarReserva() {
    let confirmar = confirm("¿Deseas modificar la reserva?");
    if (confirmar) {
        alert("Ahora puedes modificar la reserva");
    }else {
        alert("Modificación cancelada");
    }
}

// Función para cancelar reserva con confirmación
function cancelarReserva() {
    let confirmar = confirm("¿Seguro que deseas cancelar la reserva?");
    if (confirmar) {
        alert("Reserva cancelada");
    }else {
        alert("Procedimiento cancelado");
    }
}

//Función para mostrar detalles de la reserva
function verDetallesReserva() {
    alert("Aquí puedes ver los detalles de la reserva");
}
// Función para mostrar notificaciones
function borrarNotificaciones() {
    alert("Todas las notificaciones han sido borradas");
}
