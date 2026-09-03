const express = require('express');
const app = express();
const port = 6767;
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const dataRouter = require('./routes/data');
const indexRouter = require('./routes/index');

const logAcesso = (req, res, next) => {
    console.log(`Acesso à rota: ${req.path}`);
    next();
}

app.use(logAcesso);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});