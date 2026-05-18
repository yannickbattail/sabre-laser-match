"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Touche = exports.ToucheNom = void 0;
var ToucheNom;
(function (ToucheNom) {
    ToucheNom["main"] = "main";
    ToucheNom["bras"] = "bras";
    ToucheNom["jambe"] = "jambe";
    ToucheNom["tronc"] = "tronc";
    ToucheNom["tete"] = "t\u00EAte";
})(ToucheNom || (exports.ToucheNom = ToucheNom = {}));
class Touche {
    nom;
    points;
    match;
    mortSubite;
    prolongation;
    image;
    constructor(nom, points, match, mortSubite, prolongation, image) {
        this.nom = nom;
        this.points = points;
        this.match = match;
        this.mortSubite = mortSubite;
        this.prolongation = prolongation;
        this.image = image;
    }
}
exports.Touche = Touche;
