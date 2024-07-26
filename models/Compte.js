import Possession from "./Possession.js";

class Compte extends Possession{
    constructor(possesseur, numero, valeur, libelle){
        super(possesseur, valeur, libelle);
        this.numero = numero;
    }
}

export default Compte;