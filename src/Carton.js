export var CartonCouleur;
(function (CartonCouleur) {
    CartonCouleur["blanc"] = "blanc";
    CartonCouleur["jaune"] = "jaune";
    CartonCouleur["rouge"] = "rouge";
    CartonCouleur["noir"] = "noir";
})(CartonCouleur || (CartonCouleur = {}));
export class Carton {
    couleur;
    points;
    image;
    cartonSuperieur;
    constructor(couleur, points, image, cartonSuperieur) {
        this.couleur = couleur;
        this.points = points;
        this.image = image;
        this.cartonSuperieur = cartonSuperieur;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FydG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2FydG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLGFBS1g7QUFMRCxXQUFZLGFBQWE7SUFDdkIsZ0NBQWUsQ0FBQTtJQUNmLGdDQUFlLENBQUE7SUFDZixnQ0FBZSxDQUFBO0lBQ2YsOEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFMVyxhQUFhLEtBQWIsYUFBYSxRQUt4QjtBQUVELE1BQU0sT0FBTyxNQUFNO0lBRVI7SUFDQTtJQUNBO0lBQ0E7SUFKVCxZQUNTLE9BQXNCLEVBQ3RCLE1BQWMsRUFDZCxLQUFhLEVBQ2IsZUFBOEI7UUFIOUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLG9CQUFlLEdBQWYsZUFBZSxDQUFlO0lBQ3BDLENBQUM7Q0FDTCJ9