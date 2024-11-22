export enum CartonCouleur {
  blanc = "blanc",
  jaune = "jaune",
  rouge = "rouge",
  noir = "noir",
}

export class Carton {
  constructor(
    public couleur: CartonCouleur,
    public points: number,
    public image: string,
    public cartonSuperieur: CartonCouleur,
  ) {}
}
