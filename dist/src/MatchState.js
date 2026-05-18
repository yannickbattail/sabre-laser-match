"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchState = exports.MatchStatus = void 0;
const Evenement_js_1 = require("./Evenement.js");
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["pret"] = "pr\u00EAt";
    MatchStatus["en_cours"] = "en cours";
    MatchStatus["pause"] = "pause";
    MatchStatus["fini"] = "fini";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
class MatchState {
    time;
    status;
    historique;
    constructor(time = 0, status = MatchStatus.pret, historique = []) {
        this.time = time;
        this.status = status;
        this.historique = historique;
    }
    addTouche(combattant, nom) {
        this.historique.push(new Evenement_js_1.EvenementTouche(this.time, combattant, nom));
    }
    addCarton(combattant, couleur) {
        this.historique.push(new Evenement_js_1.EvenementCarton(this.time, combattant, couleur));
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
exports.MatchState = MatchState;
