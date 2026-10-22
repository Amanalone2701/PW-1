const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Isso é obrigatório para o servidor conseguir ler o que vem do formulário (POST)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================
// Caderninho de anotações (Exercício 1)
function anotarNoCaderno(pedido, pratoEntregue) {
    const horaAgora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' });
    console.log(`[${horaAgora}] O cliente acessou: ${pedido.originalUrl} | Entregamos: ${JSON.stringify(pratoEntregue)}`);
}

// Tradutor (Exercício 2)
function prepararMensagem(idioma, nomeDoCliente, isPost = false) {
    const lingua = idioma ? idioma.toLowerCase() : 'en';
    
    // Define como a frase termina dependendo se veio de um formulário ou não
    const sufixo = isPost ? (lingua === 'pt-br' ? " via POST!" : lingua === 'es' ? " vía POST!" : " from POST!") : "";
    
    let base = "";
    if (lingua === 'pt-br') {
        base = nomeDoCliente ? `Olá, ${nomeDoCliente}` : "Olá, Mundo!";
    } else if (lingua === 'es') {
        base = nomeDoCliente ? `¡Hola, ${nomeDoCliente}` : "¡Hola, Mundo!";
    } else {
        base = nomeDoCliente ? `Hello, ${nomeDoCliente}` : "Hello, World!";
    }
    
    return { msg: base + sufixo };
}

// ==========================================
// PÁGINA INICIAL DO SITE (HTML)
// ==========================================
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================
// ROTAS DA VERSÃO 1
// ==========================================

// GET: Acessado direto pela URL
app.get('/v1/hi', function(req, res) {
    const resposta = { msg: "Hello, World!" };
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// GET com nome na URL
app.get('/v1/hi/user/:name', function(req, res) {
    const resposta = { msg: "Hello, " + req.params.name };
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// POST: Acessado quando clica no botão "Enviar Saudação (v1)" do formulário
app.post('/v1/hi', function(req, res) {
    const { name } = req.body; // Puxa o nome que foi digitado
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const resposta = { msg: `Hello, ${name.toUpperCase()} from POST!` };
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// ==========================================
// ROTAS DA VERSÃO 2 (Com Idiomas)
// ==========================================

// GET com idioma na URL
app.get('/v2/hi/:lang', function(req, res) {
    const resposta = prepararMensagem(req.params.lang);
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// GET com nome e idioma na URL
app.get('/v2/hi/user/:name/:lang', function(req, res) {
    const resposta = prepararMensagem(req.params.lang, req.params.name);
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// POST: Acessado quando clica no botão "Enviar Saudação (v2)" do formulário
app.post('/v2/hi', function(req, res) {
    const { name, lang } = req.body; // Puxa o nome e o idioma escolhido no <select>
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    // Passamos 'true' no final para avisar que veio do POST
    const resposta = prepararMensagem(lang, name.toUpperCase(), true); 
    anotarNoCaderno(req, resposta);
    res.status(200).json(resposta);
});

// ==========================================
// TRATAMENTO DE ROTA INEXISTENTE (Coringa)
// ==========================================
app.get('/*splat', function(req, res) {
    const err = { error: "Invalid endpoint" };
    anotarNoCaderno(req, err);
    res.status(404).json(err);
});

// ==========================================
// LIGANDO O SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`Servidor rodando! Acesse: http://localhost:${PORT}`);
});