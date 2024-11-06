/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./EventLog.ts" />
/// <reference path="./MortSubite.ts" />


class MatchModel {
    public scores = {vert: 0, rouge: 0};
    public mortSubite?: MortSubite = undefined;
    public message: string = "";
    public problem: string = "";
    public eventLog: EventLog[] = [];
    public tempMax: number;

    constructor(private matchState: MatchState, private regle: Regle) {
        let nbCarton: Record<CartonCouleur, number> = {} as Record<CartonCouleur, number>;
        nbCarton[CartonCouleur.blanc] = 0;
        nbCarton[CartonCouleur.jaune] = 0;
        nbCarton[CartonCouleur.rouge] = 0;
        nbCarton[CartonCouleur.noir] = 0;
        this.tempMax = regle.duree;
        if (this.matchState.status === MatchStatus.en_cours) {
            this.message = "Combattez!";
        } else if (this.matchState.status === MatchStatus.pause) {
            this.message = "Cessez!";
        } else if (this.matchState.status === MatchStatus.pret) {
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
            } else if (evenement instanceof EvenementTouche) {
                this.processTouche(evenement);
            }
            if (this.mortSubite) {
                this.matchState.status = MatchStatus.fini;
                this.message = `Fin du match: le combattant ${evenement.combattant} a gagné en mort subite.`;
            }
            this.tempMax = this.regle.duree + this.checkMortSubite(evenement.temps);
            this.checkWin(evenement.temps);
        }
    }

    private processTouche(evenement: EvenementTouche) {
        const touche = this.regle.getTouche(evenement.nom);
        this.eventLog.push(new EventLogTouche(evenement.temps, evenement.combattant, touche));
        this.scores[evenement.combattant] += touche.points;
    }

    private processCarton(evenement: EvenementCarton, nbCarton: Record<CartonCouleur, number>) {
        const evNom = evenement.couleur;
        nbCarton[evNom]++;
        const carton = nbCarton[evNom] >= 2 ? this.regle.getCartonSuperieur(evNom) : this.regle.getCarton(evNom);
        this.eventLog.push(new EventLogCarton(evenement.temps, evenement.combattant, this.regle.getCarton(evNom), Regle.adversaire(evenement.combattant), nbCarton[evNom]));
        this.scores[Regle.adversaire(evenement.combattant)] += carton.points;
        if (carton.couleur === CartonCouleur.noir) {
            this.matchState.status = MatchStatus.fini;
            this.message = `Fin du match: le combattant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
        }
    }

    private checkMortSubite(temps: number) {
        if (this.scores[CombattantCouleur.vert] >= this.regle.mortSubiteScore && this.scores[CombattantCouleur.rouge] >= this.regle.mortSubiteScore) {
            this.mortSubite = MortSubite.limite;
            this.message = `Mort subite: scores &gt; ${this.regle.mortSubiteScore}.`;
            this.eventLog.push(new EventLogMortSubite(temps, MortSubite.limite));
            return 0;
        }
        if (temps >= this.regle.duree && temps < this.regle.duree + this.regle.prolongation) {

        }
        if (this.scores[CombattantCouleur.vert] === this.scores[CombattantCouleur.rouge] && temps > this.regle.duree) {
            this.mortSubite = MortSubite.prolongation;
            this.message = `Mort subite: ex aequo prolongation de ${this.regle.prolongation}s.`;
            this.eventLog.push(new EventLogMortSubite(temps, MortSubite.prolongation));
            return this.regle.prolongation;
        }
        return 0;
    }

    private checkWin(temps: number) {
        if (this.mortSubite === MortSubite.prolongation) {
            if (this.scores[CombattantCouleur.vert] > this.scores[CombattantCouleur.rouge]) {
                this.win(temps, CombattantCouleur.vert);
            }
            if (this.scores[CombattantCouleur.rouge] > this.scores[CombattantCouleur.vert]) {
                this.win(temps, CombattantCouleur.rouge);
            }
        } else {
            if (this.scores[CombattantCouleur.vert] >= this.regle.scoreMax) {
                this.win(temps, CombattantCouleur.vert);
            } else if (this.scores[CombattantCouleur.rouge] >= this.regle.scoreMax) {
                this.win(temps, CombattantCouleur.rouge);
            }
        }
        if (this.matchState.time > this.tempMax) {
            this.win(temps, null);
        }
    }

    private win(temps: number, combattantCouleur: CombattantCouleur | null) {
        this.matchState.status = MatchStatus.fini;
        this.message = combattantCouleur
            ? `Fin du match: le combattant ${combattantCouleur} a gagné.`
            : `Fin du match: ex aequo.`;
        this.eventLog.push(new EventLogWin(temps, combattantCouleur, this.mortSubite));
    }
}
