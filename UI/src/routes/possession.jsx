import { useEffect, useState } from "react";
import Possession from "../../../models/possessions/Possession.js";
import Flux from '../../../models/possessions/Flux.js'
import { Link } from "react-router-dom";

export default function App() {
    const [listePossessions, setListePossessions] = useState([]);
    const [valeurSelecteur, setValeurSelecteur] = useState("");
    const [valeurPatrimoine, setValeurPatrimoine] = useState(0);
    const [valeurSelectionne, setValeurSelectionne] = useState("Non définie");
    const [dateNonNulle, setDateNonNulle] = useState(false);
    const [instancesPossession, setInstancesPossession] = useState([]);

    const afficherValeur = () => {
        if (valeurSelecteur === "") {
            setDateNonNulle(true);
            setValeurSelectionne(0);
        } else {
            const patrimoine = listePossessions
                .map(element => element.getValeur(new Date(valeurSelecteur)))
                .reduce((precedente, actuelle) => precedente + actuelle, 0);

            setValeurSelectionne(patrimoine);
            setDateNonNulle(false);
        }
    };

    function instancier(possessionsData) {
        const possessionsFinales = possessionsData.map((data) => {
            if (data.valeurConstante) {
                return new Flux(
                    data.possesseur.nom,
                    data.libelle,
                    data.valeurInitiale,
                    new Date(data.dateDebut),
                    data.dateFin ? new Date(data.dateFin) : null,
                    data.tauxAmortissement,
                    data.jour
                );
            }

            return new Possession(
                data.possesseur.nom,
                data.libelle,
                data.valeurInitiale,
                new Date(data.dateDebut),
                data.dateFin ? new Date(data.dateFin) : null,
                data.tauxAmortissement
            );
        });
        setListePossessions(possessionsFinales);
    }

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                instancier(data[1].data.possessions);
            })
            .catch(error => console.error('ERREUR LORS DU FETCH :', error));
    }, []);

    useEffect(() => {
        if (listePossessions.length > 0) {
            getActualValue();
        }
    }, [listePossessions]);

    function getActualValue() {
        const today = new Date();
        const resultats = listePossessions.map(possession =>
            possession.getValeurApresAmortissement(today)
        );
        setInstancesPossession(resultats);
    }

    function actuelPatrimoine() {
        const patrimoineActuel = instancesPossession.reduce((precedent, actuel) => {
            return precedent + actuel;
        }, 0);
        setValeurPatrimoine(patrimoineActuel);
    }

    useEffect(() => {
        actuelPatrimoine();
    }, [instancesPossession]);

    return (
        <>
            <h1>LISTE DES POSSESSIONS</h1>
            <br></br>
            <Link to={`/possession/create`}>
                <button className="btn btn-primary">Ajouter une possession</button>
            </Link>
            <br></br>
            <br></br>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="table-primary">Libelle</th>
                        <th scope="col" className="table-primary">Valeur initial</th>
                        <th scope="col" className="table-primary">Date de début</th>
                        <th scope="col" className="table-primary">Date de fin</th>
                        <th scope="col" className="table-primary">Taux d'amortissement</th>
                        <th scope="col" className="table-primary">Valeur actuelle</th>
                    </tr>
                </thead>

                <tbody>
                    {listePossessions.map((possession, key) => (
                        <tr key={key}>
                            <td className="table-dark">{possession.libelle}</td>
                            <td className="table-dark">{possession.valeur}</td>
                            <td className="table-dark">{possession.dateDebut.toLocaleDateString()}</td>
                            <td className="table-dark">{possession.dateFin ? possession.dateFin.toLocaleDateString() : "Non définie"}</td>
                            <td className="table-dark">{possession.tauxAmortissement || "Non définie"}</td>
                            <td className="table-dark">{instancesPossession[key]}</td>
                            <Link to={`/possession/:libelle/update`}>
                                <button className="btn btn-primary">Editer</button>
                            </Link>
                            <button className="table-primary">Clôturer</button>
                        </tr>

                    ))}
                </tbody>
            </table>

            <br></br>
            <br></br>
            <Link to={`/`}>
                <button className="btn btn-primary">Revenir à la page d'acceuil</button>
            </Link>

            {/* <p>La valeur du patrimoine actuel est : {valeurPatrimoine}</p>

      <input
        type="date"
        value={valeurSelecteur}
        onChange={(e) => setValeurSelecteur(e.target.value)}
      />
      <button type="button" className="btn btn-primary" onClick={afficherValeur}>Valider</button>

      <p>
        La valeur du patrimoine à cette date donnée est :{" "}
        {valeurSelectionne || (dateNonNulle && <h1>VEUILLEZ CHOISIR UNE DATE</h1>)}
      </p> */}
        </>
    );
}
