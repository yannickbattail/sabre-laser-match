enum CombattantCouleur {
    "vert", "rouge"
}

enum EvenementType {
    "touche", "carton"
}

class Evenement {
    constructor(public temps: number, public combattant: CombattantCouleur, public type: EvenementType, public nom: string) {
    }
}
