import Forme from "./forme.js";

class Balle extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        console.log("méthode draw Balle");
        ctx.fillstyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }
}