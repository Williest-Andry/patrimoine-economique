import express from 'express';
import fs from 'node:fs';
import Flux from '../../models/possessions/Flux.js'; // Assurez-vous d'importer correctement vos modèles
import Possession from '../../models/possessions/Possession.js'; // Assurez-vous d'importer correctement vos modèles

const patrimoine = express.Router();

// Route pour obtenir la valeur du patrimoine à une date donnée
patrimoine.get('/patrimoine/:date', (req, res) => {
    const dateChoisie = req.params.date;
    let possessionsFinales = [];

    fs.readFile('../../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error("Erreur lors de la lecture du fichier JSON :", err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data)[1].data.possessions;
        } catch (parseError) {
            console.error("Erreur lors du parsing du JSON :", parseError);
            return res.status(500).json({ error: 'Erreur lors du parsing des données' });
        }

        // Fonction d'instanciation
        function instancier(possessionsData) {
            possessionsFinales = possessionsData.map((data) => {
                if (data.valeurConstante) {
                    return new Flux(
                        data.possesseur.nom,
                        data.libelle,
                        data.valeurConstante,
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
        }

        instancier(jsonData);

        // Calcul de la valeur
        function getValue(date) {
            const values = possessionsFinales.map(possession =>
                possession.getValeurApresAmortissement(new Date(date))
            );

            return values.reduce((p1, p2) => p1 + p2, 0);
        }

        let result = getValue(dateChoisie);

        if (isNaN(result)) {
            console.error("Erreur: la valeur calculée n'est pas un nombre :", result);
            return res.status(500).json({ error: "La valeur calculée n'est pas un nombre" });
        }

        console.log('Envoi de la réponse JSON avec la valeur :', result);
        res.json({ valeur: result });
    });
});

export default patrimoine;
