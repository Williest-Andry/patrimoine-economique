import Compte from './Compte.js';

class CompteEpargne extends Compte {
    constructor(possesseur, numero, valeur, libelle, dateAjoutArgent, tauxInteret){
        super(possesseur, valeur, libelle);
        this.numero = numero;
        this.tauxInteret = tauxInteret;
    }
}