/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./regles.ts" />
/// <reference path="./MatchStatus.ts" />
/// <reference path="./Gui.ts" />
/// <reference path="./NodeUpdate.ts" />

const regle: Regle = REGLES.find(r => r.nom === "FFE");
const matchStatus: MatchStatus = new MatchStatus();
const gui = new Gui(matchStatus, regle);

window.setInterval(atInterval, 1000);