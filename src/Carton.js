export var CartonCouleur;
(function (CartonCouleur) {
    CartonCouleur["vert"] = "vert";
    CartonCouleur["bleu"] = "bleu";
    CartonCouleur["blanc"] = "blanc";
    CartonCouleur["jaune"] = "jaune";
    CartonCouleur["rouge"] = "rouge";
    CartonCouleur["noir"] = "noir";
})(CartonCouleur || (CartonCouleur = {}));
export class Carton {
    couleur;
    points;
    match;
    mortSubite;
    prolongation;
    finDuMatch;
    image;
    cartonSuperieur;
    constructor(couleur, points, match, mortSubite, prolongation, finDuMatch, image, cartonSuperieur) {
        this.couleur = couleur;
        this.points = points;
        this.match = match;
        this.mortSubite = mortSubite;
        this.prolongation = prolongation;
        this.finDuMatch = finDuMatch;
        this.image = image;
        this.cartonSuperieur = cartonSuperieur;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FydG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2FydG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLGFBT1g7QUFQRCxXQUFZLGFBQWE7SUFDdkIsOEJBQWEsQ0FBQTtJQUNiLDhCQUFhLENBQUE7SUFDYixnQ0FBZSxDQUFBO0lBQ2YsZ0NBQWUsQ0FBQTtJQUNmLGdDQUFlLENBQUE7SUFDZiw4QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQVBXLGFBQWEsS0FBYixhQUFhLFFBT3hCO0FBRUQsTUFBTSxPQUFPLE1BQU07SUFFUjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBUlQsWUFDUyxPQUFzQixFQUN0QixNQUFjLEVBQ2QsS0FBYyxFQUNkLFVBQW1CLEVBQ25CLFlBQXFCLEVBQ3JCLFVBQW1CLEVBQ25CLEtBQWEsRUFDYixlQUE4QjtRQVA5QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBZTtJQUNwQyxDQUFDO0NBQ0wifQ==