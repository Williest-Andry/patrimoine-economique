import { useState } from "react";
import Root from "./root";
import '../App.css';
import NavBar from "../NavBar";

export default function Create() {
    const deployedSite = 'https://patrimoine-economique-backend-std23080.onrender.com';
    const [isSend, setIsSend] = useState(false);
    const [notSend, setNotSend] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [exist, setExist] = useState(false);
    const [data, setData] = useState({
        "libelle": "",
        "valeur": "",
        "dateDebut": "",
        "tauxAmortissement": ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.libelle === "" || data.valeur === ""){
            setAllValid(true);
        }
        else{
            setAllValid(false);
            fetch(deployedSite + '/possession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    setIsSend(true);
                    setExist(false);
                    setData({ "libelle": '', "valeur": '', "dateDebut": '', "tauxAmortissement": '' });
                })
                .catch(error => {
                    setNotSend(true);
                    setExist(true);
                    console.log("ito le erreur", error);
                });
    
            setTimeout(() => {
                setIsSend(false);
                setNotSend(false);
            }, 1500);
        }
    }
    
    return (
        <>
            <NavBar/>

            <section className="possessions">
            <h1>AJOUTER UNE POSSESSION</h1>
            <span className="obligatoire">(*) : champ obligatoire</span>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Libelle<span className="obligatoire">*</span> :</label>
                
                <input
                    type="text"
                    name="libelle"
                    value={data.libelle}
                    onChange={handleChange}
                    />
               

                <label>Valeur<span className="obligatoire">*</span> (en Ariary) :</label>
               
                <input
                    type="text"
                    name="valeur"
                    value={data.valeur}
                    onChange={handleChange}
                    />
                

                <label>Date début :</label>
              
                <input
                    type="date"
                    name="dateDebut"
                    value={data.dateDebut}
                    onChange={handleChange}
                />

                <label>Taux d'amortissement :</label>
               
                <input
                    type="text"
                    name="tauxAmortissement"
                    value={data.tauxAmortissement}
                    onChange={handleChange}
                    />
                <br /><br />
                {
                    exist && 
                    <h6>La possession existe déjà !!</h6>
                }

                {
                    allValid && 
                    <h6 className="obligatoire">Veuillez compléter le(s) champ(s) obligatoire(s)</h6>
                }

                <button className="btn btn-primary">Ajouter</button>
            </form>
            {
                isSend &&
                <h1>Succès, la possession a été ajoutée</h1>
            }
            {
                notSend &&
                <h1>Erreur, la possession n'a pas été ajouté</h1>
            }
            </section>
        </>
    )
}