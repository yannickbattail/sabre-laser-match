"use strict";
class GuiElem {
    constructor() {
        this.historique = document.getElementById("historique") ||
            _throw(new Error("Element 'historique' non trouvé"));
        this.time = document.getElementById("time") ||
            _throw(new Error("Element 'restant' non trouvé"));
        this.scoreVert = document.getElementById("scoreVert") ||
            _throw(new Error("Element 'scoreVert' non trouvé"));
        this.scoreRouge = document.getElementById("scoreRouge") ||
            _throw(new Error("Element 'scoreRouge' non trouvé"));
        this.touchesVert = document.getElementById("touchesVert") ||
            _throw(new Error("Element 'scoreRouge' non trouvé"));
        this.touchesRouge = document.getElementById("touchesRouge") ||
            _throw(new Error("Element 'scoreRouge' non trouvé"));
        this.cartonsVert = document.getElementById("cartonsVert") ||
            _throw(new Error("Element 'scoreRouge' non trouvé"));
        this.cartonsRouge = document.getElementById("cartonsRouge") ||
            _throw(new Error("Element 'scoreRouge' non trouvé"));
        this.play = document.getElementById("play") ||
            _throw(new Error("Element 'play' non trouvé"));
        this.message = document.getElementById("message") ||
            _throw(new Error("Element 'message' non trouvé"));
        this.changeRegle = document.getElementById("changeRegle") ||
            _throw(new Error("Element 'changeRegle' non trouvé"));
    }
}
class Gui {
    constructor(matchState) {
        this.matchState = matchState;
        this.guiElem = new GuiElem();
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
        else if (this.matchState.status === MatchStatus.pause || this.matchState.status === MatchStatus.pret) {
            this.matchState.status = MatchStatus.en_cours;
        }
        this.refresh();
    }
    changeRegle() {
        if (this.matchState.status === MatchStatus.pret || this.matchState.status === MatchStatus.fini
            || confirm("Changer de règle va remettre à zéro le match, voulez-vous continuer?")) {
            this.regle = this.getRegle();
            this.init();
            this.reset();
        }
    }
    init() {
        this.guiElem.touchesVert.innerHTML = this.initTouches(CombattantCouleur.vert);
        this.guiElem.touchesRouge.innerHTML = this.initTouches(CombattantCouleur.rouge);
        this.guiElem.cartonsVert.innerHTML = this.initCartons(CombattantCouleur.vert);
        this.guiElem.cartonsRouge.innerHTML = this.initCartons(CombattantCouleur.rouge);
        this.guiElem.changeRegle.innerHTML = this.initRegles();
    }
    initTouches(combattant) {
        return this.regle.touches.map((touche) => `<button class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}"/>${touche.points}
            </button>`).join("");
    }
    initCartons(combattant) {
        return this.regle.cartons.map((carton) => `<button class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}"/>-${carton.points}
            </button>`).join("");
    }
    initRegles() {
        return Regle.REGLES.map((regle) => `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ''}>${regle.nom}</option>`).join("");
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
        this.guiElem.play.innerHTML =
            this.matchState.status === MatchStatus.en_cours
                ? '<img src="images/pause.svg" alt="mettre en pause le combat" />'
                : '<img src="images/play.svg" alt="démarrer le combat" />';
        this.activeButtons(match);
        this.updateTimer();
    }
    formatCombattant(combattant) {
        return `<span class="${combattant}Combattant">${combattant}</span>`;
    }
    formatCarton(carton) {
        return `<img src="${this.regle.getCarton(carton).image}" alt="touche ${carton}" />`;
    }
    formatTouche(touche) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" />`;
    }
    updateTimer() {
        this.guiElem.time.innerHTML = this.formatCountDown(this.matchState.time);
    }
    formatCountDown(time) {
        const negativeTime = this.regle.duree - time;
        let css;
        if (negativeTime >= 0) {
            if (negativeTime > (this.regle.duree * 0.25)) {
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
        let min = (t / 60).toFixed(0).padStart(2, '0');
        let sec = (t % 60).toFixed(1).padStart(4, '0');
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
    pad0(value) {
        return value < 10 ? "0" + value : value;
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
            const enable = this.matchState.status !== MatchStatus.pret &&
                this.matchState.status !== MatchStatus.fini;
            this.enableButton(this.regle.touches.map((touche) => touche.nom), enable);
            this.enableButton(this.regle.cartons.map((carton) => carton.couleur), enable);
        }
    }
    enableButton(buttonCss, enable) {
        const buttons = document.querySelectorAll(buttonCss.map((btn) => '.' + btn).join(","));
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
//# sourceMappingURL=Gui.js.map