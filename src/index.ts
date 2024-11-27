import { MatchState } from "./MatchState";
import { Gui } from "./Gui";
import { tests } from "./tests";
import "./style.css";

// @ts-ignore
window["gui"] = new Gui(new MatchState());
tests();
