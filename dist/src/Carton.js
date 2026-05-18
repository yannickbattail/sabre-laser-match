"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carton = exports.CartonCouleur = void 0;
var CartonCouleur;
(function (CartonCouleur) {
    CartonCouleur["vert"] = "vert";
    CartonCouleur["bleu"] = "bleu";
    CartonCouleur["blanc"] = "blanc";
    CartonCouleur["jaune"] = "jaune";
    CartonCouleur["rouge"] = "rouge";
    CartonCouleur["noir"] = "noir";
})(CartonCouleur || (exports.CartonCouleur = CartonCouleur = {}));
class Carton {
    couleur;
    points;
    match;
    mortSubite;
    prolongation;
    finDuMatch;
    image;
    cartonSuperieur;
    constructor(couleur, points, match, mortSubite, prolongation, finDuMatch, image, cartonSuperieur) {
        this.couleur = couleur;
        this.points = points;
        this.match = match;
        this.mortSubite = mortSubite;
        this.prolongation = prolongation;
        this.finDuMatch = finDuMatch;
        this.image = image;
        this.cartonSuperieur = cartonSuperieur;
    }
}
exports.Carton = Carton;
