import {
  CombattantCouleur,
  Evenement,
  EvenementCarton,
  EvenementTouche,
} from "./Evenement.js";
import { CartonCouleur } from "./Carton.js";
import { ToucheNom } from "./Touche.js";

export enum MatchStatus {
  pret = "prêt",
  en_cours = "en cours",
  pause = "pause",
  fini = "fini",
}

export class MatchState {
  constructor(
    public time: number = 0,
    public status: MatchStatus = MatchStatus.pret,
    public historique: Evenement[] = [],
  ) {}

  public addTouche(combattant: CombattantCouleur, nom: ToucheNom) {
    this.historique.push(new EvenementTouche(this.time, combattant, nom));
  }

  public addCarton(combattant: CombattantCouleur, couleur: CartonCouleur) {
    this.historique.push(new EvenementCarton(this.time, combattant, couleur));
  }

  public removeLastEvenement() {
    this.historique.pop();
  }

  public reset() {
    this.time = 0;
    this.status = MatchStatus.pret;
    this.historique = [];
  }
}
