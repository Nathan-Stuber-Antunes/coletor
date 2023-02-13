const express = require('express')
const router = express.Router();

router.get('/', function(req, res, next){
    res.status(200).send({
        title: 'Node Express API',
        version: '0.0.1'
    })
})

router.get('/teste1', function(req, res, next){
    res.status(200).send({
        title: 'Teste 1 de GET.'
    })
})

router.post('/teste2/:id', function(req, res, next){
    let id = req.params.id;
    res.status(200).send({
        title: `Teste 2 de POST: parâmetro: ${req.params.id}`
    })
})

module.exports = router;