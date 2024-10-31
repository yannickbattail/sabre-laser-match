/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />

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

    public getCarton(nom: string): Carton {
        return this.cartons.find(c => c.nom === nom);
    }
    public getCartonSuperieur(nom: string): Carton {
        return this.getCarton(this.cartons.find(c => c.nom === nom).cartonSuperieur);
    }

    public getTouche(nom: string): Touche {
        return this.touches.find(c => c.nom === nom);
    }
}