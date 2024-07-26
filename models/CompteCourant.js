import Compte from './Compte.js';
import Salaire from './Salaire.js';

class CompteCourant extends Compte {
    constructor(possesseur, numero, valeur, libelle, salaire){
        super(possesseur, numero, valeur, libelle);
        this.salaire = salaire;
    }

    getSommeArgent(){
        return this.valeur + this.salaire.getValeur();
    }
}

export default CompteCourant;