import { EvenementCarton, EvenementTouche, } from "./Evenement.js";
export var MatchStatus;
(function (MatchStatus) {
    MatchStatus["pret"] = "pr\u00EAt";
    MatchStatus["en_cours"] = "en cours";
    MatchStatus["pause"] = "pause";
    MatchStatus["fini"] = "fini";
})(MatchStatus || (MatchStatus = {}));
export class MatchState {
    time;
    status;
    historique;
    constructor(time = 0, status = MatchStatus.pret, historique = []) {
        this.time = time;
        this.status = status;
        this.historique = historique;
    }
    addTouche(combattant, nom) {
        this.historique.push(new EvenementTouche(this.time, combattant, nom));
    }
    addCarton(combattant, couleur) {
        this.historique.push(new EvenementCarton(this.time, combattant, couleur));
    }
    removeLastEvenement() {
        this.historique.pop();
    }
    reset() {
        this.time = 0;
        this.status = MatchStatus.pret;
        this.historique = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2hTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hdGNoU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUErQixlQUFlLEVBQUUsZUFBZSxHQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJL0YsTUFBTSxDQUFOLElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNuQixpQ0FBYSxDQUFBO0lBQ2Isb0NBQXFCLENBQUE7SUFDckIsOEJBQWUsQ0FBQTtJQUNmLDRCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUxXLFdBQVcsS0FBWCxXQUFXLFFBS3RCO0FBRUQsTUFBTSxPQUFPLFVBQVU7SUFFUjtJQUNBO0lBQ0E7SUFIWCxZQUNXLE9BQWUsQ0FBQyxFQUNoQixTQUFzQixXQUFXLENBQUMsSUFBSSxFQUN0QyxhQUEwQixFQUFFO1FBRjVCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0M7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFFdkMsQ0FBQztJQUVNLFNBQVMsQ0FBQyxVQUE2QixFQUFFLEdBQWM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sU0FBUyxDQUFDLFVBQTZCLEVBQUUsT0FBc0I7UUFDbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sbUJBQW1CO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0oifQ==