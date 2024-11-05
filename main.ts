/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./regles.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./Gui.ts" />
/// <reference path="./NodeUpdate.ts" />

const regle: Regle = REGLES.find(r => r.nom === "FFE");
const matchStatus: MatchState = new MatchState();
const gui = new Gui(matchStatus, regle);

window.setInterval(atInterval, 1000);