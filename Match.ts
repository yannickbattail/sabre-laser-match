/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchStatus.ts" />
/// <reference path="./NodeUpdate.ts" />

class EventLog {
    constructor(public temps: number, public combattant: "vert" | "rouge", public type: "touche" | "carton", public value: Carton | Touche, numeroCarton?: number) {}
}

class Match {
    public status: "prêt" | "en cours" | "pause" | "fini" = "prêt";
    public scores: { vert: number; rouge: number } = {vert: 0, rouge: 0};
    public mortSubite?: "ex aequo" | "limite" = undefined;
    public message: string = "";
    public probleme: string = "";
    public eventLog: EventLog[] = [];

    public static process(matchStatus: MatchStatus, regle: Regle) {
        const match = new Match();
        let nbCarton = {blanc: 0, jaune: 0, rouge: 0, noir: 0};
        let tempMax = regle.duree;
        for (let i = 0; i < matchStatus.historique.length; i++) {
            const evenement = matchStatus.historique[i];
            if (evenement.temps > tempMax) {
                match.probleme = `${evenement.type} apres le temps maximum!`;
                match.status = "fini";
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (evenement.type === "carton") {
                const evNom = evenement.nom as "blanc" | "jaune" | "rouge" | "noir";
                nbCarton[evNom]++;
                const carton = nbCarton[evNom] >= 2 ? regle.getCartonSuperieur(evNom): regle.getCarton(evNom);
                match.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evNom]));
                match.scores[match.adversaire(evenement.combattant)] += carton.points;
                if (carton.couleur === "noir") {
                    match.status = "fini";
                    match.message = `Fin du match: le combatant ${evenement.combattant} a recu un carton ${carton.couleur}.`;
                }
            } else if (evenement.type === "touche") {
                const touche = regle.getTouche(evenement.nom);
                match.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, touche));
                match.scores[evenement.combattant] += touche.points;
            }
            if (match.mortSubite) {
                match.status = "fini";
                match.message = `Fin du match: le combatant ${evenement.combattant} a gagné en mort subite.`;
            }
            if (match.scores.vert >= regle.mortSubiteScore && match.scores.rouge >= regle.mortSubiteScore) {
                match.mortSubite = "limite";
                match.message = `Mort subite: scores &gt; ${regle.mortSubiteScore}.`;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
            if (match.scores.vert === match.scores.rouge) {
                match.mortSubite = "ex aequo";
                match.message = `Mort subite: ex aequo prolongation de ${regle.prolongation}s.`;
                tempMax = regle.duree + regle.prolongation;
                //this.eventLog.push(new EventLog(evenement.temps, evenement.combattant, evenement.type, carton, nbCarton[evenement.nom]));
            }
        }
        return match;
    }
    private adversaire(combattant: "vert" | "rouge"): "vert" | "rouge" {
        return combattant === 'vert' ? 'rouge' : 'vert';
    }
    /*
    private calcScore(combattant) {
        let score = historique
            .filter(e => (e.combattant === combattant && e.type === 'touche'))
            .map(e => TOUCHES[e.nom].points).reduce((a, b) => a + b, 0)
        const cartons = historique.filter(e => (e.combattant === autreComabattant(combattant) && e.type === 'carton'));
        let nbCarton = {blanc: 0, jaune: 0, rouge: 0, noir: 0};
        for (let i = 0; i < cartons.length; i++) {
            const carton = cartons[i];
            nbCarton[carton.nom]++;
            score += cartonSuperieur(carton, nbCarton[carton.nom]).points;
        }
        return score;
    }

    private win() {
        if (calcScore("vert") > calcScore("rouge")) {
            return `Le combattant ${formatCombattant("vert")} gagne le combat!`;
        } else if (calcScore("rouge") > calcScore("vert")) {
            return `Le combattant ${formatCombattant("rouge")} gagne le combat!`;
        } else {
            return `Combattants ex aequo!`;
        }
    }

    private refresh() {
        NodeUpdate.updateDiv("historique", getHistorique());
        document.getElementById('scoreVert').innerHTML = calcScore("vert");
        document.getElementById('scoreRouge').innerHTML = calcScore("rouge");
        activeButtons(matchStatus !== "prêt");
        updateTimer();
    }

    private atInterval() {
        if (calcScore("vert") >= scoreMax || calcScore("rouge") >= scoreMax) {
            matchStatus = "fini";
            document.getElementById('message').innerHTML = win();
        } else if (time >= duree && calcScore("vert") !== calcScore("rouge")) {
            matchStatus = "fini";
            document.getElementById('message').innerHTML = win();
        } else if (time >= duree && time <= (duree + prolongation) && calcScore("vert") === calcScore("rouge")) {
            mortSubite(`Prolongation ${prolongation}s`);
        } else if (time > (duree + prolongation)) {
            matchStatus = "fini";
            document.getElementById('message').innerHTML = win();
        } else if (calcScore("vert") >= mortSubiteScore && calcScore("rouge") >= mortSubiteScore) {
            mortSubite();
        }
        if (matchStatus === "en cours") {
            time++;
        }
        refresh();
    }
    */
}
