/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./throw.ts" />

class Regle {
    private static REGLES: Regle[] = [
        new Regle(
            "test",
            [
                new Carton(
                    CartonCouleur.blanc,
                    0,
                    "images/carton-blanc.svg",
                    CartonCouleur.jaune,
                ),
                new Carton(
                    CartonCouleur.jaune,
                    3,
                    "images/carton-jaune.svg",
                    CartonCouleur.rouge,
                ),
                new Carton(
                    CartonCouleur.rouge,
                    5,
                    "images/carton-rouge.svg",
                    CartonCouleur.noir,
                ),
                new Carton(
                    CartonCouleur.noir,
                    0,
                    "images/carton-noir.svg",
                    CartonCouleur.noir,
                ),
            ],
            [
                new Touche(ToucheNom.main, 1, false, "images/main.svg"),
                new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
                new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
                new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
                new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
            ],
            10,
            10,
            10,
            15,
        ), new Regle(
            "FFE",
            [
                new Carton(
                    CartonCouleur.blanc,
                    0,
                    "images/carton-blanc.svg",
                    CartonCouleur.jaune,
                ),
                new Carton(
                    CartonCouleur.jaune,
                    3,
                    "images/carton-jaune.svg",
                    CartonCouleur.rouge,
                ),
                new Carton(
                    CartonCouleur.rouge,
                    5,
                    "images/carton-rouge.svg",
                    CartonCouleur.noir,
                ),
                new Carton(
                    CartonCouleur.noir,
                    0,
                    "images/carton-noir.svg",
                    CartonCouleur.noir,
                ),
            ],
            [
                new Touche(ToucheNom.main, 1, false, "images/main.svg"),
                new Touche(ToucheNom.bras, 3, false, "images/bras.svg"),
                new Touche(ToucheNom.jambe, 3, false, "images/jambe.svg"),
                new Touche(ToucheNom.tronc, 5, true, "images/tronc.svg"),
                new Touche(ToucheNom.tete, 5, true, "images/tete.svg"),
            ], 180, 30, 10, 15)
    ];

    constructor(
        public nom: string,
        public cartons: Carton[],
        public touches: Touche[],
        public duree = 180,
        public prolongation = 30,
        public mortSubiteScore = 10,
        public scoreMax = 15,
    ) {
    }

    public static getRegleByNom(nomRegle: string): Regle {
        return (
            this.REGLES.find((r) => r.nom === nomRegle) ||
            _throw(new Error(`Regle ${nomRegle} introuvable`))
        );
    }

    public static adversaire(combattant: CombattantCouleur): CombattantCouleur {
        return combattant === CombattantCouleur.vert
            ? CombattantCouleur.rouge
            : CombattantCouleur.vert;
    }

    public getCarton(couleur: CartonCouleur): Carton {
        return (
            this.cartons.find((c) => c.couleur === couleur) ||
            _throw(new Error(`Carton ${couleur} introuvable`))
        );
    }

    public getCartonSuperieur(couleur: CartonCouleur): Carton {
        return (
            this.getCarton(this.getCarton(couleur).cartonSuperieur) ||
            _throw(new Error(`Carton superieur de ${couleur} introuvable`))
        );
    }

    public getTouche(nom: ToucheNom): Touche {
        return (
            this.touches.find((c) => c.nom === nom) ||
            _throw(new Error(`Touche ${nom} introuvable`))
        );
    }
}
