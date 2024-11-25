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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbmVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbmVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBTixJQUFZLGlCQUdYO0FBSEQsV0FBWSxpQkFBaUI7SUFDekIsa0NBQWEsQ0FBQTtJQUNiLG9DQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFHNUI7QUFFRCxNQUFNLENBQU4sSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3JCLGtDQUFpQixDQUFBO0lBQ2pCLGtDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQUVELE1BQU0sT0FBZ0IsU0FBUztJQUVoQjtJQUNBO0lBQ0E7SUFIWCxZQUNXLEtBQWEsRUFDYixVQUE2QixFQUM3QixJQUFtQjtRQUZuQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBZTtJQUU5QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBSS9CO0lBSFgsWUFDSSxLQUFhLEVBQ2IsVUFBNkIsRUFDdEIsR0FBYztRQUVyQixLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFGeEMsUUFBRyxHQUFILEdBQUcsQ0FBVztJQUd6QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBSS9CO0lBSFgsWUFDSSxLQUFhLEVBQ2IsVUFBNkIsRUFDdEIsT0FBc0I7UUFFN0IsS0FBSyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRnhDLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFHakMsQ0FBQztDQUNKIn0=