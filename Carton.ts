enum CartonCouleur {
    'blanc', 'jaune', 'rouge', 'noir'
}

class Carton {
    constructor(public couleur: CartonCouleur, public points: number, public image: string, public cartonSuperieur: CartonCouleur) {
    }
}