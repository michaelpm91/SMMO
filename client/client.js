pc.script.create('client', function (context) {
    // Creates a new Client instance
    var Client = function (entity) {
        this.entity = entity;
        this.id = null;
        this.currentDirection = 1;
        this.currentSnake = null;
    };

    Client.prototype = {
        
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var socket = this.socket = new m.net.ws({ url: 'ws://162.243.201.39:8080/' });
            this.snakeInstantiator = context.root.getChildren()[0].script.snakeInstantiator;
            var self = this;

            socket.on('init', function(data) {
                self.id = data.id;
            });
            
            socket.on('delete', function(data) {
                self.snakeInstantiator.delete(data);
            });
            
            socket.on('create', function(data) {
                self.currentDirection = data.defaultDirection;
                self.snakeInstantiator.create(data);
            });

            socket.on('update', function(data) {
                context.root.findByName('snake_' + data.id).script.snakeAction.changeMoveDirection(data.moveDir);
            });

        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(context.keyboard.wasPressed(pc.input.KEY_LEFT)){
                this.currentDirection--;
                if(this.currentDirection == 0) this.currentDirection = 4;
                this.socket.send('move', this.currentDirection);
            }
            if(context.keyboard.wasPressed(pc.input.KEY_RIGHT)){
                this.currentDirection++;
                if(this.currentDirection == 5) this.currentDirection = 1;
                this.socket.send('move', this.currentDirection);
            }
        }
    };

    return Client;
});