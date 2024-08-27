import express from 'express';
const possession = express.Router();
import fs from 'node:fs';

possession.get('/', (req, res) => {
    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("ERREUR LORS DE LA RECUPERATION DE DONNEES !!", data);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;
        res.json(jsonData);

    })
})

possession.post('/', (req, res) => {
    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("ERREUR LORS DE L'ENVOI DE DONNEES !!", data);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;
        const newData = {
            "possesseur": { "nom": "John Doe" },
            "libelle": req.body.libelle,
            "valeur": req.body.valeur,
            "dateDebut": req.body.dateDebut,
            "dateFin": null,
            "tauxAmortissement": req.body.tauxAmortissement
        }

        jsonData.push(newData);

        fs.writeFile('../data/data.json', JSON.stringify({ jsonData }, null, 2), (err) => {
            if (err) {
                console.log("ERREUR LORS DE L'INSERTION DE DONNEES !!");
            }

            res.send(newData);
        })

    })

})

possession.put('/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("ERREUR LORS DE L'ENVOI DE DONNEES !!", data);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;
        const libelleIndex = jsonData.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1){
            jsonData[libelleIndex].libelle = req.body.libelle;
            jsonData[libelleIndex].dateFin = req.body.dateFin;
            
            fs.writeFile('../data/data.json', JSON.stringify({ jsonData }, null, 2), (err) => {
                if (err) {
                    console.log("ERREUR LORS DE L'INSERTION DE DONNEES !!");
                }

                res.send(jsonData[libelleIndex]);
            })
        }
        else{
            res.status(404).send('POSSESSION NON TROUVEE !!');
        }


    })
})

possession.put('/:libelle/close', (req, res) => {
    const libelle = req.params.libelle;

    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("ERREUR LORS DE L'ENVOI DE DONNEES !!", data);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;
        const libelleIndex = jsonData.findIndex(possession => possession.libelle === libelle);

        if (libelleIndex !== -1){
            jsonData[libelleIndex].dateFin = new Date();
            
            fs.writeFile('../data/data.json', JSON.stringify({ jsonData }, null, 2), (err) => {
                if (err) {
                    console.log("ERREUR LORS DE LA FERMETURE DE LA POSSESSION !!");
                }

                res.send(jsonData[libelleIndex]);
            })
        }
        else{
            res.status(404).send('POSSESSION NON TROUVEE !!');
        }


    })
})

export default possession;