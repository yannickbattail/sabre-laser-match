import { EventLog } from "./EventLog.js";
import { MatchState } from "./MatchState.js";
import { MortSubite } from "./MortSubite.js";
import { Regle } from "./Regle.js";
export declare class MatchModel {
    private matchState;
    private regle;
    scores: {
        vert: number;
        rouge: number;
    };
    mortSubite?: MortSubite;
    message: string;
    problem: string;
    eventLog: EventLog[];
    tempMax: number;
    constructor(matchState: MatchState, regle: Regle);
    private processTouche;
    private processCarton;
    private checkMortSubite;
    private checkWin;
    private win;
}
