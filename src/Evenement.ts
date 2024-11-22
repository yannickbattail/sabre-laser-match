enum CombattantCouleur {
    vert = "vert",
    rouge = "rouge",
}

enum EvenementType {
    touche = "touche",
    carton = "carton",
}

abstract class Evenement {
    constructor(
        public temps: number,
        public combattant: CombattantCouleur,
        public type: EvenementType,
    ) {
    }
}

class EvenementTouche extends Evenement {
    constructor(
        temps: number,
        combattant: CombattantCouleur,
        public nom: ToucheNom,
    ) {
        super(temps, combattant, EvenementType.touche);
    }
}

class EvenementCarton extends Evenement {
    constructor(
        temps: number,
        combattant: CombattantCouleur,
        public couleur: CartonCouleur,
    ) {
        super(temps, combattant, EvenementType.carton);
    }
}
