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

function loop() {
    var snake;

    for(var id in clients) {
        snake = clients[id].snake;

        snake.update();
    }
}

//setInterval(loop, 1000 / 20);


var server = new WebSocketServer({ port: 8080 });

server.on('connection', function(client) {
    console.log('client connected', client.id);
	//var player = null;
    //clients[client.id] = player = new Snake();
    
    clients[client.id] = client;
    client.snake = new Snake(client);

    client.on('move', function(data) {
        /*if (data &&
            data instanceof Array &&
            data.length == 2 &&
            typeof(data[0]) == 'number' &&
            typeof(data[1]) == 'number') {

            this.tank.movementDirection.setV(data);
        }*/
        console.log('key pres');
    });

    
    for(var id in clients) {
        if (id == client.id) continue;

        client.send('create', clients[id].snake.data);
    }

    publish('create', client.snake.data);

});

