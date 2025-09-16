import Forme from "./forme.js";

class Plateforme extends Forme {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.fillstyle("black");
        ctx.fillRect(x, y, 10, 50);
    }
}