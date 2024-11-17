"use strict";
class MatchModel {
    constructor(matchState, regle) {
        this.matchState = matchState;
        this.regle = regle;
        this.scores = { vert: 0, rouge: 0 };
        this.mortSubite = undefined;
        this.message = "";
        this.problem = "";
        this.eventLog = [];
        let nbCarton = {};
        nbCarton[CartonCouleur.blanc] = 0;
        nbCarton[CartonCouleur.jaune] = 0;
        nbCarton[CartonCouleur.rouge] = 0;
        nbCarton[CartonCouleur.noir] = 0;
        this.tempMax = regle.duree;
        if (this.matchState.status === MatchStatus.en_cours) {
            this.message = "Combattez!";
        }
        else if (this.matchState.status === MatchStatus.pause) {
            this.message = "Cessez!";
        }
        else if (this.matchState.status === MatchStatus.pret) {
            this.message = "Prêt?";
        }
        for (let i = 0; i < matchState.historique.length; i++) {
            const evenement = matchState.historique[i];
            if (evenement.temps > this.tempMax) {
                this.problem = `${evenement.type} apres le temps maximum!`;
                this.matchState.status = MatchStatus.fini;
            }
            if (evenement instanceof EvenementCarton) {
                this.processCarton(evenement, nbCarton);
            }
            else if (evenement instanceof EvenementTouche) {
                this.processTouche(evenement);
            }
            this.checkMortSubite(evenement.temps);
        }
        this.checkWin();
    }
    processTouche(evenement) {
        const touche = this.regle.getTouche(evenement.nom);
        this.eventLog.push(new EventLogTouche(evenement.temps, evenement.combattant, touche));
        this.scores[evenement.combattant] += touche.points;
    }
    processCarton(evenement, nbCarton) {
        const evNom = evenement.couleur;
        nbCarton[evNom]++;
        const carton = nbCarton[evNom] >= 2
            ? this.regle.getCartonSuperieur(evNom)
            : this.regle.getCarton(evNom);
        this.eventLog.push(new EventLogCarton(evenement.temps, evenement.combattant, this.regle.getCarton(evNom), Regle.adversaire(evenement.combattant), nbCarton[evNom]));
        this.scores[Regle.adversaire(evenement.combattant)] += carton.points;
        if (carton.couleur === CartonCouleur.noir) {
            this.matchState.status = MatchStatus.fini;
            this.message = `Fin du match: le combattant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
        }
    }
    checkMortSubite(tempsEvenement) {
        this.tempMax = this.regle.duree;
        if (this.scores[CombattantCouleur.vert] >= this.regle.mortSubiteScore &&
            this.scores[CombattantCouleur.rouge] >= this.regle.mortSubiteScore) {
            this.message = `Mort subite: scores &gt; ${this.regle.mortSubiteScore}.`;
            if (!this.mortSubite) {
                this.eventLog.push(new EventLogMortSubite(tempsEvenement, MortSubite.limite));
            }
            this.mortSubite = MortSubite.limite;
        }
        if (this.scores[CombattantCouleur.vert] === this.scores[CombattantCouleur.rouge] &&
            this.matchState.time > this.regle.duree) {
            if (this.mortSubite !== MortSubite.prolongation) {
                this.eventLog.push(new EventLogMortSubite(this.regle.duree, MortSubite.prolongation));
            }
            this.mortSubite = MortSubite.prolongation;
            this.message = `Mort subite: ex aequo prolongation de ${this.regle.prolongation}s.`;
            this.tempMax = this.regle.duree + this.regle.prolongation;
        }
    }
    checkWin() {
        if (this.mortSubite !== MortSubite.prolongation) {
            if (this.scores[CombattantCouleur.vert] >= this.regle.scoreMax) {
                return this.win(this.matchState.time, CombattantCouleur.vert, true);
            }
            else if (this.scores[CombattantCouleur.rouge] >= this.regle.scoreMax) {
                return this.win(this.matchState.time, CombattantCouleur.rouge, true);
            }
        }
        else {
            if (this.scores[CombattantCouleur.vert] > this.scores[CombattantCouleur.rouge]) {
                return this.win(this.matchState.time, CombattantCouleur.vert, false);
            }
            if (this.scores[CombattantCouleur.rouge] > this.scores[CombattantCouleur.vert]) {
                return this.win(this.matchState.time, CombattantCouleur.rouge, false);
            }
        }
        if (this.matchState.time > this.tempMax) {
            return this.win(this.tempMax, null, false);
        }
    }
    win(temps, combattantCouleur, b) {
        this.matchState.status = MatchStatus.fini;
        this.message = combattantCouleur
            ? `Fin du match: le combattant ${combattantCouleur} a gagné.`
            : `Fin du match: ex aequo.`;
        this.eventLog.push(new EventLogWin(temps, combattantCouleur, this.mortSubite));
    }
}
//# sourceMappingURL=MatchModel.js.map