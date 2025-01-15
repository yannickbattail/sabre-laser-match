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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2hTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hdGNoU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGVBQWUsRUFDZixlQUFlLEdBQ2hCLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsTUFBTSxDQUFOLElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNyQixpQ0FBYSxDQUFBO0lBQ2Isb0NBQXFCLENBQUE7SUFDckIsOEJBQWUsQ0FBQTtJQUNmLDRCQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsV0FBVyxLQUFYLFdBQVcsUUFLdEI7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUVaO0lBQ0E7SUFDQTtJQUhULFlBQ1MsT0FBZSxDQUFDLEVBQ2hCLFNBQXNCLFdBQVcsQ0FBQyxJQUFJLEVBQ3RDLGFBQTBCLEVBQUU7UUFGNUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFnQztRQUN0QyxlQUFVLEdBQVYsVUFBVSxDQUFrQjtJQUNsQyxDQUFDO0lBRUcsU0FBUyxDQUFDLFVBQTZCLEVBQUUsR0FBYztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxTQUFTLENBQUMsVUFBNkIsRUFBRSxPQUFzQjtRQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRiJ9