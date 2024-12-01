export default class diceRollling {
    constructor() {
        this.renderFrames = 25; // does not include end frame
        this.endFrameLength = 1500;
        this.frameTime = 60;
    }

    randD20Roll() {
        return Math.floor(Math.random() * 20) + 1;
    }

    destroyD20() {
        const renderedD20 = document.getElementById('dice-roll-render-container-id');
        renderedD20.remove();
    }

    renderD20(parentElement, headingInfo, finalRoll, callback) {

        // setup and header for popup
        const renderContainer = document.createElement('div');
        renderContainer.id = 'dice-roll-render-container-id';
        renderContainer.classList = 'dice-roll-render-container';
        parentElement.appendChild(renderContainer);

        const heading = document.createElement('p');
        heading.classList = 'dice-roller-heading';
        heading.innerText = headingInfo; // add a heading to the popup window so the user knows chance of hit / defence
        renderContainer.appendChild(heading);

        const diceRollContainer = document.createElement('div');
        diceRollContainer.classList = 'dice-roll-container';
        renderContainer.appendChild(diceRollContainer);

        // dice faces
        const mainFace = document.createElement('div');
        mainFace.id = 'main-dice-face-id';
        mainFace.classList = 'main-dice-face';
        diceRollContainer.appendChild(mainFace);

        // inner face number
        const faceNumber = document.createElement('p');
        faceNumber.id = 'dice-face-number-id';
        faceNumber.classList = 'dice-face-number';
        faceNumber.innerText = '20';
        mainFace.appendChild(faceNumber);

        let currentFrame = 0;
        const totalFrames = this.renderFrames || 10; // Default to 10 frames if not defined
        const frameInterval = this.frameTime || 100; // Default to 100ms between frames if not defined

        // Animation loop
        const animationInterval = setInterval(() => {
            if (currentFrame < totalFrames) {
                faceNumber.innerText = this.randD20Roll(); // Random D20 roll
                currentFrame++;
            } else {
                faceNumber.innerText = finalRoll; // Show final roll after animation ends
                clearInterval(animationInterval); // Stop the animation loop after the final frame
            }
        }, frameInterval);

        // Final roll result after animation
        setTimeout(() => {
            this.destroyD20(); // Cleanup and remove the popup window after the animation
            if (callback) {
                callback(finalRoll);
            }
        }, (totalFrames * frameInterval) + this.endFrameLength); // Add extra time for the final result to display
    }

    rollD20(parentElement, containerHeading, callback) {
        const finalInt = this.randD20Roll();

        this.renderD20(parentElement, containerHeading, finalInt, callback)

        return finalInt;
    }
}
