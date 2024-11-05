/// <reference path="./Evenement.ts" />

enum MatchStatus {
    prêt, en_cours, pause, fini,
}

class MatchState {
    constructor(public time: number = 0, public status: MatchStatus = MatchStatus.prêt, public historique: Evenement[] = []) {
    }

    public addEvenement(combattant: CombattantCouleur, type: EvenementType, nom: string) {
        this.historique.push(new Evenement(this.time, combattant, type, nom));
    }

    public removeLastEvenement() {
        this.historique.pop();
    }

    public reset() {
        this.time = 0;
        this.status = MatchStatus.prêt;
        this.historique = [];
    }
}
