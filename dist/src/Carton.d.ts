export declare enum CartonCouleur {
    vert = "vert",
    bleu = "bleu",
    blanc = "blanc",
    jaune = "jaune",
    rouge = "rouge",
    noir = "noir"
}
export declare class Carton {
    couleur: CartonCouleur;
    points: number;
    match: boolean;
    mortSubite: boolean;
    prolongation: boolean;
    finDuMatch: boolean;
    image: string;
    cartonSuperieur: CartonCouleur;
    constructor(couleur: CartonCouleur, points: number, match: boolean, mortSubite: boolean, prolongation: boolean, finDuMatch: boolean, image: string, cartonSuperieur: CartonCouleur);
}
