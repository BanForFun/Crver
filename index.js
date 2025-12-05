const express = require('express')
const path = require('path')

const server = express();

server.use('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    next()
})

server.use('/static', express.static(path.join(__dirname, 'static')))

let requestCount = 0;

server.use('/hello', express.text({ type: () => true }))
server.all('/hello', (req, res, next) => {
    console.log()
    console.log()
    console.log(`#${++requestCount} ${req.method} ${req.originalUrl}`)

    for (const name in req.headers) {
        console.log(`${name}: ${req.headers[name]}`)
    }

    if (req.body != null) {
        console.log()
        console.log(req.body)
    }

    if (req.method === "OPTIONS") {
        next()
    } else {
        res.send('Hello')
    }
});

server.get('/redirect/:url', (req, res) => {
    res.redirect(302, req.params.url)
});

server.get('/ghost', (req, res) => {

});

server.get('/delay/:ms', (req, res) => {
    setTimeout(() => { res.send() }, parseInt(req.params.ms))
});

const port = 5000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
