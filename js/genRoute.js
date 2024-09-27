'use strict';
function saveCoordinates(card) {
    var coordinates = card.getAttribute('data-coordinates');
    if (coordinates) {
      var savedCoordinates = localStorage.getItem('savedCoordinates');
      savedCoordinates = savedCoordinates ? JSON.parse(savedCoordinates) : [];
      savedCoordinates.push(coordinates);
      localStorage.setItem('savedCoordinates', JSON.stringify(savedCoordinates));
      console.log('Coordinates saved:', savedCoordinates);
    }
  }