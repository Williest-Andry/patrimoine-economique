import Argent from './Argent.js';
import TrainDeVie from './TrainDeVie.js';
import CompteCourant from './CompteCourant.js';

class Salaire extends Argent{
    constructor(possesseur, valeur, libelle, compte) {
        super(possesseur, valeur, libelle, compte);
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

let monSalaire = new Salaire("Williest", "5000", "compte courant");
let monCompteCourant = new CompteCourant("Williest", 1,  "10000", "mon compte courant", "8000");
let loyer = new TrainDeVie("Williest", "1000", "mon loyer", monCompteCourant);
console.log(monSalaire.getValeur);



export default Salaire;