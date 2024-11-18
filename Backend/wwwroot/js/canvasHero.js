const canvas = document.getElementById('landing-page-canvas');
const ctx = canvas.getContext('2d');

const fontSize = 8;
const fontFamily = "Arial";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dpr = window.devicePixelRatio || 1;

canvas.width = canvas.width * dpr;
canvas.height = canvas.height * dpr;

ctx.scale(dpr, dpr);

const randx = Math.random() * (10 - -10) + -10;

class drawChar {
    constructor() {
        this.xP = this.rand(0, canvas.width);
        this.yP = this.rand(0, canvas.height);
        this.gridScale = 20;
        this.sxp = 0; // scaled x position
        this.syp = 0; // sclaed y position
        this.moveSpeed = this.rand(.1, .6);
        this.verticalSpeed = 4;
    }

    scalePositiion() {
        this.sxp = Math.round(this.xP / this.gridScale) * this.gridScale;
        this.syp = Math.round(this.yP / this.gridScale) * this.gridScale;
    }

    rand(min, max) {
        return Math.random() * (max-min) + min;
    }

    updatePosition(distance) {
        if (this.xP > canvas.width) {
            this.xP = 0;
        } else if (this.xP < 0) {
            this.xP = canvas.width;
        } else {
        this.xP += this.rand(-this.moveSpeed, this.moveSpeed) + randx;
        }

        if (this.yP < this.rand(0, canvas.height) - canvas.height / 1) {
            this.yP = canvas.height;
        }

        if (this.yP > canvas.height) {
            this.yP = 0;
        } else if (this.yP < 0) {
            this.yP = canvas.height;
            this.xP = this.rand(0, canvas.width);
        } else {
            this.yP -= this.rand(-this.moveSpeed, this.moveSpeed) + this.verticalSpeed;
        }
        this.scalePositiion();
        this.draw('@', distance);
    }

    draw(text, distance) {
        ctx.font = `${fontSize}px ${fontFamily}`;
        if (distance < 100 + (fontSize * 6)) { 
            ctx.fillStyle = `rgba(${this.rand(200,255)}, ${this.rand(50,100)}, 80,${this.yP / canvas.height})`;
        } else {
            ctx.fillStyle = `rgba(${this.rand(50,200)}, ${this.rand(50,200)}, 237,${this.yP / canvas.height})`;
        }
        ctx.fillText(text, this.xP, this.yP);
    }
}


function clearCanvas() {
    ctx.clearRect(0,0, canvas.width,  canvas.height);
}

const partArray = [];

for (let i = 0; i < 500; i++) {
    const drawCh = new drawChar();
    partArray.push(drawCh);
}

function drawCircle() {
    const x = canvas.width / 2; // X-coordinate of the circle's center
    const y = canvas.height / 2; // Y-coordinate of the circle's center
    const radius = 100; // Radius of the circle

    // Draw the circle
    ctx.beginPath(); // Start a new path
    ctx.arc(x, y, radius, 0, 2 * Math.PI); // Draw a circle with the specified radius
    ctx.fillStyle = 'rgb(40,23,36)'; // Set the fill color
    ctx.fill(); // Fill the circle with the specified color
    ctx.strokeStyle = 'black'; // Set the stroke color
    ctx.stroke(); // Outline the circle with the stroke color
}

function update() {
    clearCanvas();
    drawCircle();
    partArray.forEach((part, index) => {
        partArray.forEach((part2, index2) => {
            if (index === index2) {
                return;
            }
            const xdif = Math.abs(part.xP - part2.xP);
            const ydif = Math.abs(part.yP - part2.yP);
            const distance = Math.sqrt((xdif * xdif) + (ydif * ydif));
            if (distance < fontSize) {
                const moveFactor = fontSize / 2;
                const moveX = xdif / distance * moveFactor;
                const moveY = ydif / distance * moveFactor;

                part.xP += moveX;
                part.yP += moveY;
                part2.xP -= moveX;
                part2.yP -= moveY;
            }
        });
        const dx = part.xP - canvas.width / 2;
        const dy = part.yP - canvas.height / 2;
        const distoCirc = Math.sqrt((dx * dx) + (dy * dy));
        if (distoCirc < 100 + fontSize) {
            const moveFactor2 = fontSize + part.verticalSpeed;
            const moveX2 = dx / distoCirc * moveFactor2;
            const moveY2 = dy / distoCirc * moveFactor2;

            part.xP += moveX2;
            part.yP += moveY2;
        }
        part.updatePosition(distoCirc);
    });
    window.requestAnimationFrame(update);
}

update();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.width = canvas.width * dpr;
    canvas.height = canvas.height * dpr;

    ctx.scale(dpr, dpr);

    update();
});
