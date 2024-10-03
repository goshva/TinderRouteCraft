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
function convertToYandexMapsLink(coordinates) {
  const baseUrl = "https://yandex.ru/maps/11062/kislovodsk/?ll=42.714506%2C43.896928&mode=routes&rtt=bc&ruri=~~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0MTQwMTc4MzU2EmnQoNC-0YHRgdC40Y8sINCh0YLQsNCy0YDQvtC_0L7Qu9GM0YHQutC40Lkg0LrRgNCw0LksINCa0LjRgdC70L7QstC-0LTRgdC6LCDRg9C70LjRhtCwINCa0LDRgtGL0YXQuNC90LAsIDIiCg1L2CpCFZSTL0I%2C&z=15.55";

  // Преобразуем координаты
  const rtextParam = coordinates.map(coord => {
      const [lat, lon] = coord.split(",");
      return `${lat}%2C${lon}`;
  }).join("~");

  // Формируем финальный URL
  const finalUrl = `${baseUrl}&rtext=${rtextParam}`;
  console.log(finalUrl);

  return finalUrl;
}


function genRoute() {
  // Массив координат точек
  const points = JSON.parse(localStorage.getItem('savedCoordinates'));
  function calculateDistance(point1, point2) {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    const R = 6371; // Радиус Земли в км

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Расстояние в километрах
    return distance;
  }

  // Жадный алгоритм для решения TSP
  function greedyTSP(points) {
    const visited = new Array(points.length).fill(false);
    const path = [];
    let currentPointIndex = 0;

    path.push(currentPointIndex); // Начинаем с первой точки
    visited[currentPointIndex] = true;

    while (path.length < points.length) {
      let nearestNeighbor = null;
      let nearestDistance = Infinity;

      for (let i = 0; i < points.length; i++) {
        if (!visited[i]) {
          const distance = calculateDistance(points[currentPointIndex], points[i]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestNeighbor = i;
          }
        }
      }

      visited[nearestNeighbor] = true;
      path.push(nearestNeighbor);
      currentPointIndex = nearestNeighbor;
    }

    // Возвращаемся в начальную точку
    //path.push(0);

    return path;
  }

  // Запускаем алгоритм и выводим результат
  const tspPath = greedyTSP(points);

  // Выводим индексы точек в порядке обхода
  console.log("Order of visiting points (indices):", tspPath);

  // Выводим координаты точек в порядке обхода
  const pathCoordinates = tspPath.map(index => points[index]);
  window.location.href = convertToYandexMapsLink(pathCoordinates);

}
