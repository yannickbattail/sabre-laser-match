export var EventLogType;
(function (EventLogType) {
    EventLogType["touche"] = "touche";
    EventLogType["carton"] = "carton";
    EventLogType["mortSubite"] = "mort subite";
    EventLogType["win"] = "gagn\u00E9";
})(EventLogType || (EventLogType = {}));
export class EventLog {
    type;
    temps;
    constructor(type, temps) {
        this.type = type;
        this.temps = temps;
    }
}
export class EventLogTouche extends EventLog {
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
export class EventLogCarton extends EventLog {
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
export class EventLogMortSubite extends EventLog {
    temps;
    cause;
    constructor(temps, cause) {
        super(EventLogType.mortSubite, temps);
        this.temps = temps;
        this.cause = cause;
    }
}
export class EventLogWin extends EventLog {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFdmVudExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLENBQU4sSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3BCLGlDQUFpQixDQUFBO0lBQ2pCLGlDQUFpQixDQUFBO0lBQ2pCLDBDQUEwQixDQUFBO0lBQzFCLGtDQUFhLENBQUE7QUFDakIsQ0FBQyxFQUxXLFlBQVksS0FBWixZQUFZLFFBS3ZCO0FBRUQsTUFBTSxPQUFnQixRQUFRO0lBRWY7SUFDQTtJQUZYLFlBQ1csSUFBa0IsRUFDbEIsS0FBYTtRQURiLFNBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUV4QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sY0FBZSxTQUFRLFFBQVE7SUFFN0I7SUFDQTtJQUNBO0lBSFgsWUFDVyxLQUFhLEVBQ2IsVUFBNkIsRUFDN0IsTUFBYztRQUVyQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUozQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUd6QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sY0FBZSxTQUFRLFFBQVE7SUFFN0I7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxYLFlBQ1csS0FBYSxFQUNiLFVBQTZCLEVBQzdCLE1BQWMsRUFDZCxVQUE2QixFQUM3QixZQUFvQjtRQUUzQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQU4zQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFRO0lBRy9CLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxRQUFRO0lBRWpDO0lBQ0E7SUFGWCxZQUNXLEtBQWEsRUFDYixLQUFpQjtRQUV4QixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUgvQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUc1QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sV0FBWSxTQUFRLFFBQVE7SUFFMUI7SUFDQTtJQUNBO0lBSFgsWUFDVyxLQUFhLEVBQ2IsVUFBb0MsRUFDcEMsS0FBa0I7UUFFekIsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFKeEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ3BDLFVBQUssR0FBTCxLQUFLLENBQWE7SUFHN0IsQ0FBQztDQUNKIn0=