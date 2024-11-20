import { MatchState } from "./MatchState.js";
import { Gui } from "./Gui.js";
import { tests } from "./tests.js";
import "./style.css";

// @ts-ignore
window["gui"] = new Gui(new MatchState());
tests();
