const icons = document.querySelector('.icons');
iconList = icons.children;
const desktop = document.querySelector('.desktop');
const monitorPowerOnBtn = document.querySelector('.monitorPowerOnBtn');
const monitorPowerLight = document.querySelector('.monitorPowerLight');
const monitorPowerLightInner = document.querySelector('.monitorPowerLightInner');

// displayDesktop();

monitorPowerOnBtn.addEventListener('click', async () => {
    monitorPowerLight.classList.contains('on') ? monitorPowerLight.classList.remove('on') : monitorPowerLight.classList.add('on');
    monitorPowerLightInner.classList.contains('on') ? monitorPowerLightInner.classList.remove('on') : monitorPowerLightInner.classList.add('on');
    await displayDesktop();
});

async function displayDesktop() {
    desktop.style.backgroundColor = '#0BEBE7';
    for (const icon of iconList) {
        await sleep(1000);
        icon.classList.remove('inactive');
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}