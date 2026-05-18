import { CombattantCouleur } from "./Evenement.js";
import { Touche } from "./Touche.js";
import { Carton } from "./Carton.js";
import { MortSubite } from "./MortSubite.js";
export declare enum EventLogType {
    touche = "touche",
    carton = "carton",
    mortSubite = "mort subite",
    win = "gagn\u00E9"
}
export declare abstract class EventLog {
    type: EventLogType;
    temps: number;
    protected constructor(type: EventLogType, temps: number);
}
export declare class EventLogTouche extends EventLog {
    temps: number;
    combattant: CombattantCouleur;
    touche: Touche;
    constructor(temps: number, combattant: CombattantCouleur, touche: Touche);
}
export declare class EventLogCarton extends EventLog {
    temps: number;
    combattant: CombattantCouleur;
    carton: Carton;
    adversaire: CombattantCouleur;
    numeroCarton: number;
    constructor(temps: number, combattant: CombattantCouleur, carton: Carton, adversaire: CombattantCouleur, numeroCarton: number);
}
export declare class EventLogMortSubite extends EventLog {
    temps: number;
    cause: MortSubite;
    constructor(temps: number, cause: MortSubite);
}
export declare class EventLogWin extends EventLog {
    temps: number;
    combattant: CombattantCouleur | null;
    cause?: MortSubite | undefined;
    constructor(temps: number, combattant: CombattantCouleur | null, cause?: MortSubite | undefined);
}
