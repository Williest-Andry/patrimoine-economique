import Compte from './Compte.js';
import Salaire from './Salaire.js';

class CompteCourant extends Compte {
    constructor(possesseur, numero, valeur, libelle, dateAjoutArgent, salaire){
        super(possesseur, numero, valeur, libelle);
        this.dateAjoutArgent = dateAjoutArgent;
        this.salaire = salaire;
        salaire = new Salaire();
    }

    getSommeArgent(){
        return this.valeur + this.salaire.getValeur();
    }
}