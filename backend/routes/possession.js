import express from 'express';
import fs from 'node:fs/promises';
import Possession from '../../models/possessions/Possession.js';
import Flux from '../../models/possessions/Flux.js';

const possession = express.Router();
const dataPath = '../data/data.json';

// export function instancier(possessionsData) {
//     const possessionsFinales = possessionsData.map((data) => {
//         if (data.valeurConstante) {
//             return new Flux(
//                 data.possesseur.nom,
//                 data.libelle,
//                 data.valeur,
//                 new Date(data.dateDebut),
//                 data.dateFin ? new Date(data.dateFin) : null,
//                 data.tauxAmortissement,
//                 data.jour
//             );
//         }

//         return new Possession(
//             data.possesseur.nom,
//             data.libelle,
//             data.valeurInitiale,
//             new Date(data.dateDebut),
//             data.dateFin ? new Date(data.dateFin) : null,
//             data.tauxAmortissement
//         );
//     });
//     return possessionsFinales;
// }

possession.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data)[1].data.possessions;
        res.json(jsonData);   
    } catch (err) {
        res.status(500).send('ERREUR LORS DE LA RÉCUPÉRATION DE DONNÉES DANS /possession');
    }
});

possession.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        const newData = {
            "possesseur": { "nom": "John Doe" },
            "libelle": req.body.libelle,
            "valeurInitiale": req.body.valeurInitiale,
            "dateDebut": req.body.dateDebut,
            "dateFin": null,
            "tauxAmortissement": req.body.tauxAmortissement
        };

        possessions.push(newData);

       
        jsonData[1].data.possessions = possessions;
        await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
        res.send(newData);
    } catch (err) {
        console.error("ERREUR LORS DE L'INSERTION DE DONNEES !!", err);
        res.status(500).send('Erreur lors de l\'insertion des données');
    }
});


possession.put('/:libelle', async (req, res) => {
    const libelle = req.params.libelle;
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].libelle = req.body.libelle || possessions[libelleIndex].libelle;
            possessions[libelleIndex].dateFin = req.body.dateFin || possessions[libelleIndex].dateFin;

            jsonData[1].data.possessions = possessions;
            await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
            res.send(possessions[libelleIndex]);
        } else {
            res.status(404).send('POSSESSION NON TROUVEE !!');
        }
    } catch (err) {
        console.error("ERREUR LORS DE LA MISE A JOUR DE DONNEES !!", err);
        res.status(500).send('Erreur lors de la mise à jour des données');
    }
});

possession.put('/:libelle/close', async (req, res) => {
    const libelle = req.params.libelle;
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].dateFin = new Date().toISOString();

            jsonData[1].data.possessions = possessions;
            await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
            res.send(possessions[libelleIndex]);
        } else {
            res.status(404).send('POSSESSION NON TROUVEE !!');
        }
    } catch (err) {
        console.error("ERREUR LORS DE LA FERMETURE DE LA POSSESSION !!", err);
        res.status(500).send('Erreur lors de la fermeture de la possession');
    }
});

export default possession;