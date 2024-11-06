/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./EventLog.ts" />
/// <reference path="./MortSubite.ts" />


class MatchModel {
    public status: MatchStatus = MatchStatus.pret;
    public scores = {vert: 0, rouge: 0};
    public mortSubite?: MortSubite = undefined;
    public message: string = "";
    public problem: string = "";
    public eventLog: EventLog[] = [];

    constructor(private matchState: MatchState, private regle: Regle) {
        let nbCarton: Record<CartonCouleur, number> = {} as Record<CartonCouleur, number>;
        nbCarton[CartonCouleur.blanc] = 0;
        nbCarton[CartonCouleur.jaune] = 0;
        nbCarton[CartonCouleur.rouge] = 0;
        nbCarton[CartonCouleur.noir] = 0;
        let tempMax = regle.duree;
        for (let i = 0; i < matchState.historique.length; i++) {
            const evenement = matchState.historique[i];
            if (evenement.temps > tempMax) {
                this.problem = `${evenement.type} apres le temps maximum!`;
                this.status = MatchStatus.fini;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (evenement instanceof EvenementCarton) {
                this.processCarton(evenement, nbCarton);
            } else if (evenement instanceof EvenementTouche) {
                this.processTouche(evenement);
            }
            if (this.mortSubite) {
                this.status = MatchStatus.fini;
                this.message = `Fin du match: le combatant ${evenement.combattant} a gagné en mort subite.`;
            }
            tempMax = this.regle.duree + this.checkMortSubite(evenement.temps);
        }
    }

    private checkMortSubite(temps: number) {
        if (this.scores[CombattantCouleur.vert] >= this.regle.mortSubiteScore && this.scores[CombattantCouleur.rouge] >= this.regle.mortSubiteScore) {
            this.mortSubite = MortSubite.limite;
            this.message = `Mort subite: scores &gt; ${this.regle.mortSubiteScore}.`;
            this.eventLog.push(new EventLogMortSubite(temps, MortSubite.limite));
            return 0;
        }
        if (this.scores[CombattantCouleur.vert] === this.scores[CombattantCouleur.rouge]) {
            this.mortSubite = MortSubite.ex_aequo;
            this.message = `Mort subite: ex aequo prolongation de ${this.regle.prolongation}s.`;
            this.eventLog.push(new EventLogMortSubite(temps, MortSubite.ex_aequo));
            return this.regle.prolongation;
        }
        return 0;
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
        this.eventLog.push(new EventLogCarton(evenement.temps, evenement.combattant, carton, Regle.adversaire(evenement.combattant), nbCarton[evNom]));
        this.scores[Regle.adversaire(evenement.combattant)] += carton.points;
        if (carton.couleur === CartonCouleur.noir) {
            this.status = MatchStatus.fini;
            this.message = `Fin du match: le combatant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
        }
    }

}
