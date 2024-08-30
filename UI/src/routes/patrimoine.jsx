import { useState } from "react";
import Chart from 'chart.js/auto';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrez les composants de Chart.js que vous allez utiliser
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Patrimoine() {
    const [patrimoineActuel, setPatrimoineActuel] = useState(0);
    const [patrimoineChoisi, setPatrimoineChoisi] = useState(0);
    const [valeurChoisie, setValeurChoisie] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/patrimoine/${valeurChoisie}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Succès, la date a été envoyée", data);
                setPatrimoineChoisi(data.valeur); // Mise à jour du patrimoine choisi
            })
            .catch(error => console.log("ERREUR LORS DE L'ENVOI DE LA DATE CHOISIE", error));
    }

    const LineChart = () => {
        // Définissez les données du graphique
        const data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
            <section>
                <input type="date"></input>
                <br></br>
                <input type="date"></input>
                <br></br>
                <input type="text"></input>
                <br></br>
                <button>Valider</button>
                <br></br>
                <br></br>

                <LineChart />
                
            </section>

            <section>
                <h1>Valeur actuelle du patrimoine : {patrimoineActuel}</h1>
                <input
                    type="date"
                    value={valeurChoisie}
                    onChange={(e) => setValeurChoisie(e.target.value)}
                />
                <br />
                <button onClick={handleSubmit}>Valider</button>
                <br />
                <h1>Valeur du patrimoine à la date choisie : {patrimoineChoisi}</h1>
            </section>
        </>
    )
}
