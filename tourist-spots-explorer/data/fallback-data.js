// Fallback data for when APIs are unavailable
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
        {
            id: 2,
            name: "Tokyo",
            country: "Japan",
            region: "asia",
            description: "A bustling metropolis blending ultramodern and traditional elements. From neon-lit skyscrapers to historic temples.",
            image: "https://images.unsplash.com/photo-1540959733332-0d2b0ca8b321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [35.6762, 139.6503],
            visa: {
                type: "Tourist Visa",
                duration: "Up to 90 days",
                cost: "Free for many nationalities",
                requirements: "Valid passport, return ticket, proof of funds"
            },
            stay: {
                budget: "$40-80/night",
                midrange: "$80-200/night",
                luxury: "$200+/night",
                bestAreas: "Shinjuku, Shibuya, Ginza, Asakusa",
                averageCost: 100
            },
            security: {
                level: "Very Safe",
                concerns: "Low crime rate, natural disasters",
                emergency: "110 (Police), 119 (Ambulance/Fire)",
                advice: "One of the safest major cities in the world"
            },
            attractions: [
                "Senso-ji Temple",
                "Tokyo Skytree",
                "Shibuya Crossing",
                "Meiji Shrine",
                "Tsukiji Outer Market",
                "Imperial Palace",
                "Harajuku District"
            ]
        },
        {
            id: 3,
            name: "New York City",
            country: "United States",
            region: "north-america",
            description: "The city that never sleeps, famous for its iconic skyline, cultural diversity, and endless entertainment options.",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [40.7128, -74.0060],
            visa: {
                type: "ESTA or B-2 Tourist Visa",
                duration: "Up to 90 days (ESTA) or 6 months (B-2)",
                cost: "$14 (ESTA) or $160 (B-2)",
                requirements: "Valid passport, ESTA authorization or visa, proof of funds"
            },
            stay: {
                budget: "$80-150/night",
                midrange: "$150-300/night",
                luxury: "$300+/night",
                bestAreas: "Manhattan, Brooklyn, Queens",
                averageCost: 200
            },
            security: {
                level: "Generally Safe",
                concerns: "Petty crime in tourist areas",
                emergency: "911",
                advice: "Be aware of your surroundings, especially at night"
            },
            attractions: [
                "Statue of Liberty",
                "Central Park",
                "Times Square",
                "Empire State Building",
                "Brooklyn Bridge",
                "Metropolitan Museum of Art",
                "Broadway Shows"
            ]
        },
        {
            id: 4,
            name: "Sydney",
            country: "Australia",
            region: "oceania",
            description: "A vibrant harbor city known for its iconic Opera House, Harbour Bridge, and beautiful beaches.",
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [-33.8688, 151.2093],
            visa: {
                type: "eVisitor or ETA",
                duration: "Up to 3 months",
                cost: "Free (eVisitor) or $20 (ETA)",
                requirements: "Valid passport, visa authorization, proof of funds"
            },
            stay: {
                budget: "$60-120/night",
                midrange: "$120-250/night",
                luxury: "$250+/night",
                bestAreas: "CBD, Darling Harbour, Bondi Beach",
                averageCost: 150
            },
            security: {
                level: "Very Safe",
                concerns: "Sun protection, ocean safety",
                emergency: "000",
                advice: "Use sunscreen and swim between flags at beaches"
            },
            attractions: [
                "Sydney Opera House",
                "Sydney Harbour Bridge",
                "Bondi Beach",
                "Royal Botanic Garden",
                "Taronga Zoo",
                "The Rocks",
                "Blue Mountains"
            ]
        },
        {
            id: 5,
            name: "Cape Town",
            country: "South Africa",
            region: "africa",
            description: "A coastal city with stunning natural landscapes, diverse cultures, and rich history at the southern tip of Africa.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [-33.9249, 18.4241],
            visa: {
                type: "Tourist Visa",
                duration: "Up to 90 days",
                cost: "Varies by nationality",
                requirements: "Valid passport, return ticket, proof of funds"
            },
            stay: {
                budget: "$30-70/night",
                midrange: "$70-150/night",
                luxury: "$150+/night",
                bestAreas: "Waterfront, City Bowl, Camps Bay",
                averageCost: 80
            },
            security: {
                level: "Exercise Caution",
                concerns: "Petty crime, avoid certain areas at night",
                emergency: "10111 (Police), 10177 (Ambulance)",
                advice: "Don't display valuables, use registered taxis"
            },
            attractions: [
                "Table Mountain",
                "Robben Island",
                "Cape of Good Hope",
                "Kirstenbosch Gardens",
                "Boulders Beach Penguin Colony",
                "V&A Waterfront",
                "Chapman's Peak Drive"
            ]
        },
        {
            id: 6,
            name: "Rio de Janeiro",
            country: "Brazil",
            region: "south-america",
            description: "A vibrant city known for its Carnival, samba, breathtaking landscapes, and iconic Christ the Redeemer statue.",
            image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            coordinates: [-22.9068, -43.1729],
            visa: {
                type: "Tourist Visa",
                duration: "Up to 90 days",
                cost: "Varies by nationality",
                requirements: "Valid passport, return ticket, proof of funds"
            },
            stay: {
                budget: "$30-70/night",
                midrange: "$70-150/night",
                luxury: "$150+/night",
                bestAreas: "Copacabana, Ipanema, Santa Teresa",
                averageCost: 70
            },
            security: {
                level: "Exercise Caution",
                concerns: "Petty crime, avoid certain favelas",
                emergency: "190 (Police), 192 (Ambulance)",
                advice: "Don't wear flashy jewelry, use hotel safes"
            },
            attractions: [
                "Christ the Redeemer",
                "Sugarloaf Mountain",
                "Copacabana Beach",
                "Ipanema Beach",
                "Tijuca National Park",
                "Selarón Steps",
                "Maracanã Stadium"
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FallbackData;
}