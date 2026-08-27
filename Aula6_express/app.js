const express = require('express');
const app = express();
const port = 6767;

const logAcesso = (req, res, next) => {
    console.log(`Acesso à rota: ${req.path}`);
    next();
}

app.get('/', logAcesso, (req, res) => {
  res.send('Hello World!');
});

app.get('/about', logAcesso, (req, res, next) => {
    res.send("Página / about");
});

app.post('/data', logAcesso, (req, res, next) => {
    res.send("Página / data");
});

app.get('/users', logAcesso, (req, res, next) => {
    res.send("Página / users");
});

app.get('/users/signin', logAcesso, (req, res, next) => {
    res.send("Página / users/signin");
});

app.get('/users/signup', logAcesso, (req, res, next) => {
    res.send("Página / users/signup");
});

app.get('/users/:id', logAcesso, (req, res, next) => {
    const userId = req.params.id;
    res.send(`Página / users com id: ${userId}`);
});


app.use((req, res, next) => {
    res.send("Página não encontrada");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});