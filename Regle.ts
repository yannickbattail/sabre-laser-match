/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./throw.ts" />

class Regle {
    constructor(
        public nom: string,
        public cartons: Carton[],
        public touches: Touche[],
        public duree = 180,
        public prolongation = 30,
        public mortSubiteScore = 10,
        public scoreMax = 15) {
    }

    public static adversaire(combattant: CombattantCouleur): CombattantCouleur {
        return combattant === CombattantCouleur.vert ? CombattantCouleur.rouge : CombattantCouleur.vert;
    }

    public getCarton(couleur: CartonCouleur): Carton {
        return this.cartons.find(c => c.couleur === couleur) || _throw(new Error(`Carton ${couleur} introuvable`));
    }

    public getCartonSuperieur(couleur: CartonCouleur): Carton {
        return this.getCarton(this.getCarton(couleur).cartonSuperieur) || _throw(new Error(`Carton superieur de ${couleur} introuvable`));
    }

    public getTouche(nom: ToucheNom): Touche {
        return this.touches.find(c => c.nom === nom) || _throw(new Error(`Touche ${nom} introuvable`));
    }
}