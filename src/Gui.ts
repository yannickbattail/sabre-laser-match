import {_throw} from "./throw.js";
import {Regle} from "./Regle.js";
import {MatchState, MatchStatus} from "./MatchState.js";
import {ToucheNom} from "./Touche.js";
import {CombattantCouleur} from "./Evenement.js";
import {CartonCouleur} from "./Carton.js";
import {MatchModel} from "./MatchModel.js";
import {EventLog, EventLogCarton, EventLogMortSubite, EventLogTouche, EventLogWin,} from "./EventLog.js";
import {MortSubite} from "./MortSubite.js";

class GuiElem {
    public historique =
        document.getElementById("historique") ||
        _throw(new Error("Element 'historique' non trouvé"));
    public time =
        document.getElementById("time") ||
        _throw(new Error("Element 'restant' non trouvé"));
    public scoreVert =
        document.getElementById("scoreVert") ||
        _throw(new Error("Element 'scoreVert' non trouvé"));
    public scoreRouge =
        document.getElementById("scoreRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));

    public touchesVert =
        document.getElementById("touchesVert") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    public touchesRouge =
        document.getElementById("touchesRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    public cartonsVert =
        document.getElementById("cartonsVert") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    public cartonsRouge =
        document.getElementById("cartonsRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));

    public play =
        document.getElementById("play") ||
        _throw(new Error("Element 'play' non trouvé"));
    public pause =
        document.getElementById("pause") ||
        _throw(new Error("Element 'pause' non trouvé"));
    public message =
        document.getElementById("message") ||
        _throw(new Error("Element 'message' non trouvé"));
    public changeRegle: HTMLOptionElement =
        (document.getElementById("changeRegle") as HTMLOptionElement) ||
        _throw(new Error("Element 'changeRegle' non trouvé"));

    public config =
        document.getElementById("config") ||
        _throw(new Error("Element 'config' non trouvé"));
    public combat =
        document.getElementById("combat") ||
        _throw(new Error("Element 'combat' non trouvé"));
}

export class Gui {
    private guiElem = new GuiElem();
    private regle: Regle;

    constructor(private readonly matchState: MatchState) {
        this.regle = this.getRegle();
        this.init();
        window.setInterval(() => {
            this.atInterval();
        }, 100);
    }

    public touche(nom: ToucheNom, combattant: CombattantCouleur) {
        this.matchState.addTouche(combattant, nom);
        this.refresh();
    }

    public carton(carton: CartonCouleur, combattant: CombattantCouleur) {
        this.matchState.addCarton(combattant, carton);
        this.refresh();
    }

    public reset() {
        this.matchState.reset();
        this.refresh();
    }

    public annuler() {
        this.matchState.removeLastEvenement();
        this.matchState.status = MatchStatus.en_cours;
        this.refresh();
    }

    public play() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.matchState.status = MatchStatus.pause;
        } else if (
            this.matchState.status === MatchStatus.pause ||
            this.matchState.status === MatchStatus.pret
        ) {
            this.matchState.status = MatchStatus.en_cours;
        }
        this.refresh();
    }

    public changeRegle() {
        if (
            this.matchState.status === MatchStatus.pret ||
            this.matchState.status === MatchStatus.fini ||
            confirm(
                "Changer de règle va remettre à zéro le match, voulez-vous continuer?",
            )
        ) {
            this.regle = this.getRegle();
            this.init();
            this.reset();
        }
    }

    public showConfig() {
        this.guiElem.config.style.display = "block";
        this.guiElem.combat.style.display = "none";
    }

    public hideConfig() {
        this.guiElem.config.style.display = "none";
        this.guiElem.combat.style.display = "block";
    }

    private init() {
        this.guiElem.touchesVert.innerHTML = this.initTouches(
            CombattantCouleur.vert,
        );
        this.guiElem.touchesRouge.innerHTML = this.initTouches(
            CombattantCouleur.rouge,
        );
        this.guiElem.cartonsVert.innerHTML = this.initCartons(
            CombattantCouleur.vert,
        );
        this.guiElem.cartonsRouge.innerHTML = this.initCartons(
            CombattantCouleur.rouge,
        );
        this.guiElem.changeRegle.innerHTML = this.initRegles();
    }

    private initTouches(combattant: CombattantCouleur): string {
        return this.regle.touches
            .map(
                (touche) =>
                    `<button class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}" />${touche.points}
            </button>`,
            )
            .join("");
    }

    private initCartons(combattant: CombattantCouleur): string {
        return this.regle.cartons
            .map(
                (carton) =>
                    `<button class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}" /> -${carton.points}
            </button>`,
            )
            .join("");
    }

    private initRegles(): string {
        return Regle.REGLES.map(
            (regle) =>
                `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ""}>${regle.nom}</option>`,
        ).join("");
    }

    private getRegle(): Regle {
        let regle = Regle.getRegleByNom(this.guiElem.changeRegle.value);
        console.info("Changement de règle: ", regle.nom);
        return regle;
    }

    private atInterval() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.matchState.time += 0.1;
        }
        this.refresh();
    }

    private refresh() {
        const match = new MatchModel(this.matchState, this.regle);
        this.guiElem.historique.innerHTML = this.getHistorique(match);
        this.guiElem.scoreVert.innerHTML = match.scores.vert.toString();
        this.guiElem.scoreRouge.innerHTML = match.scores.rouge.toString();
        this.guiElem.message.innerHTML = match.message;
        if (this.matchState.status === MatchStatus.en_cours) {
            this.guiElem.play.style.display = "none";
            this.guiElem.pause.style.display = "inline-block";
        } else {
            this.guiElem.play.style.display = "inline-block";
            this.guiElem.pause.style.display = "none";
        }
        this.activeButtons(match);
        this.updateTimer();
    }

    private formatCombattant(combattant: CombattantCouleur) {
        return `<span class="${combattant}Combattant">${combattant}</span>`;
    }

    private formatCarton(carton: CartonCouleur) {
        return `<img src="${this.regle.getCarton(carton).image}" alt="touche ${carton}" ;`;
    }

    private formatTouche(touche: ToucheNom) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" ;`;
    }

    private updateTimer() {
        this.guiElem.time.innerHTML = this.formatCountDown(this.matchState.time);
    }

    private formatCountDown(time: number) {
        const negativeTime = this.regle.duree - time;
        let css: string;
        if (negativeTime >= 0) {
            if (negativeTime > this.regle.duree * 0.25) {
                css = "positive";
            } else {
                css = "positive25th";
            }
        } else {
            css = "negative";
        }
        return `<span class="${css}">${this.formatTime(negativeTime)}</span>`;
    }

    private formatTime(time: number) {
        const t = Math.abs(time);
        const sign = Math.sign(time) === -1 ? "-" : "";
        let min = Math.floor(t / 60).toFixed(0).padStart(2, "0");
        let sec = (t % 60).toFixed(1).padStart(4, "0");
        return `${sign}${min}:${sec}s`;
    }

    private getHistorique(match: MatchModel) {
        let html = [];
        for (let i = 0; i < match.eventLog.length; i++) {
            const eventLog: EventLog = match.eventLog[i];
            const horodatage = `<span class="temps">[${this.formatTime(eventLog.temps)}]</span>`;
            if (eventLog instanceof EventLogCarton) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                if (eventLog.numeroCarton >= 2) {
                    html.push(
                        `<div>${prefix} ${eventLog.numeroCarton}e carton ${this.formatCarton(eventLog.carton.couleur)} &rarr; ${this.formatCarton(eventLog.carton.cartonSuperieur)}  (+${this.regle.getCartonSuperieur(eventLog.carton.couleur).points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`,
                    );
                } else {
                    html.push(
                        `<div>${prefix} ${eventLog.numeroCarton}er carton ${this.formatCarton(eventLog.carton.couleur)} (+${eventLog.carton.points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`,
                    );
                }
            } else if (eventLog instanceof EventLogTouche) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                html.push(
                    `<div>${prefix} touche ${this.formatTouche(eventLog.touche.nom)} (+${eventLog.touche.points})</div>`,
                );
            } else if (eventLog instanceof EventLogMortSubite) {
                if (eventLog.cause === MortSubite.limite) {
                    html.push(
                        `<div>${horodatage} mort subite: score des 2 combattants &gt; ${this.regle.mortSubiteScore}</div>`,
                    );
                } else {
                    html.push(
                        `<div>${horodatage} mort subite: score ex aequo, prolongation de ${this.regle.prolongation}s</div>`,
                    );
                }
            } else if (eventLog instanceof EventLogWin) {
                if (eventLog.combattant) {
                    html.push(
                        `<div>${horodatage} Fin du match: le combattant ${this.formatCombattant(eventLog.combattant)} a gagné!</div>`,
                    );
                } else {
                    html.push(`<div>${horodatage} Fin du match: ex aequo</div>`);
                }
            }
        }
        return html.reverse().join("");
    }

    private activeButtons(match: MatchModel) {
        if (match.mortSubite === MortSubite.limite) {
            this.enableButton(
                this.regle.getTouchesMortSubite(false).map((touche) => touche.nom),
                false,
            );
            this.enableButton(
                this.regle.getTouchesMortSubite(true).map((touche) => touche.nom),
                true,
            );
        } else if (match.mortSubite === MortSubite.prolongation) {
            this.enableButton(
                this.regle.getTouchesProlongation(false).map((touche) => touche.nom),
                false,
            );
            this.enableButton(
                this.regle.getTouchesProlongation(true).map((touche) => touche.nom),
                true,
            );
        } else {
            const enable = this.matchState.status !== MatchStatus.pret;
            this.enableButton(
                this.regle.touches.map((touche) => touche.nom),
                enable,
            );
            this.enableButton(
                this.regle.cartons.map((carton) => carton.couleur),
                enable,
            );
        }
    }

    private enableButton(buttonCss: string[], enable: boolean) {
        const buttons = document.querySelectorAll(
            buttonCss.map((btn) => "." + btn).join(","),
        );
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (button instanceof HTMLButtonElement) {
                button.disabled = !enable;
            } else {
                console.log(button);
            }
        }
    }
}
