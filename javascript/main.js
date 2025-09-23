class Forme {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Balle extends Forme {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }
}

class Plateforme extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(this.x + 10,  this.y); 
        ctx.lineTo(this.x + 70 - 10,  this.y);
        ctx.quadraticCurveTo(this.x + 70,  this.y, this.x + 70,  this.y + 10);
        ctx.lineTo(this.x + 70,  this.y + 10 - 10);
        ctx.quadraticCurveTo(this.x + 70,  this.y + 10, this.x + 70 - 10,  this.y + 10);
        ctx.lineTo(this.x + 10,  this.y + 10);
        ctx.quadraticCurveTo(this.x,  this.y + 10, this.x,  this.y + 10 - 10);
        ctx.lineTo(this.x,  this.y + 10);
        ctx.quadraticCurveTo(this.x,  this.y, this.x + 10,  this.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const gauche = document.getElementById("gauche");
const droite = document.getElementById("droite");
const balle = new Balle(canvas.width / 2, canvas.height - 17, 7);
const plateforme = new Plateforme(canvas.width / 2 - 35, canvas.height - 10);

function isMobileDevice() {
    if (navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))
        return true;
    else
        return false;
}

function resize() {
    if (isMobileDevice()) {
        gauche.hidden = droite.hidden = false;
        canvas.height = 500;
    }
    else
        gauche.hidden = droite.hidden = true;

}

function draw() {
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    balle.draw(ctx);
    plateforme.draw(ctx);
}

resize();
draw();