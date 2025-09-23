class Form {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.vx = speed;
        this.vy = speed;
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

    accelerate(){
        if (Math.random() < 0.1 && this.vx <= 4*this.speed)
            this.vx += (Math.random() - 0.5) * 0.5;
        else if (Math.random() > 0.9 && this.vy <= 4*this.speed)
            this.vy += (Math.random() - 0.5) * 0.5;
    }

    update(canvas, n, platform) {
        this.accelerate();
        this.x += this.vx * n;
        this.y -= this.vy;
        if (this.x + this.r > canvas.width || this.x - this.r < 0)
            this.vx *= -1;
        if (this.y - this.r < 0)
            this.vy *= -1;
        if (this.y + this.r > canvas.height)
            isEnd = true;
        if (this.y + this.r >= platform.y && this.x >= platform.x && this.x <= platform.x + 70) {
            this.vy *= -1;
            this.y = platform.y - this.r;
            this.vx += (Math.random() - 0.5) * 1;
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
        ctx.moveTo(this.x + 10, this.y);
        ctx.lineTo(this.x + 70 - 10, this.y);
        ctx.quadraticCurveTo(this.x + 70, this.y, this.x + 70, this.y + 10);
        ctx.lineTo(this.x + 70, this.y + 10 - 10);
        ctx.quadraticCurveTo(this.x + 70, this.y + 10, this.x + 70 - 10, this.y + 10);
        ctx.lineTo(this.x + 10, this.y + 10);
        ctx.quadraticCurveTo(this.x, this.y + 10, this.x, this.y + 10 - 10);
        ctx.lineTo(this.x, this.y + 10);
        ctx.quadraticCurveTo(this.x, this.y, this.x + 10, this.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    update(canvas, keys) {
        if (isMobileDevice()) {
            if (keys["ArrowRight"]) this.x += this.speed;
            else if (keys["ArrowLeft"]) this.x -= this.speed;
        }
        else {
            if (keys["ArrowRight"] && this.x + 70 < canvas.width) this.x += speed;
            else if (keys["ArrowLeft"] && this.x > 0) this.x -= speed;
        }
    }
}

const speed = 2;
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const newGame = document.getElementById("newGame");
const ball = new Ball(canvas.width / 2, canvas.height - 17, 7, speed);
const platform = new Platform(canvas.width / 2 - 35, canvas.height - 10, speed);

let rafId;
let isEnd;
let n;

const keys = {};
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
        rafId = requestAnimationFrame(loop);
    }
}

function start() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    ball.x = canvas.width / 2;
    ball.y = canvas.height - 17;
    ball.vx = ball.vy = 2;
    platform.x = canvas.width / 2 - 35;
    isEnd = false;
    n = Math.random() < 0.5 ? -1 : 1;
    resize();
    draw();
    loop();
}

start();
newGame.addEventListener("click", () => start());
