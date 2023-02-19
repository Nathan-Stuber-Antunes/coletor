const express = require('express');
const app = express();
const port = 3000;

function isAuthorized(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === 'secreatpassword') {
    next();
  } else {
    res.status(401);
    res.send('Not permitted')
  }
}

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/products', isAuthorized, (req, res) => {
    const products = [
        {
          id: 1,
          name: "hammer",
        },
        {
          id: 2,
          name: "screwdriver",
        },
        {
          id: 3,
          name: "wrench",
        },
       ];
    res.json(products)
})

app.listen(port, () => console.log(`Exemplo rodando na porta: ${port}`))