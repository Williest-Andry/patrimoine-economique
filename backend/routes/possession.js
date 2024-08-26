import express from 'express';
const possession = express.Router();
import fs from 'node:fs';

possession.get('/', (req, res) => {
    fs.readFile('../data/data.json', 'utf-8', (err, data) => {
        if(err){
            console.log("ERREUR LORS DE LA RECUPERATION DE DONNEES !!",data);
        }

        const jsonData = JSON.parse(data)[1].data.possessions;
        res.json(jsonData);
        
    })
})


export default possession;