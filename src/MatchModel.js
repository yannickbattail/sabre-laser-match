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
        const nbCarton = {};
        nbCarton[CartonCouleur.vert] = 0;
        nbCarton[CartonCouleur.bleu] = 0;
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
        if (carton.finDuMatch) {
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
                return this.win(this.matchState.time, CombattantCouleur.vert);
            }
            else if (this.scores[CombattantCouleur.rouge] >= this.regle.scoreMax) {
                return this.win(this.matchState.time, CombattantCouleur.rouge);
            }
        }
        else {
            if (this.scores[CombattantCouleur.vert] >
                this.scores[CombattantCouleur.rouge]) {
                return this.win(this.matchState.time, CombattantCouleur.vert);
            }
            if (this.scores[CombattantCouleur.rouge] >
                this.scores[CombattantCouleur.vert]) {
                return this.win(this.matchState.time, CombattantCouleur.rouge);
            }
        }
        if (this.matchState.time >= this.tempMax) {
            return this.win(this.tempMax, null);
        }
    }
    win(temps, combattantCouleur) {
        this.matchState.status = MatchStatus.fini;
        this.message = combattantCouleur
            ? `Fin du match: le combattant ${combattantCouleur} a gagné.`
            : `Fin du match: ex aequo.`;
        this.eventLog.push(new EventLogWin(temps, combattantCouleur, this.mortSubite));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2hNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hdGNoTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlLEdBQ2hCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsTUFBTSxPQUFPLFVBQVU7SUFTWDtJQUNBO0lBVEgsTUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDL0IsVUFBVSxHQUFnQixTQUFTLENBQUM7SUFDcEMsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsR0FBZSxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFTO0lBRXZCLFlBQ1UsVUFBc0IsRUFDdEIsS0FBWTtRQURaLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUVwQixNQUFNLFFBQVEsR0FBa0MsRUFHL0MsQ0FBQztRQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLFFB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