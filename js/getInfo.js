function setFeatures(features) {
    this.features = features;
    console.log(this.features);
};
async function loadFeatures() {
    try {
//      const response = await fetch('./api/map.json');
        const response = await fetch('http://c92834bq.beget.tech/map.json',{
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            },
        });
        const data = await response.json();
        createCards(data.config?.userMap?.features);
    } catch (error) {
        console.error('Failed to load features:', error);
    }
};
function createCard(object) {
    console.warn(object);
    const card = document.createElement('div');
    card.className = 'tinder--card';
    //card.dataset.id = object.id;
    card.dataset.coordinates = [object.coordinates[1],object.coordinates[0]];

    const img = document.createElement('img');
    img.src = object.imageUrl || './img/default-image.png';
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