const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const gauche = document.getElementById("gauche");
const droite = document.getElementById("droite");

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
    }
    else {
        gauche.hidden = droite.hidden = true;
    }
}

function draw() {
    ctx.fillRectangle()
}

console.log(isMobileDevice());
resize();