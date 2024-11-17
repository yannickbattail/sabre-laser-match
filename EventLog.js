"use strict";
var EventLogType;
(function (EventLogType) {
    EventLogType["touche"] = "touche";
    EventLogType["carton"] = "carton";
    EventLogType["mortSubite"] = "mort subite";
    EventLogType["win"] = "gagn\u00E9";
})(EventLogType || (EventLogType = {}));
class EventLog {
    constructor(type, temps) {
        this.type = type;
        this.temps = temps;
    }
}
class EventLogTouche extends EventLog {
    constructor(temps, combattant, touche) {
        super(EventLogType.touche, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.touche = touche;
    }
}
class EventLogCarton extends EventLog {
    constructor(temps, combattant, carton, adversaire, numeroCarton) {
        super(EventLogType.carton, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.carton = carton;
        this.adversaire = adversaire;
        this.numeroCarton = numeroCarton;
    }
}
class EventLogMortSubite extends EventLog {
    constructor(temps, cause) {
        super(EventLogType.mortSubite, temps);
        this.temps = temps;
        this.cause = cause;
    }
}
class EventLogWin extends EventLog {
    constructor(temps, combattant, cause) {
        super(EventLogType.win, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.cause = cause;
    }
}
//# sourceMappingURL=EventLog.js.map