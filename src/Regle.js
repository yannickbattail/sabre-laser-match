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
        new Regle("testing", [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZWdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE1BQU0sT0FBTyxLQUFLO0lBcUZQO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBMUZGLE1BQU0sQ0FBQyxNQUFNLEdBQVk7UUFDOUIsSUFBSSxLQUFLLENBQ1AsS0FBSyxFQUNMO1lBQ0UsSUFBSSxNQUFNLENBQ1IsYUFBYSxDQUFDLEtBQUssRUFDbkIsQ0FBQyxFQUNELHlCQUF5QixFQUN6QixhQUFhLENBQUMsS0FBSyxDQUNwQjtZQUNELElBQUksTUFBTSxDQUNSLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLENBQUMsRUFDRCx5QkFBeUIsRUFDekIsYUFBYSxDQUFDLEtBQUssQ0FDcEI7WUFDRCxJQUFJLE1BQU0sQ0FDUixhQUFhLENBQUMsS0FBSyxFQUNuQixDQUFDLEVBQ0QseUJBQXlCLEVBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQ25CO1lBQ0QsSUFBSSxNQUFNLENBQ1IsYUFBYSxDQUFDLElBQUksRUFDbEIsQ0FBQyxFQUNELHdCQUF3QixFQUN4QixhQUFhLENBQUMsSUFBSSxDQUNuQjtTQUNGLEVBQ0Q7WUFDRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDO1lBQzlELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsaUJB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