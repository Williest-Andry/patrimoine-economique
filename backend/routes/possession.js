import express from 'express';
const possession = express.Router();
import fs from 'node:fs/promises'; // Utiliser fs/promises pour simplifier le code asynchrone

const dataFilePath = '../data/data.json'; // Chemin vers votre fichier JSON

// Route GET pour récupérer les possessions
possession.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        console.log('Contenu du fichier JSON :', data); // Ajoutez ceci pour déboguer
        const jsonData = JSON.parse(data);
        console.log('Structure du JSON :', jsonData); // Affichez la structure du JSON pour comprendre

        // Accédez aux possessions via la clé jsonData
        const possessions = jsonData.jsonData || [];
        res.json(possessions);
    } catch (err) {
        console.error("ERREUR LORS DE LA RECUPERATION DE DONNEES !!", err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Route POST pour ajouter une nouvelle possession
possession.post('/', async (req, res) => {
    console.log('Données reçues dans POST :', req.body);
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData.jsonData || [];

        const newData = {
            "possesseur": { "nom": "John Doe" },
            "libelle": req.body.libelle,
            "valeur": req.body.valeur,
            "dateDebut": req.body.dateDebut,
            "dateFin": null,
            "tauxAmortissement": req.body.tauxAmortissement
        };

        possessions.push(newData);

        // Sauvegardez les données mises à jour dans le fichier JSON
        await fs.writeFile(dataFilePath, JSON.stringify({ jsonData: possessions }, null, 2));
        res.send(newData);
    } catch (err) {
        console.error("ERREUR LORS DE L'INSERTION DE DONNEES !!", err);
        res.status(500).send('Erreur lors de l\'insertion des données');
    }
});

// Routes PUT pour mettre à jour et fermer les possessions
// Adaptez les routes PUT comme suit

// Route PUT pour mettre à jour une possession
possession.put('/:libelle', async (req, res) => {
    const libelle = req.params.libelle;
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData.jsonData || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].libelle = req.body.libelle || possessions[libelleIndex].libelle;
            possessions[libelleIndex].dateFin = req.body.dateFin || possessions[libelleIndex].dateFin;

            await fs.writeFile(dataFilePath, JSON.stringify({ jsonData: possessions }, null, 2));
            res.send(possessions[libelleIndex]);
        } else {
            res.status(404).send('POSSESSION NON TROUVEE !!');
        }
    } catch (err) {
        console.error("ERREUR LORS DE LA MISE A JOUR DE DONNEES !!", err);
        res.status(500).send('Erreur lors de la mise à jour des données');
    }
});

// Route PUT pour fermer une possession
possession.put('/:libelle/close', async (req, res) => {
    const libelle = req.params.libelle;
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const possessions = jsonData.jsonData || [];

        const libelleIndex = possessions.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1) {
            possessions[libelleIndex].dateFin = new Date().toISOString();

            await fs.writeFile(dataFilePath, JSON.stringify({ jsonData: possessions }, null, 2));
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
