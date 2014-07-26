pc.script.create('snakeInstantiator', function (context) {
    // Creates a new SnakeInstantiator instance
    var SnakeInstantiator = function (entity) {
        this.entity = entity;
        this.client = null;//context.root.getChildren()[0].script.client;
        this.camera = null;//context.root.findByName('Camera');
    };

    SnakeInstantiator.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.client = context.root.getChildren()[0].script.client;
            this.camera = context.root.findByName('Camera');
            this.minimap = context.root.getChildren()[0].script.minimap;
            this.masterSnake = context.root.findByName('main_snake');
            //this.tank.enabled = false;
        },
        create: function (args) {
            
            var newSnake = this.masterSnake.clone();
            var self = this;
            setTimeout(function () {//clone async fix
                
                newSnake.setName('snake_' + args.id);
                newSnake.enabled = true;
                var position = new pc.Vec3(args.positionsArray[0][0], args.positionsArray[0][1], args.positionsArray[0][2]);
                //console.log(position);
                newSnake.setPosition(position);
                //console.log(newSnake.getPosition());
                
                //console.log(args.positionsArray);
    
                context.root.findByName('level').addChild(newSnake); 
                
                context.root.findByName('snake_' + args.id).script.snakeAction.link(args.id)
                
    
                for (var i = 0; i < args.defaultLength; i++){
                    newSnake.script.snakeAction.addBody(args.positionsArray[i], 'snake_' + args.id);
                }
    
                if (args.id == self.client.id) {
                    self.camera.script.cameraFollow.link(newSnake.getChildren()[0]);
                }
                //console.log(newSnake.getPosition());
                
            }, 0);

            //console.log(newSnake.getPosition());
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
        },


    };

    return SnakeInstantiator;
});