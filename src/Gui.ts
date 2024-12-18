import {_throw} from "./throw.js";
import {Regle} from "./Regle.js";
import {MatchState, MatchStatus} from "./MatchState.js";
import {Touche, ToucheNom} from "./Touche.js";
import {CombattantCouleur} from "./Evenement.js";
import {Carton, CartonCouleur} from "./Carton.js";
import {MatchModel} from "./MatchModel.js";
import {EventLog, EventLogCarton, EventLogMortSubite, EventLogTouche, EventLogWin,} from "./EventLog.js";
import {MortSubite} from "./MortSubite.js";
import {NodeUpdate} from "./NodeUpdate.js";

class GuiElem {

    public play =
        document.getElementById("play") ||
        _throw(new Error("Element 'play' non trouvé"));
    public pause =
        document.getElementById("pause") ||
        _throw(new Error("Element 'pause' non trouvé"));
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

    public changeValeurReglesNumber(elem: HTMLInputElement) {
        const name = elem.id;
        const value = parseInt(elem.value);
        const reglePerso: Regle = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);
        if (name === "duree") {
            reglePerso.duree = value;
        } else if (name === "prolongation") {
            reglePerso.prolongation = value;
        } else if (name === "mortSubiteScore") {
            reglePerso.mortSubiteScore = value;
        } else if (name === "scoreMax") {
            reglePerso.scoreMax = value;
        } else if (name.startsWith('touche_points_')) {
            const touche = name.replace('touche_points_', '');
            reglePerso.getTouche(touche as ToucheNom).points = value;
        } else if (name.startsWith('carton_points_')) {
            const carton = name.replace('carton_points_', '');
            reglePerso.getCarton(carton as CartonCouleur).points = value;
        } else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }

    public changeValeurReglesBool(elem: HTMLInputElement) {
        const name = elem.id;
        const value = elem.checked;
        const reglePerso: Regle = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);

        if (name.startsWith('touche_match_')) {
            const touche = name.replace('touche_match_', '');
            reglePerso.getTouche(touche as ToucheNom).match = !!value;
        } else if (name.startsWith('touche_mortSubite_')) {
            const touche = name.replace('touche_mortSubite_', '');
            reglePerso.getTouche(touche as ToucheNom).mortSubite = !!value;
        } else if (name.startsWith('touche_prolongation_')) {
            const touche = name.replace('touche_prolongation_', '');
            reglePerso.getTouche(touche as ToucheNom).prolongation = !!value;
        } else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }

    public changeValeurReglesEnum(elem: HTMLInputElement) {
        const name = elem.id;
        const value = elem.value;
        const reglePerso: Regle = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);

        if (name.startsWith('carton_sup_')) {
            const carton = name.replace('carton_sup_', '');
            reglePerso.getCarton(carton as CartonCouleur).cartonSuperieur = value as CartonCouleur;
        } else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }

    public showConfig() {
        const regle = Regle.getRegleByNom("personnalisée");
        NodeUpdate.updateElement('config_regle', this.constructConfigRegle(regle));
        NodeUpdate.updateElement('config_touches', this.constructConfigTouches(regle));
        NodeUpdate.updateElement('config_cartons', this.constructConfigCartons(regle));
        this.guiElem.config.style.display = "block";
        this.guiElem.combat.style.display = "none";
    }

    public hideConfig() {
        this.guiElem.config.style.display = "none";
        this.guiElem.combat.style.display = "block";
        this.changeRegle();
        console.log(this.regle);
    }

    private constructConfigRegle(regle: Regle) {
        return `<tr>
                    <td><label for="duree">Durée du match (sec)</label></td>
                    <td><input id="duree" type="number" onchange="gui.changeValeurReglesNumber(this)" step="5" max="1200" min="5" value="${regle.duree}"/></td>
                </tr>
                <tr>
                    <td><label for="prolongation">Durée de la prolongation (sec)</label></td>
                    <td><input id="prolongation" type="number" onchange="gui.changeValeurReglesNumber(this)" max="180" min="0" step="1" value="${regle.prolongation}"/></td>
                </tr>
                <tr>
                    <td><label for="mortSubiteScore">Score mort subite</label></td>
                    <td><input id="mortSubiteScore" type="number" onchange="gui.changeValeurReglesNumber(this)" max="100" min="0" step="1" value="${regle.mortSubiteScore}"/></td>
                </tr>
                <tr>
                    <td><label for="scoreMax">Score gagnant</label></td>
                    <td><input id="scoreMax" type="number" onchange="gui.changeValeurReglesNumber(this)" max="100" min="1" step="1" value="${regle.scoreMax}"/></td>
                </tr>`
    }

    private constructConfigTouches(regle: Regle) {
        return regle.touches
            .map((touche) =>
                `<tr>
                    <td>
                        <label for="touche_points_${touche.nom}">
                            ${touche.nom} <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}"/>
                        </label>
                    </td>
                    <td>
                        <input id="touche_points_${touche.nom}" type="number" onchange="gui.changeValeurReglesNumber(this)" min="1" max="100" step="1" value="${touche.points}"/>
                    </td>
                    <td>
                        <input id="touche_match_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.match ? 'checked="checked"' : ''}/>
                    </td>
                    <td>
                        <input id="touche_mortSubite_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.mortSubite ? 'checked="checked"' : ''}/>
                    </td>
                    <td>
                        <input id="touche_prolongation_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.prolongation ? 'checked="checked"' : ''}/>
                    </td>
                </tr>`
            )
            .join("");
    }

    private constructConfigCartons(regle: Regle) {
        return regle.cartons
            .map((carton) =>
                `<tr>
                    <td>
                        <label for="carton_points_${carton.couleur}">
                            ${carton.couleur} <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}"/>
                        </label>
                    </td>
                    <td>
                        <input id="carton_points_${carton.couleur}" type="number" onchange="gui.changeValeurReglesNumber(this)" min="1" max="100" step="1" value="${carton.points}"/>
                    </td>
                    <td>
                        <select id="carton_sup_${carton.couleur}" style="border-radius: 2px;" onchange="gui.changeValeurReglesEnum(this)" >
                            <option style="background-color: white; color: black" value="${CartonCouleur.blanc}" ${carton.cartonSuperieur === CartonCouleur.blanc ? 'selected="selected"' : ''}>Blanc</option>
                            <option style="background-color: yellow; color: black" value="${CartonCouleur.jaune}" ${carton.cartonSuperieur === CartonCouleur.jaune ? 'selected="selected"' : ''}>Jaune</option>
                            <option style="background-color: red; color: black" value="${CartonCouleur.rouge}" ${carton.cartonSuperieur === CartonCouleur.rouge ? 'selected="selected"' : ''}>Rouge</option>
                            <option style="background-color: black; color: white" value="${CartonCouleur.noir}" ${carton.cartonSuperieur === CartonCouleur.noir ? 'selected="selected"' : ''}>Noir</option>
                        </select>
                    </td>
                </tr>`
            )
            .join("");
    }

    private init() {
        NodeUpdate.updateElement('touchesVert', this.initTouches(CombattantCouleur.vert));
        NodeUpdate.updateElement('touchesRouge', this.initTouches(CombattantCouleur.rouge));
        NodeUpdate.updateElement('cartonsVert', this.initCartons(CombattantCouleur.vert));
        NodeUpdate.updateElement('cartonsRouge', this.initCartons(CombattantCouleur.rouge));
        NodeUpdate.updateElement('changeRegle', this.initRegles());
    }

    private initTouches(combattant: CombattantCouleur): string {
        return this.regle.touches
            .map((touche) =>
                `<button id="${combattant}_btn_touche_${touche.nom}" class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}" />${touche.points}
            </button>`,
            )
            .join("");
    }

    private initCartons(combattant: CombattantCouleur): string {
        return this.regle.cartons
            .map((carton) =>
                `<button id="${combattant}_btn_carton_${carton.couleur}" class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}" /> -${carton.points}
            </button>`,
            )
            .join("");
    }

    private initRegles(): string {
        return Regle.REGLES
            .filter(r => r.nom !== "testing")
            .map((regle) => `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ""}>${regle.nom}</option>`)
            .join("");
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
        NodeUpdate.updateElement('historique', this.getHistorique(match));
        NodeUpdate.updateElement('scoreVert', match.scores.vert.toString());
        NodeUpdate.updateElement('scoreRouge', match.scores.rouge.toString());
        NodeUpdate.updateElement('message', match.message);
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
        return `<img src="${this.regle.getCarton(carton).image}" alt="carton ${carton}" />`;
    }

    private formatTouche(touche: ToucheNom) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" />`;
    }

    private updateTimer() {
        NodeUpdate.updateElement('time', this.formatCountDown(this.matchState.time));
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
        this.regle.cartons.forEach((carton) => this.enableButton(`vert_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton)));
        this.regle.cartons.forEach((carton) => this.enableButton(`rouge_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton)));
        this.regle.touches.forEach((touche) => this.enableButton(`vert_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
        this.regle.touches.forEach((touche) => this.enableButton(`rouge_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
    }

    private isButtonCartonEnabled(carton: Carton): boolean {
        return this.matchState.status !== MatchStatus.pret;
    }

    private isButtonToucheEnabled(touche: Touche, match: MatchModel): boolean {
        if (this.matchState.status === MatchStatus.pret) return false;
        if (match.mortSubite === MortSubite.limite) return touche.mortSubite;
        if (match.mortSubite === MortSubite.prolongation) return touche.prolongation;
        return touche.match;

    }

    private enableButton(buttonId: string, enable: boolean) {
        const button = document.getElementById(buttonId);
        if (button instanceof HTMLButtonElement) {
            button.disabled = !enable;
        } else {
            console.log("button not instanceof HTMLButtonElement", buttonId, button);
        }
    }

}
