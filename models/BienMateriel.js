import Possession from "./Possession.js";

class BienMateriel extends Possession{
    constructor(possesseur, valeur, libelle, type, tauxAmortissement, dateAchat) {
        super(possesseur, valeur, libelle)
        this.tauxAmortissement = tauxAmortissement;
        this.type = type;
        this.dateAchat = dateAchat;
    }

    getValeurAt(date){
        // 1 an -> 10%      365jrs  -> 10%          
        // x an -> 10x%     xjrs    -> (10x/365)%  
        let dateDiff = (date.getTime() - this.dateAchat.getTime()) / (1000 * 3600 * 24);
        return this.valeur - (this.valeur * (this.tauxAmortissement * (dateDiff/ 365) / 100));
    }
}

let monPc = new BienMateriel("Williest", "3000","Mon bon vieux pc", "Informatique", 10, new Date("2024-07-22"));
console.log(monPc);
console.log(monPc.getValeurAt(new Date('2024-07-22')));