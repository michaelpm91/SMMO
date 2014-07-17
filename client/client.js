pc.script.create('client', function (context) {
    // Creates a new Client instance
    var Client = function (entity) {
        this.entity = entity;
        this.id = null;
        this.currentDirection = 1;
    };

    Client.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var socket = this.socket = new m.net.ws({ url: 'ws://162.243.201.39:8080/' });
            this.snake = context.root.getChildren()[0].script.snakeInstantiator;
            var self = this;
            
            socket.on('create', function(data) {
                self.id = data.id;
                self.currentDirection = data.defaultDirection ;
                //console.log(data);
                self.snake.create(data);
            });
            
            socket.on('update', function(data) {
                //console.log(data);
               self.snake.updateData(data.snakes);
            });
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            /*if(context.keyboard.wasPressed(pc.input.KEY_UP)){
                this.socket.send('move', 1);
                this.currentDirection = 1;
            }
            if(context.keyboard.wasPressed(pc.input.KEY_DOWN)){
                this.socket.send('move', 2);
                this.currentDirection = 2;
            }*/
            if(context.keyboard.wasPressed(pc.input.KEY_LEFT)){
                
                this.currentDirection--;
                if(this.currentDirection == 0) this.currentDirection = 4;
                this.socket.send('move', this.currentDirection);
                console.log(this.currentDirection);
                
            }
            if(context.keyboard.wasPressed(pc.input.KEY_RIGHT)){
                this.currentDirection++;
                if(this.currentDirection == 5) this.currentDirection = 1;
                this.socket.send('move', this.currentDirection);
                console.log(this.currentDirection);
            }
            //this.socket.send('move', this.currentDirection);
            
        }
    };

    return Client;
});