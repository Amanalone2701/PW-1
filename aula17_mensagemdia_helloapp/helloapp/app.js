const express = require('express');
const app = express();
const axios = require('axios');

app.set('view engine', 'ejs');
const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        // Consumindo a API pública pedida no exercício
        const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
        res.render('index', { msg: response.data[0] });
    } catch (err) {
        res.send('Erro ao acessar API.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});