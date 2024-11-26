# Project: Excursion Planner with "Tinder-like" Approach and Route Length Calculation

This project is an interactive excursion planning tool that uses a "Tinder-style" swipe approach to select locations of interest. The route is dynamically calculated based on user selections, factoring in route length and efficiency. The application is designed to provide a seamless and engaging way to explore predefined locations or custom maps.

---

## Features

1. **Swipe-to-Choose**:  
   Users can swipe through a set of location cards to select their preferred stops for the excursion.

2. **Dynamic Route Calculation**:  
   The application calculates the most efficient route between the selected locations, optimizing the total travel distance.

3. **Predefined Map Data**:  
   Includes a set of sample coordinates for location cards available in JSON format:  
   [Map Coordinates JSON](http://c92834bq.beget.tech/map.json)

4. **Custom Maps**:  
   Users can upload their own map data in JSON format and define custom names for their uploaded maps:  
   [Upload Custom Map](http://c92834bq.beget.tech)

5. **Map Icons**:  
   Displays various points of interest on the map with visually distinct icons. Sample icons can be explored on [Yandex Maps](https://yandex.ru/maps/?ll=42.718741%2C0.001188&mode=usermaps&source=constructorLink&um=constructor%3A95893e57fd953d5a13812a39aaca58cb4aaaf64fc244664d2f9f249f2e923590&z=17).

---

## Technologies Used

- **Frontend**: Vue.js with swipe components for a Tinder-like interface and calculating routes.
- **Backend**: php for store new points JSON from yandex map constructor.
- **Routing Algorithm**: Haversine formula for distance calculations.

---

## How It Works

1. **Load Map Data**:  
   - By default, the app uses a predefined JSON file with sample coordinates.
   - Users can upload their custom JSON map data.

2. **Swipe to Select Locations**:  
   - Swipe cards to choose which locations you want to include in the excursion.

3. **Calculate Route**:  
   - After finalizing the selection, the app calculates the shortest route based on the chosen locations.
   - The route length and estimated travel time are displayed to the user.

4. **Redirect to Visualize Route**:  
   - The map dynamically updates to highlight the chosen route and stops.

---

## JSON File Format

### Example Structure for Location Data:

```json
[
  {
    "id": 1,
    "name": "Location 1",
    "latitude": 42.718741,
    "longitude": 0.001188,
    "description": "A brief description of the location."
  },
  {
    "id": 2,
    "name": "Location 2",
    "latitude": 42.718900,
    "longitude": 0.001500,
    "description": "Another interesting spot."
  }
]
```

---

## Installation

1. **Clone Repository**:
   ```bash
   git clone git@github.com:goshva/TinderRouteCraft.git
   cd TinderRouteCraft
   ```

2. **Install Dependencies**:
   Run Live serer VS code Extention

---

## Custom Map Upload Instructions

1. Go to the [Upload Custom Map](http://c92834bq.beget.tech).
2. Pste URL from public link to yamap (not for constructor)  and assign a unique name for your map points data json.
3. If link is public  you get  url for  you points? and can use it in frontend application

---

## Future Improvements

- Add upoloading image  for points and show nearest one in card
- User profile and saved routes functionality.
- Integration with popular navigation apps for real-time directions.
- Multi-language support for global usability.

---

## Contributions

Feel free to contribute to the project by submitting issues or pull requests on the [GitHub repository](https://github.com/your-username/excursion-planner).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
