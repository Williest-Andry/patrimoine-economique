import Possession from "./Possession.js";

class BienMateriel extends Possession{
    constructor(possesseur, valeur, libelle, type, tauxAmortissement, dateAchat) {
        super(possesseur, valeur, libelle)
        this.tauxAmortissement = tauxAmortissement;
        this.type = type;
        this.dateAchat = dateAchat;
    }

    getValeurAt(date){
        // 1 an -> 10%       10% -> 100% pour 1 an cad 365 jrs                   365jrs  -> 10%
        //                   x%  -> 10x% pour 0.x an cad x jrs(<365jrs)          xjrs    -> 10x/365
        // il faut chercher l'algorithme quand date est pile egale a 1 an, date avant 1 an et date apres 1 an
       
        if(date.getTime() === this.dateAchat.getTime()+31556952000){
            return this.valeur - (this.valeur * this.tauxAmortissement/100);
        }
        else if(date.getTime() < this.dateAchat.getTime()+31556952000  && date.getTime() >= this.dateAchat.getTime()){
            return this.valeur - (this.valeur * 10)
        }
    }
}

// let monPc = new BienMateriel("Williest", "3000","Mon bon vielle pc", "Informatique", 10, "2024-07-22");
// console.log(monPc);
// monPc.getValeurAt("la date choisie");

console.log(new Date("2025-07-23").getDay() - new Date("2024-07-23").getDay());