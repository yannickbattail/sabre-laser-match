export var CombattantCouleur;
(function (CombattantCouleur) {
    CombattantCouleur["vert"] = "vert";
    CombattantCouleur["rouge"] = "rouge";
})(CombattantCouleur || (CombattantCouleur = {}));
export var EvenementType;
(function (EvenementType) {
    EvenementType["touche"] = "touche";
    EvenementType["carton"] = "carton";
})(EvenementType || (EvenementType = {}));
export class Evenement {
    temps;
    combattant;
    type;
    constructor(temps, combattant, type) {
        this.temps = temps;
        this.combattant = combattant;
        this.type = type;
    }
}
export class EvenementTouche extends Evenement {
    nom;
    constructor(temps, combattant, nom) {
        super(temps, combattant, EvenementType.touche);
        this.nom = nom;
    }
}
export class EvenementCarton extends Evenement {
    couleur;
    constructor(temps, combattant, couleur) {
        super(temps, combattant, EvenementType.carton);
        this.couleur = couleur;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbmVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbmVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBTixJQUFZLGlCQUdYO0FBSEQsV0FBWSxpQkFBaUI7SUFDM0Isa0NBQWEsQ0FBQTtJQUNiLG9DQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFHNUI7QUFFRCxNQUFNLENBQU4sSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLGtDQUFpQixDQUFBO0lBQ2pCLGtDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQUVELE1BQU0sT0FBZ0IsU0FBUztJQUVwQjtJQUNBO0lBQ0E7SUFIVCxZQUNTLEtBQWEsRUFDYixVQUE2QixFQUM3QixJQUFtQjtRQUZuQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBZTtJQUN6QixDQUFDO0NBQ0w7QUFFRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBSW5DO0lBSFQsWUFDRSxLQUFhLEVBQ2IsVUFBNkIsRUFDdEIsR0FBYztRQUVyQixLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFGeEMsUUFBRyxHQUFILEdBQUcsQ0FBVztJQUd2QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBSW5DO0lBSFQsWUFDRSxLQUFhLEVBQ2IsVUFBNkIsRUFDdEIsT0FBc0I7UUFFN0IsS0FBSyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRnhDLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFHL0IsQ0FBQztDQUNGIn0=