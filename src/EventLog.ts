import { CombattantCouleur } from "./Evenement";
import { Touche } from "./Touche";
import { Carton } from "./Carton";
import { MortSubite } from "./MortSubite";

export enum EventLogType {
  touche = "touche",
  carton = "carton",
  mortSubite = "mort subite",
  win = "gagné",
}

export abstract class EventLog {
  protected constructor(
    public type: EventLogType,
    public temps: number,
  ) {}
}

export class EventLogTouche extends EventLog {
  constructor(
    public temps: number,
    public combattant: CombattantCouleur,
    public touche: Touche,
  ) {
    super(EventLogType.touche, temps);
  }
}

export class EventLogCarton extends EventLog {
  constructor(
    public temps: number,
    public combattant: CombattantCouleur,
    public carton: Carton,
    public adversaire: CombattantCouleur,
    public numeroCarton: number,
  ) {
    super(EventLogType.carton, temps);
  }
}

export class EventLogMortSubite extends EventLog {
  constructor(
    public temps: number,
    public cause: MortSubite,
  ) {
    super(EventLogType.mortSubite, temps);
  }
}

export class EventLogWin extends EventLog {
  constructor(
    public temps: number,
    public combattant: CombattantCouleur | null,
    public cause?: MortSubite,
  ) {
    super(EventLogType.win, temps);
  }
}
