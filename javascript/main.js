class Form {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Ball extends Form {
    constructor(x, y, r, speed) {
        super(x, y)
        this.r = r;
        this. vx = speed;
        this.vy = speed;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    accelerate(){
        if(timer % 10 == 0 && timer != 0 && this.vx < 3*speed && this.vy < 3*speed){
            this.vy *= 1 + Math.random()/1000;
            this.vx *= 1 + Math.random()/1000;
        }
    }

    update(canvas, n, platform) {
        this.x += this.vx * n;
        this.y -= this.vy;
        this.accelerate();
        if (this.x + this.r > canvas.width || this.x - this.r < 0)
            this.vx *= -1;
        if (this.y - this.r < 0)
            this.vy *= -1;
        if (this.y + this.r > canvas.height)
            isEnd = true;
        if (this.y + this.r >= platform.y && this.x >= platform.x && this.x <= platform.x + 70) {
            this.vy *= -1;
            this.vx += Math.random()/10;
        }
    }
}

class Platform extends Form {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, 70, 10, 5);
        ctx.fill();
        ctx.stroke();
    }

    update(canvas, keys) {
        if (isMobileDevice()) {
            if (keys["right"] && this.x + 70 < canvas.width) this.x += this.speed;
            else if (keys["left"] && this.x > 0) this.x -= this.speed;
        }
        else {
            if (keys["ArrowRight"] && this.x + 70 < canvas.width) this.x += this.speed;
            else if (keys["ArrowLeft"] && this.x > 0) this.x -= this.speed;
        }
    }
}

const speed = 5;
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const newGame = document.getElementById("newGame");
const score = document.getElementById("score");

let ball;
let platform;

let rafId;
let isEnd;
let n;
let timer;
let keys = {};
let timeInterval;

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
    platform.draw(ctx);
}

function loop() {
    if (!isEnd) {
        ball.update(canvas, n, platform);
        platform.update(canvas, keys);
        draw();
        score.innerHTML = "Score : "+ timer + "s";
        rafId = requestAnimationFrame(loop);
    }
    else
        alert("Vous avez perdu !");
}

function start() {
    if(timeInterval)
        clearInterval(timeInterval);
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    if (isMobileDevice()) {
        left.addEventListener("touchstart", () => keys["left"] = true);
        left.addEventListener("touchend", () => keys["left"] = false);
        right.addEventListener("touchstart", () => keys["right"] = true);
        right.addEventListener("touchend", () => keys["right"] = false);
    }
    else {
        document.addEventListener("keydown", e => keys[e.key] = true);
        document.addEventListener("keyup", e => keys[e.key] = false);
    }
    resize();
    timer = 0;
    timeInterval = setInterval(()=>timer++, 1000);
    ball = new Ball(canvas.width / 2, canvas.height - 17, 7, speed);;
    platform = new Platform(canvas.width / 2 - 35, canvas.height - 10, speed);
    isEnd = false;
    n = Math.random() < 0.5 ? -1 : 1;
    draw();
    loop();
}

newGame.addEventListener("click", () => start());