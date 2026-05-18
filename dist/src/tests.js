"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = tests;
const Regle_js_1 = require("./Regle.js");
const MatchState_js_1 = require("./MatchState.js");
const Evenement_js_1 = require("./Evenement.js");
const Carton_js_1 = require("./Carton.js");
const MatchModel_js_1 = require("./MatchModel.js");
const EventLog_js_1 = require("./EventLog.js");
const Touche_js_1 = require("./Touche.js");
const MortSubite_js_1 = require("./MortSubite.js");
function test1(regle) {
    const matchState = new MatchState_js_1.MatchState();
    matchState.historique.push(new Evenement_js_1.EvenementCarton(0, Evenement_js_1.CombattantCouleur.rouge, Carton_js_1.CartonCouleur.jaune));
    const matchModel = new MatchModel_js_1.MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 0 || matchModel.scores.vert !== 3) {
        console.error("Test1 failed", matchModel);
    }
    if (matchModel.eventLog.length !== 1 && !(matchModel.eventLog[0] instanceof EventLog_js_1.EventLogCarton)) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test1 passed");
}
function test2(regle) {
    const matchState = new MatchState_js_1.MatchState();
    matchState.historique.push(new Evenement_js_1.EvenementTouche(0, Evenement_js_1.CombattantCouleur.rouge, Touche_js_1.ToucheNom.bras));
    const matchModel = new MatchModel_js_1.MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 3 || matchModel.scores.vert !== 0) {
        console.error("Test2 failed", matchModel);
    }
    if (matchModel.eventLog.length !== 1 && !(matchModel.eventLog[0] instanceof EventLog_js_1.EventLogTouche)) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test2 passed");
}
function test3(regle) {
    const matchState = new MatchState_js_1.MatchState();
    matchState.status = MatchState_js_1.MatchStatus.en_cours;
    matchState.historique.push(new Evenement_js_1.EvenementTouche(0, Evenement_js_1.CombattantCouleur.rouge, Touche_js_1.ToucheNom.tete));
    matchState.historique.push(new Evenement_js_1.EvenementTouche(2, Evenement_js_1.CombattantCouleur.rouge, Touche_js_1.ToucheNom.tete));
    matchState.historique.push(new Evenement_js_1.EvenementTouche(4, Evenement_js_1.CombattantCouleur.vert, Touche_js_1.ToucheNom.tete));
    matchState.historique.push(new Evenement_js_1.EvenementTouche(6, Evenement_js_1.CombattantCouleur.vert, Touche_js_1.ToucheNom.tete));
    const matchModel = new MatchModel_js_1.MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 10 || matchModel.scores.vert !== 10) {
        console.error("Test3 score 10 failed", matchModel);
    }
    if (matchModel.mortSubite !== MortSubite_js_1.MortSubite.limite) {
        console.error("Test3 MortSubite failed", matchModel);
    }
    if (matchState.status !== MatchState_js_1.MatchStatus.en_cours) {
        console.error("Test3 MortSubite failed", matchModel);
    }
    if (matchModel.eventLog.length !== 5 && !(matchModel.eventLog[5] instanceof EventLog_js_1.EventLogMortSubite)) {
        console.error("Test3 eventLog failed", matchModel);
    }
    console.log("Test3 passed");
}
function test4(regle) {
    const matchState = new MatchState_js_1.MatchState();
    matchState.status = MatchState_js_1.MatchStatus.en_cours;
    matchState.historique.push(new Evenement_js_1.EvenementTouche(0, Evenement_js_1.CombattantCouleur.rouge, Touche_js_1.ToucheNom.tete));
    matchState.historique.push(new Evenement_js_1.EvenementTouche(6, Evenement_js_1.CombattantCouleur.vert, Touche_js_1.ToucheNom.tete));
    matchState.time = regle.duree + 2;
    const matchModel = new MatchModel_js_1.MatchModel(matchState, regle);
    if (matchModel.scores.rouge !== 5 || matchModel.scores.vert !== 5) {
        console.error("Test4 score 10 failed", matchModel);
    }
    if (matchModel.mortSubite !== MortSubite_js_1.MortSubite.prolongation) {
        console.error("Test4 MortSubite failed", matchModel);
    }
    if (matchState.status !== MatchState_js_1.MatchStatus.en_cours) {
        console.error("Test4 status failed", matchModel);
    }
    if (matchModel.eventLog.length !== 3 && !(matchModel.eventLog[5] instanceof EventLog_js_1.EventLogMortSubite)) {
        console.error("Test4 eventLog failed", matchModel);
    }
    console.log("Test4 passed");
}
function tests() {
    const regle = Regle_js_1.Regle.getRegleByNom("testing");
    test1(regle);
    test2(regle);
    test3(regle);
    test4(regle);
}
