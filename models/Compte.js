import Possession from "./Possession";

class Compte extends Possession{
    constructor(possesseur, numero, valeur, libelle){
        super(possesseur, valeur, libelle);
        this.numero = numero;
    }
}