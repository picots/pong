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
        ctx.fillstyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Plateforme extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.fillstyle = "black";
        ctx.fillRect(this.x, this.y, 50, 10);
    }
}

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const gauche = document.getElementById("gauche");
const droite = document.getElementById("droite");
const balle = new Balle(250, 20, 5);
const plateforme = new Plateforme(60, 50);

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
    if(isMobileDevice()){
        gauche.hidden = droite.hidden = false;
        canvas.height = 500;
    }
    else
        gauche.hidden = droite.hidden = true;
        
}

function draw() {
    ctx.fillstyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    balle.draw(ctx);
    //plateforme.draw(ctx);
}

resize();
draw();