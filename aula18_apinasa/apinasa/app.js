require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const API_KEY = process.env.NASA_API_KEY; 

// Rota principal para exibir o formulário de pesquisa
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para processar a pesquisa
app.post('/search', async (req, res) => {
    const astro = req.body.astro.toLowerCase();
    
    try {
        // Solicita 50 imagens aleatórias da API APOD da NASA[cite: 53, 56]
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: API_KEY,
                count: 15
            }
        });

        // Filtra as imagens: verifica se contêm o astro e se não têm copyright
        const imagensFiltradas = response.data.filter(item => {
            const hasAstro = (item.title && item.title.toLowerCase().includes(astro)) || 
                             (item.explanation && item.explanation.toLowerCase().includes(astro));
            const noCopyright = !item.copyright; 
            
            return hasAstro && noCopyright && item.media_type === 'image';
        });

        res.render('carousel', { images: imagensFiltradas, astroPesquisado: req.body.astro });
    } catch (error) {
        console.error(error);
        res.send('Erro ao aceder à API da NASA. Verifica o limite de requisições.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});