function setFeatures(features) {
    this.features = features;
    console.log(this.features);
};
async function loadFeatures() {
    try {
        const response = await fetch('./api/map.json');
        const data = await response.json();
        //this.setFeatures(data.config?.userMap?.features);
        createCards(data.config?.userMap?.features);
    } catch (error) {
        console.error('Failed to load features:', error);
    }
};
function createCard(object) {
    const card = document.createElement('div');
    card.className = 'tinder--card';
    //card.dataset.id = object.id;
    card.dataset.coordinates = [object.coordinates[1],object.coordinates[0]];

    const img = document.createElement('img');
    img.src = object.imageUrl || './img/default-image.png';  // Use a default image if none is provided
    card.appendChild(img);

    const title = document.createElement('h4');
    title.textContent = object.title || 'Untitled';
    card.appendChild(title);

    const content = document.createElement('p');
    content.textContent = object.content.text || 'No description available';
    card.appendChild(content);

    return card;
}
function createCards(objects) {
    const container = document.getElementById('cards-container');
    objects.forEach(object => {
        const card = createCard(object);
        container.appendChild(card);
    });
    drawAfter();  
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadFeatures();
});