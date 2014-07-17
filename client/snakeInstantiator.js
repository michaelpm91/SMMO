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
        },
        create: function (args) {
            
            var entity = new pc.fw.Entity();
            
            entity.setName('snake_' + args.id);
            
            context.systems.script.addComponent(entity, {
                scripts: [{
                    url: 'snakeAction.js'
                }]
            });
            
            //entity.setLocalPosition(args.pos[0], args.pos[1], args.pos[2]);
            entity.setLocalPosition(args.positionsArray[0][0],args.positionsArray[0][1],args.positionsArray[0][2]);


            context.root.findByName('level').addChild(entity); 
            
            //console.log('positions array: ');
            //console.log(args.positionsArray)

            for (var i = 0; i < 70; i++){
                //this.addBody(new pc.Vec3(0,0,i));
                this.addBody(args.positionsArray[i], 'snake_' + args.id);
            }

            
            /*context.systems.model.addComponent(entity, {
                type: 'box'
            });*/
            
            //context.root.findByName('Camera').script.target = context.root.findByName('snake_' + args.id);
            //console.log(context.root.findByName('Camera'));
            if (args.id == this.client.id) {
                console.log("args.id: " + args.id + " client.id:" + this.client.id);
                this.camera.script.cameraFollow.link(entity.getChildren()[0]);//context.root.findByName('snake_' + args.id);
            }


            
        },
                
        addBody: function (pos, parent) {
            var entity = new pc.fw.Entity();

            context.systems.model.addComponent(entity, {
                type: 'box',
            });

            entity.setLocalPosition(new pc.Vec3(pos[0],pos[1],pos[2]));

            context.root.findByName(parent).addChild(entity); 
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        updateData: function (data) {
            //console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
            //console.log(context.root.findByName('level'));
            //console.log(data);
            //console.log('running here...');
            //console.log(data);
            for(var id in data) {
                //console.log(data[id][0]);
                var snake = context.root.findByName('snake_' + id);//this.snake.findByName('snake_' + id);
                //console.log('snake here...')
                //console.log(snake);
                if (! snake) continue;
                //console.log(data[id]);
                if (! snake.script.snakeAction) continue;
                snake.script.snakeAction.moveToAction(data[id]);
            }
        },
    };

    return SnakeInstantiator;
});