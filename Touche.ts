enum ToucheNom {
    "main", "bras", "jambe", "tronc", "tête"
}

class Touche {
    constructor(public nom: ToucheNom, public points: number, public mortSubite: boolean, public image: string) {
    }
}
