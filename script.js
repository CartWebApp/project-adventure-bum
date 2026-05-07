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
    progressEl: document.querySelector('.loadingBar > .loadingProgress'),
    rotation: 0,
    rotating: false,
    style: document.querySelector(".loadingBar").style,

}

const loadingBarContainer = document.querySelector('.loadingBarContainer');
const loadingBarBody = document.querySelector('.loadingGame > .windowBody');


// prints.start();

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
                let degreesX = Math.acos(x / 400) * 180 - 10;
                
                // console.log(`Sin Angle: ${degreesY}\n Cos Angle: ${degreesX}`);
                
                // rotate the bar
                // l.transform = `rotate(${degrees}deg)`;
                
                loadingBarBody.getBoundingClientRect().width/2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
                loadingBar.rotation = degreesY;
                
                
                // rotate the bar
                loadingBar.origin.width/2 > x ? loadingBar.style.transform = `rotate(${degreesY * -1}deg)` : loadingBar.style.transform = `rotate(${degreesY}deg)`;
                loadingBar.origin.width/2 > x ? loadingBar.rotation = degreesY * -1 : loadingBar.rotation = degreesY;
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
    let progress = Number(loadingBar.progressEl.style.width.match(/\d+/g));
    const rotationMult = ((loadingBar.rotation - 1)/4)/100;
    
    const newProgress = (progress + (progress * rotationMult)).toFixed(0);
    
    // console.log(`Progress: ${progress}\nRotation Multiplier:${rotationMult}\nNew Progress Value: ${newProgress}`);
    
    progress = `${newProgress}%`;
    const g = 9.8;
    let currentWidth = 0;
    
    // john.log(loadingBar.rotation);
}

makeWindow('umail');
makeWindow('checkboxGame');
makeWindow('spamGame');
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

// Spam game !!!

const emailTypingArea = document.querySelector('.emailTypingArea');
const charCounter = document.querySelector('.characterCount');
const emailSendBtn = document.querySelector('.sendEmailBtn');
const sendPage = document.querySelector('.sendPage');
const sentPage = document.querySelector('.sentPage');
const sentEmail = document.querySelector('.sentPageEmail');

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

emailMinigame(random(20, 50));

function emailMinigame(chars) {
    charCounter.textContent = `0 / ${chars}`;
    emailTypingArea.addEventListener('input', () => {
        const charCount = emailTypingArea.value.length;
    
        if(charCount < chars) charCounter.style.color = 'red';
        else charCounter.style.color = 'green';
    
        charCounter.textContent = `${charCount} / ${chars}`;
    });

    emailSendBtn.addEventListener('click', () => {
        sendPage.classList.add('hidden');
        sentPage.classList.remove('hidden');

        sentEmail.textContent = emailTypingArea.value;
    });
}

// async function create_print() {
    //     function* chars() {
        //         for(let i = 97; i < 123; i++) 
        //           yield String.fromCharCode(i);
        //       }
        
        //     async function* combinations(length, previous = "") {
            //        if(length <= 0) {
                //           yield previous;
                //           return;
                //        }
                
                //        for (const char of chars())
                //           yield* await combinations(length - 1, previous + char);
                //     }
                //     for await (const word of combinations(11)) {
                    //         if (globalThis[word] === undefined) {
                        //             globalThis[word] = {
                            //                 get print() {
                                //                     console.trace(word);
                                //                 }
                                //             }
                                //             console.log(word);
                                //         }
                                //     }
                                // }
                                
                                // create_print().then(() => {
                                    //     helloworld.print;
                                    // });
                                    
                                    // //     let progress = Number(loadingProgress.style.width.match(/\d+/g));
                                    // const rotationMult = ((loadingBarRotation - 1)/4)/100;
                                    
                                    // const newProgress = (progress + (progress * rotationMult)).toFixed(0);
                                    
                                    // console.log(`Progress: ${progress}\nRotation Multiplier:${rotationMult}\nNew Progress Value: ${newProgress}`);
                                    
                                    // progress = `${newProgress}%`
                                    
const prints = {
                                        started: false,
                                    
                                        status() {
                                            if(!this.started) return console.log('Prints: DOWN');
                                            return console.log('Prints: UP');
                                        },
                                    
                                        async start() {
                                            console.log('Starting Prints...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(1000);
                                            console.log('Startup complete');
                                            this.started = true;
                                        },
                                    
                                        async stop() {
                                            console.log('Stoping Prints...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(500);
                                            console.log('...');
                                            await sleep(1000);
                                            console.log('Prints Stopped');
                                            this.started = false;
                                        },
                                    
                                        print(string) {
                                            if(!this.started) return console.log('Not started');
                                            if(!string) {
                                                console.log(`Hello World!`);
                                                return;
                                            }
                                            console.log(string);
                                        },
                                    
                                        holyPrint(string) {
                                            if(!this.started) return console.log('Not started');
                                            if(!string) {
                                                console.log('usage:\n   print.holyPrint(string);');
                                                return
                                            }
                                            const charList = [];
                                            for (const char of string) {
                                                const randomAscii = Math.floor(Math.random() * 128);
                                                charList.push(String.fromCharCode(randomAscii));
                                            }
                                            console.log(`${charList.join('')}\n\n(You can't read it because you're not holly enough)`);
                                        },
                                    
                                        evilPrint(string) {
                                            if(!this.started) return console.log('Not started');
                                            if(!string) {
                                                console.log('usage:\n   print.evilPrint(string);');
                                                return
                                            }
                                            const stringChar = string.split('');
                                            const charList = [];
                                            for (const char of stringChar) {
                                                charList.unshift(char);
                                            }
                                            console.log(`${charList.join('')}`);
                                        }
}