import builder from '../Modules/builder.js';

// options menu
let isMenuOpen = false
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        escapeMenu();
    }
});

function escapeMenu() {
    const build = new builder();
    const parentEL = document.getElementById('escape-menu-id');
    
    if (isMenuOpen) {
        build.cleanContainer('escape-menu-id');
        isMenuOpen = false;
    } else {
        const wrapper = build.createDiv('escape-menu-wrapper'); // wrapper to center menu when loaded
        const menuContainer =  build.createDiv('escape-menu-container'); // containers background for menu
        const quitLink = build.createA('../html/homePage.html');
        const quitButton = build.createButton('Quit', 'escape-menu-quit-button');
        
        quitLink.appendChild(quitButton);
        menuContainer.appendChild(quitLink);
        wrapper.appendChild(menuContainer);
        parentEL.appendChild(wrapper)
        isMenuOpen = true;
    }
}


function updateVitalityUi() {
    const currentVitality = document.getElementById('life-counter-id');
    const maxVitality = document.getElementById('life-counter-max-id');

    const currentVitalityPercent = 
        parseInt(currentVitality.innerText) / parseInt(maxVitality.innerText) * 100;
    const marginToBeApplied = 100 - currentVitalityPercent; 

    const vitalityContainerFiller = document.getElementById('life-container-filler-id');
    vitalityContainerFiller.style.marginTop = `${marginToBeApplied}%`
    
}
updateVitalityUi();
