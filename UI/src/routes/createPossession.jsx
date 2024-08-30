import { useState } from "react";
import Root from "./root";
import '../App.css';

export default function Create() {
    const [isSend, setIsSend] = useState(false);
    const [notSend, setNotSend] = useState(false);
    const [data, setData] = useState({
        "libelle": "",
        "valeurInitiale": "",
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

        fetch('http://localhost:3000/possession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Possession créée:', data);
                setIsSend(true);
                setData({ "libelle": '', "valeurInitiale": '', "dateDebut": '', "tauxAmortissement": '' });
            })
            .catch(error => {
                setNotSend(true)
            });


        setTimeout(() => {
            setIsSend(false);
            setNotSend(false);
        }, 1500);
    };

    return (
        <>
            <Root/>

            <section className="possessions">
            <h1>AJOUTER UNE POSSESSION</h1>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Libelle :</label>
                
                <input
                    type="text"
                    name="libelle"
                    value={data.libelle}
                    onChange={handleChange}
                />
               

                <label>Valeur (en Ariary) :</label>
               
                <input
                    type="text"
                    name="valeurInitiale"
                    value={data.valeurInitiale}
                    onChange={handleChange}
                />
                

                <label>Date début :</label>
              
                <input
                    type="text"
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