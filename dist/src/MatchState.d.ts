import { CombattantCouleur, Evenement } from "./Evenement.js";
import { CartonCouleur } from "./Carton.js";
import { ToucheNom } from "./Touche.js";
export declare enum MatchStatus {
    pret = "pr\u00EAt",
    en_cours = "en cours",
    pause = "pause",
    fini = "fini"
}
export declare class MatchState {
    time: number;
    status: MatchStatus;
    historique: Evenement[];
    constructor(time?: number, status?: MatchStatus, historique?: Evenement[]);
    addTouche(combattant: CombattantCouleur, nom: ToucheNom): void;
    addCarton(combattant: CombattantCouleur, couleur: CartonCouleur): void;
    removeLastEvenement(): void;
    reset(): void;
}
