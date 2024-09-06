import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Root from "./root.jsx";
import '../App.css';
import NavBar from "../NavBar.jsx";


export default function Possessions() {
    const [listePossessions, setListePossessions] = useState([]);
    const [instancesPossession, setInstancesPossession] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/possession/')
            .then(response => response.json())
            .then(data => {
                console.log("reto le azo",data);
                setListePossessions(data.listePossessions);
                setInstancesPossession(data.valeursActuelles);
            })
            .catch(error => console.error('ERREUR LORS DE LA RECUPERATION DE LA LISTE DANS /possession :', error));
    }, []);

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
                    .then(data => setListePossessions(data.listePossessions))
                    .catch(error => console.error('Erreur lors de la récupération des données :', error));
            })
            .catch(e => console.log(e.message));
    };

    return (
        <>
            <NavBar />

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
                                <td className="table-dark">{new Date(possession.dateDebut).toLocaleString().slice(0,10)}</td>
                                <td className="table-dark">{possession.dateFin ? possession.dateFin.toLocaleString().slice(0,10) : "Non définie"}</td>
                                <td className="table-dark">{(possession.tauxAmortissement || 0) + "%"}</td>
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
            </section>
        </>
    );
}
