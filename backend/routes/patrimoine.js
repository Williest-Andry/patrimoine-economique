import express from 'express';
import fs from 'fs';
import Flux from '../../models/possessions/Flux.js';
import Possession from '../../models/possessions/Possession.js';

const patrimoine = express.Router();

// Route pour obtenir la valeur du patrimoine à une date donnée
patrimoine.get('/:date', (req, res) => {
    const dateChoisie = req.params.date;
    let possessionsFinales = [];

    function instancier(possessionsData) {
        possessionsFinales = possessionsData.map((data) => {
            if (data.valeurConstante) {
                return new Flux(
                    data.possesseur.nom,
                    data.libelle,
                    parseInt(data.valeurConstante),
                    new Date(data.dateDebut),
                    data.dateFin ? new Date(data.dateFin) : null,
                    data.tauxAmortissement ? parseInt(data.tauxAmortissement) : 0,
                    parseInt(data.jour)
                );
            }

            return new Possession(
                data.possesseur.nom,
                data.libelle,
                parseInt(data.valeurInitiale),
                new Date(data.dateDebut),
                data.dateFin ? new Date(data.dateFin) : null,
                parseInt(data.tauxAmortissement)
            );
        });
    }


    function getValue(date) {
        const values = possessionsFinales.map(possession => {
            const dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) {
                return 0; // Date invalide
            }
            return parseInt(possession.getValeurApresAmortissement(dateObj));
        });

        return values.reduce((p1, p2) => p1 + p2, 0);
    }
    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error("Erreur lors de la lecture du fichier JSON :", err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data)[1].data.possessions;
            instancier(jsonData);
            
            console.log("mandeha ihany ve", possessionsFinales);
            let resultChoisi = getValue(dateChoisie);
            // console.log('Données JSON :', jsonData); // Ajoutez ce log pour vérifier les données

            if (isNaN(resultChoisi)) {
                console.error("Erreur: la valeur calculée n'est pas un nombre :", resultChoisi);
                return res.status(500).json({ error: "La valeur calculée n'est pas un nombre" });
            }

            console.log('Envoi de la réponse JSON avec la valeur :', resultChoisi);
            res.json({ valeurChoisie: resultChoisi });
        } catch (parseError) {
            console.error("Erreur lors du parsing du JSON :", parseError);
            return res.status(500).json({ error: 'Erreur lors du parsing des données' });
        }

    });
});

export default patrimoine;
