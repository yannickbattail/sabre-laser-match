/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./regles.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./Gui.ts" />
/// <reference path="./NodeUpdate.ts" />
/// <reference path="./throw.ts" />


const regle: Regle = REGLES.find(r => r.nom === "FFE") || _throw(new Error("Règle FFE non trouvée"));
const matchStatus: MatchState = new MatchState();
const gui = new Gui(matchStatus, regle);
