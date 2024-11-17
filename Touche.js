"use strict";
var ToucheNom;
(function (ToucheNom) {
    ToucheNom["main"] = "main";
    ToucheNom["bras"] = "bras";
    ToucheNom["jambe"] = "jambe";
    ToucheNom["tronc"] = "tronc";
    ToucheNom["tete"] = "t\u00EAte";
})(ToucheNom || (ToucheNom = {}));
class Touche {
    constructor(nom, points, mortSubite, image) {
        this.nom = nom;
        this.points = points;
        this.mortSubite = mortSubite;
        this.image = image;
    }
}
//# sourceMappingURL=Touche.js.map