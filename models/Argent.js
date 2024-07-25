import Possession from "./Possession.js";

export default  class Argent extends Possession{
    constructor(possesseur, valeur, libelle, compte, dateAjout){
        super(possesseur, valeur, libelle);
        this.compte = compte;
        this.dateAjout = dateAjout;
    }

    getValeurAt(date){
        return this.compte === "Epargne" ? "":""
    }
}

let monArgent = new Argent("Williest", null,"compte courant", "2024-07-22");
console.log(monArgent);