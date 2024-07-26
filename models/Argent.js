import Possession from "./Possession.js";

export default  class Argent extends Possession{
    constructor(possesseur, valeur, libelle, compte){
        super(possesseur, valeur, libelle);
        this.compte = compte;
    }

    // getValeurAt(date){
    //     return this.compte === "Epargne" ? "":""
    // }
}

let monArgent = new Argent("Williest", "10000","compte courant", "2024-07-22");
console.log(monArgent);