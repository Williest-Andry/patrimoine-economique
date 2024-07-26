import Possession from "./Possession.js";

class TrainDeVie extends Possession{
    constructor(possesseur, valeur, libelle, compteDebit){
        super(possesseur, valeur, libelle);
        this.compteDebit = compteDebit;
    }

    getPossesseur(){
        return this.possesseur;
    }    

    getValeur(){
        return this.valeur;
    }

    getCompteDebit(){
        return this.compteDebit;
    }

    setCompteDebit(newCompteDebit){
        this.compteDebit = newCompteDebit;
    }
}

export default TrainDeVie;