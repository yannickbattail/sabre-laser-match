import { _throw } from "./throw.js";
import { Regle } from "./Regle.js";
import { MatchStatus } from "./MatchState.js";
import { CombattantCouleur } from "./Evenement.js";
import { MatchModel } from "./MatchModel.js";
import { EventLogCarton, EventLogMortSubite, EventLogTouche, EventLogWin, } from "./EventLog.js";
import { MortSubite } from "./MortSubite.js";
class GuiElem {
    historique = document.getElementById("historique") ||
        _throw(new Error("Element 'historique' non trouvé"));
    time = document.getElementById("time") ||
        _throw(new Error("Element 'restant' non trouvé"));
    scoreVert = document.getElementById("scoreVert") ||
        _throw(new Error("Element 'scoreVert' non trouvé"));
    scoreRouge = document.getElementById("scoreRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    touchesVert = document.getElementById("touchesVert") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    touchesRouge = document.getElementById("touchesRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    cartonsVert = document.getElementById("cartonsVert") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    cartonsRouge = document.getElementById("cartonsRouge") ||
        _throw(new Error("Element 'scoreRouge' non trouvé"));
    play = document.getElementById("play") ||
        _throw(new Error("Element 'play' non trouvé"));
    pause = document.getElementById("pause") ||
        _throw(new Error("Element 'pause' non trouvé"));
    message = document.getElementById("message") ||
        _throw(new Error("Element 'message' non trouvé"));
    changeRegle = document.getElementById("changeRegle") ||
        _throw(new Error("Element 'changeRegle' non trouvé"));
    config = document.getElementById("config") ||
        _throw(new Error("Element 'config' non trouvé"));
    combat = document.getElementById("combat") ||
        _throw(new Error("Element 'combat' non trouvé"));
}
export class Gui {
    matchState;
    guiElem = new GuiElem();
    regle;
    constructor(matchState) {
        this.matchState = matchState;
        this.regle = this.getRegle();
        this.init();
        window.setInterval(() => {
            this.atInterval();
        }, 100);
    }
    touche(nom, combattant) {
        this.matchState.addTouche(combattant, nom);
        this.refresh();
    }
    carton(carton, combattant) {
        this.matchState.addCarton(combattant, carton);
        this.refresh();
    }
    reset() {
        this.matchState.reset();
        this.refresh();
    }
    annuler() {
        this.matchState.removeLastEvenement();
        this.matchState.status = MatchStatus.en_cours;
        this.refresh();
    }
    play() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.matchState.status = MatchStatus.pause;
        }
        else if (this.matchState.status === MatchStatus.pause ||
            this.matchState.status === MatchStatus.pret) {
            this.matchState.status = MatchStatus.en_cours;
        }
        this.refresh();
    }
    changeRegle() {
        if (this.matchState.status === MatchStatus.pret ||
            this.matchState.status === MatchStatus.fini ||
            confirm("Changer de règle va remettre à zéro le match, voulez-vous continuer?")) {
            this.regle = this.getRegle();
            this.init();
            this.reset();
        }
    }
    showConfig() {
        this.guiElem.config.style.display = "block";
        this.guiElem.combat.style.display = "none";
    }
    hideConfig() {
        this.guiElem.config.style.display = "none";
        this.guiElem.combat.style.display = "block";
    }
    init() {
        this.guiElem.touchesVert.innerHTML = this.initTouches(CombattantCouleur.vert);
        this.guiElem.touchesRouge.innerHTML = this.initTouches(CombattantCouleur.rouge);
        this.guiElem.cartonsVert.innerHTML = this.initCartons(CombattantCouleur.vert);
        this.guiElem.cartonsRouge.innerHTML = this.initCartons(CombattantCouleur.rouge);
        this.guiElem.changeRegle.innerHTML = this.initRegles();
    }
    initTouches(combattant) {
        return this.regle.touches
            .map((touche) => `<button class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}" />${touche.points}
            </button>`)
            .join("");
    }
    initCartons(combattant) {
        return this.regle.cartons
            .map((carton) => `<button class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}" /> -${carton.points}
            </button>`)
            .join("");
    }
    initRegles() {
        return Regle.REGLES.map((regle) => `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ""}>${regle.nom}</option>`).join("");
    }
    getRegle() {
        let regle = Regle.getRegleByNom(this.guiElem.changeRegle.value);
        console.info("Changement de règle: ", regle.nom);
        return regle;
    }
    atInterval() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.matchState.time += 0.1;
        }
        this.refresh();
    }
    refresh() {
        const match = new MatchModel(this.matchState, this.regle);
        this.guiElem.historique.innerHTML = this.getHistorique(match);
        this.guiElem.scoreVert.innerHTML = match.scores.vert.toString();
        this.guiElem.scoreRouge.innerHTML = match.scores.rouge.toString();
        this.guiElem.message.innerHTML = match.message;
        if (this.matchState.status === MatchStatus.en_cours) {
            this.guiElem.play.style.display = "none";
            this.guiElem.pause.style.display = "inline-block";
        }
        else {
            this.guiElem.play.style.display = "inline-block";
            this.guiElem.pause.style.display = "none";
        }
        this.activeButtons(match);
        this.updateTimer();
    }
    formatCombattant(combattant) {
        return `<span class="${combattant}Combattant">${combattant}</span>`;
    }
    formatCarton(carton) {
        return `<img src="${this.regle.getCarton(carton).image}" alt="touche ${carton}" ;`;
    }
    formatTouche(touche) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" ;`;
    }
    updateTimer() {
        this.guiElem.time.innerHTML = this.formatCountDown(this.matchState.time);
    }
    formatCountDown(time) {
        const negativeTime = this.regle.duree - time;
        let css;
        if (negativeTime >= 0) {
            if (negativeTime > this.regle.duree * 0.25) {
                css = "positive";
            }
            else {
                css = "positive25th";
            }
        }
        else {
            css = "negative";
        }
        return `<span class="${css}">${this.formatTime(negativeTime)}</span>`;
    }
    formatTime(time) {
        const t = Math.abs(time);
        const sign = Math.sign(time) === -1 ? "-" : "";
        let min = Math.floor(t / 60).toFixed(0).padStart(2, "0");
        let sec = (t % 60).toFixed(1).padStart(4, "0");
        return `${sign}${min}:${sec}s`;
    }
    getHistorique(match) {
        let html = [];
        for (let i = 0; i < match.eventLog.length; i++) {
            const eventLog = match.eventLog[i];
            const horodatage = `<span class="temps">[${this.formatTime(eventLog.temps)}]</span>`;
            if (eventLog instanceof EventLogCarton) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                if (eventLog.numeroCarton >= 2) {
                    html.push(`<div>${prefix} ${eventLog.numeroCarton}e carton ${this.formatCarton(eventLog.carton.couleur)} &rarr; ${this.formatCarton(eventLog.carton.cartonSuperieur)}  (+${this.regle.getCartonSuperieur(eventLog.carton.couleur).points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`);
                }
                else {
                    html.push(`<div>${prefix} ${eventLog.numeroCarton}er carton ${this.formatCarton(eventLog.carton.couleur)} (+${eventLog.carton.points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`);
                }
            }
            else if (eventLog instanceof EventLogTouche) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                html.push(`<div>${prefix} touche ${this.formatTouche(eventLog.touche.nom)} (+${eventLog.touche.points})</div>`);
            }
            else if (eventLog instanceof EventLogMortSubite) {
                if (eventLog.cause === MortSubite.limite) {
                    html.push(`<div>${horodatage} mort subite: score des 2 combattants &gt; ${this.regle.mortSubiteScore}</div>`);
                }
                else {
                    html.push(`<div>${horodatage} mort subite: score ex aequo, prolongation de ${this.regle.prolongation}s</div>`);
                }
            }
            else if (eventLog instanceof EventLogWin) {
                if (eventLog.combattant) {
                    html.push(`<div>${horodatage} Fin du match: le combattant ${this.formatCombattant(eventLog.combattant)} a gagné!</div>`);
                }
                else {
                    html.push(`<div>${horodatage} Fin du match: ex aequo</div>`);
                }
            }
        }
        return html.reverse().join("");
    }
    activeButtons(match) {
        if (match.mortSubite === MortSubite.limite) {
            this.enableButton(this.regle.getTouchesMortSubite(false).map((touche) => touche.nom), false);
            this.enableButton(this.regle.getTouchesMortSubite(true).map((touche) => touche.nom), true);
        }
        else if (match.mortSubite === MortSubite.prolongation) {
            this.enableButton(this.regle.getTouchesProlongation(false).map((touche) => touche.nom), false);
            this.enableButton(this.regle.getTouchesProlongation(true).map((touche) => touche.nom), true);
        }
        else {
            const enable = this.matchState.status !== MatchStatus.pret;
            this.enableButton(this.regle.touches.map((touche) => touche.nom), enable);
            this.enableButton(this.regle.cartons.map((carton) => carton.couleur), enable);
        }
    }
    enableButton(buttonCss, enable) {
        const buttons = document.querySelectorAll(buttonCss.map((btn) => "." + btn).join(","));
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (button instanceof HTMLButtonElement) {
                button.disabled = !enable;
            }
            else {
                console.log(button);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBVyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFdBQVcsR0FBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsTUFBTSxPQUFPO0lBQ0YsVUFBVSxHQUNiLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxHQUNQLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7SUFDL0MsU0FBUyxHQUNaLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7SUFDakQsVUFBVSxHQUNiLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUM7SUFFbEQsV0FBVyxHQUNkLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLEtBQUss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