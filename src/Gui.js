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
    ruleEditor = document.getElementById("ruleEditor") ||
        _throw(new Error("Element 'ruleEditor' non trouvé"));
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
            this.showConfigRules();
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
        else if (name.startsWith("touche_points_")) {
            const touche = name.replace("touche_points_", "");
            reglePerso.getTouche(touche).points = value;
        }
        else if (name.startsWith("carton_points_")) {
            const carton = name.replace("carton_points_", "");
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
        if (name.startsWith("touche_match_")) {
            const touche = name.replace("touche_match_", "");
            reglePerso.getTouche(touche).match = value;
        }
        else if (name.startsWith("touche_mortSubite_")) {
            const touche = name.replace("touche_mortSubite_", "");
            reglePerso.getTouche(touche).mortSubite = value;
        }
        else if (name.startsWith("touche_prolongation_")) {
            const touche = name.replace("touche_prolongation_", "");
            reglePerso.getTouche(touche).prolongation = value;
        }
        else if (name.startsWith("carton_match_")) {
            const carton = name.replace("carton_match_", "");
            reglePerso.getCarton(carton).match = value;
        }
        else if (name.startsWith("carton_mortSubite_")) {
            const carton = name.replace("carton_mortSubite_", "");
            reglePerso.getCarton(carton).mortSubite = value;
        }
        else if (name.startsWith("carton_prolongation_")) {
            const carton = name.replace("carton_prolongation_", "");
            reglePerso.getCarton(carton).prolongation = value;
        }
        else if (name.startsWith("carton_finDuMatch_")) {
            const carton = name.replace("carton_finDuMatch_", "");
            reglePerso.getCarton(carton).finDuMatch = value;
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
        if (name.startsWith("carton_sup_")) {
            const carton = name.replace("carton_sup_", "");
            reglePerso.getCarton(carton).cartonSuperieur =
                value;
        }
        else {
            throw new Error(`id ${name} non géré`);
        }
        this.refresh();
    }
    showConfig() {
        const regle = Regle.getRegleByNom("personnalisée");
        NodeUpdate.updateElement("config_regle", this.constructConfigRegle(regle));
        NodeUpdate.updateElement("config_touches", this.constructConfigTouches(regle));
        NodeUpdate.updateElement("config_cartons", this.constructConfigCartons(regle));
        this.guiElem.config.style.display = "block";
        this.guiElem.combat.style.display = "none";
        this.showConfigRules();
    }
    showConfigRules() {
        this.guiElem.ruleEditor.style.display =
            this.regle.nom === "personnalisée" ? "block" : "none";
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
                        <input id="touche_match_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.match ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <input id="touche_mortSubite_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.mortSubite ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <input id="touche_prolongation_${touche.nom}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${touche.prolongation ? 'checked="checked"' : ""}/>
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
                        <input id="carton_match_${carton.couleur}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${carton.match ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <input id="carton_mortSubite_${carton.couleur}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${carton.mortSubite ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <input id="carton_prolongation_${carton.couleur}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${carton.prolongation ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <input id="carton_finDuMatch_${carton.couleur}" type="checkbox" onchange="gui.changeValeurReglesBool(this)" ${carton.finDuMatch ? 'checked="checked"' : ""}/>
                    </td>
                    <td>
                        <select id="carton_sup_${carton.couleur}" style="border-radius: 2px;" onchange="gui.changeValeurReglesEnum(this)" >
                            <option style="background-color: white; color: black" value="${CartonCouleur.blanc}" ${carton.cartonSuperieur === CartonCouleur.blanc ? 'selected="selected"' : ""}>Blanc</option>
                            <option style="background-color: yellow; color: black" value="${CartonCouleur.jaune}" ${carton.cartonSuperieur === CartonCouleur.jaune ? 'selected="selected"' : ""}>Jaune</option>
                            <option style="background-color: red; color: black" value="${CartonCouleur.rouge}" ${carton.cartonSuperieur === CartonCouleur.rouge ? 'selected="selected"' : ""}>Rouge</option>
                            <option style="background-color: black; color: white" value="${CartonCouleur.noir}" ${carton.cartonSuperieur === CartonCouleur.noir ? 'selected="selected"' : ""}>Noir</option>
                        </select>
                    </td>
                </tr>`)
            .join("");
    }
    init() {
        NodeUpdate.updateElement("touchesVert", this.initTouches(CombattantCouleur.vert));
        NodeUpdate.updateElement("touchesRouge", this.initTouches(CombattantCouleur.rouge));
        NodeUpdate.updateElement("cartonsVert", this.initCartons(CombattantCouleur.vert));
        NodeUpdate.updateElement("cartonsRouge", this.initCartons(CombattantCouleur.rouge));
        NodeUpdate.updateElement("changeRegle", this.initRegles());
    }
    initTouches(combattant) {
        return this.regle.touches
            .map((touche) => `<button id="${combattant}_btn_touche_${touche.nom}" class="touche ${touche.nom}" disabled="disabled" onclick="gui.touche('${touche.nom}', '${combattant}')">
                <img alt="touche ${touche.nom}" src="${touche.image}" title="Touche ${touche.nom}" />${touche.points}
            </button>`)
            .join("");
    }
    initCartons(combattant) {
        return this.regle.cartons
            .map((carton) => `<button id="${combattant}_btn_carton_${carton.couleur}" class="carton ${carton.couleur}" disabled="disabled" onclick="gui.carton('${carton.couleur}', '${combattant}')">
                <img alt="carton ${carton.couleur}" src="${carton.image}" title="Carton ${carton.couleur}" /> -<span title="Points ajoutés à l'adversaire">${carton.points}</span> ${carton.finDuMatch ? "<span title='Déclenche la fin du match'>&#128128;</span>" : ""}
            </button>`)
            .join("");
    }
    initRegles() {
        return Regle.REGLES.filter((r) => r.nom !== "testing")
            .map((regle) => `<option value="${regle.nom}"${this.regle === regle ? 'selected="selected"' : ""}>${regle.nom}</option>`)
            .join("");
    }
    getRegle() {
        const regle = Regle.getRegleByNom(this.guiElem.changeRegle.value);
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
        NodeUpdate.updateElement("historique", this.getHistorique(match));
        NodeUpdate.updateElement("scoreVert", match.scores.vert.toString());
        NodeUpdate.updateElement("scoreRouge", match.scores.rouge.toString());
        NodeUpdate.updateElement("message", match.message);
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
        NodeUpdate.updateElement("time", this.formatCountDown(this.matchState.time));
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
        const min = Math.floor(t / 60)
            .toFixed(0)
            .padStart(2, "0");
        const sec = (t % 60).toFixed(1).padStart(4, "0");
        return `${sign}${min}:${sec}s`;
    }
    getHistorique(match) {
        const html = [];
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
        this.regle.cartons.forEach((carton) => this.enableButton(`vert_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton, match)));
        this.regle.cartons.forEach((carton) => this.enableButton(`rouge_btn_carton_${carton.couleur}`, this.isButtonCartonEnabled(carton, match)));
        this.regle.touches.forEach((touche) => this.enableButton(`vert_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
        this.regle.touches.forEach((touche) => this.enableButton(`rouge_btn_touche_${touche.nom}`, this.isButtonToucheEnabled(touche, match)));
    }
    isButtonCartonEnabled(carton, match) {
        if (this.matchState.status === MatchStatus.pret)
            return false;
        if (match.mortSubite === MortSubite.limite)
            return carton.mortSubite;
        if (match.mortSubite === MortSubite.prolongation)
            return carton.prolongation;
        return carton.match;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFVLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUVMLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE1BQU0sT0FBTztJQUNKLElBQUksR0FDVCxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEtBQUssR0FDVixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFdBQVcsR0FDZixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBdUI7UUFDN0QsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUVqRCxNQUFNLEdBQ1gsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZCQUE2QixD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