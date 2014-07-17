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
    var data = {
        snakes: { }
    };
    var snake;


    for(var id in clients) {
        snake = clients[id].snake;
        // data
        data.snakes[id] = snake.positionsArray;
        /*data.snakes[id] = [
            //parseFloat(snake.pos[0].toFixed(2)), // x
            //parseFloat(snake.pos[1].toFixed(2)), // y
            //parseFloat(snake.pos[2].toFixed(2)),// z
            snake.positionsArray
        ];*/
    }
    publish('update', data);
}

setInterval(loop, 1000 / 30 );//Frames

server.on('connection', function(client) {
    console.log('client connected', client.id);


    clients[client.id] = client;
    client.snake = new Snake(client);

    client.send('init', {
        id: client.id
    });

    for(var id in clients) {
        if (id == client.id) continue;

        client.send('create', clients[id].snake.data);
    }

    client.on('move', function(data) {
        this.snake.movementDirection = data;
        //console.log(data);
    });

    publish('create', client.snake.data);

});