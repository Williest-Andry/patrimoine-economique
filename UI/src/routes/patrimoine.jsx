import { useEffect, useState } from "react";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins } from 'chart.js';
import Root from "./root";
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Patrimoine() {
  const backendUrl = 'http://localhost:3000/';
  const dateActuelle = new Date().toISOString().split('T')[0];

  const [patrimoineActuel, setPatrimoineActuel] = useState(0);
  const [patrimoineChoisi, setPatrimoineChoisi] = useState(0);
  const [valeurChoisie, setValeurChoisie] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isValidRange, setIsValidRange] = useState(false);
  const [correctRange, setCorrectRange] = useState(false);

  const [lesDates, setLesDates] = useState([]);
  const [lesValeurs, setLesValeurs] = useState([]);
  const [rangeDates, setRangeDates] = useState({
    type: "month",
    dateDebut: "",
    dateFin: "",
    jour: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valeurChoisie === "") {
      setIsValid(true);
    }
    else {
      setIsValid(false);
      fetch(`http://localhost:3000/patrimoine/${valeurChoisie}`)
        .then(response => response.json())
        .then(data => {
          setPatrimoineChoisi(data.valeurChoisie);
        })
        .catch(error => console.log("ERREUR LORS DE L'ENVOI DE LA DATE CHOISIE", error));
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3000/patrimoine/${dateActuelle}`)
      .then(response => response.json())
      .then(data => {
        setPatrimoineActuel(data.valeurChoisie);
      })
      .catch(e => console.log("ERREUR LORS DE LA RECUPERATION DE LA VALEUR ACTUELLE", e))
  }, [dateActuelle]);


  const changerRangeDates = (ev) => {
    const { name, value } = ev.target;
    setRangeDates(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const envoyerLeRange = () => {
    if (rangeDates.dateDebut === "" || rangeDates.dateFin === "") {
      setIsValidRange(true);
    }
    else if (new Date(rangeDates.dateDebut) > new Date(rangeDates.dateFin)) {
      setCorrectRange(true);
      console.log("debut > fin");
    }
    else {
      setIsValidRange(false);
      setCorrectRange(false);
      fetch(backendUrl + `patrimoine/range`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rangeDates)
      })
        .then(response => response.json())
        .then(data => {
          console.log("goo");
          setLesDates(data.lesDates);
          setLesValeurs(data.lesValeurs);
        })
        .catch(err => console.log("ERREUR LORS DE LA RÉCUPÉRATION DE LA VALEUR ENTRE LES DEUX DATES"));
    }
  }

  const LineChart = () => {
    const data = {
      labels: lesDates.map(date => new Date(date).toLocaleString().slice(0,10)),
      datasets: [
        {
          label: 'Courbe de la valeur du patrimoine',
          data: lesValeurs,
          tension: 0.4,
        },
      ],
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      
    }

    return (
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    )
  };

  return (
    <>
      <Root />

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

      <section className="patrimoine">
        <h1>Évolution de la valeur du patrimoine : </h1>
        <label>Date début : </label>
        <input type="date" name="dateDebut" value={rangeDates.dateDebut} onChange={changerRangeDates} />
        <br />
        <label>Date fin : </label>
        <input type="date" name="dateFin" value={rangeDates.dateFin} onChange={changerRangeDates} />
        <br />
        <label>Jour du mois (1 à 31) (par défaut, la valeur est 1): </label>
        <input type="text" name="jour" value={rangeDates.jour} onChange={changerRangeDates} />
        <br />
        <button className="btn btn-primary" onClick={envoyerLeRange}>Valider</button>
        {
          isValidRange &&
          <h2>Veuillez bien compléter les 3 champs ci-dessus</h2>
        }
        {
          correctRange &&
          <h2>Veuillez respecter la chronologie des 2 dates (début et fin)</h2>
        }
        <br />

        <LineChart />

      </section>

    </>
  );
}