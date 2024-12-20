export enum CartonCouleur {
  vert = "vert",
  bleu = "bleu",
  blanc = "blanc",
  jaune = "jaune",
  rouge = "rouge",
  noir = "noir",
}

export class Carton {
  constructor(
    public couleur: CartonCouleur,
    public points: number,
    public match: boolean,
    public mortSubite: boolean,
    public prolongation: boolean,
    public finDuMatch: boolean,
    public image: string,
    public cartonSuperieur: CartonCouleur,
  ) {}
}
