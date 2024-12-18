import { CartonCouleur } from "./Carton.js";
import { ToucheNom } from "./Touche.js";

export enum CombattantCouleur {
  vert = "vert",
  rouge = "rouge",
}

export enum EvenementType {
  touche = "touche",
  carton = "carton",
}

export abstract class Evenement {
  constructor(
    public temps: number,
    public combattant: CombattantCouleur,
    public type: EvenementType,
  ) {}
}

export class EvenementTouche extends Evenement {
  constructor(
    temps: number,
    combattant: CombattantCouleur,
    public nom: ToucheNom,
  ) {
    super(temps, combattant, EvenementType.touche);
  }
}

export class EvenementCarton extends Evenement {
  constructor(
    temps: number,
    combattant: CombattantCouleur,
    public couleur: CartonCouleur,
  ) {
    super(temps, combattant, EvenementType.carton);
  }
}
