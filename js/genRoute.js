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
function redirectYandexRoute() {
  // Redirect to yandex route 
  // https://yandex.ru/maps/11062/kislovodsk/?ll=42.714506%2C43.896928&mode=routes&rtext=43.897347%2C42.711667~43.895456%2C42.714317~43.894118%2C42.711227&rtt=bc&ruri=~~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0MTQwMTc4MzU2EmnQoNC-0YHRgdC40Y8sINCh0YLQsNCy0YDQvtC_0L7Qu9GM0YHQutC40Lkg0LrRgNCw0LksINCa0LjRgdC70L7QstC-0LTRgdC6LCDRg9C70LjRhtCwINCa0LDRgtGL0YXQuNC90LAsIDIiCg1L2CpCFZSTL0I%2C&z=15.55
  var savedCoordinates = localStorage.getItem('savedCoordinates');
  if (savedCoordinates) {
    var coordinates = JSON.parse(savedCoordinates);
    if (coordinates.length >= 2) {
      var url = 'https://yandex.ru/maps/?pt=' + coordinates[0] + ',' + coordinates[1] + '&z=18&l=map';
      window.location.replace(url);
    }
  }
}