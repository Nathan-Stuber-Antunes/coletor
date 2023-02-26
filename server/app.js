const express = require('express');
const app = express();
const porta = 3300;

var keyUserFinder = require('./modules/key-user-finder/routes');
app.use('/api', keyUserFinder);

app.listen(porta, () => console.log(`Executando na porta ${porta}`));