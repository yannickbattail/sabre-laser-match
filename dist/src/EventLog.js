"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogWin = exports.EventLogMortSubite = exports.EventLogCarton = exports.EventLogTouche = exports.EventLog = exports.EventLogType = void 0;
var EventLogType;
(function (EventLogType) {
    EventLogType["touche"] = "touche";
    EventLogType["carton"] = "carton";
    EventLogType["mortSubite"] = "mort subite";
    EventLogType["win"] = "gagn\u00E9";
})(EventLogType || (exports.EventLogType = EventLogType = {}));
class EventLog {
    type;
    temps;
    constructor(type, temps) {
        this.type = type;
        this.temps = temps;
    }
}
exports.EventLog = EventLog;
class EventLogTouche extends EventLog {
    temps;
    combattant;
    touche;
    constructor(temps, combattant, touche) {
        super(EventLogType.touche, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.touche = touche;
    }
}
exports.EventLogTouche = EventLogTouche;
class EventLogCarton extends EventLog {
    temps;
    combattant;
    carton;
    adversaire;
    numeroCarton;
    constructor(temps, combattant, carton, adversaire, numeroCarton) {
        super(EventLogType.carton, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.carton = carton;
        this.adversaire = adversaire;
        this.numeroCarton = numeroCarton;
    }
}
exports.EventLogCarton = EventLogCarton;
class EventLogMortSubite extends EventLog {
    temps;
    cause;
    constructor(temps, cause) {
        super(EventLogType.mortSubite, temps);
        this.temps = temps;
        this.cause = cause;
    }
}
exports.EventLogMortSubite = EventLogMortSubite;
class EventLogWin extends EventLog {
    temps;
    combattant;
    cause;
    constructor(temps, combattant, cause) {
        super(EventLogType.win, temps);
        this.temps = temps;
        this.combattant = combattant;
        this.cause = cause;
    }
}
exports.EventLogWin = EventLogWin;
