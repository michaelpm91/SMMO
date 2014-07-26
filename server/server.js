/**
 * Created by Michael on 09/07/2014.
 */
var WebSocketServer = require('m.net.ws');

var Snake = require('./modules/snake');
var clients = { };

function publish(name, data, except) {
    for(var id in clients) {
        if (except && except.indexOf(id) !== -1) continue;

        try {
            clients[id].send(name, data);
        } catch(ex) { }
    }
}

var server = new WebSocketServer({ port: 8080 });

function loop() {

}

setInterval(loop, 1000 / 30 );//Frames

server.on('connection', function(client) {
    
    console.log('client connected', client.id);


    clients[client.id] = client;
    client.snake = new Snake(client);

    client.send('init', {
        id: client.id
    });

    client.on('disconnect', function() {
        delete clients[client.id];

        publish('delete', {
            id: client.id
        });

        client.snake.delete();

        console.log('client disconnected', client.id);
    });

    for(var id in clients) {
        if (id == client.id) continue;

        client.send('create', clients[id].snake.data);
    }

    client.on('move', function(data) {
        this.snake.movementDirection = data;

        var newData = {
            id: client.id,
            moveDir: data
        };
        publish('update', newData);
    });

    publish('create', client.snake.data);

});