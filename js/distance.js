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

function drawWay(distances) {
    const lineContainer = document.getElementById('lineContainer');
    const lineContainerWidth = lineContainer.offsetWidth;
    const totalDistance = distances.reduce((sum, dist) => sum + dist, 0);
    const pixelsPerKm = lineContainerWidth / totalDistance;
    let cumulativeDistance = 0;
    while (lineContainer.firstChild) {
        lineContainer.removeChild(lineContainer.lastChild);
    }
    
    distances.forEach((distance, index) => {
        cumulativeDistance += distance;
        const positionInPixels = cumulativeDistance * pixelsPerKm;
        const point = document.createElement('div');
        point.classList.add('point');
        point.style.left = positionInPixels + 'px';
        lineContainer.appendChild(point);
    });
}

// Function to get coordinates from localStorage and return an array of distances between points
function calculateRouteDistances() {
    const savedCoordinates = JSON.parse(localStorage.getItem('savedCoordinates'));
    if (!savedCoordinates || savedCoordinates.length === 0) {
        console.error('No coordinates data in localStorage');
        return [];
    }
    const coordinates = savedCoordinates.map(coord => coord.split(',').map(Number));
    let distances = [];
    let way = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
        const distance = haversineDistance(coordinates[i], coordinates[i + 1]);
        distances.push(distance);
        way = distance + way;
        console.log(way);
    }
    drawWay(distances);
}
