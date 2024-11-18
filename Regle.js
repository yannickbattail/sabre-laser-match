"use strict";
class Regle {
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
        return (this.REGLES.find((r) => r.nom === nomRegle) ||
            _throw(new Error(`Regle ${nomRegle} introuvable`)));
    }
    static adversaire(combattant) {
        return combattant === CombattantCouleur.vert
            ? CombattantCouleur.rouge
            : CombattantCouleur.vert;
    }
    getCarton(couleur) {
        return (this.cartons.find((c) => c.couleur === couleur) ||
            _throw(new Error(`Carton ${couleur} introuvable`)));
    }
    getCartonSuperieur(couleur) {
        return (this.getCarton(this.getCarton(couleur).cartonSuperieur) ||
            _throw(new Error(`Carton superieur de ${couleur} introuvable`)));
    }
    getTouche(nom) {
        return (this.touches.find((c) => c.nom === nom) ||
            _throw(new Error(`Touche ${nom} introuvable`)));
    }
}
Regle.REGLES = [
    new Regle("FFE", [
        new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
        new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
        new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
        new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
    ], [
        new Touche(ToucheNom.main, 1, false, "images/main.svg"),
        new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
        new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
        new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
        new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
    ], 180, 30, 10, 15),
    new Regle("perso", [
        new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
        new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
        new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
        new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
    ], [
        new Touche(ToucheNom.main, 1, false, "images/main.svg"),
        new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
        new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
        new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
        new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
    ], 180, 0, 1, 15),
    new Regle("test", [
        new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
        new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
        new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
        new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
    ], [
        new Touche(ToucheNom.main, 1, false, "images/main.svg"),
        new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
        new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
        new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
        new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
    ], 10, 10, 10, 15),
];
//# sourceMappingURL=Regle.js.map