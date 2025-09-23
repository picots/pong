import {Forme} from "forme.js";

export class Plateforme extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        console.log("méthode draw Rectangle");
        ctx.fillstyle("black");
        ctx.fillRect(x, y, 10, 50);
    }
}