//Defining our arrays
const imageslevel0 = [
    {image: 'images/level0.png', weight: 1},
    {image: 'images/door.png', weight: 30},
    {image: 'images/arrows.png', weight: 10},
    {image: 'images/dark 1.png', weight: 10},
    {image: 'images/iconic.png', weight: 10},
    {image: 'images/view.png', weight: 10},
    {image: 'images/THEimage.png', weight: 10},
    {image: 'images/vhs.png', weight: 10},
    {image: 'images/hall 1.png', weight: 10},
    {image: 'images/chairs.png', weight: 10},
    {image: 'images/noshelves.png', weight: 10}
];

const imageslevel1 = [//make sure to add all the other coords for arrrows.
    {image: 'images/parkingarage.png', weight: 10, arrows: [{top: '20%', left: '30%'}, {top: '60%', right: '10%'}, {top: '15%', right: '5%'}, {bottom: '10%', left: '50%'}]},
    {image: 'images/flickering.png', weight: 10},
    {image: 'images/idkitslevel1.png', weight: 10},
    {image: 'images/image 67.png', weight: 10},
    {image: 'images/rako games 1.png', weight: 10},
    {image: 'images/whichway.png', weight: 10}
];

const imageslevel5 = [
{image: 'images/thehotel.png', weight: 10},
{image: 'images/redcarpet.png', weight: 10},
{image: 'images/checkin.png', weight: 10},
{image: 'images/Level-5-Ballroom 1.png', weight: 10},
{image: 'images/levl5shall.jpg', weight: 10},
{image: 'images/mainhall.png', weight: 10},
]

const imageslevel37 = [
    {image: 'images/poolhall.png', weight: 10},
    {image: 'images/pools 1.png', weight: 10},
    {image: 'images/stairs.png', weight: 10},
    {image: 'images/winding.png', weight: 10},
    {image: 'images/courtyard.png', weight: 10}
];

const imageslevel94 = [
    {image: 'images/house clear view.png', weight: 10},
    {image: 'images/insidehouse(1).png', weight: 10},
    {image: 'images/stop.png', weight: 10},
    {image: 'images/brokeninside.png', weight: 10},
    {image: 'images/nooutlet.png', weight: 10},
    {image: 'images/stop.png', weight: 10}
];


const imageslevellimbo = [
    {image: 'images/youcheated.png', weight: 10},
    {image: 'images/limbostair.jpg', weight: 10}
];

//all documents used
const imageArrays = {
    'Level 0': imageslevel0,
    'Level 1': imageslevel1,
    'level 5': imageslevel5,
    'Level 37': imageslevel37,
    'Level 94': imageslevel94,
    'limbo': imageslevellimbo
};

let lastImage = null;

function weightedRandom(items) {
    if (!items || items.length === 0) return null;

// Filter to avoid immediate image reapeats
    let availableItems = items.length > 1 
        ? items.filter(item => item.image !== lastImage) 
        : items;

    const totalWeight = availableItems.reduce((sum, item) => sum + (item.weight || 10), 0);
    let random = Math.random() * totalWeight;
    
    for (const item of availableItems) {
        random -= (item.weight || 10);
        if (random <= 0) return item;
    }
    return availableItems[0];
}

function repositionArrows(imageData) {
    const arrows = document.querySelectorAll('.arrow');
    
    if (!imageData || !imageData.arrows) {
        console.warn('No arrow positions defined for this image');
        return;
    }

    arrows.forEach((arrow, index) => {
        if (index < imageData.arrows.length) {
            const position = imageData.arrows[index];
            
            // Clear all position properties first
            arrow.style.top = 'auto';
            arrow.style.bottom = 'auto';
            arrow.style.left = 'auto';
            arrow.style.right = 'auto';
            
            // Apply the stored positions
            if (position.top) arrow.style.top = position.top;
            if (position.bottom) arrow.style.bottom = position.bottom;
            if (position.left) arrow.style.left = position.left;
            if (position.right) arrow.style.right = position.right;
        }
    });
}

function changeImage() {
    const levelName = document.title.trim(); // (Level 1)
    const currentPool = imageArrays[levelName];

    if (!currentPool) {
        console.error("Could not find image pool for:", levelName);
        return;
    }

    const selected = weightedRandom(currentPool);
    const imgElement = document.getElementById('roomImage');

    if (imgElement && selected) {
        lastImage = selected.image;
        imgElement.src = selected.image;
        repositionArrows(selected); // Pass the selected image data with arrow positions

// protopyte Level exit logic (only works for level 0 door at the moment)
        if (selected.image === 'images/door.png') {
            imgElement.style.cursor = 'pointer';
            imgElement.onclick = (arrow) => window.location.href = 'level1.html';
        } else {
            imgElement.style.cursor = 'default';
            imgElement.onclick = null; 
        }
    }
}

// Ensuring the function is available globally for the HTML onclick
window.changeImage = changeImage;

document.addEventListener('DOMContentLoaded', () => {
    changeImage();
});

function playoption () {
    
}