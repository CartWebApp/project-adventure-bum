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

let timer = 30;

// -- Loading Bar Minigame --
const loadingGameContainer = document.querySelector('.loadingGame');
const loadingBar = document.querySelector(".loadingBar");
let rotating = false;

// im bored of trying this rn.  If you wanna look at it thats cool.  Might return later
loadingBar.addEventListener('mousedown', (e) => {
    rotating = true;
    const line = document.createElement('div');
    let l = line.style;
    l.position = 'absolute';
    l.width = '1px';
    l.height = '10px';
    l.background = 'red';
    l.left = `50%`;
    l.top = `calc(50% - 5px`;
    loadingBar.append(line);

    let origin = line.getBoundingClientRect();
    document.addEventListener('mousemove', (f) => {
        if (rotating) {
            // a*a = b*b + c*c
            x = f.x - origin.left
            y = f.y - origin.top;
            let pothag = Math.sqrt(x*x + y*y)
            l.width = `${pothag}px`;
            let degrees = Math.asin(y / 25) * 180;

            console.log(y, degrees);

            l.transform = `rotate(${degrees}deg)`;
        }
    })

})

loadingBar.addEventListener('mouseleave', (e) => {
    rotating = false;
})

loadingBar.addEventListener('mouseup', (e) => {
    rotating = false;
})

makeWindow('umail');
makeWindow('checkboxGame');
setInterval(checkBoxMiniGame, 500);

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
    timerContainer.textContent = `${Math.floor(timer / 2)}`;
    timer--;
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