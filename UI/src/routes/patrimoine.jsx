import { useEffect, useState } from "react";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Root from "./root";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Patrimoine() {
  const [patrimoineActuel, setPatrimoineActuel] = useState(0);
  const [patrimoineChoisi, setPatrimoineChoisi] = useState(0);
  const [valeurChoisie, setValeurChoisie] = useState("");
  const [isValid, setIsValid] = useState(false);
  const dateActuelle = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valeurChoisie === "") {
      setIsValid(true);
    }
    else {
      setIsValid(false);
      fetch(`http://localhost:3000/patrimoine/${valeurChoisie}`)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`Erreur HTTP ! Status: ${response.status}. Reponse: ${text}`);
            });
          }
          return response.json();
        })
        .then(data => {
          setPatrimoineChoisi(data.valeurChoisie); 
        })
        .catch(error => console.log("ERREUR LORS DE L'ENVOI DE LA DATE CHOISIE", error));
    }
  }

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
        setPatrimoineActuel(data.valeurChoisie);
      })
      .catch(e => console.log("ERREUR LORS DE LA RECUPERATION DE LA VALEUR ACTUELLE", e))
  }, [dateActuelle]);

  const LineChart = () => {
    // Définissez les données du graphique
    const data = {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Courbe de la valeur du patrimoine',
          data: [30, 20, 50, 40, 60, 70],
          tension: 0.4, // Pour rendre la ligne plus lisse
        },
      ],
    };

    // Options du graphique
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Evolution de la valeur du patrimoine',
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  return (
    <>
      <Root />

      <section className="patrimoine">
        <h1>Évolution de la valeur du patrimoine : </h1>
        <label>Date début : </label>
        <input type="date" />
        <br />
        <label>Date fin : </label>
        <input type="date" />
        <br />
        <label>Jour du mois : </label>
        <input type="text" />
        <br />
        <button className="btn btn-primary" >Valider</button>

        <br />

        <LineChart />

      </section>

      <section className="patrimoine  ">
        <h1>Valeur du patrimoine : </h1>
        <br></br>
        <h5>Valeur actuelle du patrimoine : {patrimoineActuel + " Ariary"}</h5>
        <br></br>
        <label>Veuillez choisir une date : </label>
        <input
          type="date"
          value={valeurChoisie}
          onChange={(e) => setValeurChoisie(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit} className="btn btn-primary" >Valider</button>
        <br />
        {
          !isValid &&
          <h5>Valeur du patrimoine à la date choisie : {patrimoineChoisi + " Ariary"}</h5>
        }
        {
          isValid &&
          <h2>Veuillez choisir une date </h2>
        }
      </section>
    </>
  );
}
