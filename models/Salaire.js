import Argent from './Argent.js';
import TrainDeVie from './TrainDeVie.js';

class Salaire extends Argent{
    constructor(possesseur, valeur, libelle, compte, dateAjout) {
        super(possesseur, valeur, libelle, compte, dateAjout);
    }

    getPossesseur(){
        return this.possesseur;
    }

    getValeur(){
        return this.valeur;
    }

    getCompte(){
        return this.compte;
    }

    getDateAjout(){
        return this.dateAjout;
    }

    substractTrainDeVie(trainVie){
        trainVie = new TrainDeVie();
        this.valeur -= trainVie.getValeur();
    }
}

let monSalaire = new Salaire("Williest", "5000", "compte courant", "2024-07-22");
console.log(monSalaire);