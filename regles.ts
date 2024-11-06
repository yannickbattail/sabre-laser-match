/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />

const REGLES: Regle[] = [
    new Regle("FFE", [
            new Carton(CartonCouleur.blanc, 0, "images/carton-blanc.svg", CartonCouleur.jaune),
            new Carton(CartonCouleur.jaune, 3, "images/carton-jaune.svg", CartonCouleur.rouge),
            new Carton(CartonCouleur.rouge, 5, "images/carton-rouge.svg", CartonCouleur.noir),
            new Carton(CartonCouleur.noir, 0, "images/carton-noir.svg", CartonCouleur.noir),
        ], [
            new Touche(ToucheNom.main, 1, false, "images/main.svg"),
            new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
            new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
            new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
            new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
        ],
        180, 30, 10, 15)
];
