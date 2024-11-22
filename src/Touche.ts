enum ToucheNom {
    main = "main",
    bras = "bras",
    jambe = "jambe",
    tronc = "tronc",
    tete = "tête",
}

class Touche {
    constructor(
        public nom: ToucheNom,
        public points: number,
        public mortSubite: boolean,
        public prolongation: boolean,
        public image: string,
    ) {
    }
}
