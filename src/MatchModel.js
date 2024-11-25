import { EventLogCarton, EventLogMortSubite, EventLogTouche, EventLogWin, } from "./EventLog.js";
import { MatchStatus } from "./MatchState.js";
import { CartonCouleur } from "./Carton.js";
import { CombattantCouleur, EvenementCarton, EvenementTouche, } from "./Evenement.js";
import { MortSubite } from "./MortSubite.js";
import { Regle } from "./Regle.js";
export class MatchModel {
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
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
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
        if (this.scores[CombattantCouleur.vert] ===
            this.scores[CombattantCouleur.rouge] &&
            this.matchState.time >= this.regle.duree) {
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
            if (this.scores[CombattantCouleur.vert] >
                this.scores[CombattantCouleur.rouge]) {
                return this.win(this.matchState.time, CombattantCouleur.vert, false);
            }
            if (this.scores[CombattantCouleur.rouge] >
                this.scores[CombattantCouleur.vert]) {
                return this.win(this.matchState.time, CombattantCouleur.rouge, false);
            }
        }
        if (this.matchState.time >= this.tempMax) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2hNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hdGNoTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFXLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxHQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBYSxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsZUFBZSxHQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFakMsTUFBTSxPQUFPLFVBQVU7SUFTUDtJQUNBO0lBVEwsTUFBTSxHQUFHLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7SUFDN0IsVUFBVSxHQUFnQixTQUFTLENBQUM7SUFDcEMsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsR0FBZSxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFTO0lBRXZCLFlBQ1ksVUFBc0IsRUFDdEIsS0FBWTtRQURaLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUVwQixJQUFJLFFBQVEsR0FBa0MsRUFHN0MsQ0FBQztRQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLFFBQVEs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