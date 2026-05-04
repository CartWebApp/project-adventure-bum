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
const loadingBar = document.querySelector(".loadingBar");

let loadingBarRotation = 0;

const loadingBarContainer = document.querySelector('.loadingBarContainer');
const loadingBarBody = document.querySelector('.loadingGame > .windowBody');
const loadingProgress = document.querySelector('.loadingProgress');

loadingProgress.style.width = '55%';

let rotating = false;

// im bored of trying this rn.  If you wanna look at it thats cool.  Might return later

// Looked at it, I changed a little bit but left everything in comments.

// Changed the event listener to the window body for better rotation
loadingBarBody.addEventListener('mousedown', (e) => {
    rotating = true;

    // Below this line is the rotation visualizer stuff; since it's not being used I also commented out the width calculation
    // ---------------------------------------------
    // const line = document.createElement('div');
    // let l = line.style;
    // l.position = 'absolute';
    // l.width = '1px';
    // l.height = '4px';
    // l.background = 'blue';
    // l.left = `50%`;
    // l.top = `calc(50% - 2px)`;
    // loadingBar.append(line);

    
    let origin = loadingBar.getBoundingClientRect();
    document.addEventListener('mousemove', (f) => {
        if (rotating) {
            // a*a = b*b + c*c
            const x = f.x - origin.left
            const y = f.y - origin.top;
            let pothag = Math.sqrt(x*x + y*y);
            // l.width = `calc(${pothag}px + 5px)`;
            // sub 10 to account for cursor position
            let degreesY = Math.asin(y / 400) * 180 - 10;
            let degreesX = Math.acos(x / 400) * 180 - 10;

            // console.log(`Sin Angle: ${degreesY}\n Cos Angle: ${degreesX}`);

            // rotate the bar
            // l.transform = `rotate(${degrees}deg)`;

            loadingBarBody.getBoundingClientRect().width/2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
            loadingBarRotation = degreesY;
        }
    });

});

// Changed mouseup target to the html body so you can still rotate when outside loading bar window
body.addEventListener('mouseup', (e) => {
    rotating = false;
});

loadingBarBody.addEventListener('mouseup', (e) => {
    rotating = false;
});

function loadingBarMiniGame() {
    let progress = Number(loadingProgress.style.width.match(/\d+/g));
    const rotationMult = ((loadingBarRotation - 1)/4)/100;

    const newProgress = (progress + (progress * rotationMult)).toFixed(0);

    console.log(`Progress: ${progress}\nRotation Multiplier:${rotationMult}\nNew Progress Value: ${newProgress}`);

    progress = `${newProgress}%`;
}

makeWindow('umail');
makeWindow('checkboxGame');
setInterval(checkBoxMiniGame, 500);
setInterval(loadingBarMiniGame, 1000);

makeWindow('loadingGame');

displayDesktop();
makeIcons();

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

for (const checkbox of checkBoxes) {
    checkbox.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
    })
}


async function displayDesktop() {
    for (const icon of iconList) {
        await sleep(1000);
        icon.classList.remove('inactive');
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeIcons() {
    console.log();
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