import {
  EventLog,
  EventLogCarton,
  EventLogMortSubite,
  EventLogTouche,
  EventLogWin,
} from "./EventLog.js";
import { MatchState, MatchStatus } from "./MatchState.js";
import { CartonCouleur } from "./Carton.js";
import {
  CombattantCouleur,
  EvenementCarton,
  EvenementTouche,
} from "./Evenement.js";
import { MortSubite } from "./MortSubite.js";
import { Regle } from "./Regle.js";

export class MatchModel {
  public scores = { vert: 0, rouge: 0 };
  public mortSubite?: MortSubite = undefined;
  public message: string = "";
  public problem: string = "";
  public eventLog: EventLog[] = [];
  public tempMax: number;

  constructor(
    private matchState: MatchState,
    private regle: Regle,
  ) {
    const nbCarton: Record<CartonCouleur, number> = {} as Record<
      CartonCouleur,
      number
    >;
    nbCarton[CartonCouleur.vert] = 0;
    nbCarton[CartonCouleur.bleu] = 0;
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
      this.checkMortSubite(evenement.temps);
    }
    this.checkWin();
  }

  private processTouche(evenement: EvenementTouche) {
    const touche = this.regle.getTouche(evenement.nom);
    this.eventLog.push(
      new EventLogTouche(evenement.temps, evenement.combattant, touche),
    );
    this.scores[evenement.combattant] += touche.points;
  }

  private processCarton(
    evenement: EvenementCarton,
    nbCarton: Record<CartonCouleur, number>,
  ) {
    const evNom = evenement.couleur;
    nbCarton[evNom]++;
    const carton =
      nbCarton[evNom] >= 2
        ? this.regle.getCartonSuperieur(evNom)
        : this.regle.getCarton(evNom);
    this.eventLog.push(
      new EventLogCarton(
        evenement.temps,
        evenement.combattant,
        this.regle.getCarton(evNom),
        Regle.adversaire(evenement.combattant),
        nbCarton[evNom],
      ),
    );
    this.scores[Regle.adversaire(evenement.combattant)] += carton.points;
    if (carton.finDuMatch) {
      this.matchState.status = MatchStatus.fini;
      this.message = `Fin du match: le combattant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
    }
  }

  private checkMortSubite(tempsEvenement: number) {
    this.tempMax = this.regle.duree;
    if (
      this.scores[CombattantCouleur.vert] >= this.regle.mortSubiteScore &&
      this.scores[CombattantCouleur.rouge] >= this.regle.mortSubiteScore
    ) {
      this.message = `Mort subite: scores &gt; ${this.regle.mortSubiteScore}.`;
      if (!this.mortSubite) {
        this.eventLog.push(
          new EventLogMortSubite(tempsEvenement, MortSubite.limite),
        );
      }
      this.mortSubite = MortSubite.limite;
    }
    if (
      this.scores[CombattantCouleur.vert] ===
        this.scores[CombattantCouleur.rouge] &&
      this.matchState.time >= this.regle.duree
    ) {
      if (this.mortSubite !== MortSubite.prolongation) {
        this.eventLog.push(
          new EventLogMortSubite(this.regle.duree, MortSubite.prolongation),
        );
      }
      this.mortSubite = MortSubite.prolongation;
      this.message = `Mort subite: ex aequo prolongation de ${this.regle.prolongation}s.`;
      this.tempMax = this.regle.duree + this.regle.prolongation;
    }
  }

  private checkWin() {
    if (this.mortSubite !== MortSubite.prolongation) {
      if (this.scores[CombattantCouleur.vert] >= this.regle.scoreMax) {
        return this.win(this.matchState.time, CombattantCouleur.vert);
      } else if (this.scores[CombattantCouleur.rouge] >= this.regle.scoreMax) {
        return this.win(this.matchState.time, CombattantCouleur.rouge);
      }
    } else {
      if (
        this.scores[CombattantCouleur.vert] >
        this.scores[CombattantCouleur.rouge]
      ) {
        return this.win(this.matchState.time, CombattantCouleur.vert);
      }
      if (
        this.scores[CombattantCouleur.rouge] >
        this.scores[CombattantCouleur.vert]
      ) {
        return this.win(this.matchState.time, CombattantCouleur.rouge);
      }
    }
    if (this.matchState.time >= this.tempMax) {
      return this.win(this.tempMax, null);
    }
  }

  private win(temps: number, combattantCouleur: CombattantCouleur | null) {
    this.matchState.status = MatchStatus.fini;
    this.message = combattantCouleur
      ? `Fin du match: le combattant ${combattantCouleur} a gagné.`
      : `Fin du match: ex aequo.`;
    this.eventLog.push(
      new EventLogWin(temps, combattantCouleur, this.mortSubite),
    );
  }
}
