const app = require("./src/routes/app.js");
const porta = 3300;

app.listen(porta, () => console.log(`Executando na porta ${porta}`));