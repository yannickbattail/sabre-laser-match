"use strict";
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["pret"] = "pr\u00EAt";
    MatchStatus["en_cours"] = "en cours";
    MatchStatus["pause"] = "pause";
    MatchStatus["fini"] = "fini";
})(MatchStatus || (MatchStatus = {}));
class MatchState {
    constructor(time = 0, status = MatchStatus.pret, historique = []) {
        this.time = time;
        this.status = status;
        this.historique = historique;
    }
    addTouche(combattant, nom) {
        this.historique.push(new EvenementTouche(this.time, combattant, nom));
    }
    addCarton(combattant, couleur) {
        this.historique.push(new EvenementCarton(this.time, combattant, couleur));
    }
    removeLastEvenement() {
        this.historique.pop();
    }
    reset() {
        this.time = 0;
        this.status = MatchStatus.pret;
        this.historique = [];
    }
}
//# sourceMappingURL=MatchState.js.map