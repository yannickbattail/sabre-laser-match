/// <reference path="./Evenement.ts" />

class MatchStatus {
    constructor(public time: number = 0, public status: "prêt" | "en cours" | "pause" = "prêt", public historique: Evenement[] = []) {
    }

    public addEvenement(combattant: "vert" | "rouge", type: "touche" | "carton", nom: string) {
        this.historique.push(new Evenement(this.time, combattant, type, nom));
    }

    public removeLastEvenement() {
        this.historique.pop();
    }

    public reset() {
        this.time = 0;
        this.status = "prêt";
        this.historique = [];
    }
}
