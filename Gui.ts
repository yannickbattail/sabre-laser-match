/// <reference path="./Carton.ts" />
/// <reference path="./Touche.ts" />
/// <reference path="./Regle.ts" />
/// <reference path="./MatchState.ts" />
/// <reference path="./NodeUpdate.ts" />

class Gui {
    constructor(private matchStatus: MatchState, private regle: Regle) {
    }

    public carton(carton, Combattant) {
        this.matchStatus.addEvenement(Combattant, 'carton', carton);
        this.refresh();
    }

    public touche(type, Combattant) {
        this.matchStatus.addEvenement(Combattant, 'touche', type);
        this.refresh();
    }

    public reset() {
        this.matchStatus.reset();
        this.refresh();
    }

    public annuler() {
        this.matchStatus.removeLastEvenement();
        this.refresh();
    }

    public start() {
        if (matchStatus === "en cours") {
            matchStatus = "pause";
            document.getElementById('message').innerHTML = "Cessez!";
        } else if (matchStatus === "pause" || matchStatus === "prêt") {
            document.getElementById('message').innerHTML = "Combattez!";
            matchStatus = "en cours";
        } else if (matchStatus === "fini") {
            time = 0;
            matchStatus = "en cours";
        }
        refresh();
    }

    private refresh() {

    }

    private formatCombattant(combattant) {
        return `<span class="${combattant}Combattant">${combattant}</span>`;
    }

    private formatCarton(carton) {
        return `<img src="${CARTONS[carton].image}" alt="touche ${carton}" />`;
    }

    private formatTouche(touche) {
        return `<img src="${TOUCHES[touche].image}" alt="touche ${touche}" />`;
    }

    private autreComabattant(combattant) {
        return combattant === 'vert' ? 'rouge' : 'vert';
    }

    private cartonSuperieur(carton, nbCarton) {
        if (nbCarton >= 2) {
            return CARTONS[CARTONS[carton.nom].cartonSuperieur];
        } else {
            return CARTONS[carton.nom];
        }
    }

    private calcScore(combattant) {
        let score = historique
            .filter(e => (e.combattant === combattant && e.type === 'touche'))
            .map(e => TOUCHES[e.nom].points).reduce((a, b) => a + b, 0)
        const cartons = historique.filter(e => (e.combattant === autreComabattant(combattant) && e.type === 'carton'));
        let nbCarton = {blanc: 0, jaune: 0, rouge: 0, noir: 0};
        for (let i = 0; i < cartons.length; i++) {
            const carton = cartons[i];
            nbCarton[carton.nom]++;
            score += cartonSuperieur(carton, nbCarton[carton.nom]).points;
        }
        return score;
    }

    private updateTimer() {
        if (matchStatus === "en cours") {
            document.getElementById('start').innerHTML = '<img src="images/pause.svg" alt="mettre en pause le combat" />';
        } else {
            document.getElementById('start').innerHTML = '<img src="images/play.svg" alt="démarrer le combat" />';
        }
        document.getElementById('restant').innerText = formatTime(time);
    }


    private formatTime(time) {
        return pad0(Math.floor(time / 60)) + ":" + pad0(time % 60);
    }

    private getHistorique() {
        let html = [];
        let nbCarton = {blanc: 0, jaune: 0, rouge: 0, noir: 0};
        for (let i = 0; i < historique.length; i++) {
            const hist = historique[i];
            const horodatage = `<span class="temps">[${formatTime(hist.temps)}]</span>`
            const prefix = `${horodatage} combattant ${formatCombattant(hist.combattant)}: `;
            if (hist.type === 'carton') {
                nbCarton[hist.nom]++;
                if (nbCarton[hist.nom] >= 2) {
                    html.push(`<div>${prefix} ${nbCarton[hist.nom]}e ${hist.type} ${formatCarton(hist.nom)} --&gt; ${formatCarton(CARTONS[hist.nom].cartonSuperieur)}  (+${CARTONS[CARTONS[hist.nom].cartonSuperieur].points} combattant ${formatCombattant(autreComabattant(hist.combattant))})</div>`);
                } else {
                    html.push(`<div>${prefix} ${nbCarton[hist.nom]}er ${hist.type} ${formatCarton(hist.nom)} (+${CARTONS[hist.nom].points} combattant ${formatCombattant(autreComabattant(hist.combattant))})</div>`);
                }
            } else if (hist.type === 'touche') {
                html.push(`<div>${prefix} ${hist.type} ${formatTouche(hist.nom)} (+${TOUCHES[hist.nom].points})</div>`);
            } else if (hist.type === 'mort subite') {
                html.push(`<div>${horodatage} ${hist.type} ${hist.nom}</div>`);
            }
        }
        return html.reverse().join('');
    }

    private pad0(value) {
        return value < 10 ? '0' + value : value;
    }

    private activeButtons(active) {
        if (isMortSubite()) {
            const touches = document.querySelectorAll('.main,.bras,.jambe');
            for (let i = 0; i < touches.length; i++) {
                touches[i].disabled = true;
            }
        } else {
            const elems = document.querySelectorAll('.touche,.carton,.jambe');
            for (let i = 0; i < elems.length; i++) {
                elems[i].disabled = !active;
            }
        }
    }

}