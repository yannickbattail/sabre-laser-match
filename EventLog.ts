/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchModel.ts" />
/// <reference path="./MortSubite.ts" />

enum EventLogType {
    touche = "touche",
    carton = "carton",
    mortSubite = "mort subite",
    win = "gagné",
}

abstract class EventLog {
    protected constructor(public type: EventLogType, public temps: number) {
    }
}

class EventLogTouche extends EventLog {
    constructor(
        public temps: number,
        public combattant: CombattantCouleur,
        public touche: Touche,
    ) {
        super(EventLogType.touche, temps);
    }
}

class EventLogCarton extends EventLog {
    constructor(
        public temps: number,
        public combattant: CombattantCouleur,
        public carton: Carton,
        public adversaire: CombattantCouleur,
        public numeroCarton: number,
    ) {
        super(EventLogType.carton, temps);
    }
}

class EventLogMortSubite extends EventLog {
    constructor(
        public temps: number,
        public cause: MortSubite,
    ) {
        super(EventLogType.mortSubite, temps);
    }
}

class EventLogWin extends EventLog {
    constructor(
        public temps: number,
        public combattant: CombattantCouleur | null,
        public cause?: MortSubite) {
        super(EventLogType.win, temps);
    }
}
