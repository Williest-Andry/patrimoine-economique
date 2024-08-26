import express from 'express';
const patrimoine = express.Router();

patrimoine.get('/', (req, res) => {
    res.send("Vous etes dans la page PATRIMOINE")
})

export default patrimoine;