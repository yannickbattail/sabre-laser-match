"use strict";
var CombattantCouleur;
(function (CombattantCouleur) {
    CombattantCouleur["vert"] = "vert";
    CombattantCouleur["rouge"] = "rouge";
})(CombattantCouleur || (CombattantCouleur = {}));
var EvenementType;
(function (EvenementType) {
    EvenementType["touche"] = "touche";
    EvenementType["carton"] = "carton";
})(EvenementType || (EvenementType = {}));
class Evenement {
    constructor(temps, combattant, type) {
        this.temps = temps;
        this.combattant = combattant;
        this.type = type;
    }
}
class EvenementTouche extends Evenement {
    constructor(temps, combattant, nom) {
        super(temps, combattant, EvenementType.touche);
        this.nom = nom;
    }
}
class EvenementCarton extends Evenement {
    constructor(temps, combattant, couleur) {
        super(temps, combattant, EvenementType.carton);
        this.couleur = couleur;
    }
}
//# sourceMappingURL=Evenement.js.map