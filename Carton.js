"use strict";
var CartonCouleur;
(function (CartonCouleur) {
    CartonCouleur["blanc"] = "blanc";
    CartonCouleur["jaune"] = "jaune";
    CartonCouleur["rouge"] = "rouge";
    CartonCouleur["noir"] = "noir";
})(CartonCouleur || (CartonCouleur = {}));
class Carton {
    constructor(couleur, points, image, cartonSuperieur) {
        this.couleur = couleur;
        this.points = points;
        this.image = image;
        this.cartonSuperieur = cartonSuperieur;
    }
}
//# sourceMappingURL=Carton.js.map