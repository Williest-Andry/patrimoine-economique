import Possession from "./Possession.js";

class Patrimoine {
  constructor(possesseur, possessions, dateInitiale) {
    this.possesseur  = possesseur;
    this.possessions = possessions; // [Possession, Possession, ...]
    this.dateInitiale = dateInitiale;
  }

  getValeurAt(date) {
    return 
  }

  addPossession(possession) {
    this.possessions.push(possession);
  }
  
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

export default Patrimoine;