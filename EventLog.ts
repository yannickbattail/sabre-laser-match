/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />

export class EventLog {
    constructor(public temps: number, public combattant: CombattantCouleur, public type: EvenementType, public value: Carton | Touche, numeroCarton?: number) {
    }
}