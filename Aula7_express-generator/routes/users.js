const express = require('express');
const app = express();
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send("Página / users");
});

router.get('/signin', (req, res, next) => {
    res.send("Página / users/signin");
});

router.get('/signup', (req, res, next) => {
    res.send("Página / users/signup");
});

router.get('/:id', (req, res, next) => {
    const userId = req.params.id;
    res.send(`Página / users com id: ${userId}`);
});

module.exports = router;