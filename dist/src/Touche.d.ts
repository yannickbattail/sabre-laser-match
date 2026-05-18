export declare enum ToucheNom {
    main = "main",
    bras = "bras",
    jambe = "jambe",
    tronc = "tronc",
    tete = "t\u00EAte"
}
export declare class Touche {
    nom: ToucheNom;
    points: number;
    match: boolean;
    mortSubite: boolean;
    prolongation: boolean;
    image: string;
    constructor(nom: ToucheNom, points: number, match: boolean, mortSubite: boolean, prolongation: boolean, image: string);
}
