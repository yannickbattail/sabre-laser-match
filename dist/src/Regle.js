"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regle = void 0;
const Carton_js_1 = require("./Carton.js");
const Touche_js_1 = require("./Touche.js");
const throw_js_1 = require("./throw.js");
const Evenement_js_1 = require("./Evenement.js");
class Regle {
    nom;
    cartons;
    touches;
    duree;
    prolongation;
    mortSubiteScore;
    scoreMax;
    static REGLES = [
        new Regle("FFE", [
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.blanc, 0, true, true, true, false, "images/carton-blanc.svg", Carton_js_1.CartonCouleur.jaune),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.jaune, 3, true, true, true, false, "images/carton-jaune.svg", Carton_js_1.CartonCouleur.rouge),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.rouge, 5, true, true, true, false, "images/carton-rouge.svg", Carton_js_1.CartonCouleur.noir),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.noir, 0, true, true, true, true, "images/carton-noir.svg", Carton_js_1.CartonCouleur.noir),
        ], [
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.main, 1, true, false, false, "images/main.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.bras, 3, true, false, false, "images/bras.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.jambe, 3, true, false, false, "images/jambe.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tronc, 5, true, true, true, "images/tronc.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tete, 5, true, true, true, "images/tete.svg"),
        ], 180, 30, 10, 15),
        new Regle("personnalisée", [
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.vert, 0, true, true, true, false, "images/carton-vert.svg", Carton_js_1.CartonCouleur.vert),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.bleu, 0, true, true, true, false, "images/carton-bleu.svg", Carton_js_1.CartonCouleur.bleu),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.blanc, 0, true, true, true, false, "images/carton-blanc.svg", Carton_js_1.CartonCouleur.jaune),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.jaune, 3, true, true, true, false, "images/carton-jaune.svg", Carton_js_1.CartonCouleur.rouge),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.rouge, 5, true, true, true, false, "images/carton-rouge.svg", Carton_js_1.CartonCouleur.noir),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.noir, 0, true, true, true, true, "images/carton-noir.svg", Carton_js_1.CartonCouleur.noir),
        ], [
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.main, 1, true, false, false, "images/main.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.bras, 3, true, false, false, "images/bras.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.jambe, 3, true, false, false, "images/jambe.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tronc, 5, true, true, true, "images/tronc.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tete, 5, true, true, true, "images/tete.svg"),
        ], 180, 30, 10, 15),
        new Regle("testing", [
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.vert, 0, true, true, true, false, "images/carton-vert.svg", Carton_js_1.CartonCouleur.vert),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.bleu, 0, true, true, true, false, "images/carton-bleu.svg", Carton_js_1.CartonCouleur.bleu),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.blanc, 0, true, true, true, false, "images/carton-blanc.svg", Carton_js_1.CartonCouleur.jaune),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.jaune, 3, true, true, true, false, "images/carton-jaune.svg", Carton_js_1.CartonCouleur.rouge),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.rouge, 5, true, true, true, false, "images/carton-rouge.svg", Carton_js_1.CartonCouleur.noir),
            new Carton_js_1.Carton(Carton_js_1.CartonCouleur.noir, 0, true, true, true, true, "images/carton-noir.svg", Carton_js_1.CartonCouleur.noir),
        ], [
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.main, 1, true, false, false, "images/main.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.bras, 3, true, false, true, "images/bras.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.jambe, 3, true, false, true, "images/jambe.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tronc, 5, true, true, true, "images/tronc.svg"),
            new Touche_js_1.Touche(Touche_js_1.ToucheNom.tete, 5, true, true, true, "images/tete.svg"),
        ], 10, 10, 10, 15),
    ];
    constructor(nom, cartons, touches, duree = 180, prolongation = 30, mortSubiteScore = 10, scoreMax = 15) {
        this.nom = nom;
        this.cartons = cartons;
        this.touches = touches;
        this.duree = duree;
        this.prolongation = prolongation;
        this.mortSubiteScore = mortSubiteScore;
        this.scoreMax = scoreMax;
    }
    static getRegleByNom(nomRegle) {
        return this.REGLES.find((r) => r.nom === nomRegle) || (0, throw_js_1._throw)(new Error(`Regle ${nomRegle} introuvable`));
    }
    static adversaire(combattant) {
        return combattant === Evenement_js_1.CombattantCouleur.vert ? Evenement_js_1.CombattantCouleur.rouge : Evenement_js_1.CombattantCouleur.vert;
    }
    getCarton(couleur) {
        return this.cartons.find((c) => c.couleur === couleur) || (0, throw_js_1._throw)(new Error(`Carton ${couleur} introuvable`));
    }
    getCartonSuperieur(couleur) {
        return (this.getCarton(this.getCarton(couleur).cartonSuperieur) ||
            (0, throw_js_1._throw)(new Error(`Carton superieur de ${couleur} introuvable`)));
    }
    getTouche(nom) {
        return this.touches.find((c) => c.nom === nom) || (0, throw_js_1._throw)(new Error(`Touche ${nom} introuvable`));
    }
    getTouchesMatch(match) {
        return this.touches.filter((c) => c.match === match);
    }
    getTouchesMortSubite(mortSubite) {
        return this.touches.filter((c) => c.mortSubite === mortSubite);
    }
    getTouchesProlongation(prolongation) {
        return this.touches.filter((c) => c.prolongation === prolongation);
    }
}
exports.Regle = Regle;
