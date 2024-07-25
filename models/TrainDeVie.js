import Possession from "./Possession";

class TrainDeVie extends Possession{
    constructor(possesseur, valeur, libelle, dateAchat, compteDebit){
        super(possesseur, valeur, libelle, dateAchat);
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