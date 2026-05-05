const body = document.querySelector('body');

// [-----  Desktop & Icons  -----]
// -- Desktop --
const desktop = document.querySelector('.desktop');

// -- Icons --
const icons = document.querySelector('#icons');
const iconList = icons.children;

// -- CheckBoxes --
const checkBoxes = document.querySelectorAll(".checkbox");

// -- Windows --
const windowList = document.querySelectorAll('.window');
const umail = document.querySelector('.umail');

// [-----  Monitor & Peripherals  -----]
const monitor = document.querySelector('.monitor');
const monitorPowerOnBtn = document.querySelector('.monitorPowerOnBtn');
const monitorPowerLight = document.querySelector('.monitorPowerLight');

// [----- MiniGame Stuff -----]

// -- Checkbox Minigame --
const miniGameCheckBoxContainer = document.querySelector('.checkboxGame .checkboxes');
const miniGameCheckBoxes = document.querySelectorAll('.checkboxGame .checkbox');

let checkBoxTimer = 30;

// -- Loading Bar Minigame --
const loadingGameContainer = document.querySelector('.loadingGame');

const john = {
    log(stuff) {console.log(`Hello, my name is John and ${stuff}`)},
    goat() {console.log("bahhh")},
}

const loadingBar = {
    element: document.querySelector(".loadingBar"),
    origin: document.querySelector(".loadingBar").getBoundingClientRect(),
    progress: document.querySelector(".loadingBar > .loadingProgress").getBoundingClientRect().width,
    rotation: 0,
    rotating: false,
    style: document.querySelector(".loadingBar").style,

}

john.log(`${loadingBar.progress} is the length of my insides`);

const loadingBarContainer = document.querySelector('.loadingBarContainer');
const loadingBarBody = document.querySelector('.loadingGame > .windowBody');


loadingBarBody.addEventListener('mousedown', (e) => {
    loadingBar.rotating = true;
    
    let origin = loadingBar.origin;
    document.addEventListener('mousemove', (f) => {
        if (loadingBar.rotating) {
            // a*a = b*b + c*c pythagori you fricken genius
            const x = f.x - origin.left
            const y = f.y - origin.top;
            // sub 10 to account for cursor position
            let degreesY = Math.asin(y / 400) * 180 - 10;


            // rotate the bar
            loadingBar.origin.width/2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
            loadingBar.origin.width/2 > x ? loadingBar.rotation = degreesY * -1 : loadingBar.rotation = degreesY;
            // loadingBar.rotation = degreesY;
        }
    });

});

// Changed mouseup target to the html body so you can still rotate when outside loading bar window
body.addEventListener('mouseup', (e) => {
    loadingBar.rotating = false;
});

loadingBarBody.addEventListener('mouseup', (e) => {
    loadingBar.rotating = false;
});

function loadingBarMiniGame() {
    const g = 9.8;
    let currentWidth = 0;

    john.log(loadingBar.rotation);
}

makeWindow('umail');
makeWindow('checkboxGame');
setInterval(checkBoxMiniGame, 500);
setInterval(loadingBarMiniGame, 1000);

makeWindow('loadingGame');

displayDesktop();

// Monitor button
monitorPowerOnBtn.addEventListener('click', async () => {
    monitorPowerLight.classList.contains('on') ? monitorPowerLight.classList.remove('on') : monitorPowerLight.classList.add('on');
});

monitorPowerOnBtn.addEventListener('mousedown', (e) => {
    e.target.classList.add("revBordered");
    e.target.classList.remove("bordered");
})

monitorPowerOnBtn.addEventListener('mouseup', (e) => {
    e.target.classList.add("bordered");
    e.target.classList.remove("revBordered");
})


// Checkbox listeners
for (const checkbox of checkBoxes) {
    checkbox.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
    })
}

// (Desktop and window) creation and listernrs
async function displayDesktop() {
    for (const icon of iconList) {
        await sleep(1000);
        icon.classList.remove('inactive');
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeWindow(window) {
    const win = document.querySelector(`.${window}`);
    const bar = document.querySelector(`#${window}Bar`);
    const close = document.querySelector(`#${window}Bar > .btnClose`);
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    close.addEventListener('click', () => {
        win.classList.add('hidden');
    });

    bar.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('btnClose')) return;
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        win.style.transition = 'none';
        bar.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        bar.style.cursor = 'grab';
    });
}


//Meeneegams
function checkBoxMiniGame() {
    const boxes = miniGameCheckBoxes;
    const checkedBoxes = [];
    const timerContainer = document.querySelector('#checkboxGameTimer');
    timerContainer.textContent = `${Math.floor(checkBoxTimer / 2)}`;
    checkBoxTimer--;
    for (const box of boxes) {
        if (box.classList.contains('checked')) checkedBoxes.push(box);
    }
    if (checkedBoxes.length >= boxes.length) {
        const info = document.querySelector('.checkboxGameInfo');
        const winInfo = document.querySelector('#checkboxGameWinInfo');

        winInfo.classList.remove('hidden');
        info.classList.add('hidden');

        return;
    }
    const randomIndex = Math.floor(Math.random() * checkedBoxes.length);
    checkBoxes[randomIndex].classList.remove('checked');
}


// //     let progress = Number(loadingProgress.style.width.match(/\d+/g));
// const rotationMult = ((loadingBarRotation - 1)/4)/100;

// const newProgress = (progress + (progress * rotationMult)).toFixed(0);

// console.log(`Progress: ${progress}\nRotation Multiplier:${rotationMult}\nNew Progress Value: ${newProgress}`);

// progress = `${newProgress}%`;