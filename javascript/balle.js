import Forme from "./forme.js";

class Balle extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.fillstyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
}