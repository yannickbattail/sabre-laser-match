/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchModel.ts" />
/// <reference path="./MortSubite.ts" />

abstract class EventLog {
    protected constructor(public temps: number) {
    }
}

class EventLogTouche extends EventLog {
    constructor(public temps: number, public combattant: CombattantCouleur, public touche: Touche) {
        super(temps);
    }
}

class EventLogCarton extends EventLog {
    constructor(public temps: number, public combattant: CombattantCouleur, public carton: Carton, public adversaire: CombattantCouleur, public numeroCarton: number) {
        super(temps);
    }
}

class EventLogMortSubite extends EventLog {
    constructor(public temps: number, public cause: MortSubite) {
        super(temps);
    }
}
