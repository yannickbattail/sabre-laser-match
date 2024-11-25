import { Carton, CartonCouleur } from "./Carton.js";
import { Touche, ToucheNom } from "./Touche.js";
import { _throw } from "./throw.js";
import { CombattantCouleur } from "./Evenement.js";
export class Regle {
    nom;
    cartons;
    touches;
    duree;
    prolongation;
    mortSubiteScore;
    scoreMax;
    static REGLES = [
        new Regle("FFE", [
            new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
            new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
            new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
            new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
        ], [
            new Touche(ToucheNom.main, 1, false, false, "images/main.svg"),
            new Touche(ToucheNom.bras, 3, false, false, "images/bras.svg"),
            new Touche(ToucheNom.jambe, 3, false, false, "images/jambe.svg"),
            new Touche(ToucheNom.tronc, 5, true, true, "images/tronc.svg"),
            new Touche(ToucheNom.tete, 5, true, true, "images/tete.svg"),
        ], 180, 30, 10, 15),
        new Regle("perso", [
            new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
            new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
            new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
            new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
        ], [
            new Touche(ToucheNom.main, 1, true, true, "images/main.svg"),
            new Touche(ToucheNom.bras, 2, true, true, "images/bras.svg"),
            new Touche(ToucheNom.jambe, 3, true, true, "images/jambe.svg"),
            new Touche(ToucheNom.tronc, 4, true, true, "images/tronc.svg"),
            new Touche(ToucheNom.tete, 4, true, true, "images/tete.svg"),
        ], 180, 0, 1, 15),
        new Regle("tests", [
            new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
            new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
            new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
            new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
        ], [
            new Touche(ToucheNom.main, 1, false, false, "images/main.svg"),
            new Touche(ToucheNom.bras, 3, false, true, "images/bras.svg"),
            new Touche(ToucheNom.jambe, 3, false, true, "images/jambe.svg"),
            new Touche(ToucheNom.tronc, 5, true, true, "images/tronc.svg"),
            new Touche(ToucheNom.tete, 5, true, true, "images/tete.svg"),
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
    getTouchesMortSubite(mortSubite) {
        return this.touches.filter((c) => c.mortSubite === mortSubite);
    }
    getTouchesProlongation(prolongation) {
        return this.touches.filter((c) => c.prolongation === prolongation);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZWdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE1BQU0sT0FBTyxLQUFLO0lBNkhIO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBbElKLE1BQU0sQ0FBQyxNQUFNLEdBQVk7UUFDNUIsSUFBSSxLQUFLLENBQ0wsS0FBSyxFQUNMO1lBQ0ksSUFBSSxNQUFNLENBQ04sYUFBYSxDQUFDLEtBQUssRUFDbkIsQ0FBQyxFQUNELHlCQUF5QixFQUN6QixhQUFhLENBQUMsS0FBSyxDQUN0QjtZQUNELElBQUksTUFBTSxDQUNOLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLENBQUMsRUFDRCx5QkFBeUIsRUFDekIsYUFBYSxDQUFDLEtBQUssQ0FDdEI7WUFDRCxJQUFJLE1BQU0sQ0FDTixhQUFhLENBQUMsS0FBSyxFQUNuQixDQUFDLEVBQ0QseUJBQXlCLEVBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQ3JCO1lBQ0QsSUFBSSxNQUFNLENBQ04sYUFBYSxDQUFDLElBQUksRUFDbEIsQ0FBQyxFQUNELHdCQUF3QixFQUN4QixhQUFhLENBQUMsSUFBSSxDQUNyQjtTQUNKLEVBQ0Q7WUFDSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDO1lBQzlELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsaUJB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