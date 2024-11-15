/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./Gui.ts" />
/// <reference path="./NodeUpdate.ts" />
/// <reference path="./throw.ts" />
/// <reference path="./tests.ts" />

const regle: Regle = Regle.getRegleByNom("FFE");
const matchState: MatchState = new MatchState();
const gui = new Gui(matchState, regle);

tests();
