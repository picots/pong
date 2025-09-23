class Form {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
}

class Ball extends Form {
    constructor(x, y, r, speed) {
        super(x, y, speed);
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

    update(canvas){
        this.x += this.speed/3;
        this.y -= this.speed;
        if (this.x > canvas.width - this.r) {
            this.x -= speed;
        }
        if (this.x < 0){
            this.x += speed;
        }
        if(this.y < 0){
            console.log("en dehors");
        }
    }
}

class Platform extends Form {
    constructor(x, y, speed) {
        super(x, y, speed);
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

    update(canvas){
        this.x ++;
    }
}

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const ball = new Ball(canvas.width / 2, canvas.height - 17, 7);
const plateform = new Platform(canvas.width / 2 - 35, canvas.height - 10);

let speed = 2;                 
let rafId; 

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
        left.hidden = right.hidden = false;
        canvas.height = 500;
    }
    else
        left.hidden = right.hidden = true;      
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
    plateform.draw(ctx);
}

function loop() {
    ball.update(canvas);
    draw();
    rafId = requestAnimationFrame(loop);
}

resize();
draw();
//loop();
