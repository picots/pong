import Forme from "./forme.js";

export default class Balle extends Forme {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }

    draw(ctx) {
        console.log("méthode draw Balle");
        ctx.fillstyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}