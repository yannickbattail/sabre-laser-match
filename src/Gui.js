import { _throw } from "./throw.js";
import { Regle } from "./Regle.js";
import { MatchStatus } from "./MatchState.js";
import { CombattantCouleur } from "./Evenement.js";
import { CartonCouleur } from "./Carton.js";
import { MatchModel } from "./MatchModel.js";
import { EventLogCarton, EventLogMortSubite, EventLogTouche, EventLogWin, } from "./EventLog.js";
import { MortSubite } from "./MortSubite.js";
import { NodeUpdate } from "./NodeUpdate.js";
class GuiElem {
    play = document.getElementById("play") ||
        _throw(new Error("Element 'play' non trouvé"));
    pause = document.getElementById("pause") ||
        _throw(new Error("Element 'pause' non trouvé"));
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
    changeValeurReglesNumber(elem) {
        const name = elem.id;
        const value = parseInt(elem.value);
        const reglePerso = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);
        if (name === "duree") {
            reglePerso.duree = value;
        }
        else if (name === "prolongation") {
            reglePerso.prolongation = value;
        }
        else if (name === "mortSubiteScore") {
            reglePerso.mortSubiteScore = value;
        }
        else if (name === "scoreMax") {
            reglePerso.scoreMax = value;
        }
        else if (name.startsWith('touche_points_')) {
            const touche = name.replace('touche_points_', '');
            reglePerso.getTouche(touche).points = value;
        }
        else if (name.startsWith('carton_points_')) {
            const carton = name.replace('carton_points_', '');
            reglePerso.getCarton(carton).points = value;
        }
        else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }
    changeValeurReglesBool(elem) {
        const name = elem.id;
        const value = elem.checked;
        const reglePerso = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);
        if (name.startsWith('touche_match_')) {
            const touche = name.replace('touche_match_', '');
            reglePerso.getTouche(touche).match = !!value;
        }
        else if (name.startsWith('touche_mortSubite_')) {
            const touche = name.replace('touche_mortSubite_', '');
            reglePerso.getTouche(touche).mortSubite = !!value;
        }
        else if (name.startsWith('touche_prolongation_')) {
            const touche = name.replace('touche_prolongation_', '');
            reglePerso.getTouche(touche).prolongation = !!value;
        }
        else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }
    changeValeurReglesEnum(elem) {
        const name = elem.id;
        const value = elem.value;
        const reglePerso = Regle.getRegleByNom("personnalisée");
        console.log("changeValeurRegles", name, value);
        if (name.startsWith('carton_sup_')) {
            const carton = name.replace('carton_sup_', '');
            reglePerso.getCarton(carton).cartonSuperieur = value;
        }
        else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }
    showConfig() {
        const regle = Regle.getRegleByNom("personnalisée");
        NodeUpdate.updateElement('config_regle', this.constructConfigRegle(regle));
        NodeUpdate.updateElement('config_touches', this.constructConfigTouches(regle));
        NodeUpdate.updateElement('config_cartons', this.constructConfigCartons(regle));
        this.guiElem.config.style.display = "block";
        this.guiElem.combat.style.display = "none";
    }
    hideConfig() {
        this.guiElem.config.style.display = "none";
        this.guiElem.combat.style.display = "block";
        this.changeRegle();
        console.log(this.regle);
    }
    constructConfigRegle(regle) {
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
                </tr>`;
    }
    constructConfigTouches(regle) {
        return regle.touches
            .map((touche) => `<tr>
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
                </tr>`)
            .join("");
    }
    constructConfigCartons(regle) {
        return regle.cartons
            .map((carton) => `<tr>
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
                </tr>`)
            .join("");
    }
    init() {
        NodeUpdate.updateElement('touchesVert', this.initTouches(CombattantCouleur.vert));
        NodeUpdate.updateElement('touchesRouge', this.initTouches(CombattantCouleur.rouge));
        NodeUpdate.updateElement('cartonsVert', this.initCartons(CombattantCouleur.vert));
        NodeUpdate.updateElement('cartonsRouge', this.initCartons(CombattantCouleur.rouge));
        NodeUpdate.updateElement('changeRegle', this.initRegles());
    }
    initTouches(combattant) {
        return this.regle.touches
            .map((touche) => `<button id="${combattant}_btn_touche_${touche.nom}" class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="touche ${touche.nom}" />${touche.points}
            </button>`)
            .join("");
    }
    initCartons(combattant) {
        return this.regle.cartons
            .map((carton) => `<button id="${combattant}_btn_carton_${carton.couleur}" class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="carton ${carton.couleur}" /> -${carton.points}
            </button>`)
            .join("");
    }
    initRegles() {
        return Regle.REGLES
            .filter(r => r.nom !== "testing")
            .map((regle) => `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ""}>${regle.nom}</option>`)
            .join("");
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
        NodeUpdate.updateElement('historique', this.getHistorique(match));
        NodeUpdate.updateElement('scoreVert', match.scores.vert.toString());
        NodeUpdate.updateElement('scoreRouge', match.scores.rouge.toString());
        NodeUpdate.updateElement('message', match.message);
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
        return `<img src="${this.regle.getCarton(carton).image}" alt="carton ${carton}" />`;
    }
    formatTouche(touche) {
        return `<img src="${this.regle.getTouche(touche).image}" alt="touche ${touche}" />`;
    }
    updateTimer() {
        NodeUpdate.updateElement('time', this.formatCountDown(this.matchState.time));
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
        this.regle.cartons.forEach((carton) => this.enableButton(`vert_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton)));
        this.regle.cartons.forEach((carton) => this.enableButton(`rouge_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton)));
        this.regle.touches.forEach((touche) => this.enableButton(`vert_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
        this.regle.touches.forEach((touche) => this.enableButton(`rouge_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
    }
    isButtonCartonEnabled(carton) {
        return this.matchState.status !== MatchStatus.pret;
    }
    isButtonToucheEnabled(touche, match) {
        if (this.matchState.status === MatchStatus.pret)
            return false;
        if (match.mortSubite === MortSubite.limite)
            return touche.mortSubite;
        if (match.mortSubite === MortSubite.prolongation)
            return touche.prolongation;
        return touche.match;
    }
    enableButton(buttonId, enable) {
        const button = document.getElementById(buttonId);
        if (button instanceof HTMLButtonElement) {
            button.disabled = !enable;
        }
        else {
            console.log("button not instanceof HTMLButtonElement", buttonId, button);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFTLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFXLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxHQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsTUFBTSxPQUFPO0lBRUYsSUFBSSxHQUNQLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7SUFDNUMsS0FBSyxHQUNSLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDN0MsV0FBVyxHQUNiLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUF1QjtRQUM3RCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sR0FDVCxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNkJBQTZCLENB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