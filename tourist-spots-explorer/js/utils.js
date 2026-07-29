// Utility functions
const Utils = {
    // DOM element helpers
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // Show/hide elements
    show(element) {
        if (element) element.style.display = 'block';
    },
    
    hide(element) {
        if (element) element.style.display = 'none';
    },
    
    // Local storage helpers
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available:', e);
        }
    },
    
    getStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.warn('Error reading from local storage:', e);
            return null;
        }
    },
    
    // Formatting helpers
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    },
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    // API response handlers
    handleApiResponse(response) {
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    },
    
    // Error handling
    handleError(error, userMessage = 'An error occurred') {
        console.error('Application error:', error);
        return {
            success: false,
            error: error.message,
            userMessage
        };
    },
    
    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Sanitize HTML
    sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}