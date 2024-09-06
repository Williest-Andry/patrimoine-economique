import express from 'express';
import fs from 'node:fs/promises';
import Possession from '../../models/possessions/Possession.js';
import Flux from '../../models/possessions/Flux.js';
import Personne from '../../models/Personne.js';

const possession = express.Router();
const dataPath = '../data/data.json';
const dataWhenDeployed = './data/data.json';

export function instancier(possessionsData) {
    const possessionsFinales = possessionsData.map((data) => {
        if (data.valeurConstante) {
            return new Flux(
                new Personne(data.possesseur.nom),
                data.libelle,
                data.valeur,
                new Date(data.dateDebut),
                data.dateFin ? new Date(data.dateFin) : null,
                data.tauxAmortissement,
                data.jour
            );
        }

        return new Possession(
            new Personne(data.possesseur.nom),
            data.libelle,
            data.valeur,
            new Date(data.dateDebut),
            data.dateFin ? new Date(data.dateFin) : null,
            data.tauxAmortissement
        );
    });
    return possessionsFinales;
}

function getActualValue(listePossessions) {
    const today = new Date();
    const resultats = listePossessions.map(possession => {
        if (possession.valeurConstante) {
            return possession.getValeur(today).toFixed(2);
        }
        else {
            return possession.getValeurApresAmortissement(today).toFixed(2);
        }
    }
    );
    return resultats;
}

possession.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(dataWhenDeployed, 'utf-8');
        const jsonData = JSON.parse(data)[1].data.possessions;
        const dataFinales = instancier(jsonData);
        const valeursActuelles = getActualValue(dataFinales);
        res.json({ listePossessions: dataFinales, valeursActuelles: valeursActuelles });
    }
    catch (err) {
        res.send("ERREUR LORS DE LA RÉCUPÉRATION DE DONNÉES DANS /possession", err);
    }
});

possession.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(dataWhenDeployed, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        if (possession.toString().includes(req.body.libelle)) {
            res.send("ERREUR, CETTE POSSESSION EXISTE DÉJÀ");
        } else {
            const newData = {
                "possesseur": { "nom": "John Doe" },
                "libelle": req.body.libelle,
                "valeur": parseFloat(req.body.valeur),
                "dateDebut":  new Date(req.body.dateDebut).toString() === "Invalid Date" ? new Date() : new Date(req.body.dateDebut),
                "dateFin": null,
                "tauxAmortissement": parseFloat(req.body.tauxAmortissement) || 0
            };

            possessions.push(newData);

            jsonData[1].data.possessions = possessions;
            await fs.writeFile(dataWhenDeployed, JSON.stringify(jsonData, null, 2));
            res.send(newData);
        }
    } catch (err) {
        res.send("ERREUR LORS DE L'INSERTION DE DONNEES DANS /possession", err);
    }
});


possession.put('/:libelle', async (req, res) => {
    const libelle = req.params.libelle;
    try {
        const data = await fs.readFile(dataWhenDeployed, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].libelle = req.body.libelle || possessions[libelleIndex].libelle;
            possessions[libelleIndex].dateFin = req.body.dateFin || possessions[libelleIndex].dateFin;

            jsonData[1].data.possessions = possessions;
            await fs.writeFile(dataWhenDeployed, JSON.stringify(jsonData, null, 2));
            res.send(possessions[libelleIndex]);
        }
        else {
            res.send("POSSESSION NON TROUVÉE");
        }
    }
    catch (err) {
        res.send("ERREUR LORS DE LA MISE À JOUR DE DONNÉES", err);
    }
});

possession.put('/:libelle/close', async (req, res) => {
    const libelle = req.params.libelle;

    try {
        const data = await fs.readFile(dataWhenDeployed, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData[1]?.data?.possessions || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].dateFin = new Date();

            jsonData[1].data.possessions = possessions;
            await fs.writeFile(dataWhenDeployed, JSON.stringify(jsonData, null, 2));
            res.send(possessions[libelleIndex]);
        }
        else {
            res.send("POSSESSION NON TROUVEE !!");
        }
    } catch (err) {
        res.send("ERREUR LORS DE LA FERMETURE DE LA POSSESSION", err);
    }
});

export default possession;