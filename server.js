const express = require('express');
const WebSocket = require('ws');

let app = express();
// setup static files
app.use(express.static('.'));
// setup listening
let server = app.listen(4000, function () {
    console.log("listening on " + server.address().address + ":" + server.address().port);
});

//WebSocket broadcast setup
const wss = new WebSocket.Server({ server });
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        // Broadcast any received message to all clients
        console.log('received: %s', message);
        this.clients.forEach(function(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

console.log('Server running.');
