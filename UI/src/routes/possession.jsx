import { useEffect, useState } from "react";
import Possession from "../../../models/possessions/Possession.js";
import Flux from '../../../models/possessions/Flux.js'
import { Link } from "react-router-dom";
import Root from "./root.jsx";


export default function Possessions() {
    const [listePossessions, setListePossessions] = useState([]);
    const [valeurSelecteur, setValeurSelecteur] = useState("");
    const [valeurPatrimoine, setValeurPatrimoine] = useState(0);
    const [valeurSelectionne, setValeurSelectionne] = useState("Non définie");
    const [dateNonNulle, setDateNonNulle] = useState(false);
    const [instancesPossession, setInstancesPossession] = useState([]);
    const dateActuelle = new Date();

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
                data.valeurInitiale,
                new Date(data.dateDebut),
                data.dateFin ? new Date(data.dateFin) : null,
                data.tauxAmortissement
            );
        });
        setListePossessions(possessionsFinales);
        console.log("ito indray", possessionsFinales);
    }

    useEffect(() => {
        fetch('http://localhost:3000/possession/')
            .then(response => response.json())
            .then(data => {
                instancier(data); 
                
                console.log("ito le izy", data);
            })
            .catch(error => console.error('ERREUR LORS DE LA RECUPERATION DE LA LISTE :', error));
    }, []);

    useEffect(() => {
        if (listePossessions.length > 0) {
            getActualValue();
        }
    }, [listePossessions]);

    useEffect(() => {
        fetch(`http://localhost:3000/patrimoine/${dateActuelle}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erreur HTTP ! Status: ${response.status}. Reponse: ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                setValeurPatrimoine(data.valeurChoisie);
            })
            .catch(e => console.log("ERREUR LORS DE LA RECUPERATION DE LA VALEUR ACTUELLE", e))
    }, [dateActuelle]);

    function getActualValue() {
        const today = new Date();
        const resultats = listePossessions.map(possession =>
            possession.getValeurApresAmortissement(today)
        );
        setInstancesPossession(resultats);
    }

    const handleClose = (libelle) => {
        fetch(`http://localhost:3000/possession/${libelle}/close`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
                console.log("Possession fermée avec succès", data);
                fetch('http://localhost:3000/possession/')
                    .then(response => response.json())
                    .then(data => instancier(data))
                    .catch(error => console.error('Erreur lors de la récupération des données :', error));
            })
            .catch(e => console.log(e.message));
    };

    return (
        <>
            <Root />

            <section className="possessions">
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
                                <td className="table-dark">{possession.valeur + " Ariary"}</td>
                                <td className="table-dark">{possession.dateDebut.toLocaleDateString()}</td>
                                <td className="table-dark">{possession.dateFin ? possession.dateFin.toLocaleDateString() : "Non définie"}</td>
                                <td className="table-dark">{possession.tauxAmortissement || "Non définie"}</td>
                                <td className="table-dark">{instancesPossession[key] + " Ariary"}</td>
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

                <h1>Valeur actuelle du patrimoine : {valeurPatrimoine + " Ariary"}</h1>
            </section>
        </>
    );
}
