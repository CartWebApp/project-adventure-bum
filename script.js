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

// John...

const john = {
    log(stuff) { console.log(`Hello, my name is John and ${stuff}`) },
    goat() { console.log("bahhh") },
}

const jake = {
    log(stuff) { console.log(stuff) }
}

const jordan = {
    log(stuff) { console.log(stuff) }
}

// [----- MiniGame Stuff -----]

// -- Checkbox Minigame --
const miniGameCheckBoxContainer = document.querySelector('.checkboxGame .checkboxes');
const miniGameCheckBoxes = document.querySelectorAll('.checkboxGame .checkbox');

let checkBoxTimer = 30;




makeWindow('umail');
makeWindow('checkboxGame');
makeWindow('spamGame');
makeWindow('supplyGame');
setInterval(checkBoxMiniGame, 500);


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


// [----- MiniGame FUNctions -----]

// -- Supply Minigame --
const supplyGameBody = document.querySelector(".supplyGame > .windowBody");
const supplyTexts = document.querySelectorAll(".supplyGame p")
jake.log(supplyTexts);

function jaker() {
    for (const p of supplyTexts) {
        p.textContent = `${Math.floor(Math.random() * 250) + 1}`;
        jake.log(p.textContent);
    }
}

jaker();

// -- Loading Bar Minigame --
const loadingGameContainer = document.querySelector('.loadingGame');

const loadingBar = {
    element: document.querySelector(".loadingBar"),
    textEl: document.querySelector(".loadingText"),
    origin: document.querySelector(".loadingBar").getBoundingClientRect(),
    progress: document.querySelector(".loadingBar > .loadingProgress").getBoundingClientRect().width,
    progressEl: document.querySelector('.loadingBar > .loadingProgress'),
    width: 0,
    rotation: 0,
    rotating: false,
    style: document.querySelector(".loadingBar").style,

}

const loadingBarContainer = document.querySelector('.loadingBarContainer');
const loadingBarBody = document.querySelector('.loadingGame > .windowBody');



loadingBarBody.addEventListener('mousedown', (e) => {
    rotating = true;

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

                // console.log(`Sin Angle: ${degreesY}\n Cos Angle: ${degreesX}`);



                loadingBarBody.getBoundingClientRect().width / 2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
                loadingBar.rotation = degreesY;


                // rotate the bar
                loadingBar.origin.width / 2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
                loadingBar.origin.width / 2 > x ? loadingBar.rotation = degreesY * -1 : loadingBar.rotation = degreesY;
                // loadingBar.rotation = degreesY;
            }
        });
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
    const mult = .25
    loadingBar.width += (loadingBar.rotation * mult) + 0.025;
    // Ensures limits on the bar
    if (loadingBar.width < 0) {
        loadingBar.width = 0;
    } else if (loadingBar.width > 100) {
        loadingBar.width = 100;
    }
    else if (!loadingBar.width) {
        loadingBar.width = 0;
    }

    // Styles Bar to the new width
    loadingBar.progressEl.style.width = `${loadingBar.width}%`;
    // Changes text to current percentage
    loadingBar.textEl.textContent = `${Math.floor(loadingBar.width)}%`;

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

// Spam game !!!

const emailWindow = document.querySelector('.spamGame');
const emailTypingArea = document.querySelector('.emailTypingArea');
const charCounter = document.querySelector('.characterCount');
const emailSendBtn = document.querySelector('.sendEmailBtn');
const sendPage = document.querySelector('.sendPage');
const sentPage = document.querySelector('.sentPage');
const sentEmail = document.querySelector('.sentEmailText');
const recievedEmailText = document.querySelector('.emailText');
const emailTimer = document.querySelector('.emailTimer');
const emailFailed = document.querySelector('.emailFailed');
let emailComplete = false;

const emailOptions = [
    'But government feel world... That person take week! Like child give company!',
    'After Ta\'rique Dunte Dixon go hand. Until week get group! Nor Ta\'rique Dunte Dixon use man... When man see Ta\'rique Dunte Dixon... Than world say place?',
    'Like hand come week! While problem feel world?',
    'Because day make group... As child work way... If eye look Jake Faridoni. Except week try point?',
    'Because week seem thing... And work see world. Since government try fact. Where child ask part...',
    'Or person say woman? Or world take way? Whether man want thing? While thing think part.',
    'Or child tell world. Before part look world...',
    'Whether hand leave week... Since hand make Jake Faridoni. If work give Ta\'rique Dunte Dixon. And eye want man...',
    'Whether group want group. Unless problem see part? Once world leave point...',
    'That place want child? If time take life. And problem know time!',
]

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

emailMinigame(20, 50, 15);

async function emailMinigame(minChar = 20, maxChar = 50, seconds) {
    let chars = random(minChar, maxChar);
    emailTimer.textContent = `${seconds}s`;

    recievedEmailText.textContent = `${emailOptions[random(0, emailOptions.length - 1)]} Bum.`;
    let charCount = 0;

    setInterval(async () => {
        seconds--;
        emailTimer.textContent = `${seconds}s`;
        if(seconds <= 10) {
            emailTimer.style.color = 'red';
        }
        if(seconds === 0 && !emailComplete) {
            sendPage.classList.add('hidden');
            emailFailed.classList.remove('hidden');
            await sleep(3000);
            emailWindow.classList.add('hidden');
        }
    }, 1000);

    emailWindow.classList.remove('hidden');
    charCounter.textContent = `0 / ${chars}`;

    emailTypingArea.addEventListener('input', () => {
        charCount = emailTypingArea.value.length;
    
        if(charCount < chars) charCounter.style.color = 'red';
        else charCounter.style.color = 'green';

        charCounter.textContent = `${charCount} / ${chars}`;
    });

    const send = new Event('sendEmail');

    emailTypingArea.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        emailSendBtn.dispatchEvent(send); 
    });

    emailSendBtn.addEventListener('click', () => {
        emailSendBtn.dispatchEvent(send);
    });

    emailSendBtn.addEventListener('sendEmail', async () => {
        if(charCount < chars) {
            charCounter.classList.add('invalid');
            await sleep(500);
            charCounter.classList.remove('invalid');
            return;
        }
        let points = random(0, 300) + random(0, 50) + random(0, 25) + random(0, 5);
        points += Math.floor((points * Math.floor(seconds % random(1, 1000))) / 100);

        sendPage.classList.add('hidden');
        sentPage.classList.remove('hidden');

        document.querySelector('.sentPage .points').textContent += `+ ${points}pts`;
        emailComplete = true;

        await sleep(3000);
        emailWindow.classList.add('hidden');
    })



}



function mainLoop() {
    loadingBarMiniGame();
}


setInterval(mainLoop, 100);