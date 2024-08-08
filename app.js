const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
const app = express();

app.use('/', (req, res) => {
    res.status(204).end();
});

const options = {
    key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
}
const port = process.env.PORT || 8080;
const sslServer = https.createServer(options, app);
sslServer.listen(port, () => {
    console.log(`Secure server is listening on port ${port}`)
});
const anotherPort = process.env.ANOTHERPORT || 8081;

app.listen(anotherPort, () => {
    console.log(`Server is listening on port ${anotherPort}`)
});