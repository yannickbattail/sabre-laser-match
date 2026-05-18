import { CartonCouleur } from "./Carton.js";
import { ToucheNom } from "./Touche.js";
export declare enum CombattantCouleur {
    vert = "vert",
    rouge = "rouge"
}
export declare enum EvenementType {
    touche = "touche",
    carton = "carton"
}
export declare abstract class Evenement {
    temps: number;
    combattant: CombattantCouleur;
    type: EvenementType;
    constructor(temps: number, combattant: CombattantCouleur, type: EvenementType);
}
export declare class EvenementTouche extends Evenement {
    nom: ToucheNom;
    constructor(temps: number, combattant: CombattantCouleur, nom: ToucheNom);
}
export declare class EvenementCarton extends Evenement {
    couleur: CartonCouleur;
    constructor(temps: number, combattant: CombattantCouleur, couleur: CartonCouleur);
}
