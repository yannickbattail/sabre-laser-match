/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />

const REGLES: Regle[] = [
    new Regle("FFE", [
            new Carton("blanc", 0, "images/carton-blanc.svg", "jaune"),
            new Carton("jaune", 3, "images/carton-jaune.svg", "rouge"),
            new Carton("rouge", 5, "images/carton-rouge.svg", "noir"),
            new Carton("noir", 0, "images/carton-noir.svg", "noir")
        ], [
            new Touche("main", 1, false, "images/main.svg"),
            new Touche("bras", 3, false, "images/bras.svg"),
            new Touche("jambe", 3, false, "images/jambe.svg"),
            new Touche("tronc", 5, true, "images/tronc.svg"),
            new Touche("tête", 5, true, "images/tete.svg"),
        ],
        180, 30, 10, 15)
];
