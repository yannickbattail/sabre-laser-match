"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModel = void 0;
const EventLog_js_1 = require("./EventLog.js");
const MatchState_js_1 = require("./MatchState.js");
const Carton_js_1 = require("./Carton.js");
const Evenement_js_1 = require("./Evenement.js");
const MortSubite_js_1 = require("./MortSubite.js");
const Regle_js_1 = require("./Regle.js");
class MatchModel {
    matchState;
    regle;
    scores = { vert: 0, rouge: 0 };
    mortSubite = undefined;
    message = "";
    problem = "";
    eventLog = [];
    tempMax;
    constructor(matchState, regle) {
        this.matchState = matchState;
        this.regle = regle;
        const nbCarton = {};
        nbCarton[Carton_js_1.CartonCouleur.vert] = 0;
        nbCarton[Carton_js_1.CartonCouleur.bleu] = 0;
        nbCarton[Carton_js_1.CartonCouleur.blanc] = 0;
        nbCarton[Carton_js_1.CartonCouleur.jaune] = 0;
        nbCarton[Carton_js_1.CartonCouleur.rouge] = 0;
        nbCarton[Carton_js_1.CartonCouleur.noir] = 0;
        this.tempMax = regle.duree;
        if (this.matchState.status === MatchState_js_1.MatchStatus.en_cours) {
            this.message = "Combattez!";
        }
        else if (this.matchState.status === MatchState_js_1.MatchStatus.pause) {
            this.message = "Cessez!";
        }
        else if (this.matchState.status === MatchState_js_1.MatchStatus.pret) {
            this.message = "Prêt?";
        }
        for (let i = 0; i < matchState.historique.length; i++) {
            const evenement = matchState.historique[i];
            if (evenement.temps > this.tempMax) {
                this.problem = `${evenement.type} apres le temps maximum!`;
                this.matchState.status = MatchState_js_1.MatchStatus.fini;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (evenement instanceof Evenement_js_1.EvenementCarton) {
                this.processCarton(evenement, nbCarton);
            }
            else if (evenement instanceof Evenement_js_1.EvenementTouche) {
                this.processTouche(evenement);
            }
            this.checkMortSubite(evenement.temps);
        }
        this.checkWin();
    }
    processTouche(evenement) {
        const touche = this.regle.getTouche(evenement.nom);
        this.eventLog.push(new EventLog_js_1.EventLogTouche(evenement.temps, evenement.combattant, touche));
        this.scores[evenement.combattant] += touche.points;
    }
    processCarton(evenement, nbCarton) {
        const evNom = evenement.couleur;
        nbCarton[evNom]++;
        const carton = nbCarton[evNom] >= 2 ? this.regle.getCartonSuperieur(evNom) : this.regle.getCarton(evNom);
        this.eventLog.push(new EventLog_js_1.EventLogCarton(evenement.temps, evenement.combattant, this.regle.getCarton(evNom), Regle_js_1.Regle.adversaire(evenement.combattant), nbCarton[evNom]));
        this.scores[Regle_js_1.Regle.adversaire(evenement.combattant)] += carton.points;
        if (carton.finDuMatch) {
            this.matchState.status = MatchState_js_1.MatchStatus.fini;
            this.message = `Fin du match: le combattant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
        }
    }
    checkMortSubite(tempsEvenement) {
        this.tempMax = this.regle.duree;
        if (this.scores[Evenement_js_1.CombattantCouleur.vert] >= this.regle.mortSubiteScore &&
            this.scores[Evenement_js_1.CombattantCouleur.rouge] >= this.regle.mortSubiteScore) {
            this.message = `Mort subite: scores &gt; ${this.regle.mortSubiteScore}.`;
            if (!this.mortSubite) {
                this.eventLog.push(new EventLog_js_1.EventLogMortSubite(tempsEvenement, MortSubite_js_1.MortSubite.limite));
            }
            this.mortSubite = MortSubite_js_1.MortSubite.limite;
        }
        if (this.scores[Evenement_js_1.CombattantCouleur.vert] === this.scores[Evenement_js_1.CombattantCouleur.rouge] &&
            this.matchState.time >= this.regle.duree) {
            if (this.mortSubite !== MortSubite_js_1.MortSubite.prolongation) {
                this.eventLog.push(new EventLog_js_1.EventLogMortSubite(this.regle.duree, MortSubite_js_1.MortSubite.prolongation));
            }
            this.mortSubite = MortSubite_js_1.MortSubite.prolongation;
            this.message = `Mort subite: ex aequo prolongation de ${this.regle.prolongation}s.`;
            this.tempMax = this.regle.duree + this.regle.prolongation;
        }
    }
    checkWin() {
        if (this.mortSubite !== MortSubite_js_1.MortSubite.prolongation) {
            if (this.scores[Evenement_js_1.CombattantCouleur.vert] >= this.regle.scoreMax) {
                return this.win(this.matchState.time, Evenement_js_1.CombattantCouleur.vert);
            }
            else if (this.scores[Evenement_js_1.CombattantCouleur.rouge] >= this.regle.scoreMax) {
                return this.win(this.matchState.time, Evenement_js_1.CombattantCouleur.rouge);
            }
        }
        else {
            if (this.scores[Evenement_js_1.CombattantCouleur.vert] > this.scores[Evenement_js_1.CombattantCouleur.rouge]) {
                return this.win(this.matchState.time, Evenement_js_1.CombattantCouleur.vert);
            }
            if (this.scores[Evenement_js_1.CombattantCouleur.rouge] > this.scores[Evenement_js_1.CombattantCouleur.vert]) {
                return this.win(this.matchState.time, Evenement_js_1.CombattantCouleur.rouge);
            }
        }
        if (this.matchState.time >= this.tempMax) {
            return this.win(this.tempMax, null);
        }
    }
    win(temps, combattantCouleur) {
        this.matchState.status = MatchState_js_1.MatchStatus.fini;
        this.message = combattantCouleur
            ? `Fin du match: le combattant ${combattantCouleur} a gagné.`
            : `Fin du match: ex aequo.`;
        this.eventLog.push(new EventLog_js_1.EventLogWin(temps, combattantCouleur, this.mortSubite));
    }
}
exports.MatchModel = MatchModel;
