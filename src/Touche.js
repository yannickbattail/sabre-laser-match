export var ToucheNom;
(function (ToucheNom) {
    ToucheNom["main"] = "main";
    ToucheNom["bras"] = "bras";
    ToucheNom["jambe"] = "jambe";
    ToucheNom["tronc"] = "tronc";
    ToucheNom["tete"] = "t\u00EAte";
})(ToucheNom || (ToucheNom = {}));
export class Touche {
    nom;
    points;
    mortSubite;
    prolongation;
    image;
    constructor(nom, points, mortSubite, prolongation, image) {
        this.nom = nom;
        this.points = points;
        this.mortSubite = mortSubite;
        this.prolongation = prolongation;
        this.image = image;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG91Y2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVG91Y2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDbkIsMEJBQWEsQ0FBQTtJQUNiLDBCQUFhLENBQUE7SUFDYiw0QkFBZSxDQUFBO0lBQ2YsNEJBQWUsQ0FBQTtJQUNmLCtCQUFhLENBQUE7QUFDZixDQUFDLEVBTlcsU0FBUyxLQUFULFNBQVMsUUFNcEI7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQUVSO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFMVCxZQUNTLEdBQWMsRUFDZCxNQUFjLEVBQ2QsVUFBbUIsRUFDbkIsWUFBcUIsRUFDckIsS0FBYTtRQUpiLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ25CLENBQUM7Q0FDTCJ9