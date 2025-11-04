// API configuration and functions
const API = {
    // API endpoints (using free/public APIs)
    endpoints: {
        countries: 'https://restcountries.com/v3.1/all',
        weather: 'https://api.open-meteo.com/v1/forecast',
        currency: 'https://api.exchangerate.host/latest',
        // Fallback data for when APIs are unavailable
        fallback: './data/fallback-data.js'
    },
    
    // API keys (in a real app, these would be environment variables)
    keys: {
        // For production, use environment variables
        // weather: process.env.WEATHER_API_KEY,
        // currency: process.env.CURRENCY_API_KEY
    },
    
    // Cache configuration
    cache: {
        duration: 15 * 60 * 1000, // 15 minutes
        get(key) {
            const cached = Utils.getStorage(`api_cache_${key}`);
            if (cached && Date.now() - cached.timestamp < API.cache.duration) {
                return cached.data;
            }
            return null;
        },
        set(key, data) {
            Utils.setStorage(`api_cache_${key}`, {
                data,
                timestamp: Date.now()
            });
        }
    },
    
    // Country data API
    async getCountries() {
        const cacheKey = 'countries';
        const cached = API.cache.get(cacheKey);
        if (cached) return cached;
        
        try {
            const response = await fetch(API.endpoints.countries);
            const data = await Utils.handleApiResponse(response);
            API.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.warn('Countries API failed, using fallback data');
            return this.getFallbackData('countries');
        }
    },
    
    // Weather API
    async getWeather(lat, lon) {
        const cacheKey = `weather_${lat}_${lon}`;
        const cached = API.cache.get(cacheKey);
        if (cached) return cached;
        
        try {
            const response = await fetch(
                `${API.endpoints.weather}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
            );
            const data = await Utils.handleApiResponse(response);
            API.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.warn('Weather API failed');
            return null;
        }
    },
    
    // Currency conversion API
    async getExchangeRate(baseCurrency = 'USD') {
        const cacheKey = `exchange_${baseCurrency}`;
        const cached = API.cache.get(cacheKey);
        if (cached) return cached;
        
        try {
            const response = await fetch(`${API.endpoints.currency}?base=${baseCurrency}`);
            const data = await Utils.handleApiResponse(response);
            API.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.warn('Currency API failed');
            return null;
        }
    },
    
    // Get destination data (combines multiple APIs)
    async getDestinations() {
        try {
            // In a real application, this would be your own API endpoint
            // For now, we'll use fallback data enhanced with real API data
            const fallbackData = await this.getFallbackData('destinations');
            const countries = await this.getCountries();
            
            // Enhance fallback data with real country information
            const enhancedData = fallbackData.map(destination => {
                const country = countries.find(c => 
                    c.name.common.toLowerCase().includes(destination.country.toLowerCase()) ||
                    destination.country.toLowerCase().includes(c.name.common.toLowerCase())
                );
                
                if (country) {
                    return {
                        ...destination,
                        countryCode: country.cca2,
                        currency: Object.keys(country.currencies || {})[0],
                        languages: Object.values(country.languages || {}),
                        population: country.population,
                        coordinates: country.latlng
                    };
                }
                
                return destination;
            });
            
            return enhancedData;
        } catch (error) {
            console.error('Error getting destinations:', error);
            return this.getFallbackData('destinations');
        }
    },
    
    // Get detailed destination information
    async getDestinationDetails(destinationId) {
        const destinations = await this.getDestinations();
        const destination = destinations.find(d => d.id === destinationId);
        
        if (!destination) {
            throw new Error('Destination not found');
        }
        
        // Enhance with additional API data
        let weather = null;
        let exchangeRates = null;
        
        if (destination.coordinates) {
            weather = await this.getWeather(
                destination.coordinates[0],
                destination.coordinates[1]
            );
        }
        
        if (destination.currency) {
            exchangeRates = await this.getExchangeRate(destination.currency);
        }
        
        return {
            ...destination,
            weather,
            exchangeRates
        };
    },
    
    // Fallback data when APIs fail
    async getFallbackData(type) {
        try {
            // This would load from a local JSON file
            // For now, we'll return static data
            return FallbackData[type] || [];
        } catch (error) {
            console.error('Error loading fallback data:', error);
            return [];
        }
    },
    
    // Search destinations
    async searchDestinations(query, filter = 'all') {
        const destinations = await this.getDestinations();
        
        return destinations.filter(destination => {
            const matchesSearch = !query || 
                destination.name.toLowerCase().includes(query.toLowerCase()) ||
                destination.country.toLowerCase().includes(query.toLowerCase()) ||
                destination.description.toLowerCase().includes(query.toLowerCase()) ||
                destination.attractions.some(attr => 
                    attr.toLowerCase().includes(query.toLowerCase())
                );
            
            const matchesFilter = filter === 'all' || destination.region === filter;
            
            return matchesSearch && matchesFilter;
        });
    }
};

// Fallback data (in a real app, this would be in a separate file)
const FallbackData = {
    destinations: [
        {
            id: 1,
            name: "Paris",
            country: "France",
            region: "europe",
            description: "The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower and Louvre Museum.",
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [48.8566, 2.3522],
            visa: {
                type: "Schengen Visa",
                duration: "Up to 90 days",
                cost: "€80",
                requirements: "Valid passport, proof of accommodation, travel insurance, return ticket"
            },
            stay: {
                budget: "$50-100/night",
                midrange: "$100-250/night",
                luxury: "$250+/night",
                bestAreas: "Le Marais, Saint-Germain-des-Prés, Montmartre",
                averageCost: 120
            },
            security: {
                level: "Generally Safe",
                concerns: "Pickpocketing in tourist areas",
                emergency: "112 (EU emergency number)",
                advice: "Be vigilant in crowded areas and on public transport"
            },
            attractions: [
                "Eiffel Tower",
                "Louvre Museum",
                "Notre-Dame Cathedral",
                "Champs-Élysées",
                "Montmartre",
                "Arc de Triomphe",
                "Seine River Cruise"
            ]
        },
        // ... more destinations (same as previous example)
    ],
    countries: []
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}