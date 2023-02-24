const app = require("./api/app.js");
const porta = 3300;

app.listen(porta, () => console.log(`Executando na porta ${porta}`));