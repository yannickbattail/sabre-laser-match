import { MatchState } from "./MatchState";
import { Gui } from "./Gui";
import { tests } from "./tests";

const matchState: MatchState = new MatchState();
export const gui = new Gui(matchState);

tests();
