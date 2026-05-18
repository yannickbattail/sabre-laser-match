"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvenementCarton = exports.EvenementTouche = exports.Evenement = exports.EvenementType = exports.CombattantCouleur = void 0;
var CombattantCouleur;
(function (CombattantCouleur) {
    CombattantCouleur["vert"] = "vert";
    CombattantCouleur["rouge"] = "rouge";
})(CombattantCouleur || (exports.CombattantCouleur = CombattantCouleur = {}));
var EvenementType;
(function (EvenementType) {
    EvenementType["touche"] = "touche";
    EvenementType["carton"] = "carton";
})(EvenementType || (exports.EvenementType = EvenementType = {}));
class Evenement {
    temps;
    combattant;
    type;
    constructor(temps, combattant, type) {
        this.temps = temps;
        this.combattant = combattant;
        this.type = type;
    }
}
exports.Evenement = Evenement;
class EvenementTouche extends Evenement {
    nom;
    constructor(temps, combattant, nom) {
        super(temps, combattant, EvenementType.touche);
        this.nom = nom;
    }
}
exports.EvenementTouche = EvenementTouche;
class EvenementCarton extends Evenement {
    couleur;
    constructor(temps, combattant, couleur) {
        super(temps, combattant, EvenementType.carton);
        this.couleur = couleur;
    }
}
exports.EvenementCarton = EvenementCarton;
