// Main application logic
class TouristSpotsApp {
    constructor() {
        this.destinations = [];
        this.filteredDestinations = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.isLoading = false;
        
        this.initializeApp();
    }
    
    async initializeApp() {
        try {
            this.setupEventListeners();
            await this.loadDestinations();
            this.hideLoading();
        } catch (error) {
            this.showError('Failed to initialize application');
            console.error('App initialization error:', error);
        }
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = Utils.$('#search-input');
        const searchBtn = Utils.$('#search-btn');
        const retryBtn = Utils.$('#retry-btn');
        
        // Debounced search
        const debouncedSearch = Utils.debounce(() => {
            this.handleSearch();
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
        searchBtn.addEventListener('click', () => this.handleSearch());
        
        // Filter functionality
        Utils.$$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Retry button
        retryBtn.addEventListener('click', () => this.retryLoading());
        
        // Modal functionality
        Utils.$('.close-btn').addEventListener('click', () => this.closeModal());
        Utils.$('#destination-modal').addEventListener('click', (e) => {
            if (e.target === Utils.$('#destination-modal')) {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'Enter' && document.activeElement === searchInput) {
                this.handleSearch();
            }
        });
    }
    
    async loadDestinations() {
        this.showLoading();
        
        try {
            this.destinations = await API.getDestinations();
            this.filteredDestinations = this.destinations;
            this.renderDestinations();
            this.hideError();
        } catch (error) {
            this.showError('Failed to load destinations');
            console.error('Error loading destinations:', error);
        }
    }
    
    async handleSearch() {
        const query = Utils.$('#search-input').value.trim();
        this.currentSearch = query;
        
        try {
            this.showLoading();
            this.filteredDestinations = await API.searchDestinations(query, this.currentFilter);
            this.renderDestinations();
        } catch (error) {
            this.showError('Search failed');
            console.error('Search error:', error);
        }
    }
    
    async handleFilter(event) {
        // Update active filter button
        Utils.$$('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        this.currentFilter = event.target.dataset.filter;
        
        try {
            this.showLoading();
            this.filteredDestinations = await API.searchDestinations(this.currentSearch, this.currentFilter);
            this.renderDestinations();
        } catch (error) {
            this.showError('Filter failed');
            console.error('Filter error:', error);
        }
    }
    
    renderDestinations() {
        const container = Utils.$('#destinations-container');
        
        if (this.filteredDestinations.length === 0) {
            Utils.show(Utils.$('#no-results'));
            container.innerHTML = '';
            this.hideLoading();
            return;
        }
        
        Utils.hide(Utils.$('#no-results'));
        
        container.innerHTML = this.filteredDestinations.map(destination => `
            <div class="destination-card" data-id="${destination.id}">
                <img src="${destination.image}" alt="${destination.name}" class="card-image" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">${destination.name}</h3>
                    <p class="card-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${destination.country}
                    </p>
                    <p class="card-description">${destination.description}</p>
                    <div class="card-details">
                        <div class="detail-item">
                            <i class="fas fa-passport"></i>
                            <span>${destination.visa.type}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hotel"></i>
                            <span>From ${destination.stay.budget.split('-')[0]}/night</span>
                        </div>
                    </div>
                    <button class="card-button view-details-btn" data-id="${destination.id}">
                        <i class="fas fa-info-circle"></i>
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to detail buttons
        Utils.$$('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.showDestinationDetails(id);
            });
        });
        
        // Add click event to entire card
        Utils.$$('.destination-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-details-btn')) {
                    const id = parseInt(card.dataset.id);
                    this.showDestinationDetails(id);
                }
            });
        });
        
        this.hideLoading();
    }
    
    async showDestinationDetails(destinationId) {
        this.showModalLoading();
        
        try {
            const destination = await API.getDestinationDetails(destinationId);
            this.renderDestinationModal(destination);
        } catch (error) {
            this.showModalError('Failed to load destination details');
            console.error('Error loading destination details:', error);
        }
    }
    
    renderDestinationModal(destination) {
        const modalContent = Utils.$('#modal-content');
        const modalTitle = Utils.$('#modal-title');
        
        modalTitle.textContent = `${destination.name}, ${destination.country}`;
        
        // Build modal content
        modalContent.innerHTML = `
            <div class="modal-section">
                <img src="${destination.image}" alt="${destination.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius); margin-bottom: 1rem;">
                <p>${destination.description}</p>
            </div>
            
            ${destination.weather ? `
            <div class="modal-section">
                <h3><i class="fas fa-cloud-sun"></i> Current Weather</h3>
                <div class="weather-info">
                    <div class="weather-temp">
                        ${destination.weather.current_weather.temperature}°C
                    </div>
                    <div>
                        <div><strong>Condition:</strong> ${this.getWeatherCondition(destination.weather.current_weather.weathercode)}</div>
                        <div><strong>Wind:</strong> ${destination.weather.current_weather.windspeed} km/h</div>
                    </div>
                </div>
            </div>
            ` : ''}
            
            <div class="modal-section">
                <h3><i class="fas fa-passport"></i> Visa Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Visa Type</div>
                        <div>${destination.visa.type}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Duration</div>
                        <div>${destination.visa.duration}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Cost</div>
                        <div>${destination.visa.cost}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Requirements</div>
                        <div>${destination.visa.requirements}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-hotel"></i> Accommodation & Stay</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Budget</div>
                        <div>${destination.stay.budget}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Mid-range</div>
                        <div>${destination.stay.midrange}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Luxury</div>
                        <div>${destination.stay.luxury}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Best Areas</div>
                        <div>${destination.stay.bestAreas}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-shield-alt"></i> Safety & Security</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Safety Level</div>
                        <div>${destination.security.level}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Concerns</div>
                        <div>${destination.security.concerns}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Emergency Number</div>
                        <div>${destination.security.emergency}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Travel Advice</div>
                        <div>${destination.security.advice}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-map-marked-alt"></i> Top Attractions</h3>
                <ul class="attractions-list">
                    ${destination.attractions.map(attr => `
                        <li><i class="fas fa-map-pin"></i> ${attr}</li>
                    `).join('')}
                </ul>
            </div>
            
            ${destination.population ? `
            <div class="modal-section">
                <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
                <div class="info-grid">
                    ${destination.population ? `
                    <div class="info-item">
                        <div class="info-label">Population</div>
                        <div>${Utils.formatNumber(destination.population)}</div>
                    </div>
                    ` : ''}
                    ${destination.currency ? `
                    <div class="info-item">
                        <div class="info-label">Currency</div>
                        <div>${destination.currency}</div>
                    </div>
                    ` : ''}
                    ${destination.languages ? `
                    <div class="info-item">
                        <div class="info-label">Languages</div>
                        <div>${destination.languages.slice(0, 3).join(', ')}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}
        `;
        
        this.hideModalLoading();
        Utils.show(modalContent);
    }
    
    getWeatherCondition(weatherCode) {
        const conditions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers'
        };
        return conditions[weatherCode] || 'Unknown';
    }
    
    // UI state management
    showLoading() {
        this.isLoading = true;
        Utils.show(Utils.$('#loading'));
        Utils.hide(Utils.$('#error-message'));
    }
    
    hideLoading() {
        this.isLoading = false;
        Utils.hide(Utils.$('#loading'));
    }
    
    showError(message) {
        Utils.hide(Utils.$('#loading'));
        const errorEl = Utils.$('#error-message');
        errorEl.querySelector('h3').textContent = message;
        Utils.show(errorEl);
    }
    
    hideError() {
        Utils.hide(Utils.$('#error-message'));
    }
    
    showModalLoading() {
        Utils.show(Utils.$('#modal-loading'));
        Utils.hide(Utils.$('#modal-content'));
        Utils.show(Utils.$('#destination-modal'));
    }
    
    hideModalLoading() {
        Utils.hide(Utils.$('#modal-loading'));
    }
    
    showModalError(message) {
        this.hideModalLoading();
        Utils.$('#modal-content').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>${message}</h3>
                <button class="retry-button" onclick="app.retryModal()">Retry</button>
            </div>
        `;
        Utils.show(Utils.$('#modal-content'));
    }
    
    closeModal() {
        Utils.hide(Utils.$('#destination-modal'));
    }
    
    retryLoading() {
        this.loadDestinations();
    }
    
    retryModal() {
        const activeCard = Utils.$('.destination-card.active');
        if (activeCard) {
            const id = parseInt(activeCard.dataset.id);
            this.showDestinationDetails(id);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TouristSpotsApp();
});