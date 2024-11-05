/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />

import {EventLog} from "./EventLog";


class Match {
    public status: MatchStatus = MatchStatus.prêt;
    public scores: Record<CombattantCouleur, number> /* = {CombattantCouleur.vert: 0, CombattantCouleur.rouge: 0}*/;
    public mortSubite?: "ex aequo" | "limite" = undefined;
    public message: string = "";
    public probleme: string = "";
    public eventLog: EventLog[] = [];

    public static process(matchStatus: MatchState, regle: Regle) {
        const match = new Match();
        let nbCarton = {blanc: 0, jaune: 0, rouge: 0, noir: 0};
        let tempMax = regle.duree;
        for (let i = 0; i < matchStatus.historique.length; i++) {
            const evenement = matchStatus.historique[i];
            if (evenement.temps > tempMax) {
                match.probleme = `${evenement.type} apres le temps maximum!`;
                match.status = MatchStatus.fini;
                //match.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (evenement.type === EvenementType.carton) {
                const evNom = evenement.nom as "blanc" | "jaune" | "rouge" | "noir";
                nbCarton[evNom]++;
                const carton = nbCarton[evNom] >= 2 ? regle.getCartonSuperieur(evNom) : regle.getCarton(evNom);
                match.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evNom]));
                match.scores[match.adversaire(evenement.combattant)] += carton.points;
                if (carton.couleur === CartonCouleur.noir) {
                    match.status = MatchStatus.fini;
                    match.message = `Fin du match: le combatant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
                }
            } else if (evenement.type === EvenementType.touche) {
                const touche = regle.getTouche(evenement.nom);
                match.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, touche));
                match.scores[evenement.combattant] += touche.points;
            }
            if (match.mortSubite) {
                match.status = MatchStatus.fini;
                match.message = `Fin du match: le combatant ${evenement.combattant} a gagné en mort subite.`;
            }
            if (match.scores[CombattantCouleur.vert] >= regle.mortSubiteScore && match.scores[CombattantCouleur.rouge] >= regle.mortSubiteScore) {
                match.mortSubite = "limite";
                match.message = `Mort subite: scores &gt; ${regle.mortSubiteScore}.`;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (match.scores[CombattantCouleur.vert] === match.scores[CombattantCouleur.rouge]) {
                match.mortSubite = "ex aequo";
                match.message = `Mort subite: ex aequo prolongation de ${regle.prolongation}s.`;
                tempMax = regle.duree + regle.prolongation;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
        }
        return match;
    }

    private adversaire(combattant: CombattantCouleur): CombattantCouleur {
        return combattant === CombattantCouleur.vert ? CombattantCouleur.rouge : CombattantCouleur.vert;
    }
}
