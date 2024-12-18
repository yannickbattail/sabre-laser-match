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
    match;
    mortSubite;
    prolongation;
    image;
    constructor(nom, points, match, mortSubite, prolongation, image) {
        this.nom = nom;
        this.points = points;
        this.match = match;
        this.mortSubite = mortSubite;
        this.prolongation = prolongation;
        this.image = image;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG91Y2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVG91Y2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDakIsMEJBQWEsQ0FBQTtJQUNiLDBCQUFhLENBQUE7SUFDYiw0QkFBZSxDQUFBO0lBQ2YsNEJBQWUsQ0FBQTtJQUNmLCtCQUFhLENBQUE7QUFDakIsQ0FBQyxFQU5XLFNBQVMsS0FBVCxTQUFTLFFBTXBCO0FBRUQsTUFBTSxPQUFPLE1BQU07SUFFSjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFOWCxZQUNXLEdBQWMsRUFDZCxNQUFjLEVBQ2QsS0FBYyxFQUNkLFVBQW1CLEVBQ25CLFlBQXFCLEVBQ3JCLEtBQWE7UUFMYixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUFTO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQVE7SUFFeEIsQ0FBQztDQUNKIn0=