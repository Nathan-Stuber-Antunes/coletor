const app = require("./src/routes/index.js")
const porta = 3000;

app.listen(porta, () => console.log(`Executando na porta ${porta}`))