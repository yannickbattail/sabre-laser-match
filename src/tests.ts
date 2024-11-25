import {Regle} from "./Regle.js";
import {MatchState, MatchStatus} from "./MatchState.js";
import {CombattantCouleur, EvenementCarton, EvenementTouche,} from "./Evenement.js";
import {CartonCouleur} from "./Carton.js";
import {MatchModel} from "./MatchModel.js";
import {EventLogCarton, EventLogMortSubite, EventLogTouche} from "./EventLog.js";
import {ToucheNom} from "./Touche.js";
import {MortSubite} from "./MortSubite.js";

function test1(regle: Regle) {
    const matchState = new MatchState();
    matchState.historique.push(
        new EvenementCarton(0, CombattantCouleur.rouge, CartonCouleur.jaune),
    );
    const matchModel = new MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 0 || matchModel.scores.vert !== 3) {
        console.error("Test1 failed", matchModel);
    }
    if (
        matchModel.eventLog.length !== 1 &&
        !(matchModel.eventLog[0] instanceof EventLogCarton)
    ) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test1 passed");
}

function test2(regle: Regle) {
    const matchState = new MatchState();
    matchState.historique.push(
        new EvenementTouche(0, CombattantCouleur.rouge, ToucheNom.bras),
    );
    const matchModel = new MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 3 || matchModel.scores.vert !== 0) {
        console.error("Test2 failed", matchModel);
    }
    if (
        matchModel.eventLog.length !== 1 &&
        !(matchModel.eventLog[0] instanceof EventLogTouche)
    ) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test2 passed");
}

function test3(regle: Regle) {
    const matchState = new MatchState();
    matchState.status = MatchStatus.en_cours;
    matchState.historique.push(
        new EvenementTouche(0, CombattantCouleur.rouge, ToucheNom.tete),
    );
    matchState.historique.push(
        new EvenementTouche(2, CombattantCouleur.rouge, ToucheNom.tete),
    );
    matchState.historique.push(
        new EvenementTouche(4, CombattantCouleur.vert, ToucheNom.tete),
    );
    matchState.historique.push(
        new EvenementTouche(6, CombattantCouleur.vert, ToucheNom.tete),
    );
    const matchModel = new MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 10 || matchModel.scores.vert !== 10) {
        console.error("Test3 score 10 failed", matchModel);
    }
    if (matchModel.mortSubite !== MortSubite.limite) {
        console.error("Test3 MortSubite failed", matchModel);
    }
    if (matchState.status !== MatchStatus.en_cours) {
        console.error("Test3 MortSubite failed", matchModel);
    }
    if (
        matchModel.eventLog.length !== 5 &&
        !(matchModel.eventLog[5] instanceof EventLogMortSubite)
    ) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test3 passed");
}

function test4(regle: Regle) {
    const matchState = new MatchState();
    matchState.status = MatchStatus.en_cours;
    matchState.historique.push(
        new EvenementTouche(0, CombattantCouleur.rouge, ToucheNom.tete),
    );
    matchState.historique.push(
        new EvenementTouche(6, CombattantCouleur.vert, ToucheNom.tete),
    );
    matchState.time = regle.duree + 2;
    const matchModel = new MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 5 || matchModel.scores.vert !== 5) {
        console.error("Test4 score 10 failed", matchModel);
    }
    if (matchModel.mortSubite !== MortSubite.prolongation) {
        console.error("Test4 MortSubite failed", matchModel);
    }
    if (matchState.status !== MatchStatus.en_cours) {
        console.error("Test4 status failed", matchModel);
    }
    if (
        matchModel.eventLog.length !== 3 &&
        !(matchModel.eventLog[5] instanceof EventLogMortSubite)
    ) {
        console.error("Test4 eventLog failed", matchModel);
    }
    console.log("Test4 passed");
}

export function tests() {
    const regle: Regle = Regle.getRegleByNom("tests");
    test1(regle);
    test2(regle);
    test3(regle);
    test4(regle);
}
