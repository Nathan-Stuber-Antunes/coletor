const app = require('../src/app');
const port = normalizePort(process.env.PORT || '3000')

function normalizePort(val) {
    const port = parseInt(val, 30)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.listen(port, function () {
    console.log(`App executando na porta: ${port}`)
})