import { Carton, CartonCouleur } from "./Carton.js";
import { Touche, ToucheNom } from "./Touche.js";
import { CombattantCouleur } from "./Evenement.js";
export declare class Regle {
    nom: string;
    cartons: Carton[];
    touches: Touche[];
    duree: number;
    prolongation: number;
    mortSubiteScore: number;
    scoreMax: number;
    static REGLES: Regle[];
    constructor(nom: string, cartons: Carton[], touches: Touche[], duree?: number, prolongation?: number, mortSubiteScore?: number, scoreMax?: number);
    static getRegleByNom(nomRegle: string): Regle;
    static adversaire(combattant: CombattantCouleur): CombattantCouleur;
    getCarton(couleur: CartonCouleur): Carton;
    getCartonSuperieur(couleur: CartonCouleur): Carton;
    getTouche(nom: ToucheNom): Touche;
    getTouchesMatch(match: boolean): Touche[];
    getTouchesMortSubite(mortSubite: boolean): Touche[];
    getTouchesProlongation(prolongation: boolean): Touche[];
}
