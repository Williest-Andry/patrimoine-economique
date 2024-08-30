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

    // Affiche la valeur du patrimoine à une date donnée
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

    // Instancie les objets Possession et Flux
    function instancier(possessionsData) {
        const possessionsFinales = possessionsData.map((data) => {
            if (data.valeurConstante) {
                return new Flux(
                    data.possesseur.nom,
                    data.libelle,
                    data.valeur,
                    new Date(data.dateDebut),
                    data.dateFin ? new Date(data.dateFin) : null,
                    data.tauxAmortissement,
                    data.jour
                );
            }

            return new Possession(
                data.possesseur.nom,
                data.libelle,
                data.valeur,
                new Date(data.dateDebut),
                data.dateFin ? new Date(data.dateFin) : null,
                data.tauxAmortissement
            );
        });
        setListePossessions(possessionsFinales);
    }

    // Fetch les données depuis le serveur
    useEffect(() => {
        fetch('http://localhost:3000/possession/')
            .then(response => response.json())
            .then(data => {
                console.log("Données reçues du serveur : ", data);
                instancier(data); // Appel de la fonction d'instanciation
            })
            .catch(error => console.error('ERREUR LORS DU FETCH :', error));
    }, []);

    // Met à jour les instances de possession après avoir reçu les possessions
    useEffect(() => {
        if (listePossessions.length > 0) {
            getActualValue();
        }
    }, [listePossessions]);

    // Obtient la valeur actuelle des possessions
    function getActualValue() {
        const today = new Date();
        const resultats = listePossessions.map(possession =>
            possession.getValeurApresAmortissement(today)
        );
        setInstancesPossession(resultats);
    }

    // Calcule la valeur actuelle totale du patrimoine
    function actuelPatrimoine() {
        const patrimoineActuel = instancesPossession.reduce((precedent, actuel) => {
            return  precedent + actuel;
        }, 0);
        setValeurPatrimoine(patrimoineActuel);
    }

    // Met à jour la valeur du patrimoine actuel
    useEffect(() => {
        actuelPatrimoine();
    }, [instancesPossession]);


    const handleClose = (libelle) => {
        fetch(`http://localhost:3000/possession/${libelle}/close`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => {
            console.log("Possession fermée avec succès", data);
            // Recharge la liste des possessions après la fermeture
            fetch('http://localhost:3000/possession/')
                .then(response => response.json())
                .then(data => instancier(data))
                .catch(error => console.error('Erreur lors de la récupération des données :', error));
        })
        .catch(e => console.log(e.message));
    };
    
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
                        <th scope="col" className="table-primary">Valeur initiale</th>
                        <th scope="col" className="table-primary">Date de début</th>
                        <th scope="col" className="table-primary">Date de fin</th>
                        <th scope="col" className="table-primary">Taux d'amortissement</th>
                        <th scope="col" className="table-primary">Valeur actuelle</th>
                        <th scope="col" className="table-primary">Actions</th>
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
                            <td>
                                <Link to={`/possession/${possession.libelle}/update`}>
                                    <button className="btn btn-primary">Editer</button>
                                </Link>
                                <button className="btn btn-secondary" onClick={() => handleClose(possession.libelle)}>Clôturer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>
            <br></br>
            <h1>Valeur actuelle du patrimoine : {valeurPatrimoine}</h1>

            <br></br>
            <br></br>
            <Link to={`/`}>
                <button className="btn btn-primary">Revenir à la page d'accueil</button>
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
