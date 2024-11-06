/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./MatchModel.ts" />
/// <reference path="./EventLog.ts" />
/// <reference path="./NodeUpdate.ts" />

class GuiElem {
    public historique = document.getElementById('historique') || _throw(new Error("Element 'historique' non trouvé"));
    public time = document.getElementById('time') || _throw(new Error("Element 'restant' non trouvé"));
    public scoreVert = document.getElementById('scoreVert') || _throw(new Error("Element 'scoreVert' non trouvé"));
    public scoreRouge = document.getElementById('scoreRouge') || _throw(new Error("Element 'scoreRouge' non trouvé"));
}

class Gui {
    private time: number = 0;
    private guiElem = new GuiElem();

    constructor(private readonly matchState: MatchState, private regle: Regle) {
        window.setInterval(() => {
            this.atInterval()
        }, 1000);
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
        this.refresh();
    }

    public play() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.matchState.status = MatchStatus.pause;
        } else if (this.matchState.status === MatchStatus.pause || this.matchState.status === MatchStatus.pret) {
            this.matchState.status = MatchStatus.en_cours;
        }
        this.refresh();
    }

    private atInterval() {
        if (this.matchState.status === MatchStatus.en_cours) {
            this.time++;
        }
        this.refresh();
    }

    private refresh() {
        const match = new MatchModel(this.matchState, this.regle);
        this.guiElem.historique.innerHTML = this.getHistorique(match);
        this.guiElem.scoreVert.innerHTML = match.scores.vert.toString();
        this.guiElem.scoreRouge.innerHTML = match.scores.rouge.toString();
        this.activeButtons(match);
        this.updateTimer();
    }

    private formatCombattant(combattant: CombattantCouleur) {
        return `<span class="${combattant}Combattant">${combattant}</span>`;
    }

    private formatCarton(carton: CartonCouleur) {
        return `<img src="${this.regle.getCarton(carton).image}" alt="touche ${carton}" />`;
    }

    private formatTouche(touche: ToucheNom) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" />`;
    }

    private updateTimer() {
        this.guiElem.time.innerText = this.formatTime(this.time);
    }


    private formatTime(time: number) {
        return this.pad0(Math.floor(time / 60)) + ":" + this.pad0(time % 60);
    }

    private getHistorique(match: MatchModel) {
        let html = [];
        for (let i = 0; i < match.eventLog.length; i++) {
            const eventLog: EventLog = match.eventLog[i];
            const horodatage = `<span class="temps">[${this.formatTime(eventLog.temps)}]</span>`
            if (eventLog instanceof EventLogCarton) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                if (eventLog.numeroCarton >= 2) {
                    html.push(`<div>${prefix} ${eventLog.numeroCarton}e carton ${this.formatCarton(eventLog.carton.couleur)} &rarr; ${this.formatCarton(eventLog.carton.cartonSuperieur)}  (+${regle.getCartonSuperieur(eventLog.carton.couleur).points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`);
                } else {
                    html.push(`<div>${prefix} ${eventLog.numeroCarton}er carton ${this.formatCarton(eventLog.carton.couleur)} (+${eventLog.carton.points} combattant ${this.formatCombattant(eventLog.adversaire)})</div>`);
                }
            } else if (eventLog instanceof EventLogTouche) {
                const prefix = `${horodatage} combattant ${this.formatCombattant(eventLog.combattant)}: `;
                html.push(`<div>${prefix} touche ${this.formatTouche(eventLog.touche.nom)} (+${eventLog.touche.points})</div>`);
            } else if (eventLog instanceof EventLogMortSubite) {
                html.push(`<div>${horodatage} mort subite ${eventLog.cause}</div>`);
            }
        }
        return html.reverse().join('');
    }

    private pad0(value: number) {
        return value < 10 ? '0' + value : value;
    }

    private activeButtons(match: MatchModel) {
        if (match.mortSubite) {
            const touches = document.querySelectorAll('.main,.bras,.jambe');
            for (let i = 0; i < touches.length; i++) {
                const toucheElem = touches[i];
                if (toucheElem instanceof HTMLButtonElement) {
                    toucheElem.disabled = true;
                } else {
                    console.log(toucheElem);
                }
            }
        } else {
            const elems = document.querySelectorAll('.touche,.carton,.jambe');
            const active = match.status === MatchStatus.pret;
            console.log(match.status, active);
            for (let i = 0; i < elems.length; i++) {
                const toucheElem = elems[i];
                if (toucheElem instanceof HTMLButtonElement) {
                    toucheElem.disabled = !active;
                } else {
                    console.log(toucheElem);
                }
            }
        }
    }
}