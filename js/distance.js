'use strict';
function haversineDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const lat1 = toRad(coord1[0]);
    const lon1 = toRad(coord1[1]);
    const lat2 = toRad(coord2[0]);
    const lon2 = toRad(coord2[1]);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Returns the distance in kilometers
}

// Function to get coordinates from localStorage and return an array of distances between points
function calculateRouteDistances() {
    // Retrieve data from localStorage
    const savedCoordinates = JSON.parse(localStorage.getItem('savedCoordinates'));

    if (!savedCoordinates || savedCoordinates.length === 0) {
        console.error('No coordinates data in localStorage');
        return [];
    }

    // Convert strings to arrays of numbers
    const coordinates = savedCoordinates.map(coord => coord.split(',').map(Number));

    let distances = [];
    let way = 0;

    // Calculate the distance between each pair of adjacent points
    for (let i = 0; i < coordinates.length - 1; i++) {
        const distance = haversineDistance(coordinates[i], coordinates[i + 1]);
        distances.push(distance);
        way = distance + way;
        console.log(way);
    }

    return distances; // Returns an array of distances
}
