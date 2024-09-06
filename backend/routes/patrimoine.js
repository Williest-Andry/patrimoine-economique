import express from 'express';
import fs from 'fs';
import Patrimoine from '../../models/Patrimoine.js';
import Personne from '../../models/Personne.js';
import { instancier } from './possession.js';

const patrimoine = express.Router();
const dataPath = '../data/data.json';

patrimoine.get('/:date', (req, res) => {
    const dateChoisie = req.params.date;
  
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("ERREUR LORS DE LA LECTURE DU FICHIER JSON DANS /:date ", err);
            return res.status(500).json({ error: 'ERREUR LORS DE LA RÉCUPÉRATION DE DONNÉES' });
        }
        
        let jsonData;
        try {
            jsonData = JSON.parse(data)[1].data.possessions;    // tableau de possessions
            const possessionsFinales = instancier(jsonData);    // tableau des instances possessions
            
            function getValue(date) {
                const values = possessionsFinales.map(possession => {
                    const dateObj = new Date(date);
                    if (isNaN(dateObj.getTime())) {
                        return 0;
                    }
                    return parseInt(possession.getValeurApresAmortissement(dateObj));
                });
        
                return values.reduce((p1, p2) => p1 + p2, 0);
            }

            let resultChoisi = getValue(dateChoisie);

            if (isNaN(resultChoisi)) {
                return res.status(500).json({ error: "LA VALEUR CALCULÉE N'EST PAS UN NOMBRE" });
            }

            res.json({ valeurChoisie: resultChoisi });
        } catch (parseError) {
            console.error("Erreur lors du parsing du JSON :", parseError);
            return res.status(500).json({ error: 'Erreur lors du parsing des données' });
        }

    });
});

patrimoine.put('/range', (req, res) => {
    const range = req.body;
    const jourChoisi = range.jour === "" ? "1" : range.jour;
    let lesDates = [];
    let lesValeurs = [];

    fs.readFile(dataPath, (err, data) => {
        if (err) {
            console.log("ERREUR LORS DE LA LECTURE DU JSON DANS /:range ", err);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;  // tableau de possessions
        const instances = instancier(jsonData);   // tableau des instances de possessions
        const patrimoine = new Patrimoine(
            new Personne(JSON.parse(data)[0].data.nom),
            instances
        );

        let dateMilieu = new Date(range.dateDebut);
        dateMilieu.setMonth(dateMilieu.getMonth(), jourChoisi);

        const vraieDateFin = new Date(range.dateFin);
        vraieDateFin.setMonth(vraieDateFin.getMonth() + 1, jourChoisi);

        while (dateMilieu < vraieDateFin) {
            lesValeurs.push(patrimoine.getValeur(dateMilieu));
            let vraieDate = new Date(dateMilieu);
            lesDates.push(vraieDate);
            dateMilieu.setMonth(dateMilieu.getMonth() + 1, jourChoisi);
        }

        res.json({ lesValeurs: lesValeurs, lesDates: lesDates });
    })
})

export default patrimoine;